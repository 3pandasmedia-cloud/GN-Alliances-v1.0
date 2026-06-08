import RoleGuard from "@/components/auth/RoleGuard";

export default function EmployeeDashboard() {
  return (
    <RoleGuard allowedRole="employee">

      <div>

        <h1 className="text-4xl font-bold">
          Employee Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Welcome to the GN Employee Portal.
        </p>

      </div>

    </RoleGuard>
  );
}