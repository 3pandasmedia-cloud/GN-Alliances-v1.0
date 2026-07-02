export default function Container({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-[1500px] mx-auto px-0">
      {children}
    </div>
  );
}