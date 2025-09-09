import { auth } from "@/lib/next-auth/auth"



export async function getSession() {
    const session = await auth();
    return session;
}