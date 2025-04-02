import * as v from "valibot";
import { OrderDirection } from "../../../lib/order";

export const GradeOrderField = {
	GradeCode: "id",
	GradeName: "name",
	GradeLevel: "level",
} as const;

export type GradeOrderField =
	(typeof GradeOrderField)[keyof typeof GradeOrderField];

export const searchParamsGradeOrderSchema = v.object({
	field: v.union([
		v.enum(GradeOrderField),
		v.pipe(
			v.any(),
			v.transform(() => GradeOrderField.GradeCode),
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

export type GradeOrder = v.InferOutput<typeof searchParamsGradeOrderSchema>;

export const parseSearchParamsGradeOrder = (value: unknown) =>
	v.parse(searchParamsGradeOrderSchema, value);
