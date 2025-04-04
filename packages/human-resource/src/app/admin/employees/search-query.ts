import * as v from "valibot";

export const searchParamsEmployeeQuerySchema = v.object({
	query: v.optional(v.string(), ""),
	department: v.optional(v.string(), "all"),
	position: v.optional(v.string(), "all"),
});

export type EmployeeSearchQuery = v.InferOutput<
	typeof searchParamsEmployeeQuerySchema
>;

export const parseSearchParamsEmployeeSearchQuery = (value: unknown) =>
	v.parse(searchParamsEmployeeQuerySchema, value);
