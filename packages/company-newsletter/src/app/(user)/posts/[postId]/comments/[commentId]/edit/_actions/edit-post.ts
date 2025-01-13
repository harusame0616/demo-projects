"use server";

import { Role } from "@/app/admin/(private)/users/role";
import { commentTextSchema } from "@/lib/comment";
import { idSchema } from "@/lib/id";
import { createAction } from "@/lib/next-file/server-action";
import { attachmentsSchema } from "@/lib/post";
import { getPrismaClient } from "@/lib/prisma";
import { fail, succeed } from "@/lib/result";
import { createClient } from "@/lib/supabase/server";
import { createClientServiceRole } from "@/lib/supabase/service-role";

export const editComment = createAction(
  async (params) => {
    const client = createClientServiceRole();
    const authClient = await createClient();
    const getUserResult = await authClient.auth.getUser();
    if (getUserResult.error) {
      return fail("ログインが必要です");
    }

    const prisma = getPrismaClient();
    try {
      await prisma.$transaction(async (tx) => {
        const comment = await tx.cnlPostComment.findUnique({
          where: { commentId: params.commentId },
        });

        if (!comment) {
          throw new Error("コメントが見つかりませんでした");
        }

        console.log(getUserResult.data.user.user_metadata);
        if (
          comment.userId !== getUserResult.data.user.id &&
          getUserResult.data.user.user_metadata.role !== Role.Admin.value
        ) {
          throw new Error("権限がありません");
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
    } catch (e: unknown) {
      if (e instanceof Error) {
        return fail(e.message);
      }

      return fail("コメントの編集に失敗しました");
    }

    return succeed();
  },
  {
    inputSchema: {
      commentId: idSchema,
      text: commentTextSchema,
      deleteAttachments: attachmentsSchema,
      attachments: attachmentsSchema,
    },
    revalidatePaths: ["/"],
  },
);
