import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

// 1) Extend User type (returned from DB/provider)
declare module "next-auth" {
    interface User extends DefaultUser {
        role?: string; // 👈 add role
    }

    interface Session {
        user: {
            id?: string;
            role?: string; // 👈 add role to session.user
        } & DefaultSession["user"];
    }
}

// 2) Extend JWT type
declare module "next-auth/jwt" {
    interface JWT {
        id?: string;
        role?: string;
    }
}
