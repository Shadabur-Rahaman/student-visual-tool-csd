import { Link } from "react-router-dom";
import { Eye, GraduationCap } from "lucide-react";
import type { Student } from "~backend/students/list";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface StudentTableProps {
  students: Student[];
  isLoading: boolean;
  total: number;
}

export default function StudentTable({ students, isLoading, total }: StudentTableProps) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="h-12 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  if (students.length === 0) {
    return (
      <div className="text-center py-12">
        <GraduationCap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No students found</h3>
        <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-sm text-gray-600">
        Showing {students.length} of {total} students
      </div>
      
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>USN</TableHead>
              <TableHead>Batch</TableHead>
              <TableHead>Aggregate</TableHead>
              <TableHead>Backlogs</TableHead>
              <TableHead>Placement Status</TableHead>
              <TableHead>Placement Eligible</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell className="font-medium">{student.name}</TableCell>
                <TableCell className="font-mono text-sm">{student.usn}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="capitalize">
                    {student.batch.replace('-', ' ')}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className={`font-semibold ${
                    (student.aggregate_percentage || 0) >= 85 ? 'text-green-600' :
                    (student.aggregate_percentage || 0) >= 70 ? 'text-blue-600' :
                    'text-red-600'
                  }`}>
                    {student.aggregate_percentage?.toFixed(1) || 'N/A'}%
                  </span>
                </TableCell>
                <TableCell>
                  <span className={`font-semibold ${
                    student.active_backlogs === 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {student.active_backlogs}
                  </span>
                </TableCell>
                <TableCell>
                  <Badge 
                    variant={student.placement_status === "Placed" ? "default" : "secondary"}
                    className={student.placement_status === "Placed" ? "bg-green-600 hover:bg-green-700" : ""}
                  >
                    {student.placement_status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={student.placement_eligible ? "default" : "destructive"}>
                    {student.placement_eligible ? "Eligible" : "Not Eligible"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Link to={`/student/${student.usn}`}>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
