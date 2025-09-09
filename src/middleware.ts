import { NextAuthRequest } from "next-auth";
import { NextRequest, NextResponse } from "next/server"


import { auth } from "@/lib/next-auth/auth"
import { getUserByEmail } from "./features/users/users-helper";
import { getSession } from "./features/sessions/session-helper";


// export default auth((req: NextAuthRequest) => {
//     const user = req.auth?.user;
//     const pathname = req.nextUrl
//     // const auth_user = user?.email &&  getUserByEmail(user?.email as string)

//     console.log({ user, pathname });
// })

// export const config = {
//     matcher: ['/:path*']
// }

const protectedRoutes = ['/private'];
const adminRoutes = ['/admin', '/admin/dashboard']

export default async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    const session = await getSession();
    const role = session?.user?.role

    const isSession = !!(await getSession());

    const isProtectedRoutes = protectedRoutes.some(route => pathname.startsWith(route));
    const isAdminRoutes = adminRoutes.some(route => pathname.startsWith(route));

    if (isProtectedRoutes && !isSession) {
        return NextResponse.redirect(new URL('/api/auth/signin', request.nextUrl.origin))
    }

    if (isAdminRoutes && isSession && role !== 'admin') {
        return NextResponse.redirect(new URL('/api/auth/signin', request.nextUrl.origin))
    }

    return NextResponse.next();
}