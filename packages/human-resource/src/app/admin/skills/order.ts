import * as v from "valibot";
import { OrderDirection } from "@/lib/order";

export const SkillOrderField = {
	SkillCode: "code",
	SkillName: "name",
	SkillLevel: "level",
} as const;

export type SkillOrderField =
	(typeof SkillOrderField)[keyof typeof SkillOrderField];

export const searchParamsSkillOrderSchema = v.object({
	field: v.union([
		v.enum(SkillOrderField),
		v.pipe(
			v.any(),
			v.transform(() => SkillOrderField.SkillCode),
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

export type SkillOrder = v.InferOutput<typeof searchParamsSkillOrderSchema>;

export const parseSearchParamsSkillOrder = (value: unknown) =>
	v.parse(searchParamsSkillOrderSchema, value);
