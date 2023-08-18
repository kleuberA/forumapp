import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET() {
	const categories = await prisma.category.findMany({
		select: {
			id: true,
			name: true,
		},
	});

	return NextResponse.json(categories);
}
