"use server";

import * as v from "valibot";

import { emailSchema, nameSchema, passwordSchema } from "@/domains/user/schema";
import { idSchema } from "@/lib/id";
import { createAction } from "@/lib/next-file/server-action";

import { roleSchema } from "../role";
import { addUser } from "./add-user";
import { deleteUser } from "./delete-user";
import { editUser } from "./edit-user";

export const addUserAction = createAction(addUser, {
  inputSchema: {
    name: nameSchema,
    email: emailSchema,
    password: passwordSchema,
    role: roleSchema,
    canPost: v.boolean(),
  },
  revalidatePaths: ["/admin/users"],
});

export const editUserAction = createAction(editUser, {
  inputSchema: {
    userId: idSchema,
    name: nameSchema,
    email: emailSchema,
    canPost: v.boolean(),
    password: v.union([passwordSchema, v.pipe(v.string(), v.length(0))]),
    role: roleSchema,
  },
  revalidatePaths: ["/admin/users"],
});

export const deleteUserAction = createAction(deleteUser, {
  inputSchema: { userId: idSchema },
  revalidatePaths: ["/admin/users"],
});
