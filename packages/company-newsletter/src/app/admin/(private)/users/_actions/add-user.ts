import { uuidv7 } from "uuidv7";

import { getPrismaClient } from "@/lib/prisma";
import { fail, Result, succeed } from "@/lib/result";
import { createClient } from "@/lib/supabase/server";

import { Role } from "../role";

type AddUserParams = {
  name: string;
  email: string;
  password: string;
  role: Role;
};
export async function addUser({
  name,
  email,
  password,
  role,
}: AddUserParams): Promise<Result<undefined>> {
  const supabase = await createClient();

  const prisma = getPrismaClient();
  try {
    await prisma.$transaction(async (tx) => {
      const user = await tx.cnlUser.create({
        data: {
          userId: uuidv7(),
          email,
          name,
          role,
        },
      });

      const result = await supabase.auth.admin.createUser({
        id: user.userId,
        user_metadata: { name, role },
        password,
        email,
        email_confirm: true,
      });

      if (result.error) {
        throw result.error;
      }
    });
  } catch {
    return fail("ユーザーの作成に失敗しました");
  }

  return succeed();
}
