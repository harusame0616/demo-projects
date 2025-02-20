import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import * as v from "valibot";

import { User } from "@/app/admin/(private)/users/_data/user";

import { fail, Failure, Result } from "../result";
import { createClient } from "../supabase/server";

type Schema = v.ObjectEntries;

type InferSchema<S extends Schema> = v.InferOutput<
  v.ObjectSchema<S, undefined>
>;

export function createAction<
  InputSchema extends Schema,
  Handler extends (
    inputs: InferSchema<InputSchema>,
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
    redirectTo?: string | ((params: InferSchema<InputSchema>) => string);
  },
) {
  return async function action(
    input: InferSchema<InputSchema>,
  ): Promise<Awaited<ReturnType<Handler>> | Failure> {
    const parsedParams = v.safeParse(v.object(inputSchema), input);
    if (!parsedParams.success) {
      const errors =
        v.flatten<v.ObjectSchema<InputSchema, undefined>>(parsedParams.issues)
          .nested || {};
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
          canPost: getUserResult.data.user.user_metadata.canPost,
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
