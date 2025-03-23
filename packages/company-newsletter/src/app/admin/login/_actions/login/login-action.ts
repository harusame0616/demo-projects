"use server";

import { emailSchema, passwordSchema } from "@/domains/user/schema";
import { createAction } from "@/lib/next-file/server-action";

import { login } from "./login";

export const loginAction = createAction(login, {
	inputSchema: { email: emailSchema, password: passwordSchema },
	redirectTo: "/admin",
});
