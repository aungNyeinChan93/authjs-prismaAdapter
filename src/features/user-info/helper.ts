import { prisma } from "@/lib/prisma-client/prisma"


export async function getUserDatail(email: string | undefined) {
    try {
        const user = await prisma.user.findUnique({ where: { email: email as string } })
        return user;
    } catch (error) {
        if (error instanceof Error) {
            console.error(error?.message)
            return { success: false, error: error?.message }
        };
        return
    }
}