export type SkillCertificationType = "skill" | "certification";

export interface SkillCertification {
	id: string;
	name: string;
	type: SkillCertificationType;
	description: string;
	levelOrAuthority: string;
	requirements?: string;
	holdersCount: number;
	createdAt: string;
}

// スキル・資格のモックデータ
export const skillCertificationData: SkillCertification[] = [
	{
		id: "skill-1",
		name: "TypeScript",
		type: "skill",
		description: "Microsoft社が開発した静的型付けプログラミング言語",
		levelOrAuthority: "エキスパート",
		requirements: "3年以上の開発経験、大規模プロジェクトでの使用経験",
		holdersCount: 15,
		createdAt: "2021-01-15T00:00:00.000Z",
	},
	{
		id: "skill-2",
		name: "React",
		type: "skill",
		description: "Facebook社が開発したUIライブラリ",
		levelOrAuthority: "上級",
		requirements: "複数のプロジェクトでの経験、カスタムフックの作成経験",
		holdersCount: 23,
		createdAt: "2021-02-10T00:00:00.000Z",
	},
	{
		id: "cert-1",
		name: "AWS認定ソリューションアーキテクト - アソシエイト",
		type: "certification",
		description: "AWSのサービスに関する設計と導入の知識を証明する資格",
		levelOrAuthority: "Amazon Web Services",
		requirements: "模擬試験で80%以上のスコア、1年以上の実務経験推奨",
		holdersCount: 8,
		createdAt: "2021-03-05T00:00:00.000Z",
	},
	{
		id: "cert-2",
		name: "情報セキュリティマネジメント試験",
		type: "certification",
		description:
			"情報セキュリティマネジメントに関する基本的知識を認定する国家試験",
		levelOrAuthority: "IPA（情報処理推進機構）",
		holdersCount: 12,
		createdAt: "2021-04-20T00:00:00.000Z",
	},
	{
		id: "skill-3",
		name: "Docker",
		type: "skill",
		description: "コンテナ型の仮想化技術",
		levelOrAuthority: "中級",
		requirements: "複数のコンテナ管理、Docker Composeの利用経験",
		holdersCount: 18,
		createdAt: "2021-05-15T00:00:00.000Z",
	},
	{
		id: "cert-3",
		name: "TOEIC 800点以上",
		type: "certification",
		description: "ビジネスで活用できる英語力の証明",
		levelOrAuthority: "ETS（Educational Testing Service）",
		requirements: "定期的な英語学習、ビジネス英語の実践経験",
		holdersCount: 7,
		createdAt: "2021-06-30T00:00:00.000Z",
	},
	// 追加データ
	{
		id: "skill-4",
		name: "Node.js",
		type: "skill",
		description: "サーバーサイドJavaScriptの実行環境",
		levelOrAuthority: "上級",
		requirements: "大規模バックエンド開発経験、パフォーマンス最適化の知識",
		holdersCount: 14,
		createdAt: "2021-07-10T00:00:00.000Z",
	},
	{
		id: "skill-5",
		name: "Python",
		type: "skill",
		description: "汎用プログラミング言語、データ分析やAI開発にも広く使用",
		levelOrAuthority: "中級",
		requirements: "2年以上の開発経験、Pandasなどのライブラリ使用経験",
		holdersCount: 20,
		createdAt: "2021-07-15T00:00:00.000Z",
	},
	{
		id: "skill-6",
		name: "GraphQL",
		type: "skill",
		description: "APIのためのクエリ言語およびランタイム",
		levelOrAuthority: "中級",
		requirements: "実務での実装経験、スキーマ設計の知識",
		holdersCount: 9,
		createdAt: "2021-08-05T00:00:00.000Z",
	},
	{
		id: "cert-4",
		name: "基本情報技術者試験",
		type: "certification",
		description: "ITに関する基礎知識を証明する国家試験",
		levelOrAuthority: "IPA（情報処理推進機構）",
		holdersCount: 32,
		createdAt: "2021-08-20T00:00:00.000Z",
	},
	{
		id: "cert-5",
		name: "応用情報技術者試験",
		type: "certification",
		description:
			"高度IT人材となるために必要な応用的知識・技能を認定する国家試験",
		levelOrAuthority: "IPA（情報処理推進機構）",
		holdersCount: 15,
		createdAt: "2021-09-10T00:00:00.000Z",
	},
	{
		id: "skill-7",
		name: "Vue.js",
		type: "skill",
		description: "プログレッシブなJavaScriptフレームワーク",
		levelOrAuthority: "上級",
		requirements: "Vuexを用いた状態管理、大規模アプリケーション開発経験",
		holdersCount: 11,
		createdAt: "2021-09-25T00:00:00.000Z",
	},
	{
		id: "skill-8",
		name: "Kubernetes",
		type: "skill",
		description: "コンテナオーケストレーションプラットフォーム",
		levelOrAuthority: "上級",
		requirements: "本番環境での運用経験、CKA資格所持推奨",
		holdersCount: 6,
		createdAt: "2021-10-05T00:00:00.000Z",
	},
	{
		id: "cert-6",
		name: "Google Cloud Professional Cloud Architect",
		type: "certification",
		description: "Google Cloud上での設計、開発、管理の専門知識を証明する資格",
		levelOrAuthority: "Google Cloud",
		requirements: "3年以上のクラウド設計経験、ケーススタディの深い理解",
		holdersCount: 4,
		createdAt: "2021-10-20T00:00:00.000Z",
	},
	{
		id: "skill-9",
		name: "AWS",
		type: "skill",
		description: "Amazon Web Servicesクラウドプラットフォーム",
		levelOrAuthority: "上級",
		requirements: "複数のAWSサービスの設計・実装経験、高可用性システムの構築",
		holdersCount: 12,
		createdAt: "2021-11-05T00:00:00.000Z",
	},
	{
		id: "skill-10",
		name: "TensorFlow",
		type: "skill",
		description: "Googleが開発したオープンソースの機械学習ライブラリ",
		levelOrAuthority: "中級",
		requirements: "実務での使用経験、モデル開発・トレーニングの知識",
		holdersCount: 5,
		createdAt: "2021-11-20T00:00:00.000Z",
	},
	{
		id: "cert-7",
		name: "Oracle Certified Professional, Java SE Programmer",
		type: "certification",
		description: "Javaプログラミング言語とプラットフォームの専門知識を証明",
		levelOrAuthority: "Oracle",
		holdersCount: 9,
		createdAt: "2021-12-05T00:00:00.000Z",
	},
	{
		id: "skill-11",
		name: "Swift",
		type: "skill",
		description: "Apple社が開発したiOSアプリ開発用プログラミング言語",
		levelOrAuthority: "上級",
		requirements: "App Store公開アプリの開発経験、UIKitとSwiftUIの知識",
		holdersCount: 7,
		createdAt: "2021-12-20T00:00:00.000Z",
	},
	{
		id: "skill-12",
		name: "Flutter",
		type: "skill",
		description: "Googleが開発したクロスプラットフォームUIフレームワーク",
		levelOrAuthority: "中級",
		requirements: "複数のアプリ開発経験、状態管理の理解",
		holdersCount: 8,
		createdAt: "2022-01-10T00:00:00.000Z",
	},
	{
		id: "cert-8",
		name: "Certified ScrumMaster",
		type: "certification",
		description: "Scrumの原則とプラクティスに関する知識と実践力を証明",
		levelOrAuthority: "Scrum Alliance",
		holdersCount: 11,
		createdAt: "2022-01-25T00:00:00.000Z",
	},
	{
		id: "skill-13",
		name: "Next.js",
		type: "skill",
		description: "Reactベースのフルスタックウェブフレームワーク",
		levelOrAuthority: "上級",
		requirements: "大規模アプリケーション開発経験、SSRとSSGの最適化知識",
		holdersCount: 13,
		createdAt: "2022-02-10T00:00:00.000Z",
	},
	{
		id: "cert-9",
		name: "CCNA (Cisco Certified Network Associate)",
		type: "certification",
		description: "ネットワークの基礎知識と構築スキルを証明する資格",
		levelOrAuthority: "Cisco Systems",
		holdersCount: 6,
		createdAt: "2022-02-25T00:00:00.000Z",
	},
	{
		id: "skill-14",
		name: "Golang",
		type: "skill",
		description: "Googleが開発した静的型付け、コンパイル型プログラミング言語",
		levelOrAuthority: "中級",
		requirements: "マイクロサービス開発経験、並行処理の理解",
		holdersCount: 10,
		createdAt: "2022-03-10T00:00:00.000Z",
	},
	{
		id: "skill-15",
		name: "PostgreSQL",
		type: "skill",
		description: "オープンソースのリレーショナルデータベース管理システム",
		levelOrAuthority: "上級",
		requirements: "大規模DBの設計と運用経験、パフォーマンスチューニングの知識",
		holdersCount: 14,
		createdAt: "2022-03-25T00:00:00.000Z",
	},
	{
		id: "cert-10",
		name: "Microsoft Azure Fundamentals (AZ-900)",
		type: "certification",
		description: "Microsoft Azureの基礎的な知識を証明する資格",
		levelOrAuthority: "Microsoft",
		holdersCount: 8,
		createdAt: "2022-04-10T00:00:00.000Z",
	},
	{
		id: "skill-16",
		name: "Rust",
		type: "skill",
		description: "メモリ安全性とパフォーマンスに優れたプログラミング言語",
		levelOrAuthority: "中級",
		requirements: "システムプログラミング経験、所有権モデルの深い理解",
		holdersCount: 4,
		createdAt: "2022-04-25T00:00:00.000Z",
	},
	{
		id: "cert-11",
		name: "CompTIA Security+",
		type: "certification",
		description: "ITセキュリティの基礎知識を証明するグローバル認定資格",
		levelOrAuthority: "CompTIA",
		holdersCount: 5,
		createdAt: "2022-05-10T00:00:00.000Z",
	},
	{
		id: "skill-17",
		name: "UX/UIデザイン",
		type: "skill",
		description: "ユーザー体験とインターフェースの設計スキル",
		levelOrAuthority: "上級",
		requirements: "複数のプロダクト設計経験、ユーザーリサーチの実施経験",
		holdersCount: 9,
		createdAt: "2022-05-25T00:00:00.000Z",
	},
];

