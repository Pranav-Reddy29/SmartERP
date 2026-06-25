import { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

interface DashboardCardProps {
  title: string;
  value: string;
  icon: ReactNode;
  color?: string;
  growth?: string;
}

export default function DashboardCard({
  title,
  value,
  icon,
  color = "bg-blue-500",
  growth = "+0%"
}: DashboardCardProps) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm border hover:shadow-lg transition-all duration-300">
      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-gray-500">
            {title}
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {value}
          </h2>

          <div className="mt-4 flex items-center gap-2 text-green-600 text-sm font-medium">
            <ArrowUpRight size={16}/>
            {growth}
          </div>

        </div>

        <div
          className={`${color} h-16 w-16 rounded-2xl flex items-center justify-center text-white`}
        >
          {icon}
        </div>

      </div>
    </div>
  );
}