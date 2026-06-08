type Props = {
  title: string;
  value: string;
};

export default function RedemptionStatsCard({
  title,
  value,
}: Props) {
  return (
    <div
      className="
        bg-white
        rounded-2xl
        p-5
        md:p-6
        border
        border-gray-100
        shadow-sm
      "
    >
      <p className="text-gray-500 text-sm">
        {title}
      </p>

      <h3 className="text-3xl font-bold mt-3">
        {value}
      </h3>

      <p className="text-green-600 text-sm mt-2">
        ↑ 9% this month
      </p>
    </div>
  );
}