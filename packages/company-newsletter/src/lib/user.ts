import { headers } from "next/headers";
import { NextResponse } from "next/server";

export function setCanPostHeader(response: NextResponse) {
  response.headers.set("x-can-post", "true");
  return response;
}

export async function canPost() {
  return (await headers()).get("x-can-post") === "true";
}
