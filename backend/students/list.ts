import { api, Query } from "encore.dev/api";
import { studentDB } from "./db";

export interface Student {
  id: number;
  name: string;
  usn: string;
  batch: string;
  tenth_percentage: number;
  puc_percentage: number;
  sem1_percentage?: number;
  sem2_percentage?: number;
  sem3_percentage?: number;
  sem4_percentage?: number;
  sem5_percentage?: number;
  sem6_percentage?: number;
  aggregate_percentage?: number;
  active_backlogs: number;
  placement_eligible: boolean;
  placement_status: string;
  created_at: Date;
  updated_at: Date;
}

interface ListStudentsParams {
  batch?: Query<string>;
  placement_eligible?: Query<boolean>;
  search?: Query<string>;
  limit?: Query<number>;
  offset?: Query<number>;
  sort_by?: Query<string>;
  sort_order?: Query<string>;
}

interface ListStudentsResponse {
  students: Student[];
  total: number;
}

// Retrieves all students with optional filtering and pagination.
export const listStudents = api<ListStudentsParams, ListStudentsResponse>(
  { expose: true, method: "GET", path: "/students" },
  async (params) => {
    const limit = params.limit || 1000; // Increased default limit to show all students
    const offset = params.offset || 0;
    const sortBy = params.sort_by || 'usn';
    const sortOrder = params.sort_order || 'asc';
    
    let whereClause = "WHERE 1=1";
    const queryParams: any[] = [];
    let paramIndex = 1;

    if (params.batch) {
      whereClause += ` AND batch = $${paramIndex}`;
      queryParams.push(params.batch);
      paramIndex++;
    }

    if (params.placement_eligible !== undefined) {
      whereClause += ` AND placement_eligible = $${paramIndex}`;
      queryParams.push(params.placement_eligible);
      paramIndex++;
    }

    if (params.search) {
      whereClause += ` AND (name ILIKE $${paramIndex} OR usn ILIKE $${paramIndex})`;
      queryParams.push(`%${params.search}%`);
      paramIndex++;
    }

    // Validate sort parameters
    const validSortColumns = ['usn', 'aggregate_percentage', 'name', 'created_at'];
    const validSortOrders = ['asc', 'desc'];
    
    const sortColumn = validSortColumns.includes(sortBy) ? sortBy : 'usn';
    const sortDirection = validSortOrders.includes(sortOrder) ? sortOrder : 'asc';

    let orderByClause = `ORDER BY ${sortColumn} ${sortDirection.toUpperCase()}`;
    
    // Add secondary sort for consistent ordering
    if (sortColumn !== 'usn') {
      orderByClause += ', usn ASC';
    }

    // Get total count
    const countQuery = `SELECT COUNT(*) as count FROM students ${whereClause}`;
    const countResult = await studentDB.rawQueryRow<{ count: number }>(countQuery, ...queryParams);
    const total = countResult?.count || 0;

    // Get students with pagination
    const studentsQuery = `
      SELECT * FROM students 
      ${whereClause}
      ${orderByClause}
      LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
    `;
    queryParams.push(limit, offset);

    const students = await studentDB.rawQueryAll<Student>(studentsQuery, ...queryParams);

    return { students, total };
  }
);
