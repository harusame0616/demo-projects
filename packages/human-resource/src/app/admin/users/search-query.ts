import * as v from "valibot";

export const searchParamsUserQuerySchema = v.object({
	query: v.optional(v.string(), ""),
	role: v.union([
		v.string(),
		v.literal("all"),
		v.pipe(
			v.any(),
			v.transform(() => "all" as const),
		),
	]),
	status: v.union([
		v.string(),
		v.literal("all"),
		v.pipe(
			v.any(),
			v.transform(() => "all" as const),
		),
	]),
	sortBy: v.optional(v.string(), "id"),
	sortOrder: v.optional(v.union([v.literal("asc"), v.literal("desc")]), "asc"),
	page: v.optional(v.string(), "1"),
});

export type UserSearchQuery = v.InferOutput<typeof searchParamsUserQuerySchema>;

export const parseSearchParamsUserSearchQuery = (value: unknown) =>
	v.parse(searchParamsUserQuerySchema, value);
