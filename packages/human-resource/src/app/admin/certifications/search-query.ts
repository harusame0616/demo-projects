import * as v from "valibot";

export const searchParamsCertificationQuerySchema = v.object({
	query: v.optional(v.string(), ""),
});

export type CertificationSearchQuery = v.InferOutput<
	typeof searchParamsCertificationQuerySchema
>;

export const parseSearchParamsCertificationSearchQuery = (value: unknown) =>
	v.parse(searchParamsCertificationQuerySchema, value);
