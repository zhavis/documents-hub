import { NextResponse } from "next/server";
import { fetchTree } from "@/lib/fetchDocs";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const path = url.searchParams.get("path")?.split("/") || [];
    const tree = await fetchTree(path);
    return NextResponse.json(tree);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
