import * as v from "valibot";
import { OrderDirection } from "../../../lib/order";

export const EmployeeOrderField = {
	Id: "id",
	Name: "name",
	Department: "department",
	Position: "position",
	Email: "email",
	JoinDate: "joinDate",
	BirthDate: "birthDate",
	Phone: "phone",
	Address: "address",
} as const;

export type EmployeeOrderField =
	(typeof EmployeeOrderField)[keyof typeof EmployeeOrderField];

export const searchParamsEmployeeOrderSchema = v.object({
	field: v.union([
		v.enum(EmployeeOrderField),
		v.pipe(
			v.any(),
			v.transform(() => EmployeeOrderField.Id),
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

export type EmployeeOrder = v.InferOutput<
	typeof searchParamsEmployeeOrderSchema
>;

export const parseSearchParamsEmployeeOrder = (value: unknown) =>
	v.parse(searchParamsEmployeeOrderSchema, value);
export { OrderDirection };
