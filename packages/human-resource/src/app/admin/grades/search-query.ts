import * as v from "valibot";

export const searchParamsGradeQuerySchema = v.object({
	query: v.optional(v.string(), ""),
});

export type GradeSearchQuery = v.InferOutput<
	typeof searchParamsGradeQuerySchema
>;

export const parseSearchParamsGradeSearchQuery = (value: unknown) =>
	v.parse(searchParamsGradeQuerySchema, value);
