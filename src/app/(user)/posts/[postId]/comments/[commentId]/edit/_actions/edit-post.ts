"use server";

import { fail } from "assert";
import * as v from "valibot";

import { createAction } from "@/lib/next-file/server-action";
import { succeed } from "@/lib/result";
import { createClientServiceRole } from "@/lib/supabase/service-role";

export const editComment = createAction(
  async (params) => {
    const client = createClientServiceRole();

    const post = await client
      .schema("X_DEMO")
      .from("comment")
      .select("*")
      .eq("commentId", params.commentId)
      .single();

    if (post.error) {
      throw new Error("error");
    }

    const newAttachments = [
      ...post.data.attachments.filter(
        (attachment: string) => !params.deleteAttachments.includes(attachment),
      ),
      ...params.attachments,
    ];

    const result = await client
      .schema("X_DEMO")
      .from("comment")
      .update({
        text: params.text,
        attachments: newAttachments,
      })
      .eq("commentId", params.commentId);

    if (result.error) {
      return fail("投稿に失敗しました");
    }

    await client.storage.from("attachment").remove(params.deleteAttachments);

    return succeed();
  },
  {
    inputSchema: v.object({
      commentId: v.pipe(v.string()),
      text: v.pipe(v.string(), v.minLength(1), v.maxLength(255)),
      deleteAttachments: v.array(v.string()),
      attachments: v.array(
        v.pipe(v.string(), v.minLength(1), v.maxLength(255)),
      ),
    }),
    revalidatePaths: ["/"],
  },
);
