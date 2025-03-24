export type Department = {
	id: string;
	name: string;
	parentId: string | null;
	level: number;
	memberCount: number;
	createdAt: string;
};

// 部署のモックデータ
export const departmentData: Department[] = [
	{
		id: "001",
		name: "営業部",
		parentId: null,
		level: 0,
		memberCount: 12,
		createdAt: "2015-04-01",
	},
	{
		id: "002",
		name: "人事部",
		parentId: null,
		level: 0,
		memberCount: 8,
		createdAt: "2015-04-01",
	},
	{
		id: "003",
		name: "開発部",
		parentId: null,
		level: 0,
		memberCount: 25,
		createdAt: "2015-04-01",
	},
	{
		id: "004",
		name: "マーケティング部",
		parentId: null,
		level: 0,
		memberCount: 10,
		createdAt: "2018-04-01",
	},
	{
		id: "005",
		name: "財務部",
		parentId: null,
		level: 0,
		memberCount: 7,
		createdAt: "2015-04-01",
	},
	{
		id: "006",
		name: "第一営業課",
		parentId: "001",
		level: 1,
		memberCount: 6,
		createdAt: "2017-04-01",
	},
	{
		id: "007",
		name: "第二営業課",
		parentId: "001",
		level: 1,
		memberCount: 6,
		createdAt: "2019-04-01",
	},
	{
		id: "008",
		name: "Web開発課",
		parentId: "003",
		level: 1,
		memberCount: 12,
		createdAt: "2018-04-01",
	},
	{
		id: "009",
		name: "モバイル開発課",
		parentId: "003",
		level: 1,
		memberCount: 8,
		createdAt: "2020-04-01",
	},
	{
		id: "010",
		name: "インフラ課",
		parentId: "003",
		level: 1,
		memberCount: 5,
		createdAt: "2019-04-01",
	},
];

// モック従業員データ
export type Employee = {
	id: string;
	name: string;
	position: string;
	departmentId: string;
	email: string;
	joinDate: string;
};

export const employeeData: Employee[] = [
	{
		id: "001",
		name: "山田 太郎",
		position: "課長",
		departmentId: "001",
		email: "yamada.taro@example.com",
		joinDate: "2018-04-01",
	},
	{
		id: "002",
		name: "佐藤 花子",
		position: "主任",
		departmentId: "002",
		email: "sato.hanako@example.com",
		joinDate: "2019-04-01",
	},
	{
		id: "003",
		name: "鈴木 一郎",
		position: "部長",
		departmentId: "003",
		email: "suzuki.ichiro@example.com",
		joinDate: "2015-04-01",
	},
	{
		id: "004",
		name: "田中 美咲",
		position: "担当",
		departmentId: "004",
		email: "tanaka.misaki@example.com",
		joinDate: "2021-04-01",
	},
	{
		id: "005",
		name: "伊藤 健太",
		position: "主任",
		departmentId: "005",
		email: "ito.kenta@example.com",
		joinDate: "2020-04-01",
	},
	{
		id: "006",
		name: "中村 真由美",
		position: "リーダー",
		departmentId: "006",
		email: "nakamura.mayumi@example.com",
		joinDate: "2017-04-01",
	},
	{
		id: "007",
		name: "小林 大輔",
		position: "担当",
		departmentId: "007",
		email: "kobayashi.daisuke@example.com",
		joinDate: "2022-04-01",
	},
	{
		id: "008",
		name: "加藤 健一",
		position: "部長",
		departmentId: "008",
		email: "kato.kenichi@example.com",
		joinDate: "2010-04-01",
	},
	{
		id: "009",
		name: "高橋 優子",
		position: "担当",
		departmentId: "008",
		email: "takahashi.yuko@example.com",
		joinDate: "2020-04-01",
	},
	{
		id: "010",
		name: "吉田 直樹",
		position: "リーダー",
		departmentId: "009",
		email: "yoshida.naoki@example.com",
		joinDate: "2019-04-01",
	},
	{
		id: "011",
		name: "松本 誠",
		position: "担当",
		departmentId: "010",
		email: "matsumoto.makoto@example.com",
		joinDate: "2021-04-01",
	},
	{
		id: "012",
		name: "井上 千夏",
		position: "担当",
		departmentId: "003",
		email: "inoue.chinatsu@example.com",
		joinDate: "2022-04-01",
	},
];
