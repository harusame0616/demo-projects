"use server";

import { fail } from "assert";
import * as v from "valibot";

import { succeed } from "@/lib/result";
import { createAction } from "@/lib/next-file/server-action";
import { createClientServiceRole } from "@/lib/supabase/service-role";

export const editPost = createAction(
  async (params) => {
    const client = createClientServiceRole();

    const post = await client
      .schema("X_DEMO")
      .from("post")
      .select("*")
      .eq("postId", params.postId)
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
      .from("post")
      .update({
        title: params.title,
        text: params.text,
        attachments: newAttachments,
        canComment: params.canComment,
      })
      .eq("postId", params.postId);

    if (result.error) {
      return fail("投稿に失敗しました");
    }

    await client.storage.from("attachment").remove(params.deleteAttachments);

    return succeed();
  },
  {
    inputSchema: v.object({
      postId: v.pipe(v.string()),
      title: v.pipe(v.string(), v.minLength(1), v.maxLength(255)),
      text: v.pipe(v.string(), v.minLength(1), v.maxLength(255)),
      canComment: v.boolean(),
      deleteAttachments: v.array(v.string()),
      attachments: v.array(
        v.pipe(v.string(), v.minLength(1), v.maxLength(255)),
      ),
    }),
    revalidatePaths: ["/"],
  },
);
