import { readFile } from "node:fs/promises";
import path from "node:path";

export async function GET() {
  const file = await readFile(path.join(process.cwd(), "src/assets/hero-assembly.glb"));

  return new Response(new Uint8Array(file), {
    headers: {
      "Content-Type": "model/gltf-binary",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
