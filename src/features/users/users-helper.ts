import { prisma } from "@/lib/prisma-client/prisma"

export async function getAllUsers(limit: number = 10) {
    const users = await prisma.user.findMany({
        include: {
            accounts: true,
            Session: true
        },
        orderBy: {
            id: "desc"
        },
        take: limit || 10
    })
    return users;
}