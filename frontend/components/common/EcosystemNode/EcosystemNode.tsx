export default function EcosystemNode({
  title,
}: {
  title: string;
}) {
  return (
    <div className="
      bg-white
      shadow-md
      rounded-full
      px-5
      py-3
      border
      text-sm
      font-medium
    ">
      {title}
    </div>
  );
}