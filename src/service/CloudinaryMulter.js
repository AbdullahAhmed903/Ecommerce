import cloudinary from "cloudinary";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "../../config/.env") });

cloudinary.v2.config({
  cloud_name: process.env.Cloudinary_Name,
  api_key: process.env.Cloudinary_Key,
  api_secret: process.env.Cloudinary_Sec,
});
export default cloudinary.v2;
