"use server";

import * as v from "valibot";

import { createAction } from "@/lib/next-file/server-action";
import { getPrismaClient } from "@/lib/prisma";
import { succeed } from "@/lib/result";
import { createClientServiceRole } from "@/lib/supabase/service-role";

export const editPost = createAction(
  async (params) => {
    const client = createClientServiceRole();

    const prisma = getPrismaClient();
    await prisma.$transaction(async (tx) => {
      const post = await tx.cnlPost.findUnique({
        where: { postId: params.postId },
      });

      if (!post) {
        throw new Error("error");
      }

      const newAttachments = [
        ...post.attachments.filter(
          (attachment: string) =>
            !params.deleteAttachments.includes(attachment),
        ),
        ...params.attachments,
      ];

      await tx.cnlPost.update({
        where: { postId: params.postId },
        data: {
          title: params.title,
          text: params.text,
          attachments: newAttachments,
          canComment: params.canComment,
        },
      });

      if (params.deleteAttachments.length) {
        const removeResult = await client.storage
          .from("attachment")
          .remove(params.deleteAttachments);
        if (removeResult.error) {
          console.log(removeResult.error);
          throw new Error("error");
        }
      }
    });

    return succeed();
  },
  {
    inputSchema: {
      postId: v.pipe(v.string()),
      title: v.pipe(v.string(), v.minLength(1), v.maxLength(255)),
      text: v.pipe(v.string(), v.minLength(1), v.maxLength(255)),
      canComment: v.boolean(),
      deleteAttachments: v.array(v.string()),
      attachments: v.array(
        v.pipe(v.string(), v.minLength(1), v.maxLength(255)),
      ),
    },
    revalidatePaths: ["/"],
  },
);
