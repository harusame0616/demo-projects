import { getPrismaClient } from "@/lib/prisma";
import { fail, Result, succeed } from "@/lib/result";
import { createClient } from "@/lib/supabase/server";

import { Role } from "../role";

type EditUserParams = {
  userId: string;
  name: string;
  email: string;
  password: string;
  role: Role;
};
export async function editUser({
  userId,
  name,
  email,
  password,
  role,
}: EditUserParams): Promise<Result<undefined>> {
  const supabase = await createClient();

  const prisma = getPrismaClient();
  try {
    await prisma.$transaction(async (tx) => {
      await tx.cnlUser.update({
        where: { userId },
        data: { name, email, role },
      });
      const result = await supabase.auth.admin.updateUserById(userId, {
        user_metadata: { name, role },
        password: password || undefined,
        email,
        email_confirm: true,
      });

      if (result.error) {
        throw result.error;
      }
    });
  } catch {
    return fail("ユーザーの更新に失敗しました。");
  }

  return succeed();
}
