import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { BarChart3, TrendingUp, Users, Award } from "lucide-react";
import backend from "~backend/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import PerformanceChart from "../components/PerformanceChart";
import BatchComparisonChart from "../components/BatchComparisonChart";
import TopPerformersTable from "../components/TopPerformersTable";

export default function Analytics() {
  const [selectedBatch, setSelectedBatch] = useState<string>("all");

  const { data: analyticsData, isLoading } = useQuery({
    queryKey: ["analytics", selectedBatch],
    queryFn: async () => {
      const params: any = {};
      if (selectedBatch && selectedBatch !== "all") params.batch = selectedBatch;
      return backend.students.getAnalytics(params);
    },
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-32 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const stats = analyticsData ? [
    {
      title: "Total Students",
      value: analyticsData.total_students.toString(),
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      title: "Placement Eligible",
      value: `${analyticsData.placement_eligible_count} (${analyticsData.placement_eligible_percentage.toFixed(1)}%)`,
      icon: Award,
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      title: "Average Aggregate",
      value: `${analyticsData.average_aggregate.toFixed(1)}%`,
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    },
    {
      title: "Top Performers",
      value: analyticsData.top_performers.length.toString(),
      icon: BarChart3,
      color: "text-orange-600",
      bgColor: "bg-orange-100"
    }
  ] : [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600 mt-1">Comprehensive insights into student performance</p>
        </div>
        
        <Select value={selectedBatch} onValueChange={setSelectedBatch}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by batch" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Batches</SelectItem>
            <SelectItem value="7th-sem">7th Semester</SelectItem>
            <SelectItem value="5th-sem">5th Semester</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Performance Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            {analyticsData && (
              <PerformanceChart data={analyticsData.performance_distribution} />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Batch Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            {analyticsData && (
              <BatchComparisonChart data={analyticsData.batch_comparison} />
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            Top Performers
            {selectedBatch !== "all" && (
              <span className="text-sm font-normal text-gray-600 ml-2">
                ({selectedBatch.replace('-', ' ').toUpperCase()})
              </span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {analyticsData && (
            <TopPerformersTable students={analyticsData.top_performers} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
