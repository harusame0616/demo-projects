import * as v from "valibot";
import { OrderDirection } from "../../../lib/order";

export const UserOrderField = {
	UserCode: "id",
	Email: "email",
	Role: "role",
	Status: "status",
	Name: "name",
	LastLogin: "lastLogin",
	EmployeeId: "employeeId",
} as const;

export type UserOrderField =
	(typeof UserOrderField)[keyof typeof UserOrderField];

export const searchParamsUserOrderSchema = v.object({
	field: v.union([
		v.enum(UserOrderField),
		v.pipe(
			v.any(),
			v.transform(() => UserOrderField.UserCode),
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

export type UserOrder = v.InferOutput<typeof searchParamsUserOrderSchema>;

export const parseSearchParamsUserOrder = (value: unknown) =>
	v.parse(searchParamsUserOrderSchema, value);
