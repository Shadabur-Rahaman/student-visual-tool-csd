import { Link } from "react-router-dom";
import { Eye } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface TopPerformer {
  name: string;
  usn: string;
  aggregate_percentage: number;
  batch: string;
}

interface TopPerformersTableProps {
  students: TopPerformer[];
}

export default function TopPerformersTable({ students }: TopPerformersTableProps) {
  if (students.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">No top performers found.</p>
      </div>
    );
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Rank</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>USN</TableHead>
            <TableHead>Batch</TableHead>
            <TableHead>Aggregate</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student, index) => (
            <TableRow key={student.usn}>
              <TableCell>
                <div className="flex items-center">
                  <span className="font-bold text-lg">#{index + 1}</span>
                  {index < 3 && (
                    <span className="ml-2 text-lg">
                      {index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉"}
                    </span>
                  )}
                </div>
              </TableCell>
              <TableCell className="font-medium">{student.name}</TableCell>
              <TableCell className="font-mono text-sm">{student.usn}</TableCell>
              <TableCell>
                <Badge variant="outline" className="capitalize">
                  {student.batch.replace('-', ' ')}
                </Badge>
              </TableCell>
              <TableCell>
                <span className="font-bold text-green-600">
                  {student.aggregate_percentage.toFixed(2)}%
                </span>
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
  );
}
