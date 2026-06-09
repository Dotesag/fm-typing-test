import { promises as fs } from "fs";
import path from "path";

export async function GET(request: Request) {
  try {
    console.log(process.cwd());
    const dataPath = path.join(process.cwd(), "public/data/data.json");
    const jsonData = await fs.readFile(dataPath, "utf-8");
    const data = JSON.parse(jsonData);
    return Response.json(data);
  } catch (error) {
    return Response.json({ error: error }, { status: 404 });
  }
}
