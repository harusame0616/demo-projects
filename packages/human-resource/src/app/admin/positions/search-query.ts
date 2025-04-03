import * as v from "valibot";

export const searchParamsPositionQuerySchema = v.object({
	query: v.optional(v.string(), ""),
	level: v.optional(v.string(), "all"),
});

export type PositionSearchQuery = v.InferOutput<
	typeof searchParamsPositionQuerySchema
>;

export const parseSearchParamsPositionSearchQuery = (value: unknown) =>
	v.parse(searchParamsPositionQuerySchema, value);
