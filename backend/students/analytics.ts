import { api, Query } from "encore.dev/api";
import { studentDB } from "./db";

interface AnalyticsParams {
  batch?: Query<string>;
}

interface PerformanceDistribution {
  range: string;
  count: number;
  percentage: number;
}

interface BatchComparison {
  batch: string;
  total_students: number;
  placement_eligible: number;
  average_aggregate: number;
  top_performers: number;
}

interface AnalyticsResponse {
  total_students: number;
  placement_eligible_count: number;
  placement_eligible_percentage: number;
  average_aggregate: number;
  performance_distribution: PerformanceDistribution[];
  batch_comparison: BatchComparison[];
  top_performers: Array<{
    name: string;
    usn: string;
    aggregate_percentage: number;
    batch: string;
  }>;
}

// Provides comprehensive analytics about student performance and placement eligibility.
export const getAnalytics = api<AnalyticsParams, AnalyticsResponse>(
  { expose: true, method: "GET", path: "/students/analytics" },
  async (params) => {
    let whereClause = "WHERE 1=1";
    const queryParams: any[] = [];
    let paramIndex = 1;

    if (params.batch) {
      whereClause += ` AND batch = $${paramIndex}`;
      queryParams.push(params.batch);
      paramIndex++;
    }

    // Basic stats
    const basicStatsQuery = `
      SELECT 
        COUNT(*) as total_students,
        COUNT(*) FILTER (WHERE placement_eligible = true) as placement_eligible_count,
        AVG(aggregate_percentage) as average_aggregate
      FROM students ${whereClause}
    `;
    const basicStats = await studentDB.rawQueryRow<{
      total_students: number;
      placement_eligible_count: number;
      average_aggregate: number;
    }>(basicStatsQuery, ...queryParams);

    const totalStudents = basicStats?.total_students || 0;
    const placementEligibleCount = basicStats?.placement_eligible_count || 0;
    const averageAggregate = basicStats?.average_aggregate || 0;
    const placementEligiblePercentage = totalStudents > 0 ? (placementEligibleCount / totalStudents) * 100 : 0;

    // Performance distribution
    const distributionQuery = `
      SELECT 
        CASE 
          WHEN aggregate_percentage >= 90 THEN '90-100%'
          WHEN aggregate_percentage >= 80 THEN '80-89%'
          WHEN aggregate_percentage >= 70 THEN '70-79%'
          WHEN aggregate_percentage >= 60 THEN '60-69%'
          ELSE 'Below 60%'
        END as range,
        COUNT(*) as count
      FROM students ${whereClause}
      GROUP BY range
      ORDER BY MIN(aggregate_percentage) DESC
    `;
    const distributionResults = await studentDB.rawQueryAll<{ range: string; count: number }>(
      distributionQuery, 
      ...queryParams
    );

    const performanceDistribution = distributionResults.map(item => ({
      range: item.range,
      count: item.count,
      percentage: totalStudents > 0 ? (item.count / totalStudents) * 100 : 0
    }));

    // Batch comparison (always show all batches)
    const batchComparisonQuery = `
      SELECT 
        batch,
        COUNT(*) as total_students,
        COUNT(*) FILTER (WHERE placement_eligible = true) as placement_eligible,
        AVG(aggregate_percentage) as average_aggregate,
        COUNT(*) FILTER (WHERE aggregate_percentage >= 85) as top_performers
      FROM students
      GROUP BY batch
      ORDER BY batch
    `;
    const batchComparison = await studentDB.rawQueryAll<BatchComparison>(batchComparisonQuery);

    // Top performers
    const topPerformersQuery = `
      SELECT name, usn, aggregate_percentage, batch
      FROM students ${whereClause}
      ORDER BY aggregate_percentage DESC
      LIMIT 10
    `;
    const topPerformers = await studentDB.rawQueryAll<{
      name: string;
      usn: string;
      aggregate_percentage: number;
      batch: string;
    }>(topPerformersQuery, ...queryParams);

    return {
      total_students: totalStudents,
      placement_eligible_count: placementEligibleCount,
      placement_eligible_percentage: placementEligiblePercentage,
      average_aggregate: averageAggregate,
      performance_distribution: performanceDistribution,
      batch_comparison: batchComparison,
      top_performers: topPerformers
    };
  }
);
