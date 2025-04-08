import * as v from "valibot";

export const searchParamsQuerySchema = v.object({
	keyword: v.optional(v.string(), ""),
	notInventoried: v.optional(v.string(), ""),
});

export type SearchQuery = {
	keyword: string;
	notInventoried: string;
};

export const parseSearchParamsSearchQuery = (value: unknown): SearchQuery =>
	v.parse(searchParamsQuerySchema, value);