// モック従業員データにスキル・資格IDを追加
export type EmployeeWithSkillCertification = {
	id: string;
	name: string;
	position: string;
	departmentId: string;
	skillCertificationIds: string[];
	email: string;
	joinDate: string;
};

export const employeeSkillCertificationData: EmployeeWithSkillCertification[] =
	[
		{
			id: "001",
			name: "山田 太郎",
			position: "課長",
			departmentId: "001",
			skillCertificationIds: ["001", "002", "006"],
			email: "yamada.taro@example.com",
			joinDate: "2018-04-01",
		},
		{
			id: "002",
			name: "佐藤 花子",
			position: "主任",
			departmentId: "002",
			skillCertificationIds: ["001", "005", "007"],
			email: "sato.hanako@example.com",
			joinDate: "2019-04-01",
		},
		{
			id: "003",
			name: "鈴木 一郎",
			position: "部長",
			departmentId: "003",
			skillCertificationIds: ["003", "004", "008", "010"],
			email: "suzuki.ichiro@example.com",
			joinDate: "2015-04-01",
		},
		{
			id: "004",
			name: "田中 美咲",
			position: "担当",
			departmentId: "004",
			skillCertificationIds: ["002", "004", "005"],
			email: "tanaka.misaki@example.com",
			joinDate: "2021-04-01",
		},
		{
			id: "005",
			name: "伊藤 健太",
			position: "主任",
			departmentId: "005",
			skillCertificationIds: ["001", "002", "009"],
			email: "ito.kenta@example.com",
			joinDate: "2020-04-01",
		},
	];

// スキル・資格を作成する関数
export function createSkillCertification(
	data: Omit<SkillCertification, "id" | "createdAt" | "holdersCount">,
): SkillCertification {
	const id = `${data.type === "skill" ? "skill" : "cert"}-${Math.floor(
		Math.random() * 1000,
	).toString()}`;

	return {
		id,
		...data,
		holdersCount: 0,
		createdAt: new Date().toISOString(),
	};
}

// スキル・資格を更新する関数
export function updateSkillCertification(
	id: string,
	data: Partial<Omit<SkillCertification, "id" | "createdAt" | "holdersCount">>,
): SkillCertification | null {
	const index = skillCertificationData.findIndex((item) => item.id === id);
	if (index === -1) return null;

	const updatedItem = { ...skillCertificationData[index], ...data };
	skillCertificationData[index] = updatedItem;

	return updatedItem;
}
