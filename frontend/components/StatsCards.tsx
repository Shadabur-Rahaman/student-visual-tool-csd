import { useQuery } from "@tanstack/react-query";
import { Users, CheckCircle, TrendingUp, AlertCircle } from "lucide-react";
import backend from "~backend/client";
import { Card, CardContent } from "@/components/ui/card";

export default function StatsCards() {
  const { data: analyticsData, isLoading } = useQuery({
    queryKey: ["analytics", "all"],
    queryFn: () => backend.students.getAnalytics({}),
  });

  const stats = [
    {
      title: "Total Students",
      value: analyticsData?.total_students?.toString() || "0",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      loading: isLoading
    },
    {
      title: "Placement Eligible",
      value: analyticsData ? `${analyticsData.placement_eligible_count} (${analyticsData.placement_eligible_percentage.toFixed(1)}%)` : "0",
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-100",
      loading: isLoading
    },
    {
      title: "Average Aggregate",
      value: analyticsData ? `${analyticsData.average_aggregate.toFixed(1)}%` : "0%",
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      loading: isLoading
    },
    {
      title: "Students with Backlogs",
      value: analyticsData ? `${analyticsData.total_students - analyticsData.placement_eligible_count}` : "0",
      icon: AlertCircle,
      color: "text-red-600",
      bgColor: "bg-red-100",
      loading: isLoading
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  {stat.loading ? (
                    <div className="h-8 w-20 bg-gray-200 rounded animate-pulse mt-1"></div>
                  ) : (
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  )}
                </div>
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
