type Props = {
  title: string;
  value: string;
};

export default function NotificationStats({
  title,
  value,
}: Props) {
  return (
    <div
      className="
        bg-white
        rounded-2xl
        p-5
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
    </div>
  );
}