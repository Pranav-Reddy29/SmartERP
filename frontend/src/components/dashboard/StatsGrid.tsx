import {
  IndianRupee,
  ShoppingCart,
  Package,
  Users,
} from "lucide-react";

import DashboardCard from "./DashboardCard";

export default function StatsGrid() {

  return (

    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

      <DashboardCard
        title="Today's Sales"
        value="₹1,25,400"
        growth="+18%"
        color="bg-blue-600"
        icon={<IndianRupee size={30}/>}
      />

      <DashboardCard
        title="Purchases"
        value="₹72,300"
        growth="+8%"
        color="bg-orange-500"
        icon={<ShoppingCart size={30}/>}
      />

      <DashboardCard
        title="Stock Items"
        value="352"
        growth="+12"
        color="bg-emerald-600"
        icon={<Package size={30}/>}
      />

      <DashboardCard
        title="Customers"
        value="128"
        growth="+9"
        color="bg-purple-600"
        icon={<Users size={30}/>}
      />

    </div>

  );

}