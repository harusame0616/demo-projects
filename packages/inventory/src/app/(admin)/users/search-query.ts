import * as v from "valibot";
import { UserRole } from "./user";

export const searchParamsUserQuerySchema = v.object({
	query: v.optional(v.string(), ""),
	role: v.union([
		v.pipe(v.string(), v.enum(UserRole)),
		v.literal("all"),
		v.pipe(
			v.any(),
			v.transform(() => "all" as const),
		),
	]),
});

export type UserSearchQuery = v.InferOutput<typeof searchParamsUserQuerySchema>;

export const parseSearchParamsUserSearchQuery = (value: unknown) =>
	v.parse(searchParamsUserQuerySchema, value);
