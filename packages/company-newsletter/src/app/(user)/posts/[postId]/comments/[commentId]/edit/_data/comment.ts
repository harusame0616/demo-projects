"use server";

import { getPrismaClient } from "@/lib/prisma";

export type PostDto = {
	postId: string;
	title: string;
	text: string;
	createdAt: string;
	author: {
		userId: string;
		name: string;
		avatarUrl: string;
	};
	attachments: string[];
};
export async function getComment(commentId: string) {
	const prisma = getPrismaClient();
	const comment = await prisma.cnlPostComment.findUnique({
		where: { commentId },
	});

	if (!comment) {
		throw new Error("test");
	}

	return {
		data: comment,
	};
}
