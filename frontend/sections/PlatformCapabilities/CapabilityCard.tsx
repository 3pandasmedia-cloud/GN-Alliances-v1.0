import Image from "next/image";

type Props = {
  title: string;
  description: string;
  image: string;
};

export default function CapabilityCard({
  title,
  description,
  image,
}: Props) {
  return (
    <div className="rounded-2xl border p-6">
      <Image
        src={image}
        alt={title}
        width={400}
        height={220}
        className="rounded-xl mb-4"
      />

      <h3 className="text-xl font-semibold">
        {title}
      </h3>

      <p className="text-gray-600">
        {description}
      </p>
    </div>
  );
}