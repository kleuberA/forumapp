import bcrypt from "bcrypt";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: any) {
	const body = await request.json();
	const { name, email, password } = body;

	if (!name || !email || !password) {
		return new NextResponse("Missing required fields", { status: 400 });
	}

	const existingUser = await prisma.user.findUnique({
		where: {
			email,
		},
	});

	if (existingUser) {
		throw new Error("User already exists");
	}

	const hashedPassword = await bcrypt.hash(password, 10);

	const user = await prisma.user.create({
		data: {
			name,
			email,
			hashedPassword,
		},
	});

	return NextResponse.json(user);
}
