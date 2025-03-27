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
	{
		id: "007",
		name: "エグゼクティブディレクター",
		level: 7,
		description: "複数の部門や事業部を統括し、経営戦略の策定と実行を担当する",
		salaryRange: {
			min: 1200000,
			max: 1800000,
		},
		employeeCount: 2,
		createdAt: "2014-04-01",
	},
	{
		id: "008",
		name: "ディレクター",
		level: 6,
		description:
			"事業部全体の方針決定と管理監督を行い、経営層との橋渡し役を担う",
		salaryRange: {
			min: 1000000,
			max: 1400000,
		},
		employeeCount: 4,
		createdAt: "2014-10-01",
	},
	{
		id: "009",
		name: "プリンシパルスペシャリスト",
		level: 5,
		description:
			"業界最高レベルの専門性を持ち、技術戦略の策定や革新的なソリューション開発を主導する",
		salaryRange: {
			min: 900000,
			max: 1300000,
		},
		employeeCount: 3,
		createdAt: "2015-04-01",
	},
	{
		id: "010",
		name: "テクニカルリード",
		level: 4,
		description: "技術チームをリードし、技術的な意思決定と品質管理を担当する",
		salaryRange: {
			min: 700000,
			max: 950000,
		},
		employeeCount: 6,
		createdAt: "2016-04-01",
	},
	{
		id: "011",
		name: "シニアコンサルタント",
		level: 4,
		description: "顧客の複雑な課題に対して高度な解決策を提案し実行をリードする",
		salaryRange: {
			min: 750000,
			max: 1000000,
		},
		employeeCount: 8,
		createdAt: "2016-10-01",
	},
	{
		id: "012",
		name: "コンサルタント",
		level: 3,
		description: "顧客の課題分析と解決策の提案、プロジェクト実行を担当する",
		salaryRange: {
			min: 550000,
			max: 750000,
		},
		employeeCount: 12,
		createdAt: "2017-04-01",
	},
	{
		id: "013",
		name: "アソシエイトコンサルタント",
		level: 2,
		description:
			"シニアコンサルタントのサポートと基本的なコンサルティング業務を担当",
		salaryRange: {
			min: 450000,
			max: 600000,
		},
		employeeCount: 15,
		createdAt: "2018-04-01",
	},
	{
		id: "014",
		name: "シニアエンジニア",
		level: 3,
		description: "高度な技術力を持ち、複雑な技術的課題の解決と後輩の指導を行う",
		salaryRange: {
			min: 600000,
			max: 800000,
		},
		employeeCount: 18,
		createdAt: "2017-04-01",
	},
	{
		id: "015",
		name: "エンジニア",
		level: 2,
		description: "システム開発の中核を担い、設計から実装、テストまでを遂行する",
		salaryRange: {
			min: 450000,
			max: 650000,
		},
		employeeCount: 30,
		createdAt: "2018-04-01",
	},
	{
		id: "016",
		name: "アソシエイトエンジニア",
		level: 1,
		description:
			"基本的な開発スキルを身につけ、チームの一員として開発に参加する",
		salaryRange: {
			min: 350000,
			max: 500000,
		},
		employeeCount: 25,
		createdAt: "2019-04-01",
	},
	{
		id: "017",
		name: "シニアデザイナー",
		level: 3,
		description:
			"高度なデザインスキルを持ち、ブランドイメージの構築やUI/UX設計を主導する",
		salaryRange: {
			min: 550000,
			max: 750000,
		},
		employeeCount: 5,
		createdAt: "2017-10-01",
	},
	{
		id: "018",
		name: "デザイナー",
		level: 2,
		description: "ユーザー体験を考慮したデザイン制作と実装サポートを担当する",
		salaryRange: {
			min: 450000,
			max: 650000,
		},
		employeeCount: 12,
		createdAt: "2018-10-01",
	},
	{
		id: "019",
		name: "アソシエイトデザイナー",
		level: 1,
		description: "基本的なデザインスキルを持ち、指示のもとデザイン制作を行う",
		salaryRange: {
			min: 350000,
			max: 500000,
		},
		employeeCount: 8,
		createdAt: "2019-10-01",
	},
	{
		id: "020",
		name: "プロジェクトマネージャー",
		level: 4,
		description: "プロジェクト全体の計画立案、進捗管理、リソース配分を担当する",
		salaryRange: {
			min: 700000,
			max: 950000,
		},
		employeeCount: 10,
		createdAt: "2016-04-01",
	},
	{
		id: "021",
		name: "プロダクトマネージャー",
		level: 4,
		description: "製品のビジョン策定、ロードマップ作成、開発優先順位付けを行う",
		salaryRange: {
			min: 750000,
			max: 1000000,
		},
		employeeCount: 6,
		createdAt: "2017-04-01",
	},
	{
		id: "022",
		name: "マーケティングディレクター",
		level: 5,
		description: "マーケティング戦略の策定と実行管理、チーム統括を担当する",
		salaryRange: {
			min: 800000,
			max: 1200000,
		},
		employeeCount: 2,
		createdAt: "2015-10-01",
	},
	{
		id: "023",
		name: "シニアマーケター",
		level: 3,
		description:
			"マーケティングキャンペーンの企画・実行と効果測定、改善を担当する",
		salaryRange: {
			min: 550000,
			max: 750000,
		},
		employeeCount: 5,
		createdAt: "2017-04-01",
	},
	{
		id: "024",
		name: "マーケター",
		level: 2,
		description: "各種マーケティング施策の実行とデータ分析を担当する",
		salaryRange: {
			min: 450000,
			max: 600000,
		},
		employeeCount: 8,
		createdAt: "2018-04-01",
	},
	{
		id: "025",
		name: "セールスディレクター",
		level: 5,
		description: "営業戦略の策定と実行管理、大型案件の獲得を担当する",
		salaryRange: {
			min: 900000,
			max: 1300000,
		},
		employeeCount: 3,
		createdAt: "2015-04-01",
	},
	{
		id: "026",
		name: "シニアセールス",
		level: 3,
		description: "大型顧客の開拓と維持、複雑な商談の進行を担当する",
		salaryRange: {
			min: 600000,
			max: 900000,
		},
		employeeCount: 6,
		createdAt: "2016-10-01",
	},
	{
		id: "027",
		name: "セールス",
		level: 2,
		description: "顧客開拓と商談の実施、契約締結までのプロセス管理を担当する",
		salaryRange: {
			min: 400000,
			max: 700000,
		},
		employeeCount: 15,
		createdAt: "2018-04-01",
	},
	{
		id: "028",
		name: "カスタマーサクセスマネージャー",
		level: 4,
		description: "顧客の成功を支援するチーム全体の戦略立案と実行管理を担当する",
		salaryRange: {
			min: 700000,
			max: 950000,
		},
		employeeCount: 4,
		createdAt: "2017-04-01",
	},
	{
		id: "029",
		name: "カスタマーサクセス",
		level: 2,
		description: "顧客の製品活用支援と継続的な関係構築を担当する",
		salaryRange: {
			min: 450000,
			max: 650000,
		},
		employeeCount: 12,
		createdAt: "2019-04-01",
	},
	{
		id: "030",
		name: "研究開発リード",
		level: 5,
		description:
			"最先端技術の研究開発チームを統括し、新技術の事業応用を主導する",
		salaryRange: {
			min: 900000,
			max: 1300000,
		},
		employeeCount: 2,
		createdAt: "2016-04-01",
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
