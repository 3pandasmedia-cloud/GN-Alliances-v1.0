import NotificationCard from "./components/NotificationCard";
import NotificationStats from "./components/NotificationStats";

export default function NotificationsPage() {
  return (
    <div className="space-y-6 md:space-y-8">

      {/* Header */}

      <div>

        <h1 className="text-3xl md:text-4xl font-bold">
          Notifications
        </h1>

        <p className="text-gray-500 mt-2">
          Latest updates from GN Alliances
        </p>

      </div>

      {/* Stats */}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">

        <NotificationStats
          title="Total Notifications"
          value="128"
        />

        <NotificationStats
          title="Unread"
          value="18"
        />

        <NotificationStats
          title="Campaign Alerts"
          value="42"
        />

        <NotificationStats
          title="System Updates"
          value="12"
        />

      </div>

      {/* Notification List */}

      <div className="space-y-4">

        <NotificationCard
          title="Campaign Approved"
          message="Summer Saver Campaign has been approved successfully."
          time="2 min ago"
        />

        <NotificationCard
          title="New Partner Added"
          message="ICICI Bank has been onboarded to GN Alliances."
          time="15 min ago"
        />

        <NotificationCard
          title="Offer Expiring"
          message="Fuel Cashback Offer expires tomorrow."
          time="1 hour ago"
        />

        <NotificationCard
          title="Monthly Report Ready"
          message="Your analytics report is available for download."
          time="3 hours ago"
        />

        <NotificationCard
          title="System Update"
          message="Platform maintenance completed successfully."
          time="Yesterday"
        />

      </div>

    </div>
  );
}