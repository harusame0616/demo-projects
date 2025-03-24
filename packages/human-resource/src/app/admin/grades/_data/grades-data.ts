export type Grade = {
	id: string;
	name: string;
	level: number;
	description: string;
	salaryRange: {
		min: number;
		max: number;
	};
	employeeCount: number;
	createdAt: string;
};

// グレードのモックデータ
export const gradeData: Grade[] = [
	{
		id: "001",
		name: "シニアマネージャー",
		level: 5,
		description: "部門の責任者として全体戦略の策定と実行を主導する",
		salaryRange: {
			min: 950000,
			max: 1300000,
		},
		employeeCount: 3,
		createdAt: "2015-04-01",
	},
	{
		id: "002",
		name: "マネージャー",
		level: 4,
		description: "チームの管理と育成を担当し、プロジェクト全体を監督する",
		salaryRange: {
			min: 750000,
			max: 1000000,
		},
		employeeCount: 8,
		createdAt: "2015-04-01",
	},
	{
		id: "003",
		name: "シニアスペシャリスト",
		level: 3,
		description: "高度な専門性を持ち、技術的な指導と難易度の高い業務を担当する",
		salaryRange: {
			min: 600000,
			max: 800000,
		},
		employeeCount: 12,
		createdAt: "2016-04-01",
	},
	{
		id: "004",
		name: "スペシャリスト",
		level: 2,
		description: "専門的な業務を自立して遂行し、チームに貢献する",
		salaryRange: {
			min: 450000,
			max: 650000,
		},
		employeeCount: 25,
		createdAt: "2017-04-01",
	},
	{
		id: "005",
		name: "ジュニアスペシャリスト",
		level: 1,
		description: "基本的な業務スキルを身につけ、サポート業務を担当する",
		salaryRange: {
			min: 350000,
			max: 500000,
		},
		employeeCount: 15,
		createdAt: "2018-04-01",
	},
	{
		id: "006",
		name: "エントリー",
		level: 0,
		description: "入社後研修を受け、基本スキルを習得する段階",
		salaryRange: {
			min: 300000,
			max: 380000,
		},
		employeeCount: 7,
		createdAt: "2019-04-01",
	},
];

// モック従業員データにグレードIDを追加
export type EmployeeWithGrade = {
	id: string;
	name: string;
	position: string;
	departmentId: string;
	gradeId: string;
	email: string;
	joinDate: string;
};

export const employeeGradeData: EmployeeWithGrade[] = [
	{
		id: "001",
		name: "山田 太郎",
		position: "課長",
		departmentId: "001",
		gradeId: "002",
		email: "yamada.taro@example.com",
		joinDate: "2018-04-01",
	},
	{
		id: "002",
		name: "佐藤 花子",
		position: "主任",
		departmentId: "002",
		gradeId: "003",
		email: "sato.hanako@example.com",
		joinDate: "2019-04-01",
	},
	{
		id: "003",
		name: "鈴木 一郎",
		position: "部長",
		departmentId: "003",
		gradeId: "001",
		email: "suzuki.ichiro@example.com",
		joinDate: "2015-04-01",
	},
	{
		id: "004",
		name: "田中 美咲",
		position: "担当",
		departmentId: "004",
		gradeId: "004",
		email: "tanaka.misaki@example.com",
		joinDate: "2021-04-01",
	},
	{
		id: "005",
		name: "伊藤 健太",
		position: "主任",
		departmentId: "005",
		gradeId: "003",
		email: "ito.kenta@example.com",
		joinDate: "2020-04-01",
	},
	{
		id: "006",
		name: "中村 真由美",
		position: "リーダー",
		departmentId: "006",
		gradeId: "003",
		email: "nakamura.mayumi@example.com",
		joinDate: "2017-04-01",
	},
	{
		id: "007",
		name: "小林 大輔",
		position: "担当",
		departmentId: "007",
		gradeId: "005",
		email: "kobayashi.daisuke@example.com",
		joinDate: "2022-04-01",
	},
	{
		id: "008",
		name: "加藤 健一",
		position: "部長",
		departmentId: "008",
		gradeId: "001",
		email: "kato.kenichi@example.com",
		joinDate: "2010-04-01",
	},
	{
		id: "009",
		name: "高橋 優子",
		position: "担当",
		departmentId: "008",
		gradeId: "004",
		email: "takahashi.yuko@example.com",
		joinDate: "2020-04-01",
	},
	{
		id: "010",
		name: "吉田 直樹",
		position: "リーダー",
		departmentId: "009",
		gradeId: "002",
		email: "yoshida.naoki@example.com",
		joinDate: "2019-04-01",
	},
];
