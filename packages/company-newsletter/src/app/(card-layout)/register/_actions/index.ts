"use server";

import { emailSchema } from "@/domains/user/schema";
import { createAction } from "@/lib/next-file/server-action";

import { invite } from "./invite";

export const invitationAction = createAction(invite, {
  inputSchema: { email: emailSchema },
  redirectTo: "/register/message",
});
