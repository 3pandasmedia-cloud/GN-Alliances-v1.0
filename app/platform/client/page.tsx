import RoleGuard from "@/components/auth/RoleGuard";

export default function ClientDashboard() {
  return (
    <RoleGuard allowedRole="client">

      <div>

        <h1 className="text-4xl font-bold">
          Client Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Welcome to the GN Client Portal.
        </p>

      </div>

    </RoleGuard>
  );
}