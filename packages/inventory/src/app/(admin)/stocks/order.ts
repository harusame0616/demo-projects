import * as v from "valibot";
import { OrderDirection } from "../../../lib/order";

export const StockOrderField = {
	Name: "name",
	JanCode: "janCode",
	SetCount: "setCount",
	Quantity: "quantity",
	LastInventoryDate: "lastInventoryDate",
} as const;

export type StockOrderField =
	(typeof StockOrderField)[keyof typeof StockOrderField];

export const searchParamsStockOrderSchema = v.object({
	field: v.union([
		v.enum(StockOrderField),
		v.pipe(
			v.any(),
			v.transform(() => StockOrderField.Name),
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

export type StockOrder = v.InferOutput<typeof searchParamsStockOrderSchema>;

export const parseSearchParamsStockOrder = (value: unknown) =>
	v.parse(searchParamsStockOrderSchema, value);
