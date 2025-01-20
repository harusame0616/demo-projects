"use server";

import * as v from "valibot";

import { emailSchema, nameSchema, passwordSchema } from "@/domains/user/schema";
import { idSchema } from "@/lib/id";
import { createAction } from "@/lib/next-file/server-action";
import { fail } from "@/lib/result";

import { roleSchema } from "../role";
// import { addUser } from "./add-user";
// import { deleteUser } from "./delete-user";
// import { editUser } from "./edit-user";

// export const addUserAction = createAction(addUser, {
export const addUserAction = createAction(
  async () => fail("デモ環境ではユーザーを追加できません"),
  {
    inputSchema: {
      name: nameSchema,
      email: emailSchema,
      password: passwordSchema,
      role: roleSchema,
      canPost: v.boolean(),
    },
    revalidatePaths: ["/admin/users"],
  },
);

// export const editUserAction = createAction(editUser, {
export const editUserAction = createAction(
  async () => fail("デモ環境ではユーザーを編集できません"),
  {
    inputSchema: {
      userId: idSchema,
      name: nameSchema,
      email: emailSchema,
      canPost: v.boolean(),
      password: v.union([passwordSchema, v.pipe(v.string(), v.length(0))]),
      role: roleSchema,
    },
    revalidatePaths: ["/admin/users"],
  },
);

// export const deleteUserAction = createAction(deleteUser, {
export const deleteUserAction = createAction(
  async () => fail("デモ環境ではユーザーを削除できません"),
  {
    inputSchema: { userId: idSchema },
    revalidatePaths: ["/admin/users"],
  },
);
