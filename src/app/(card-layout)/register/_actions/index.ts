"use server";

import * as v from "valibot";

import { createAction } from "@/lib/next-file/server-action";

import { invite } from "./invite";

export const invitationAction = createAction(invite, {
  inputSchema: { email: v.string() },
  redirectTo: "/register/message",
});
