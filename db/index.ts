import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";
import { config } from "dotenv";

config({
  path: ".env",
});

export const client = postgres(process.env.DATABASE_URL!);
export const db = drizzle(client, { schema });
