export default function Button({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <button className="bg-blue-900 text-white px-5 py-2 rounded-lg">
      {children}
    </button>
  );
}