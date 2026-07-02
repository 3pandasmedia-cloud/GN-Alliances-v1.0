import Image from "next/image";

type Props = {
  title: string;
  icon: string;
};

export default function IndustryCard({
  title,
  icon,
}: Props) {
  return (
    <div className="bg-white border rounded-xl p-4 text-center">

      <img
        src={icon}
        alt={title}
        className="w-full rounded-lg mb-4"
      />

      <h3>{title}</h3>

    </div>
  );
}