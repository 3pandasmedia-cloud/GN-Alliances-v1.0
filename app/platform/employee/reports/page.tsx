import DashboardCard from "../../DashboardCard";
import {
  FileText,
  ClipboardCheck,
  Users,
  BarChart3,
} from "lucide-react";

export default function EmployeeReportsPage() {
  return (
    <div className="space-y-6">

      <div>

        <h1 className="text-3xl md:text-4xl font-bold">
          Reports
        </h1>

        <p className="text-gray-500 mt-2">
          Employee performance summary
        </p>

      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

        <DashboardCard
          title="Reports"
          value="24"
          icon={FileText}
          iconBg="#DBEAFE"
          iconColor="#2563EB"
        />

        <DashboardCard
          title="Tasks Completed"
          value="182"
          icon={ClipboardCheck}
          iconBg="#DCFCE7"
          iconColor="#16A34A"
        />

        <DashboardCard
          title="Partners"
          value="32"
          icon={Users}
          iconBg="#F3E8FF"
          iconColor="#9333EA"
        />

        <DashboardCard
          title="Efficiency"
          value="96%"
          icon={BarChart3}
          iconBg="#FEF3C7"
          iconColor="#D97706"
        />

      </div>

    </div>
  );
}