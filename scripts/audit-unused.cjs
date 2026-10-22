// Read-only audit. Framework routes are entries; reported candidates are never deleted.
const fs = require("node:fs");
const path = require("node:path");
const ts = require("../frontend/node_modules/typescript");
const root = path.resolve(__dirname, "..");
const frontend = path.join(root, "frontend");
const ignored = new Set(["node_modules", ".next", "dist", "uploads", ".git"]);
function walk(folder) {
  return fs.readdirSync(folder, { withFileTypes: true }).flatMap(entry => {
    if (ignored.has(entry.name)) return [];
    const file = path.join(folder, entry.name);
    return entry.isDirectory() ? walk(file) : [file];
  });
}
const files = walk(frontend).filter(file => /\.(tsx?|jsx?|mjs|json|css)$/.test(file));
const known = new Set(files);
const graph = new Map();
const dynamic = [];
const routeNames = /^(page|layout|loading|error|not-found|default|template|route|global-error)\.[jt]sx?$/;
const entries = files.filter(file =>
  (file.startsWith(path.join(frontend, "app") + path.sep) && routeNames.test(path.basename(file))) ||
  /^(next\.config\.ts|eslint\.config\.mjs|proxy\.ts|middleware\.ts)$/.test(path.basename(file))
);
function staticString(node) {
  if (node && ts.isStringLiteralLike(node)) return node.text;
  if (node && ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.PlusToken) {
    const left = staticString(node.left), right = staticString(node.right);
    if (left !== undefined && right !== undefined) return left + right;
  }
}
function resolve(file, specifier) {
  if (!specifier.startsWith(".") && !specifier.startsWith("@/")) return;
  const base = specifier.startsWith("@/") ? path.join(frontend, specifier.slice(2)) : path.resolve(path.dirname(file), specifier);
  return [base, ...[".ts", ".tsx", ".js", ".jsx", ".json", ".css", "/index.ts", "/index.tsx"].map(extension => base + extension)]
    .map(candidate => path.normalize(candidate)).find(candidate => known.has(candidate));
}
function imports(file) {
  if (!/\.[cm]?[jt]sx?$/.test(file)) return [];
  const source = ts.createSourceFile(file, fs.readFileSync(file, "utf8"), ts.ScriptTarget.Latest, true);
  const result = [];
  function visitNode(node) {
    let specifier;
    if (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) specifier = node.moduleSpecifier;
    else if (ts.isCallExpression(node) && (node.expression.kind === ts.SyntaxKind.ImportKeyword || node.expression.getText(source) === "require")) {
      specifier = node.arguments[0];
      if (staticString(specifier) === undefined) dynamic.push(path.relative(root, file));
    }
    const text = staticString(specifier);
    if (text !== undefined) { const dependency = resolve(file, text); if (dependency) result.push(dependency); }
    ts.forEachChild(node, visitNode);
  }
  visitNode(source);
  return result;
}
for (const file of files) graph.set(file, imports(file));
// Backend tests also import shared frontend helpers. Preserve those references.
for (const file of walk(path.join(root, "backend"))) entries.push(...imports(file));
const reached = new Set();
function visitFile(file) {
  if (reached.has(file)) return;
  reached.add(file);
  for (const dependency of graph.get(file) || []) visitFile(dependency);
}
entries.forEach(visitFile);
const candidates = files.filter(file => /\.[jt]sx?$/.test(file) && !file.endsWith(".d.ts") && !reached.has(file));
console.log(`${candidates.length} frontend source candidates without a route/import reference:`);
for (const file of candidates) console.log(path.relative(root, file));
if (dynamic.length) console.log("Review dynamic imports manually:", [...new Set(dynamic)].join(", "));
console.log("Read-only result: routes, assets, database records and files were not changed.");
