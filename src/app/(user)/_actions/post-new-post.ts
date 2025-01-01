"use server";

import { fail } from "assert";
import { uuidv7 } from "uuidv7";
import * as v from "valibot";

import { succeed } from "@/lib/result";
import { createAction } from "@/lib/server-action";
import { createClient } from "@/lib/supabase/server";

export const postNewPostAction = createAction(
  async (params) => {
    console.log("post new post");
    const client = (await createClient()).schema("X_DEMO");

    const result = await client.from("post").insert({
      postId: uuidv7(),
      title: params.title,
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
      title: v.pipe(v.string(), v.minLength(1), v.maxLength(255)),
      text: v.pipe(v.string(), v.minLength(1), v.maxLength(255)),
      attachments: v.array(
        v.pipe(v.string(), v.minLength(1), v.maxLength(255)),
      ),
    }),
    revalidatePaths: ["/"],
  },
);
