import { NextResponse } from "next/server";

export async function middleware(req, res){
    return NextResponse.next()
}

export const config = {
    matcher: ["/"],
}
