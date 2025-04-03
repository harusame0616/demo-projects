import * as v from "valibot";

export const searchParamsSkillQuerySchema = v.object({
	query: v.optional(v.string(), ""),
});

export type SkillSearchQuery = v.InferOutput<
	typeof searchParamsSkillQuerySchema
>;

export const parseSearchParamsSkillSearchQuery = (value: unknown) =>
	v.parse(searchParamsSkillQuerySchema, value);
