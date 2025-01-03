"use server";

import { fail } from "assert";
import * as v from "valibot";

import { succeed } from "@/lib/result";
import { createAction } from "@/lib/server-action";
import { createClientServiceRole } from "@/lib/supabase/service-role";

export const togglePostLikeAction = createAction(
  async (params, { user }) => {
    const client = createClientServiceRole().schema("X_DEMO");

    const deleteResult = await client
      .from("post_like")
      .delete({ count: "exact" })
      .eq("postId", params.postId)
      .eq("userId", user!.userId);
    if (deleteResult.error) {
      return fail("投稿に失敗しました");
    }

    if (deleteResult.count === 0) {
      const result = await client.from("post_like").insert({
        postId: params.postId,
        userId: user!.userId,
      });
      if (result.error) {
        return fail("投稿に失敗しました");
      }
    }

    return succeed();
  },
  {
    inputSchema: v.object({
      postId: v.pipe(v.string()),
    }),
    // revalidatePaths: ["/"],
  },
);
