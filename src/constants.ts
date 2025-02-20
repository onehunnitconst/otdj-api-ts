import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve('.env') });

const { DATABASE_URL, JWT_SECRET, JWT_ALGORITHM, REDIS_HOST, REDIS_PORT } =
  process.env;

export default abstract class Constants {
  static databaseUrl = DATABASE_URL;
  static jwtSecret = JWT_SECRET;
  static jwtAlgorithm = JWT_ALGORITHM;
  static redisHost = REDIS_HOST;
  static redisPort = REDIS_PORT;
}
