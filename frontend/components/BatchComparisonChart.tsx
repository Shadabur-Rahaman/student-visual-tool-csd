import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface BatchData {
  batch: string;
  total_students: number;
  placement_eligible: number;
  average_aggregate: number;
  top_performers: number;
}

interface BatchComparisonChartProps {
  data: BatchData[];
}

export default function BatchComparisonChart({ data }: BatchComparisonChartProps) {
  const chartData = data.map(batch => ({
    batch: batch.batch.replace('-', ' ').toUpperCase(),
    total: batch.total_students,
    eligible: batch.placement_eligible,
    average: Number(batch.average_aggregate.toFixed(1))
  }));

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="batch" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="total" fill="#3b82f6" name="Total Students" />
          <Bar dataKey="eligible" fill="#10b981" name="Placement Eligible" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
