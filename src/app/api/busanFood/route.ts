import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/supabase/client";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const perPage = parseInt(searchParams.get("perPage") || "8");
    const limit = perPage;

    const offset = (page - 1) * limit;

    const { data, error, count } = await supabase
        .from("restaurants")
        .select("*", { count: "exact" })
        .order('UC_SEQ', { ascending: false }) // 내림차순
        .range(offset, offset + limit - 1);

    if(error) {
        console.error("Fetching 에러 : ", error);
        return NextResponse.json({ error : error.message }, { status: 500 });
    }

    const totalPages = Math.ceil(count! / limit);

    return NextResponse.json({
        data,
        currentPage: page,
        perPage,
        totalPages,
    });
}