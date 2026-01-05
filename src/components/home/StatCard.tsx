import { ReactNode } from "react";

type StatCardProps = {
  title: string;
  value: string | number;
  icon: ReactNode;
  bgColor: string;
};

export default function StatCard({
  title,
  value,
  icon,
  bgColor,
}: StatCardProps) {
  return (
    <div className="rounded-xl bg-base-100 border border-base-300/60 p-5 hover:border-base-300 transition">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-gray-500">
            {title}
          </p>
          <p className="mt-2 text-2xl font-semibold">{value}</p>
        </div>

        <div className={`p-3 rounded-lg bg-base-200 text-gray-600 ${bgColor}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}
