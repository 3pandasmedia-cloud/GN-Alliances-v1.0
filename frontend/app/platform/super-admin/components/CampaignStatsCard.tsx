type Props = {
  title: string;
  value: number | string;
  color?: string;
};

export default function CampaignStatsCard({
  title,
  value,
  color = "#0B2E83",
}: Props) {
  return (
    <div
      className="
        bg-white
        rounded-3xl
        border
        border-gray-200
        p-6
        shadow-sm
      "
    >
      <p className="text-gray-500 text-sm">
        {title}
      </p>

      <h2
        className="text-4xl font-bold mt-4"
        style={{ color }}
      >
        {value}
      </h2>
    </div>
  );
}