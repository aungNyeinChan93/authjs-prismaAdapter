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
};


export async function getUserByEmail(email: string) {
    try {
        const user = await prisma.user.findUnique({ where: { email: email as string }, include: { accounts: true, Session: true } })
        return user;
    } catch (error) {
        if (error instanceof Error) {
            console.log(error?.message);
            return null
        }
        console.log(error);
        return null
    }

}