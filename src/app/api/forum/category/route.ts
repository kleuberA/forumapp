import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const { name } = body;

		if (!name) {
			return new NextResponse("Missing required fields", { status: 400 });
		}

		const existingCategory = await prisma.category.findUnique({
			where: {
				name,
			},
		});

		if (existingCategory) {
			throw new Error("Category already exists");
		}

		await prisma.category.create({
			data: {
				name,
			},
		});
	} catch (err) {
		console.log(err);
		return new NextResponse("Error " + err, { status: 500 });
	}

	return NextResponse.json({ message: "Category created" });
}
