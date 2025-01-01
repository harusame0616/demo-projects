"use server";

import { fail } from "assert";
import * as v from "valibot";

import { succeed } from "@/lib/result";
import { createAction } from "@/lib/server-action";
import { createClientServiceRole } from "@/lib/supabase/service-role";

export const deletePost = createAction(
  async (params) => {
    const client = createClientServiceRole().schema("X_DEMO");

    console.log({ params });
    const result = await client
      .from("post")
      .delete()
      .eq("postId", params.postId);

    if (result.error) {
      return fail("投稿に失敗しました");
    }
    return succeed();
  },
  {
    inputSchema: v.object({
      postId: v.pipe(v.string()),
    }),
    revalidatePaths: ["/"],
  },
);
