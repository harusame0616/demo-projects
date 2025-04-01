import { ApplicationStatus, ApplicationType } from "./application";
import * as v from "valibot";

export const searchParamsQuerySchema = v.object({
	query: v.optional(v.string(), ""),
	type: v.union([
		v.pipe(v.string(), v.enum(ApplicationType)),
		v.literal("all"),
		v.pipe(
			v.any(),
			v.transform(() => "all" as const),
		),
	]),
	status: v.union([
		v.pipe(v.string(), v.enum(ApplicationStatus)),
		v.literal("all"),
		v.pipe(
			v.any(),
			v.transform(() => "all" as const),
		),
	]),
	date: v.optional(v.string(), ""),
});

export type SearchQuery = v.InferOutput<typeof searchParamsQuerySchema>;

export const parseSearchParamsSearchQuery = (value: unknown) =>
	v.parse(searchParamsQuerySchema, value);
