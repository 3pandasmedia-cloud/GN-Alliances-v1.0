import DashboardCard from "../DashboardCard";

import {
  ClipboardList,
  Clock,
  Users,
  Briefcase,
} from "lucide-react";

export default function EmployeeDashboard() {
  return (
    <div className="space-y-6 md:space-y-8">

      <div>
        <h1 className="text-3xl md:text-4xl font-bold">
          Employee Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Manage assigned tasks and approvals
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">

        <DashboardCard
          title="Assigned Tasks"
          value="28"
          icon={ClipboardList}
          iconBg="#DBEAFE"
          iconColor="#2563EB"
        />

        <DashboardCard
          title="Pending Reviews"
          value="12"
          icon={Clock}
          iconBg="#FEF3C7"
          iconColor="#D97706"
        />

        <DashboardCard
          title="Partners Managed"
          value="23"
          icon={Users}
          iconBg="#DCFCE7"
          iconColor="#16A34A"
        />

        <DashboardCard
          title="Campaigns Managed"
          value="8"
          icon={Briefcase}
          iconBg="#F3E8FF"
          iconColor="#9333EA"
        />

      </div>

      <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">

        <h3 className="text-xl font-bold mb-6">
          Recent Activities
        </h3>

        <div className="space-y-4">

          <div className="border-b pb-3">
            Approved HDFC Campaign
          </div>

          <div className="border-b pb-3">
            Added New Offer
          </div>

          <div className="border-b pb-3">
            Reviewed Partner Request
          </div>

          <div>
            Updated Campaign Details
          </div>

        </div>

      </div>

    </div>
  );
}