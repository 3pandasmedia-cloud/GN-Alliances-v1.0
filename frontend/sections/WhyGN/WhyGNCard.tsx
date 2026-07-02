import Image from "next/image";

type Props = {
  icon: string;
  title: string;
  description: string;
};

export default function WhyGNCard({
  icon,
  title,
  description,
}: Props) {
  return (
    <div className="flex items-center gap-5 px-6 py-4 -translate-y-3">
      
      <div className="flex-shrink-0">
        <div className="w-28 h-28 rounded-full bg-[#F8F8F8] flex items-center justify-center">
          <Image
            src={icon}
            alt={title}
            width={160}
            height={160}
            className="object-contain"
          />
        </div>
      </div>

      <div>
        <h3 className="text-[#18214D] text-[18px] font-semibold mb-2">
          {title}
        </h3>

        <p className="text-[#4B5563] text-sm leading-7 max-w-[220px]">
          {description}
        </p>
      </div>
    </div>
  );
}