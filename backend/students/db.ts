import { SQLDatabase } from "encore.dev/storage/sqldb";

export const studentDB = new SQLDatabase("students", {
  migrations: "./migrations",
});
