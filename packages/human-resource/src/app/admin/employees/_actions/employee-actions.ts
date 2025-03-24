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
	{
		id: "009",
		name: "渡辺 直人",
		department: "開発部",
		position: "担当",
		email: "watanabe.naoto@example.com",
		joinDate: "2022-04-01",
	},
	{
		id: "010",
		name: "高橋 恵",
		department: "マーケティング部",
		position: "リーダー",
		email: "takahashi.megumi@example.com",
		joinDate: "2018-04-01",
	},
	{
		id: "011",
		name: "吉田 隆",
		department: "営業部",
		position: "主任",
		email: "yoshida.takashi@example.com",
		joinDate: "2019-04-01",
	},
	{
		id: "012",
		name: "松本 さくら",
		department: "人事部",
		position: "部長",
		email: "matsumoto.sakura@example.com",
		joinDate: "2014-04-01",
	},
	{
		id: "013",
		name: "木村 拓也",
		department: "開発部",
		position: "課長",
		email: "kimura.takuya@example.com",
		joinDate: "2016-04-01",
	},
	{
		id: "014",
		name: "斎藤 雅子",
		department: "財務部",
		position: "担当",
		email: "saito.masako@example.com",
		joinDate: "2021-04-01",
	},
	{
		id: "015",
		name: "清水 俊介",
		department: "マーケティング部",
		position: "主任",
		email: "shimizu.shunsuke@example.com",
		joinDate: "2020-04-01",
	},
	{
		id: "016",
		name: "山口 明美",
		department: "営業部",
		position: "リーダー",
		email: "yamaguchi.akemi@example.com",
		joinDate: "2017-04-01",
	},
	{
		id: "017",
		name: "岡田 浩二",
		department: "人事部",
		position: "担当",
		email: "okada.koji@example.com",
		joinDate: "2022-04-01",
	},
	{
		id: "018",
		name: "後藤 麻衣",
		department: "開発部",
		position: "担当",
		email: "goto.mai@example.com",
		joinDate: "2023-04-01",
	},
	{
		id: "019",
		name: "三浦 達也",
		department: "財務部",
		position: "リーダー",
		email: "miura.tatsuya@example.com",
		joinDate: "2019-04-01",
	},
	{
		id: "020",
		name: "藤田 由美",
		department: "マーケティング部",
		position: "課長",
		email: "fujita.yumi@example.com",
		joinDate: "2016-04-01",
	},
	{
		id: "021",
		name: "石川 翔太",
		department: "開発部",
		position: "担当",
		email: "ishikawa.shota@example.com",
		joinDate: "2022-04-01",
	},
	{
		id: "022",
		name: "橋本 恵理",
		department: "人事部",
		position: "リーダー",
		email: "hashimoto.eri@example.com",
		joinDate: "2018-04-01",
	},
	{
		id: "023",
		name: "村上 博司",
		department: "営業部",
		position: "部長",
		email: "murakami.hiroshi@example.com",
		joinDate: "2013-04-01",
	},
	{
		id: "024",
		name: "長谷川 涼子",
		department: "マーケティング部",
		position: "担当",
		email: "hasegawa.ryoko@example.com",
		joinDate: "2021-04-01",
	},
	{
		id: "025",
		name: "大野 雄太",
		department: "財務部",
		position: "課長",
		email: "ono.yuta@example.com",
		joinDate: "2017-04-01",
	},
	{
		id: "026",
		name: "西村 美穂",
		department: "開発部",
		position: "主任",
		email: "nishimura.miho@example.com",
		joinDate: "2019-04-01",
	},
	{
		id: "027",
		name: "菊池 正樹",
		department: "営業部",
		position: "担当",
		email: "kikuchi.masaki@example.com",
		joinDate: "2023-04-01",
	},
	{
		id: "028",
		name: "坂本 梨花",
		department: "マーケティング部",
		position: "部長",
		email: "sakamoto.rika@example.com",
		joinDate: "2012-04-01",
	},
	{
		id: "029",
		name: "前田 健二",
		department: "人事部",
		position: "課長",
		email: "maeda.kenji@example.com",
		joinDate: "2015-04-01",
	},
	{
		id: "030",
		name: "遠藤 さやか",
		department: "財務部",
		position: "担当",
		email: "endo.sayaka@example.com",
		joinDate: "2022-04-01",
	},
	{
		id: "031",
		name: "原田 隆之",
		department: "開発部",
		position: "リーダー",
		email: "harada.takayuki@example.com",
		joinDate: "2016-04-01",
	},
	{
		id: "032",
		name: "松田 優子",
		department: "営業部",
		position: "主任",
		email: "matsuda.yuko@example.com",
		joinDate: "2020-04-01",
	},
	{
		id: "033",
		name: "杉山 勇太",
		department: "マーケティング部",
		position: "担当",
		email: "sugiyama.yuta@example.com",
		joinDate: "2021-04-01",
	},
	{
		id: "034",
		name: "井上 千尋",
		department: "財務部",
		position: "主任",
		email: "inoue.chihiro@example.com",
		joinDate: "2019-04-01",
	},
	{
		id: "035",
		name: "山本 大地",
		department: "開発部",
		position: "課長",
		email: "yamamoto.daichi@example.com",
		joinDate: "2017-04-01",
	},
	{
		id: "036",
		name: "中島 綾",
		department: "人事部",
		position: "担当",
		email: "nakajima.aya@example.com",
		joinDate: "2023-04-01",
	},
	{
		id: "037",
		name: "阿部 隆司",
		department: "営業部",
		position: "リーダー",
		email: "abe.takashi@example.com",
		joinDate: "2018-04-01",
	},
	{
		id: "038",
		name: "野口 真理",
		department: "マーケティング部",
		position: "主任",
		email: "noguchi.mari@example.com",
		joinDate: "2020-04-01",
	},
	{
		id: "039",
		name: "竹内 俊介",
		department: "財務部",
		position: "部長",
		email: "takeuchi.shunsuke@example.com",
		joinDate: "2014-04-01",
	},
	{
		id: "040",
		name: "市川 春香",
		department: "開発部",
		position: "担当",
		email: "ichikawa.haruka@example.com",
		joinDate: "2022-04-01",
	},
	{
		id: "041",
		name: "近藤 雄介",
		department: "営業部",
		position: "担当",
		email: "kondo.yusuke@example.com",
		joinDate: "2023-04-01",
	},
	{
		id: "042",
		name: "宮崎 絵美",
		department: "人事部",
		position: "主任",
		email: "miyazaki.emi@example.com",
		joinDate: "2019-04-01",
	},
	{
		id: "043",
		name: "横山 裕太",
		department: "開発部",
		position: "部長",
		email: "yokoyama.yuta@example.com",
		joinDate: "2012-04-01",
	},
	{
		id: "044",
		name: "桜井 美香",
		department: "マーケティング部",
		position: "担当",
		email: "sakurai.mika@example.com",
		joinDate: "2022-04-01",
	},
	{
		id: "045",
		name: "内田 健司",
		department: "財務部",
		position: "課長",
		email: "uchida.kenji@example.com",
		joinDate: "2015-04-01",
	},
	{
		id: "046",
		name: "高木 裕美",
		department: "開発部",
		position: "主任",
		email: "takagi.hiromi@example.com",
		joinDate: "2018-04-01",
	},
	{
		id: "047",
		name: "森 和也",
		department: "営業部",
		position: "リーダー",
		email: "mori.kazuya@example.com",
		joinDate: "2016-04-01",
	},
	{
		id: "048",
		name: "上田 真理子",
		department: "マーケティング部",
		position: "担当",
		email: "ueda.mariko@example.com",
		joinDate: "2021-04-01",
	},
	{
		id: "049",
		name: "河野 智也",
		department: "人事部",
		position: "リーダー",
		email: "kawano.tomoya@example.com",
		joinDate: "2017-04-01",
	},
	{
		id: "050",
		name: "谷口 恵",
		department: "財務部",
		position: "担当",
		email: "taniguchi.megumi@example.com",
		joinDate: "2022-04-01",
	},
	{
		id: "051",
		name: "平田 修",
		department: "開発部",
		position: "課長",
		email: "hirata.osamu@example.com",
		joinDate: "2014-04-01",
	},
	{
		id: "052",
		name: "服部 由美子",
		department: "営業部",
		position: "担当",
		email: "hattori.yumiko@example.com",
		joinDate: "2023-04-01",
	},
	{
		id: "053",
		name: "吉川 拓真",
		department: "マーケティング部",
		position: "主任",
		email: "yoshikawa.takuma@example.com",
		joinDate: "2020-04-01",
	},
	{
		id: "054",
		name: "久保 千春",
		department: "人事部",
		position: "部長",
		email: "kubo.chiharu@example.com",
		joinDate: "2013-04-01",
	},
	{
		id: "055",
		name: "西田 康弘",
		department: "財務部",
		position: "リーダー",
		email: "nishida.yasuhiro@example.com",
		joinDate: "2018-04-01",
	},
	{
		id: "056",
		name: "荒井 美樹",
		department: "開発部",
		position: "担当",
		email: "arai.miki@example.com",
		joinDate: "2021-04-01",
	},
	{
		id: "057",
		name: "飯田 健太郎",
		department: "営業部",
		position: "主任",
		email: "iida.kentaro@example.com",
		joinDate: "2019-04-01",
	},
	{
		id: "058",
		name: "篠原 彩",
		department: "マーケティング部",
		position: "リーダー",
		email: "shinohara.aya@example.com",
		joinDate: "2016-04-01",
	},
	{
		id: "059",
		name: "石田 誠",
		department: "財務部",
		position: "担当",
		email: "ishida.makoto@example.com",
		joinDate: "2022-04-01",
	},
	{
		id: "060",
		name: "榎本 真由美",
		department: "人事部",
		position: "課長",
		email: "enomoto.mayumi@example.com",
		joinDate: "2017-04-01",
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
	page?: number;
	limit?: number;
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

	// ページネーションのために合計件数を取得
	const totalItems = filteredEmployees.length;

	// ページネーションの適用
	const page = params.page || 1;
	const limit = params.limit || 20;
	const startIndex = (page - 1) * limit;
	const endIndex = page * limit;

	// ページに表示するデータを抽出
	const paginatedEmployees = filteredEmployees.slice(startIndex, endIndex);

	// ページネーション情報を含めて返す
	return {
		items: paginatedEmployees,
		pagination: {
			total: totalItems,
			page,
			limit,
			totalPages: Math.ceil(totalItems / limit),
		},
	};
}

// 従業員を一件取得
export async function getEmployeeById(id: string) {
	return mockEmployees.find((employee) => employee.id === id) || null;
}
