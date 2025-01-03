"use server";

import { fail } from "assert";
import { uuidv7 } from "uuidv7";
import * as v from "valibot";

import { succeed } from "@/lib/result";
import { createAction } from "@/lib/server-action";
import { createClientServiceRole } from "@/lib/supabase/service-role";

export const postNewPostAction = createAction(
  async (params, { user }) => {
    const client = createClientServiceRole().schema("X_DEMO");

    const result = await client.from("post").insert({
      postId: uuidv7(),
      userId: user?.userId,
      title: params.title,
      text: params.text,
      canComment: params.canComment,
      attachments: params.attachments,
    });

    if (result.error) {
      return fail("投稿に失敗しました");
    }
    return succeed();
  },
  {
    inputSchema: v.object({
      title: v.pipe(v.string(), v.minLength(1), v.maxLength(255)),
      text: v.pipe(v.string(), v.minLength(1), v.maxLength(255)),
      canComment: v.boolean(),
      attachments: v.array(
        v.pipe(v.string(), v.minLength(1), v.maxLength(255)),
      ),
    }),
    revalidatePaths: ["/"],
    redirectTo: "/",
  },
);
