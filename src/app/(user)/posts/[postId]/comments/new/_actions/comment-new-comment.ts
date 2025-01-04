"use server";

import { fail } from "assert";
import { uuidv7 } from "uuidv7";
import * as v from "valibot";

import { succeed } from "@/lib/result";
import { createAction } from "@/lib/next-file/server-action";
import { createClientServiceRole } from "@/lib/supabase/service-role";

export const commentNewComment = createAction(
  async (params, { user }) => {
    const client = createClientServiceRole().schema("X_DEMO");

    console.log({ params });
    const result = await client.from("comment").insert({
      commentId: uuidv7(),
      postId: params.postId,
      userId: user?.userId,
      text: params.text,
      attachments: params.attachments,
    });

    if (result.error) {
      return fail("投稿に失敗しました");
    }
    return succeed();
  },
  {
    inputSchema: v.object({
      postId: v.pipe(v.string()),
      text: v.pipe(v.string(), v.minLength(1), v.maxLength(255)),
      attachments: v.array(
        v.pipe(v.string(), v.minLength(1), v.maxLength(255)),
      ),
    }),
    revalidatePaths: ["/posts/[postId]/comments"],
    redirectTo: (params) => `/posts/${params.postId}/comments`,
  },
);
