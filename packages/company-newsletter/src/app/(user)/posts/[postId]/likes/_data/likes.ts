"use server";

import type { Prisma } from "@prisma/client";

import { getPrismaClient } from "@/lib/prisma";

export type LikeDto = {
	createdAt: string;
	userId: string;
	name: string;
	avatarUrl: string;
	postId: string;
};
export async function getLikes({
	page,
	postId,
}: {
	page: number;
	postId: string;
}): Promise<{
	data: LikeDto[];
	pagination: {
		totalPage: number;
		page: number;
	};
}> {
	const prisma = getPrismaClient();
	const where: Prisma.CnlPostLikeWhereInput = { postId };
	const [likes, count] = await prisma.$transaction([
		prisma.cnlPostLike.findMany({
			include: { user: true },
			orderBy: { likedAt: "desc" },
			take: 10,
			skip: (page - 1) * 10,
			where,
		}),
		prisma.cnlPostLike.count({ where }),
	]);

	const likesDto = likes.map(
		(like) =>
			({
				...like.user,
				...like,
				createdAt: like.likedAt.toISOString(),
			}) satisfies LikeDto,
	);

	return {
		data: likesDto,
		pagination: {
			totalPage: count ? Math.ceil(count / 10) : 1,
			page,
		},
	};
}
