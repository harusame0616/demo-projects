"use server";

import * as v from "valibot";

import { getPrismaClient } from "@/lib/prisma";

export type CommentDto = {
  commentId: string;
  postId: string;
  text: string;
  createdAt: string;
  author: {
    userId: string;
    name: string;
    avatarUrl: string;
  };
  attachments: string[];
};
export async function getComments({ page }: { page: number }): Promise<{
  data: CommentDto[];
  pagination: {
    totalPage: number;
    page: number;
  };
}> {
  const prisma = getPrismaClient();
  const [comments, count] = await prisma.$transaction([
    prisma.cnlPostComment.findMany({
      include: { author: true },
      orderBy: { commentedAt: "desc" },
      skip: (page - 1) * 10,
      take: 10,
    }),
    prisma.cnlPostComment.count(),
  ]);

  const postsDto = comments.map((comment) => {
    return {
      commentId: comment.commentId,
      postId: comment.postId,
      text: comment.text,
      createdAt: comment.commentedAt.toISOString(),
      attachments: comment.attachments,
      author: v.parse(
        v.object({
          userId: v.string(),
          name: v.string(),
          avatarUrl: v.string(),
        }),
        comment.author,
      ),
    };
  });

  return {
    data: postsDto,
    pagination: {
      totalPage: count ? Math.ceil(count / 10) : 1,
      page,
    },
  };
}
