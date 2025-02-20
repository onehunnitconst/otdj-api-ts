import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve('.env') });

const { DATABASE_URL, JWT_SECRET, JWT_ALGORITHM } = process.env;

export default abstract class Constants {
  static databaseUrl = DATABASE_URL;
  static jwtSecret = JWT_SECRET;
  static jwtAlgorithm = JWT_ALGORITHM;
}
