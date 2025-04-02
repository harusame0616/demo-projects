import * as v from "valibot";
import { OrderDirection } from "../../../lib/order";

export const CertificationOrderField = {
	CertificationCode: "id",
	CertificationName: "name",
} as const;

export type CertificationOrderField =
	(typeof CertificationOrderField)[keyof typeof CertificationOrderField];

export const searchParamsCertificationOrderSchema = v.object({
	field: v.union([
		v.enum(CertificationOrderField),
		v.pipe(
			v.any(),
			v.transform(() => CertificationOrderField.CertificationCode),
		),
	]),
	direction: v.union([
		v.enum(OrderDirection),
		v.pipe(
			v.any(),
			v.transform(() => OrderDirection.Asc),
		),
	]),
});

export type CertificationOrder = v.InferOutput<
	typeof searchParamsCertificationOrderSchema
>;

export const parseSearchParamsCertificationOrder = (value: unknown) =>
	v.parse(searchParamsCertificationOrderSchema, value);
