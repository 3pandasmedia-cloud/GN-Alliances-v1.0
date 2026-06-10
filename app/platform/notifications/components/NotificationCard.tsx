type Props = {
  title: string;
  message: string;
  time: string;
};

export default function NotificationCard({
  title,
  message,
  time,
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
      <div className="flex justify-between items-start gap-4">

        <div>

          <h3 className="font-semibold text-lg">
            {title}
          </h3>

          <p className="text-gray-500 mt-2">
            {message}
          </p>

        </div>

        <span className="text-xs text-gray-400 whitespace-nowrap">
          {time}
        </span>

      </div>
    </div>
  );
}