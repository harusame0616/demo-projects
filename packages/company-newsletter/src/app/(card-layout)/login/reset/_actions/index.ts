"use server";

import { emailSchema } from "@/domains/user/schema";
import { createAction } from "@/lib/next-file/server-action";

import { reset } from "./reset";

export const resetAction = createAction(reset, {
	inputSchema: { email: emailSchema },
	redirectTo: "/login/reset/message",
});
