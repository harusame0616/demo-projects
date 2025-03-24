export type Position = {
	id: string;
	name: string;
	level: number;
	description: string;
	memberCount: number;
	createdAt: string;
};

// 役職のモックデータ
export const positionData: Position[] = [
	{
		id: "001",
		name: "社長",
		level: 10,
		description: "会社の最高責任者",
		memberCount: 1,
		createdAt: "2015-04-01",
	},
	{
		id: "002",
		name: "副社長",
		level: 9,
		description: "社長を補佐し、特定の部門や機能の責任者",
		memberCount: 2,
		createdAt: "2015-04-01",
	},
	{
		id: "003",
		name: "本部長",
		level: 8,
		description: "複数の部門を統括する責任者",
		memberCount: 3,
		createdAt: "2016-04-01",
	},
	{
		id: "004",
		name: "部長",
		level: 7,
		description: "部門の責任者",
		memberCount: 8,
		createdAt: "2016-04-01",
	},
	{
		id: "005",
		name: "次長",
		level: 6,
		description: "部長を補佐し、部門運営を支援",
		memberCount: 10,
		createdAt: "2017-04-01",
	},
	{
		id: "006",
		name: "課長",
		level: 5,
		description: "課の責任者",
		memberCount: 15,
		createdAt: "2018-04-01",
	},
	{
		id: "007",
		name: "係長",
		level: 4,
		description: "課長を補佐し、特定業務を統括",
		memberCount: 20,
		createdAt: "2019-04-01",
	},
	{
		id: "008",
		name: "主任",
		level: 3,
		description: "チームのリーダー的役割",
		memberCount: 25,
		createdAt: "2020-04-01",
	},
	{
		id: "009",
		name: "一般社員",
		level: 2,
		description: "通常業務の遂行",
		memberCount: 100,
		createdAt: "2015-04-01",
	},
	{
		id: "010",
		name: "新入社員",
		level: 1,
		description: "入社1年未満の社員",
		memberCount: 20,
		createdAt: "2023-04-01",
	},
];
