import { NextRequest, NextResponse } from "next/server";
import todoData from "@/data/todo.json";

export async function GET(request: NextRequest) {
  const searchParams = new URL(request.url).searchParams;
  const id = searchParams.get("id");
  const text = searchParams.get("text");
  const completed = searchParams.get("completed");

  if (id) {
    const idData = todoData.find(item => item.id === Number(id));
    if (idData) return NextResponse.json(idData);
    return NextResponse.json({ error: `${id}(을)를 찾을 수 없습니다!` }, { status: 404 });
  }
  else return NextResponse.json(todoData);
}