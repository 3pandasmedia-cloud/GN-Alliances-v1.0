import Image from "next/image";

type Props = {
  number: number;
  icon: string;
  title: string;
  description: string;
};

export default function ProcessCard({
  number,
  icon,
  title,
  description,
}: Props) {
  return (
    <div
      className="
        relative
        flex
        flex-col
        items-center
        text-center
        w-full
      "
    >
      {/* Step Number */}

      <div
        className={`
          w-12
          h-12
          rounded-full
          flex
          items-center
          justify-center
          text-white
          font-bold
          text-[20px]
          mb-4

          ${number % 2 === 0
            ? "bg-[#F2A900]"
            : "bg-[#0B2E83]"
          }
        `}
      >
        {number}
      </div>

      {/* Icon */}

      <Image
        src={icon}
        alt={title}
        width={85}
        height={85}
        className="mb-5 object-contain"
      />

      {/* Title */}

      <h3
        className="
          text-[16px]
          font-bold
          text-[#111827]
          mb-3
          leading-tight
        "
      >
        {title}
      </h3>

      {/* Description */}

      <p
        className="
    hidden
    lg:block

    text-[13px]
    text-[#6B7280]
    leading-7
    max-w-[170px]
  "
      >
        {description}
      </p>
    </div>
  );
}