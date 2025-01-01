"use server";

import * as v from "valibot";

import { succeed } from "@/lib/result";
import { createAction } from "@/lib/server-action";

export const postNewPostAction = createAction(
  async (params) => {
    console.log({ params });
    return succeed();
  },
  {
    inputSchema: v.object({
      title: v.pipe(v.string(), v.minLength(1), v.maxLength(255)),
      text: v.pipe(v.string(), v.minLength(1), v.maxLength(255)),
      attachments: v.array(
        v.pipe(v.string(), v.minLength(1), v.maxLength(255)),
      ),
    }),
    revalidatePaths: ["/"],
  },
);
