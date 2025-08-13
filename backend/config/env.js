import { config } from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

config({ path: path.resolve(__dirname, "../.env") });

export const {
  PORT,
  SERVER_URL,
  DB_URI,
  JWT_SECRET,
  JWT_EXPIRE,
  FRONTEND_URL,
  NODE_ENV,
  UPSTASH_REDIS_REST_URL,
  UPSTASH_REDIS_REST_TOKEN,
} = process.env;
