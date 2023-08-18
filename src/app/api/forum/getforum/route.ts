import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET() {
	const allForuns = await prisma.forum.findMany();

	const count = await countForuns();

	return NextResponse.json({
		foruns: allForuns,
		count,
	});
}

async function countForuns() {
	const countForuns = await prisma.forum.count();
	return countForuns;
}
