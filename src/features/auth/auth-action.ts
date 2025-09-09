'use server'

import { prisma } from "@/lib/prisma-client/prisma";
import { hashPassword } from "./auth-helper";
import { redirect } from "next/navigation";

// register 
export async function registerAction(initialState: any, formData: FormData) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email) {
        return { success: false, error: { email: 'email field are required' } }
    }

    if (!password) {
        return { success: false, error: { password: 'password field are required' } }
    }

    const user = await prisma.user.findUnique({ where: { email: email } });

    if (user) {
        return { success: false, error: { email: 'email is already used!' } }
    }

    try {
        await prisma.user.create({
            data: {
                email: email as string,
                password: await hashPassword(password as string)
            }
        })
    } catch (error) {
        if (error instanceof Error) {
            console.error(error?.message)
            return { success: false, error: { other: error?.message } }
        }
        return { success: false, error: { other: 'unknow error' } }

    }
    return redirect('/api/auth/signin');
}

// login with credential
