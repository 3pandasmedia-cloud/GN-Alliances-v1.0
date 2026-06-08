export default function Section({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="py-10 lg:py-16">
      {children}
    </section>
  );
}