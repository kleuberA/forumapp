import NextAuth from "next-auth/next";
import prisma from "../../../libs/prismadb";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(prisma),
	providers: [
		CredentialsProvider({
			name: "credentials",
			credentials: {
				email: { label: "Email", type: "text" },
				password: { label: "Password", type: "password" },
				username: { label: "Username", type: "text" },
			},
			async authorize(credentials: any) {
				if (!credentials.email || !credentials.password) {
					throw new Error("Please enter your email and password");
				}

				const user = await prisma.user.findFirst({
					where: {
						email: credentials.email,
					},
				});

				if (!user || !user.hashedPassword) {
					throw new Error("No user found");
				}

				const isValid = await bcrypt.compare(
					credentials.password,
					user.hashedPassword
				);

				if (!isValid) {
					throw new Error("Invalid password");
				}

				return user;
			},
		}),
	],
	secret: process.env.SECRET,
	session: {
		strategy: "jwt",
		maxAge: 30 * 24 * 60 * 60, // 30 days
	},
	jwt: {
		secret: process.env.JWT_SECRET,
	},
	callbacks: {
		session: ({ session, token }) => {
			// console.log("Session Callback", { session, token });
			return {
				...session,
				user: {
					...session.user,
					id: token.id,
					randomKey: token.randomKey,
				},
			};
		},
		jwt: ({ token, user }) => {
			// console.log("JWT Callback", { token, user });
			if (user) {
				const u = user as unknown as any;
				return {
					...token,
					id: u.id,
					randomKey: u.randomKey,
				};
			}
			return token;
		},
	},
	debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
