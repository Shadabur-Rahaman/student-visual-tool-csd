import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, User, GraduationCap, Award, AlertTriangle, TrendingUp, Briefcase } from "lucide-react";
import backend from "~backend/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import StudentPerformanceChart from "../components/StudentPerformanceChart";

export default function StudentDetail() {
  const { usn } = useParams<{ usn: string }>();

  const { data: student, isLoading, error } = useQuery({
    queryKey: ["student", usn],
    queryFn: async () => {
      if (!usn) throw new Error("USN is required");
      return backend.students.getStudent({ usn });
    },
    enabled: !!usn,
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error || !student) {
    return (
      <div className="text-center py-12">
        <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Student Not Found</h2>
        <p className="text-gray-600 mb-4">The requested student could not be found.</p>
        <Link to="/">
          <Button>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>
      </div>
    );
  }

  const semesterData = [
    { semester: "10th", percentage: student.tenth_percentage },
    { semester: "PUC", percentage: student.puc_percentage },
    { semester: "Sem 1", percentage: student.sem1_percentage },
    { semester: "Sem 2", percentage: student.sem2_percentage },
    { semester: "Sem 3", percentage: student.sem3_percentage },
    { semester: "Sem 4", percentage: student.sem4_percentage },
    { semester: "Sem 5", percentage: student.sem5_percentage },
    { semester: "Sem 6", percentage: student.sem6_percentage },
  ].filter(item => item.percentage !== null && item.percentage !== undefined);

  const semesterPerformanceData = [
    { label: "Semester 1", value: student.sem1_percentage },
    { label: "Semester 2", value: student.sem2_percentage },
    { label: "Semester 3", value: student.sem3_percentage },
    { label: "Semester 4", value: student.sem4_percentage },
    { label: "Semester 5", value: student.sem5_percentage },
    { label: "Semester 6", value: student.sem6_percentage },
  ].filter(item => item.value !== null && item.value !== undefined);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{student.name}</h1>
            <p className="text-gray-600">{student.usn}</p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Badge 
            variant={student.placement_status === "Placed" ? "default" : "secondary"}
            className={student.placement_status === "Placed" ? "bg-green-600 hover:bg-green-700" : ""}
          >
            {student.placement_status}
          </Badge>
          <Badge variant={student.placement_eligible ? "default" : "destructive"}>
            {student.placement_eligible ? "Placement Eligible" : "Not Eligible"}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>Basic Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-600">Name</label>
              <p className="text-lg font-semibold">{student.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">USN</label>
              <p className="text-lg font-semibold">{student.usn}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Batch</label>
              <p className="text-lg font-semibold capitalize">{student.batch.replace('-', ' ')}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <GraduationCap className="h-5 w-5" />
              <span>Academic Performance</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-600">Aggregate Percentage</label>
              <p className="text-2xl font-bold text-blue-600">
                {student.aggregate_percentage?.toFixed(2) || 'N/A'}%
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">10th Percentage</label>
              <p className="text-lg font-semibold">{student.tenth_percentage}%</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">PUC Percentage</label>
              <p className="text-lg font-semibold">{student.puc_percentage}%</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Briefcase className="h-5 w-5" />
              <span>Placement Status</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-600">Current Status</label>
              <div className="flex items-center space-x-2 mt-1">
                <Badge 
                  variant={student.placement_status === "Placed" ? "default" : "secondary"}
                  className={student.placement_status === "Placed" ? "bg-green-600 hover:bg-green-700" : ""}
                >
                  {student.placement_status}
                </Badge>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Eligibility</label>
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant={student.placement_eligible ? "default" : "destructive"}>
                  {student.placement_eligible ? "Eligible" : "Not Eligible"}
                </Badge>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Active Backlogs</label>
              <p className="text-lg font-semibold text-red-600">{student.active_backlogs}</p>
            </div>
            {!student.placement_eligible && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-700">
                  {student.active_backlogs > 0 
                    ? "Has active backlogs" 
                    : "Aggregate below 70%"}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Award className="h-5 w-5" />
              <span>Performance Summary</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-600">Performance Grade</label>
              <p className={`text-2xl font-bold ${
                (student.aggregate_percentage || 0) >= 85 ? 'text-green-600' :
                (student.aggregate_percentage || 0) >= 75 ? 'text-blue-600' :
                (student.aggregate_percentage || 0) >= 70 ? 'text-yellow-600' :
                'text-red-600'
              }`}>
                {(student.aggregate_percentage || 0) >= 85 ? 'Excellent' :
                 (student.aggregate_percentage || 0) >= 75 ? 'Good' :
                 (student.aggregate_percentage || 0) >= 70 ? 'Average' :
                 'Below Average'}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Completed Semesters</label>
              <p className="text-lg font-semibold">{semesterPerformanceData.length}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Performance Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <StudentPerformanceChart data={semesterData} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Individual Performance</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">10th Grade</label>
                  <p className="text-xl font-bold text-gray-900">{student.tenth_percentage}%</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">PUC</label>
                  <p className="text-xl font-bold text-gray-900">{student.puc_percentage}%</p>
                </div>
              </div>
              
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Semester</TableHead>
                      <TableHead>Percentage</TableHead>
                      <TableHead>Grade</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {semesterPerformanceData.map((sem, index) => {
                      const percentage = sem.value || 0;
                      const grade = percentage >= 90 ? 'A+' : 
                                   percentage >= 80 ? 'A' : 
                                   percentage >= 70 ? 'B+' : 
                                   percentage >= 60 ? 'B' : 
                                   percentage >= 50 ? 'C' : 'F';
                      const gradeColor = percentage >= 80 ? 'text-green-600' : 
                                        percentage >= 70 ? 'text-blue-600' : 
                                        percentage >= 60 ? 'text-yellow-600' : 'text-red-600';
                      
                      return (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{sem.label}</TableCell>
                          <TableCell>
                            <span className={`font-semibold ${gradeColor}`}>
                              {percentage.toFixed(1)}%
                            </span>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className={gradeColor}>
                              {grade}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
