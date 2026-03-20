type StatCardProps = {
  title: string;
  value: number;
};

export default function StatCard({ title, value }: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition">
      
      <p className="text-gray-400 text-sm font-medium uppercase tracking-wide">
        {title}
      </p>

      <h2 className="text-3xl font-bold text-[#1f3c50] mt-3">
        {value}
      </h2>

    </div>
  );
}
