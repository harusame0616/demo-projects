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
	{
		id: "011",
		name: "営業部長",
		level: 7,
		description: "営業部門全体の統括責任者",
		memberCount: 1,
		createdAt: "2016-04-01",
	},
	{
		id: "012",
		name: "開発部長",
		level: 7,
		description: "開発部門全体の統括責任者",
		memberCount: 1,
		createdAt: "2016-04-01",
	},
	{
		id: "013",
		name: "人事部長",
		level: 7,
		description: "人事部門全体の統括責任者",
		memberCount: 1,
		createdAt: "2016-04-01",
	},
	{
		id: "014",
		name: "財務部長",
		level: 7,
		description: "財務部門全体の統括責任者",
		memberCount: 1,
		createdAt: "2016-04-01",
	},
	{
		id: "015",
		name: "マーケティング部長",
		level: 7,
		description: "マーケティング部門全体の統括責任者",
		memberCount: 1,
		createdAt: "2018-04-01",
	},
	{
		id: "016",
		name: "営業課長",
		level: 5,
		description: "営業課の責任者",
		memberCount: 2,
		createdAt: "2018-04-01",
	},
	{
		id: "017",
		name: "開発課長",
		level: 5,
		description: "開発課の責任者",
		memberCount: 3,
		createdAt: "2018-04-01",
	},
	{
		id: "018",
		name: "人事課長",
		level: 5,
		description: "人事課の責任者",
		memberCount: 1,
		createdAt: "2018-04-01",
	},
	{
		id: "019",
		name: "財務課長",
		level: 5,
		description: "財務課の責任者",
		memberCount: 1,
		createdAt: "2018-04-01",
	},
	{
		id: "020",
		name: "マーケティング課長",
		level: 5,
		description: "マーケティング課の責任者",
		memberCount: 2,
		createdAt: "2019-04-01",
	},
	{
		id: "021",
		name: "営業主任",
		level: 3,
		description: "営業チームのリーダー",
		memberCount: 4,
		createdAt: "2020-04-01",
	},
	{
		id: "022",
		name: "開発主任",
		level: 3,
		description: "開発チームのリーダー",
		memberCount: 5,
		createdAt: "2020-04-01",
	},
	{
		id: "023",
		name: "人事主任",
		level: 3,
		description: "人事チームのリーダー",
		memberCount: 2,
		createdAt: "2020-04-01",
	},
	{
		id: "024",
		name: "財務主任",
		level: 3,
		description: "財務チームのリーダー",
		memberCount: 2,
		createdAt: "2020-04-01",
	},
	{
		id: "025",
		name: "マーケティング主任",
		level: 3,
		description: "マーケティングチームのリーダー",
		memberCount: 3,
		createdAt: "2020-04-01",
	},
	{
		id: "026",
		name: "新規事業本部長",
		level: 8,
		description: "新規事業本部の統括責任者",
		memberCount: 1,
		createdAt: "2022-04-01",
	},
	{
		id: "027",
		name: "海外事業本部長",
		level: 8,
		description: "海外事業本部の統括責任者",
		memberCount: 1,
		createdAt: "2021-04-01",
	},
	{
		id: "028",
		name: "研究開発本部長",
		level: 8,
		description: "研究開発本部の統括責任者",
		memberCount: 1,
		createdAt: "2019-04-01",
	},
	{
		id: "029",
		name: "品質管理部長",
		level: 7,
		description: "品質管理部門の統括責任者",
		memberCount: 1,
		createdAt: "2020-04-01",
	},
	{
		id: "030",
		name: "情報システム部長",
		level: 7,
		description: "情報システム部門の統括責任者",
		memberCount: 1,
		createdAt: "2017-04-01",
	},
	{
		id: "031",
		name: "法務部長",
		level: 7,
		description: "法務部門の統括責任者",
		memberCount: 1,
		createdAt: "2018-04-01",
	},
	{
		id: "032",
		name: "総務部長",
		level: 7,
		description: "総務部門の統括責任者",
		memberCount: 1,
		createdAt: "2016-04-01",
	},
	{
		id: "033",
		name: "購買部長",
		level: 7,
		description: "購買部門の統括責任者",
		memberCount: 1,
		createdAt: "2017-04-01",
	},
	{
		id: "034",
		name: "物流部長",
		level: 7,
		description: "物流部門の統括責任者",
		memberCount: 1,
		createdAt: "2018-04-01",
	},
	{
		id: "035",
		name: "品質管理課長",
		level: 5,
		description: "品質管理課の責任者",
		memberCount: 2,
		createdAt: "2020-04-01",
	},
	{
		id: "036",
		name: "情報システム課長",
		level: 5,
		description: "情報システム課の責任者",
		memberCount: 2,
		createdAt: "2018-04-01",
	},
	{
		id: "037",
		name: "法務課長",
		level: 5,
		description: "法務課の責任者",
		memberCount: 1,
		createdAt: "2019-04-01",
	},
	{
		id: "038",
		name: "総務課長",
		level: 5,
		description: "総務課の責任者",
		memberCount: 2,
		createdAt: "2017-04-01",
	},
	{
		id: "039",
		name: "購買課長",
		level: 5,
		description: "購買課の責任者",
		memberCount: 1,
		createdAt: "2018-04-01",
	},
	{
		id: "040",
		name: "物流課長",
		level: 5,
		description: "物流課の責任者",
		memberCount: 2,
		createdAt: "2019-04-01",
	},
	{
		id: "041",
		name: "品質管理主任",
		level: 3,
		description: "品質管理チームのリーダー",
		memberCount: 3,
		createdAt: "2021-04-01",
	},
	{
		id: "042",
		name: "情報システム主任",
		level: 3,
		description: "情報システムチームのリーダー",
		memberCount: 3,
		createdAt: "2019-04-01",
	},
	{
		id: "043",
		name: "法務主任",
		level: 3,
		description: "法務チームのリーダー",
		memberCount: 2,
		createdAt: "2020-04-01",
	},
	{
		id: "044",
		name: "総務主任",
		level: 3,
		description: "総務チームのリーダー",
		memberCount: 3,
		createdAt: "2018-04-01",
	},
	{
		id: "045",
		name: "購買主任",
		level: 3,
		description: "購買チームのリーダー",
		memberCount: 2,
		createdAt: "2019-04-01",
	},
	{
		id: "046",
		name: "物流主任",
		level: 3,
		description: "物流チームのリーダー",
		memberCount: 3,
		createdAt: "2020-04-01",
	},
	{
		id: "047",
		name: "プロジェクトマネージャー",
		level: 6,
		description: "特定プロジェクトの管理責任者",
		memberCount: 5,
		createdAt: "2019-04-01",
	},
	{
		id: "048",
		name: "シニアエンジニア",
		level: 4,
		description: "高度な技術を持つエンジニア",
		memberCount: 10,
		createdAt: "2018-04-01",
	},
	{
		id: "049",
		name: "UI/UXデザイナー",
		level: 3,
		description: "ユーザーインターフェースとエクスペリエンスの設計担当",
		memberCount: 5,
		createdAt: "2020-04-01",
	},
	{
		id: "050",
		name: "データアナリスト",
		level: 3,
		description: "データ分析と洞察の提供を担当",
		memberCount: 4,
		createdAt: "2021-04-01",
	},
	{
		id: "051",
		name: "カスタマーサクセスマネージャー",
		level: 4,
		description: "顧客の成功をサポートする責任者",
		memberCount: 3,
		createdAt: "2022-04-01",
	},
	{
		id: "052",
		name: "テクニカルサポートエンジニア",
		level: 2,
		description: "技術的な問題解決を支援する担当者",
		memberCount: 6,
		createdAt: "2021-04-01",
	},
	{
		id: "053",
		name: "セールスエグゼクティブ",
		level: 3,
		description: "高度な営業活動を担当",
		memberCount: 5,
		createdAt: "2020-04-01",
	},
	{
		id: "054",
		name: "マーケティングスペシャリスト",
		level: 2,
		description: "特定のマーケティング分野の専門家",
		memberCount: 4,
		createdAt: "2021-04-01",
	},
	{
		id: "055",
		name: "リクルーティングマネージャー",
		level: 4,
		description: "採用活動全体を統括",
		memberCount: 2,
		createdAt: "2019-04-01",
	},
	{
		id: "056",
		name: "トレーニングコーディネーター",
		level: 2,
		description: "社内教育プログラムの調整役",
		memberCount: 2,
		createdAt: "2020-04-01",
	},
	{
		id: "057",
		name: "プロダクトオーナー",
		level: 5,
		description: "製品開発の方向性と優先順位の決定者",
		memberCount: 3,
		createdAt: "2021-04-01",
	},
	{
		id: "058",
		name: "スクラムマスター",
		level: 4,
		description: "アジャイル開発チームのファシリテーター",
		memberCount: 4,
		createdAt: "2020-04-01",
	},
	{
		id: "059",
		name: "AIリサーチャー",
		level: 5,
		description: "人工知能分野の研究者",
		memberCount: 2,
		createdAt: "2022-04-01",
	},
	{
		id: "060",
		name: "セキュリティスペシャリスト",
		level: 4,
		description: "情報セキュリティの専門家",
		memberCount: 3,
		createdAt: "2021-04-01",
	},
];
