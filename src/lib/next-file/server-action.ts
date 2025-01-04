import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import * as v from "valibot";

import { User } from "@/app/admin/(private)/users/_data/user";

import { fail, Failure, Result } from "../result";
import { createClient } from "../supabase/server";

export function createAction<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  InputSchema extends v.BaseSchema<any, any, any>,
  Handler extends (
    inputs: v.InferInput<InputSchema>,
    context: {
      user: null | User;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ) => Promise<Result<any>>,
>(
  handler: Handler,
  {
    inputSchema,
    revalidatePaths,
    redirectTo,
  }: {
    inputSchema: InputSchema;
    revalidatePaths?: string[];
    redirectTo?: string | ((params: v.InferOutput<InputSchema>) => string);
  },
) {
  return async function action(
    input: v.InferOutput<InputSchema>,
  ): Promise<Awaited<ReturnType<Handler>> | Failure> {
    const parsedParams = v.safeParse(inputSchema, input);
    if (!parsedParams.success) {
      const errors = v.flatten<InputSchema>(parsedParams.issues).nested || {};

      return fail(Object.values<string>(errors)[0]);
    }
    const client = await createClient();
    const getUserResult = await client.auth.getUser();

    const user: User | null = getUserResult.error
      ? null
      : {
          userId: getUserResult.data.user.id,
          email: getUserResult.data.user.email!,
          name: getUserResult.data.user.user_metadata.name,
          role: getUserResult.data.user.user_metadata.role,
        };

    const result = (await handler(parsedParams.output, {
      user,
    })) as Awaited<ReturnType<Handler>>;

    if (result.success && revalidatePaths?.length) {
      revalidatePaths.forEach((path) => {
        revalidatePath(path);
      });
    }

    if (result.success && redirectTo) {
      if (typeof redirectTo === "string") {
        redirect(redirectTo);
      } else {
        redirect(redirectTo(parsedParams.output));
      }
    }

    return result;
  };
}
