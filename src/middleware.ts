import { NextRequest, NextResponse } from "next/server"

export { auth } from "@/lib/next-auth/auth"


export default async function middleware(request: NextRequest) {
    return NextResponse.next();
}