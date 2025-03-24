"use server";

export type Employee = {
	id: string;
	name: string;
	department: string;
	position: string;
	email: string;
	joinDate: string;
};

// モックデータ
const mockEmployees: Employee[] = [
	{
		id: "001",
		name: "山田 太郎",
		department: "営業部",
		position: "課長",
		email: "yamada.taro@example.com",
		joinDate: "2018-04-01",
	},
	{
		id: "002",
		name: "佐藤 花子",
		department: "人事部",
		position: "主任",
		email: "sato.hanako@example.com",
		joinDate: "2019-04-01",
	},
	{
		id: "003",
		name: "鈴木 一郎",
		department: "開発部",
		position: "部長",
		email: "suzuki.ichiro@example.com",
		joinDate: "2015-04-01",
	},
	{
		id: "004",
		name: "田中 美咲",
		department: "マーケティング部",
		position: "担当",
		email: "tanaka.misaki@example.com",
		joinDate: "2021-04-01",
	},
	{
		id: "005",
		name: "伊藤 健太",
		department: "財務部",
		position: "主任",
		email: "ito.kenta@example.com",
		joinDate: "2020-04-01",
	},
	{
		id: "006",
		name: "中村 真由美",
		department: "開発部",
		position: "リーダー",
		email: "nakamura.mayumi@example.com",
		joinDate: "2017-04-01",
	},
	{
		id: "007",
		name: "小林 大輔",
		department: "営業部",
		position: "担当",
		email: "kobayashi.daisuke@example.com",
		joinDate: "2022-04-01",
	},
	{
		id: "008",
		name: "加藤 健一",
		department: "財務部",
		position: "部長",
		email: "kato.kenichi@example.com",
		joinDate: "2010-04-01",
	},
];

// 部署一覧を取得
export async function getDepartments() {
	return [
		{ value: "all", label: "すべての部署" },
		{ value: "営業部", label: "営業部" },
		{ value: "人事部", label: "人事部" },
		{ value: "開発部", label: "開発部" },
		{ value: "マーケティング部", label: "マーケティング部" },
		{ value: "財務部", label: "財務部" },
	];
}

// 役職一覧を取得
export async function getPositions() {
	return [
		{ value: "all", label: "すべての役職" },
		{ value: "部長", label: "部長" },
		{ value: "課長", label: "課長" },
		{ value: "リーダー", label: "リーダー" },
		{ value: "主任", label: "主任" },
		{ value: "担当", label: "担当" },
	];
}

// 従業員一覧を取得（検索条件やソート条件を適用）
export async function getEmployees(params: {
	searchQuery?: string;
	department?: string;
	position?: string;
	sortBy?: string;
	sortOrder?: "asc" | "desc";
}) {
	let filteredEmployees = [...mockEmployees];

	// 検索条件の適用
	if (params.searchQuery) {
		const query = params.searchQuery.toLowerCase();
		filteredEmployees = filteredEmployees.filter(
			(employee) =>
				employee.name.toLowerCase().includes(query) ||
				employee.email.toLowerCase().includes(query) ||
				employee.id.toLowerCase().includes(query),
		);
	}

	// 部署フィルタの適用
	if (params.department && params.department !== "all") {
		filteredEmployees = filteredEmployees.filter(
			(employee) => employee.department === params.department,
		);
	}

	// 役職フィルタの適用
	if (params.position && params.position !== "all") {
		filteredEmployees = filteredEmployees.filter(
			(employee) => employee.position === params.position,
		);
	}

	// ソート条件の適用
	if (params.sortBy) {
		const sortBy = params.sortBy as keyof Employee;
		const sortOrder = params.sortOrder || "asc";

		filteredEmployees.sort((a, b) => {
			if (a[sortBy] < b[sortBy]) return sortOrder === "asc" ? -1 : 1;
			if (a[sortBy] > b[sortBy]) return sortOrder === "asc" ? 1 : -1;
			return 0;
		});
	}

	return filteredEmployees;
}

// 従業員を一件取得
export async function getEmployeeById(id: string) {
	return mockEmployees.find((employee) => employee.id === id) || null;
}
