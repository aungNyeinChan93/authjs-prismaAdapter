import { prisma } from "@/lib/prisma-client/prisma"


export async function getUserDatail(email: string | undefined) {
    const user = await prisma.user.findFirst({
        where: { email: email as string }
        , include: {
            accounts: true,
            Session: true,
        },

    })
    return user;
}