export default function Container({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full min-w-0 max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
      {children}
    </div>
  );
}