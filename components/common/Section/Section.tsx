export default function Section({
  children,
  id,
}: {
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <section
      id={id}
      className="py-10 lg:py-16"
    >
      {children}
    </section>
  );
}