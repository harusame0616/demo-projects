export const OrderDirection = {
	Asc: "asc",
	Desc: "desc",
} as const;
export type OrderDirection =
	(typeof OrderDirection)[keyof typeof OrderDirection];
