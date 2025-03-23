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
