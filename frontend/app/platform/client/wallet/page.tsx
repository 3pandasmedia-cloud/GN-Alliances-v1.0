import DashboardCard from "../../DashboardCard";
import {
  Wallet,
  IndianRupee,
  CreditCard,
  PiggyBank,
} from "lucide-react";

export default function ClientWalletPage() {
  return (
    <div className="space-y-6">

      <div>

        <h1 className="text-3xl md:text-4xl font-bold">
          Wallet
        </h1>

        <p className="text-gray-500 mt-2">
          Financial overview
        </p>

      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

        <DashboardCard
          title="Balance"
          value="₹3,420"
          icon={Wallet}
          iconBg="#DBEAFE"
          iconColor="#2563EB"
        />

        <DashboardCard
          title="Savings"
          value="₹18,250"
          icon={PiggyBank}
          iconBg="#DCFCE7"
          iconColor="#16A34A"
        />

        <DashboardCard
          title="Cashback"
          value="₹2,480"
          icon={IndianRupee}
          iconBg="#FEF3C7"
          iconColor="#D97706"
        />

        <DashboardCard
          title="Transactions"
          value="124"
          icon={CreditCard}
          iconBg="#F3E8FF"
          iconColor="#9333EA"
        />

      </div>

    </div>
  );
}