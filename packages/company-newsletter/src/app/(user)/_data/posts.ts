"use server";

import * as v from "valibot";

import { getPrismaClient } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";

export type LikeDto = {
  postId: string;
  userId: string;
  profile: {
    userId: string;
    name: string;
    avatarUrl: string;
  };
  likedAt: string;
};
export type PostDto = {
  postId: string;
  title: string;
  text: string;
  createdAt: string;
  canComment: boolean;
  likeCount: number;
  commentCount: number;
  isLiked: boolean;
  likes: LikeDto[];
  author: {
    userId: string;
    name: string;
    avatarUrl: string;
  };
  attachments: string[];
};
export async function getPosts({ page }: { page: number }): Promise<{
  data: PostDto[];
  pagination: {
    totalPage: number;
    page: number;
  };
}> {
  const authClient = await createClient();
  const userResult = await authClient.auth.getUser();

  if (userResult.error) {
    throw new Error("test");
  }

  const prisma = getPrismaClient();
  const [posts, count] = await prisma.$transaction([
    prisma.cnlPost.findMany({
      include: {
        author: true,
        likes: { include: { user: true }, orderBy: { likedAt: "desc" } },
        comments: {
          include: { author: true },
          orderBy: { commentedAt: "desc" },
        },
      },
      orderBy: { postedAt: "desc" },
      skip: (page - 1) * 10,
      take: 10,
    }),
    prisma.cnlPost.count(),
  ]);

  const postsDto = posts.map((post) => {
    const likeCount = post.likes.length || 0;
    const isLiked = post.likes.some(
      (like) => like.userId === userResult.data.user.id,
    );
    return {
      postId: post.postId,
      title: post.title,
      text: post.text,
      createdAt: post.postedAt.toISOString(),
      commentCount: post.comments.length,
      canComment: post.canComment,
      likeCount,
      isLiked,
      likes: post.likes.map((like) => ({
        postId: like.postId,
        userId: like.userId,
        likedAt: like.likedAt.toISOString(),
        profile: {
          userId: like.user.userId,
          name: like.user.name,
          avatarUrl: like.user.avatarUrl,
        },
      })),
      attachments: post.attachments,
      author: v.parse(
        v.object({
          userId: v.string(),
          name: v.string(),
          avatarUrl: v.string(),
        }),
        post.author,
      ),
    } satisfies PostDto;
  });

  return {
    data: postsDto,
    pagination: {
      totalPage: count ? Math.ceil(count / 10) : 1,
      page,
    },
  };
}
