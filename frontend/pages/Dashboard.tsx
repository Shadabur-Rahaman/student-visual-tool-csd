import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Search, Filter, Users, CheckCircle, AlertCircle, ArrowUpDown } from "lucide-react";
import backend from "~backend/client";
import type { Student } from "~backend/students/list";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import StudentTable from "../components/StudentTable";
import StatsCards from "../components/StatsCards";

export default function Dashboard() {
  const [search, setSearch] = useState("");
  const [batch, setBatch] = useState<string>("");
  const [placementEligible, setPlacementEligible] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("usn");
  const [sortOrder, setSortOrder] = useState<string>("asc");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: studentsData, isLoading, error } = useQuery({
    queryKey: ["students", { search, batch, placementEligible, sortBy, sortOrder }],
    queryFn: async () => {
      const params: any = {};
      if (search) params.search = search;
      if (batch && batch !== "all") params.batch = batch;
      if (placementEligible && placementEligible !== "all") params.placement_eligible = placementEligible === "true";
      if (sortBy) params.sort_by = sortBy;
      if (sortOrder) params.sort_order = sortOrder;
      
      return backend.students.listStudents(params);
    },
  });

  const seedData = async (semester: "5th" | "7th") => {
    try {
      const endpoint = semester === "5th" 
        ? backend.students.seedFifthSemData 
        : backend.students.seedSeventhSemData;
      
      const result = await endpoint();
      
      // Set the batch filter to show only the seeded data
      setBatch(semester === "5th" ? "5th-sem" : "7th-sem");
      
      // Invalidate queries to refresh data
      queryClient.invalidateQueries({ queryKey: ["students"] });
      queryClient.invalidateQueries({ queryKey: ["analytics"] });
      
      toast({
        title: "Success",
        description: result.message,
      });
    } catch (error) {
      console.error("Error seeding data:", error);
      toast({
        title: "Error",
        description: "Failed to seed data. Please try again.",
        variant: "destructive",
      });
    }
  };

  const toggleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  if (error) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Data</h2>
        <p className="text-gray-600 mb-4">There was an error loading the student data.</p>
        <div className="space-x-2">
          <Button onClick={() => seedData("7th")} variant="outline">
            Seed 7th Semester Data
          </Button>
          <Button onClick={() => seedData("5th")} variant="outline">
            Seed 5th Semester Data
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Student Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage and analyze student performance data</p>
        </div>
        <div className="space-x-2">
          <Button onClick={() => seedData("7th")} variant="outline" size="sm">
            Seed 7th Sem Data
          </Button>
          <Button onClick={() => seedData("5th")} variant="outline" size="sm">
            Seed 5th Sem Data
          </Button>
        </div>
      </div>

      <StatsCards />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>Student Records</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by name or USN..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={batch} onValueChange={setBatch}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by batch" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Batches</SelectItem>
                <SelectItem value="7th-sem">7th Semester</SelectItem>
                <SelectItem value="5th-sem">5th Semester</SelectItem>
              </SelectContent>
            </Select>

            <Select value={placementEligible} onValueChange={setPlacementEligible}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Placement status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Students</SelectItem>
                <SelectItem value="true">Placement Eligible</SelectItem>
                <SelectItem value="false">Not Eligible</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex gap-2">
              <Button
                variant={sortBy === "usn" ? "default" : "outline"}
                size="sm"
                onClick={() => toggleSort("usn")}
                className="flex items-center gap-1"
              >
                USN
                <ArrowUpDown className="h-3 w-3" />
              </Button>
              <Button
                variant={sortBy === "aggregate_percentage" ? "default" : "outline"}
                size="sm"
                onClick={() => toggleSort("aggregate_percentage")}
                className="flex items-center gap-1"
              >
                Aggregate
                <ArrowUpDown className="h-3 w-3" />
              </Button>
            </div>
          </div>

          <StudentTable 
            students={studentsData?.students || []} 
            isLoading={isLoading}
            total={studentsData?.total || 0}
          />
        </CardContent>
      </Card>
    </div>
  );
}
