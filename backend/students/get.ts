import { api, APIError } from "encore.dev/api";
import { studentDB } from "./db";
import type { Student } from "./list";

interface GetStudentParams {
  usn: string;
}

// Retrieves a specific student by USN.
export const getStudent = api<GetStudentParams, Student>(
  { expose: true, method: "GET", path: "/students/:usn" },
  async (params) => {
    const student = await studentDB.queryRow<Student>`
      SELECT * FROM students WHERE usn = ${params.usn}
    `;

    if (!student) {
      throw APIError.notFound("Student not found");
    }

    return student;
  }
);
