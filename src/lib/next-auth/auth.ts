import NextAuth, { CredentialsSignin } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma-client/prisma"
import GitHub from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"
import { compare } from "bcrypt-ts"

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
        GitHub,
        Credentials({
            name: 'credentials',
            credentials: {
                email: { type: 'email', label: 'Email', placeholder: 'Enter Email' },
                password: { type: 'password', label: 'Password', placeholder: 'Enter Password' },
            },
            authorize: async (credentials) => {
                const { email, password } = credentials;
                if (!email || !password) {
                    throw new CredentialsSignin('Some Fields Are Required!');
                }
                const user = await prisma.user.findUnique({ where: { email: email as string } });

                if (!user) {
                    throw new Error('user not found!')
                };

                const isCorrect = await compare(password as string, user?.password as string)

                if (!isCorrect) throw new Error('Credential in not correct!')

                return user;
            }
        }),

    ],
    callbacks: {
        session: async ({ session, token }) => {
            if (token?.sub) {
                session.user.id = token?.sub
                session.user.role = token?.role;
            };
            return session
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id as string;
                token.role = user.role as string; // 👈 store role in token
            }
            return token;
        },
    },

    // adapter: PrismaAdapter(prisma),
})