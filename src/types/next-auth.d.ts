import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { Role } from "@prisma/client";

declare module "next-auth" {
    interface User {
        role?: Role | null | string | undefined;
    }

    interface Session {
        user: {
            id?: string;
            role?: Role | null;
        } & DefaultSession["user"];
    }
}
declare module "next-auth/jwt" {
    interface JWT {
        id?: string;
        role?: Role | null;
    }
}

