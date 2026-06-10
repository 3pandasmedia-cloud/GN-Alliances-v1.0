import DashboardCard from "../../DashboardCard";
import {
  Trophy,
  Gift,
  Star,
  Award,
} from "lucide-react";

export default function ClientRewardsPage() {
  return (
    <div className="space-y-6">

      <div>

        <h1 className="text-3xl md:text-4xl font-bold">
          Rewards
        </h1>

        <p className="text-gray-500 mt-2">
          Reward points overview
        </p>

      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

        <DashboardCard
          title="Points Earned"
          value="12,450"
          icon={Trophy}
          iconBg="#FEF3C7"
          iconColor="#D97706"
        />

        <DashboardCard
          title="Rewards Redeemed"
          value="84"
          icon={Gift}
          iconBg="#F3E8FF"
          iconColor="#9333EA"
        />

        <DashboardCard
          title="Bonus Points"
          value="1,240"
          icon={Star}
          iconBg="#DBEAFE"
          iconColor="#2563EB"
        />

        <DashboardCard
          title="Achievements"
          value="12"
          icon={Award}
          iconBg="#DCFCE7"
          iconColor="#16A34A"
        />

      </div>

    </div>
  );
}