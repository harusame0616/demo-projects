import * as v from "valibot";

export const SearchParamsPaginationSchema = v.object({
	page: v.union([
		v.pipe(
			v.pipe(v.string(), v.transform(Number), v.number()),
			v.number(),
			v.transform((value) => value || 1),
		),
		v.pipe(
			v.any(),
			v.transform(() => 1),
		),
	]),
});

export function parseSearchParamsPagination(value: unknown) {
	return v.parse(SearchParamsPaginationSchema, value);
}

export type Pagination = v.InferOutput<typeof SearchParamsPaginationSchema>;

export const PaginationItemCount = 20;
