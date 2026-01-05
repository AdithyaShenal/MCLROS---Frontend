type StatCardProps = {
  title: string;
  value: string | number;
};

export default function StatCard({ title, value }: StatCardProps) {
  return (
    <div className="card bg-base-100 border shadow-sm">
      <div className="card-body items-center text-center">
        <p className="text-sm text-gray-500">{title}</p>
        <h2 className="text-3xl font-bold">{value}</h2>
      </div>
    </div>
  );
}
