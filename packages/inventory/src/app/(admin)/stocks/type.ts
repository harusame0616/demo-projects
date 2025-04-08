export type Stock = {
	stockId: string;
	name: string;
	janCode: string;
	setCount: number;
	stockHistories: {
		quantity: number;
		fraction: number;
		date: string;
		setCount: number;
		userId: string;
	}[];
};
export const USER_IDS = {
	TANAKA: "00000000-0000-4000-0000-000000000001",
	SUZUKI: "00000000-0000-4000-0000-000000000002",
	SATO: "00000000-0000-4000-0000-000000000003",
	YAMADA: "00000000-0000-4000-0000-000000000004",
	WATANABE: "00000000-0000-4000-0000-000000000005",
} as const;
