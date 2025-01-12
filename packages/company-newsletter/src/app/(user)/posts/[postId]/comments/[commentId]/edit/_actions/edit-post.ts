"use server";

import * as v from "valibot";

import { createAction } from "@/lib/next-file/server-action";
import { getPrismaClient } from "@/lib/prisma";
import { succeed } from "@/lib/result";
import { createClientServiceRole } from "@/lib/supabase/service-role";

export const editComment = createAction(
  async (params) => {
    const client = createClientServiceRole();

    const prisma = getPrismaClient();
    await prisma.$transaction(async (tx) => {
      const comment = await tx.cnlPostComment.findUnique({
        where: { commentId: params.commentId },
      });

      if (!comment) {
        throw new Error("error");
      }

      const newAttachments = [
        ...comment.attachments.filter(
          (attachment: string) =>
            !params.deleteAttachments.includes(attachment),
        ),
        ...params.attachments,
      ];

      await tx.cnlPostComment.update({
        where: { commentId: params.commentId },
        data: {
          text: params.text,
          attachments: newAttachments,
        },
      });

      if (params.deleteAttachments.length) {
        await client.storage
          .from("attachment")
          .remove(params.deleteAttachments);
      }
    });

    return succeed();
  },
  {
    inputSchema: {
      commentId: v.pipe(v.string()),
      text: v.pipe(v.string(), v.minLength(1), v.maxLength(255)),
      deleteAttachments: v.array(v.string()),
      attachments: v.array(
        v.pipe(v.string(), v.minLength(1), v.maxLength(255)),
      ),
    },
    revalidatePaths: ["/"],
  },
);
