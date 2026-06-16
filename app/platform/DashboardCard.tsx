import { LucideIcon } from "lucide-react";

type Props = {
  title: string;
  value: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
};

export default function DashboardCard({
  title,
  value,
  icon: Icon,
  iconBg,
  iconColor,
}: Props) {
  return (
    <div
      className="
        bg-white
        rounded-2xl
        p-5
        lg:p-6
        shadow-sm
        border
        border-gray-100
        hover:shadow-md
        transition
      "
    >

      <div className="flex items-start justify-between">

        <div>

          <p className="text-gray-500 text-sm">
            {title}
          </p>

          <h3
            className="
              text-2xl
              md:text-3xl
              font-bold
              mt-3
            "
          >
            {value}
          </h3>

        </div>

        <div
          className="
            w-12
            h-12
            rounded-xl
            flex
            items-center
            justify-center
          "
          style={{
            backgroundColor: iconBg,
          }}
        >
          <Icon
            size={22}
            style={{
              color: iconColor,
            }}
          />
        </div>

      </div>

      <p className="text-gray-400 text-sm mt-4">
        Live platform data
      </p>

    </div>
  );
}