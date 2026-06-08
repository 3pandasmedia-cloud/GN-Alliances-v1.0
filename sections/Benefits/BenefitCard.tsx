import Image from "next/image";

type Props = {
  title: string;
  description: string;
  icon: string;
};

export default function BenefitCard({
  title,
  description,
  icon,
}: Props) {
  return (
    <div className="flex flex-col items-center text-center max-w-[125px] lg:max-w-none lg:flex-row lg:text-left lg:items-center gap-2 lg:gap-6">
      <Image
        src={icon}
        alt={title}
        width={80}
        height={80}
        className="w-20 h-20 lg:w-[110px] lg:h-[80px] object-contain"
      />

      <div>
        <h3 className="text-white font-semibold text-[13px] lg:text-base leading-tight">
          {title}
        </h3>

        <p className="text-blue-100 text-[10px] lg:text-sm mt-0.5 leading-tight">
          {description}
        </p>
      </div>
    </div>
  );
}