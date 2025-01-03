"use server";

import { fail } from "assert";
import * as v from "valibot";

import { succeed } from "@/lib/result";
import { createAction } from "@/lib/server-action";
import { createClientServiceRole } from "@/lib/supabase/service-role";

export const deleteCommentAction = createAction(
  async (params) => {
    const client = createClientServiceRole().schema("X_DEMO");

    const result = await client
      .from("comment")
      .delete()
      .eq("commentId", params.commentId);

    if (result.error) {
      return fail("投稿に失敗しました");
    }
    return succeed();
  },
  {
    inputSchema: v.object({
      commentId: v.pipe(v.string()),
    }),
    revalidatePaths: ["/"],
  },
);
