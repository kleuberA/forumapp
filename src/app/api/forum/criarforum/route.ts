import prisma from "@/app/libs/prismadb";
import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	const body = await request.formData();

	const name = body.get("name") as string;
	const description = body.get("description") as string;
	const categoryId = body.get("categoryId") as string;
	const userID = body.get("userID") as string;
	const file: File | null = body.get("file") as unknown as File;

	if (!name || !description || !categoryId || !userID) {
		return new NextResponse("Missing required fields", { status: 400 });
	}

	const existingForum = await prisma.forum.findUnique({
		where: {
			name,
		},
	});

	if (existingForum) {
		throw new Error("Forum already exists");
	}

	const bytes = await file.arrayBuffer();
	const buffer = Buffer.from(bytes);

	const path = `./src/tmp/${file.name}`;
	await writeFile(path, buffer);
	console.log(`open ${path} to see the uploaded file`);

	await prisma.forum.create({
		data: {
			name,
			description,
			category: {
				connect: {
					id: categoryId,
				},
			},
			moderator: {
				connect: {
					id: userID,
				},
			},
			imagePath: path,
		},
	});

	return NextResponse.json({ message: "Forum created" });
}
