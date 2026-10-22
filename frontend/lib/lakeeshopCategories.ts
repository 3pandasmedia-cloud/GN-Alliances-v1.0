// Accept category-name lists as well as category records inside API envelopes.
export function categoryNames(value: unknown): string[] {
  if (Array.isArray(value)) return value.flatMap(item => typeof item === "string" ? (item.trim() ? [item.trim()] : []) : categoryNames(item));
  if (!value || typeof value !== "object") return [];
  const record = value as Record<string, unknown>;
  const name = record.primary_category_name || record.primaryCategoryName || record.category_name || record.categoryName || record.category || record.name;
  return [
    ...(typeof name === "string" && name.trim() ? [name.trim()] : []),
    ...Object.values(record).filter(item => item !== null && typeof item === "object").flatMap(categoryNames),
  ];
}
