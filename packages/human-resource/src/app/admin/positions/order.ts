import * as v from "valibot";
import { OrderDirection } from "../../../lib/order";

export const PositionOrderField = {
	PositionCode: "id",
	PositionName: "name",
	PositionLevel: "level",
} as const;

export type PositionOrderField =
	(typeof PositionOrderField)[keyof typeof PositionOrderField];

export const searchParamsPositionOrderSchema = v.object({
	field: v.union([
		v.enum(PositionOrderField),
		v.pipe(
			v.any(),
			v.transform(() => PositionOrderField.PositionCode),
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

export type PositionOrder = v.InferOutput<
	typeof searchParamsPositionOrderSchema
>;

export const parseSearchParamsPositionOrder = (value: unknown) =>
	v.parse(searchParamsPositionOrderSchema, value);
