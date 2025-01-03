"use server";

import * as v from "valibot";

import { createClient } from "@/lib/supabase/server";
import { createClientServiceRole } from "@/lib/supabase/service-role";

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
  const client = createClientServiceRole().schema("X_DEMO");
  const authClient = await createClient();
  const userResult = await authClient.auth.getUser();

  if (userResult.error) {
    throw new Error("test");
  }

  const result = await client
    .from("comment")
    .select(
      `commentId, postId, attachments, text,  createdAt, userId, profile(*)`,
      {
        count: "exact",
      },
    )
    .order("createdAt", { ascending: false })
    .range((page - 1) * 10, page * 10);
  console.log(result, result.error);

  if (result.error) {
    throw new Error("error");
  }

  const postsDto = result.data.map((comment) => {
    return {
      commentId: comment.commentId,
      postId: comment.postId,
      createdAt: comment.createdAt,
      attachments: comment.attachments,
      author: v.parse(
        v.object({
          userId: v.string(),
          name: v.string(),
          avatarUrl: v.string(),
        }),
        comment.profile,
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
