import * as v from "valibot";

export const searchParamsDepartmentQuerySchema = v.object({
	query: v.optional(v.string(), ""),
});

export type DepartmentSearchQuery = v.InferOutput<
	typeof searchParamsDepartmentQuerySchema
>;

export const parseSearchParamsDepartmentSearchQuery = (value: unknown) =>
	v.parse(searchParamsDepartmentQuerySchema, value);
