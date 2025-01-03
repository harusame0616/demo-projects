"use server";

import * as v from "valibot";

import { createClient } from "@/lib/supabase/server";
import { createClientServiceRole } from "@/lib/supabase/service-role";

export type LikeDto = {
  likeId: string;
  createdAt: string;
  profile: {
    userId: string;
    name: string;
    avatarUrl: string;
  };
};
export type PostDto = {
  postId: string;
  title: string;
  text: string;
  createdAt: string;
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
  const client = createClientServiceRole().schema("X_DEMO");
  const authClient = await createClient();
  const userResult = await authClient.auth.getUser();

  if (userResult.error) {
    throw new Error("test");
  }

  const result = await client
    .from("post")
    .select(
      `postId, title, attachments, text, attachments, createdAt, userId, profile!post_userId_fkey1(*), likes:post_like(*, profile(*)), comment(*)`,
      {
        count: "exact",
      },
    )
    .order("createdAt", { ascending: false })
    .range((page - 1) * 10, page * 10);

  if (result.error) {
    throw new Error("error");
  }

  const postsDto = result.data.map((post) => {
    const likeCount = post.likes.length || 0;
    const isLiked = post.likes.some(
      (like) => like.userId === userResult.data.user.id,
    );
    return {
      postId: post.postId,
      title: post.title,
      text: post.text,
      createdAt: post.createdAt,
      commentCount: post.comment.length,
      likeCount,
      isLiked,
      likes: post.likes,
      attachments: post.attachments,
      author: v.parse(
        v.object({
          userId: v.string(),
          name: v.string(),
          avatarUrl: v.string(),
        }),
        post.profile,
      ),
    };
  });

  return {
    data: postsDto,
    pagination: {
      totalPage: result.count ? Math.ceil(result.count / 10) : 1,
      page,
    },
  };
}
