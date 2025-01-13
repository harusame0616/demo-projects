import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { Role } from "@/app/admin/(private)/users/role";

export function setCanPostHeader(response: NextResponse) {
  response.headers.set("x-can-post", "true");
  return response;
}

export async function canPost() {
  return (await headers()).get("x-can-post") === "true";
}

export async function isRole(role: Role) {
  return (await headers()).get("x-role") === role;
}

export async function setRoleHeader(response: NextResponse, role: Role) {
  response.headers.set("x-role", role);
  return response;
}
