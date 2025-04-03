import * as v from "valibot";
import { OrderDirection } from "../../../lib/order";

export const DepartmentOrderField = {
	DepartmentCode: "id",
	DepartmentName: "name",
} as const;

export type DepartmentOrderField =
	(typeof DepartmentOrderField)[keyof typeof DepartmentOrderField];

export const searchParamsDepartmentOrderSchema = v.object({
	field: v.union([
		v.enum(DepartmentOrderField),
		v.pipe(
			v.any(),
			v.transform(() => DepartmentOrderField.DepartmentCode),
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

export type DepartmentOrder = v.InferOutput<
	typeof searchParamsDepartmentOrderSchema
>;

export const parseSearchParamsDepartmentOrder = (value: unknown) =>
	v.parse(searchParamsDepartmentOrderSchema, value);
