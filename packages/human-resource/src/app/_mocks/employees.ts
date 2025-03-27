// 基本的な従業員データ型定義
export type Employee = {
	id: string;
	name: string;
	department: string;
	position: string;
	email: string;
	joinDate: string;
	// 詳細情報も基本型に含める
	nameKana?: string;
	grade?: string;
	phone?: string;
	address?: string;
	birthDate?: string;
	skills?: string[];
	certifications?: string[];
	evaluations?: Array<{
		period: string;
		overallRating: string;
		date: string;
	}>;
	goals?: Array<{
		id: string;
		title: string;
		description: string;
		progress: number;
		dueDate: string;
	}>;
};

// 名前からよみがなを生成する関数（実際にはもっと洗練された変換が必要）
export function generateNameKana(name: string): string {
	// 姓名の間のスペースを保持
	const parts = name.split(" ");
	if (parts.length === 2) {
		return `${parts[0]}（よみがな） ${parts[1]}（よみがな）`;
	}
	return `${name}（よみがな）`;
}

// デフォルト値を含む詳細情報を取得する関数
export function getEmployeeWithDefaults(employee: Employee): Employee {
	return {
		...employee,
		nameKana: employee.nameKana || generateNameKana(employee.name),
		grade: employee.grade || "一般",
		phone: employee.phone || "000-0000-0000",
		address: employee.address || "住所未登録",
		birthDate: employee.birthDate || "1990-01-01",
		skills: employee.skills || [],
		certifications: employee.certifications || [],
		evaluations: employee.evaluations || [],
		goals: employee.goals || [],
	};
}

// モックデータ
export const mockEmployees: Employee[] = [
	{
		id: "001",
		name: "山田 太郎",
		department: "営業部",
		position: "課長",
		email: "yamada.taro@example.com",
		joinDate: "2018-04-01",
		nameKana: "ヤマダ タロウ",
		grade: "G3",
		phone: "090-1234-5678",
		address: "東京都渋谷区神宮前3-15-8 渋谷グリーンハイツ801",
		birthDate: "1985-05-15",
		skills: ["Excel", "PowerPoint", "営業戦略立案"],
		certifications: ["TOEIC 800点", "営業士2級"],
		evaluations: [
			{ period: "2023年上期", overallRating: "A", date: "2023-06-30" },
			{ period: "2022年下期", overallRating: "B", date: "2023-01-31" },
		],
		goals: [
			{
				id: "goal001",
				title: "新規顧客開拓",
				description: "今期中に新規顧客10社との契約を目指す",
				progress: 60,
				dueDate: "2023-12-31",
			},
			{
				id: "goal002",
				title: "チームビルディング",
				description: "メンバーのスキル向上施策を実施する",
				progress: 40,
				dueDate: "2023-12-31",
			},
		],
	},
	{
		id: "002",
		name: "佐藤 花子",
		department: "人事部",
		position: "主任",
		email: "sato.hanako@example.com",
		joinDate: "2019-04-01",
		nameKana: "サトウ ハナコ",
		grade: "",
		phone: "090-2345-6789",
		address: "東京都新宿区西新宿7-21-3 新宿パークサイドマンション205",
		birthDate: "1990-10-20",
	},
	{
		id: "003",
		name: "鈴木 一郎",
		department: "開発部",
		position: "部長",
		email: "suzuki.ichiro@example.com",
		joinDate: "2015-04-01",
		nameKana: "スズキ イチロウ",
		phone: "090-3456-7890",
		address: "東京都品川区北品川5-8-11 品川ガーデンテラス1202",
		birthDate: "1975-03-10",
		grade: "G5",
		skills: [
			"システムアーキテクチャ設計",
			"プロジェクトマネジメント",
			"AWS",
			"Azure",
			"Kubernetes",
			"マイクロサービス",
			"アジャイル開発",
		],
		certifications: [
			"情報処理技術者試験 プロジェクトマネージャ",
			"AWS Solutions Architect Professional",
			"TOEIC 850点",
		],
		evaluations: [
			{ period: "2023年上期", overallRating: "S", date: "2023-06-30" },
			{ period: "2022年下期", overallRating: "A", date: "2023-01-31" },
		],
		goals: [
			{
				id: "goal003-1",
				title: "クラウドネイティブ化の推進",
				description:
					"全社システムのクラウドネイティブアーキテクチャへの移行を完了する",
				progress: 65,
				dueDate: "2024-03-31",
			},
			{
				id: "goal003-2",
				title: "技術者育成プログラムの確立",
				description: "若手エンジニアの育成プログラムを体系化し、実施する",
				progress: 40,
				dueDate: "2024-03-31",
			},
		],
	},
	{
		id: "004",
		name: "田中 美咲",
		department: "マーケティング部",
		position: "担当",
		email: "tanaka.misaki@example.com",
		joinDate: "2021-04-01",
		nameKana: "タナカ ミサキ",
		phone: "090-4567-8901",
		address: "東京都目黒区中目黒2-11-17 目黒アーバンハイツ503",
		birthDate: "1995-07-25",
		grade: "G1",
		skills: [
			"デジタルマーケティング",
			"SNS運用",
			"コンテンツ制作",
			"Google Analytics",
			"Adobe Photoshop",
		],
		certifications: [
			"Google Analytics認定資格",
			"Facebook Blueprint認定",
			"TOEIC 780点",
		],
		evaluations: [
			{ period: "2023年上期", overallRating: "A", date: "2023-06-30" },
			{ period: "2022年下期", overallRating: "B", date: "2023-01-31" },
		],
		goals: [
			{
				id: "goal004-1",
				title: "SNSフォロワー数の増加",
				description: "主要SNSのフォロワー数を30%増加させる",
				progress: 70,
				dueDate: "2023-12-31",
			},
			{
				id: "goal004-2",
				title: "コンテンツマーケティング強化",
				description: "月間ブログPV数を50%増加させる",
				progress: 45,
				dueDate: "2023-12-31",
			},
		],
	},
	{
		id: "005",
		name: "伊藤 健太",
		department: "財務部",
		position: "主任",
		email: "ito.kenta@example.com",
		joinDate: "2020-04-01",
		nameKana: "イトウ ケンタ",
		phone: "090-5678-9012",
		address: "東京都世田谷区三軒茶屋1-4-15 世田谷グリーンコート305",
		birthDate: "1988-12-05",
	},
	{
		id: "006",
		name: "中村 真由美",
		department: "開発部",
		position: "リーダー",
		email: "nakamura.mayumi@example.com",
		joinDate: "2017-04-01",
		nameKana: "ナカムラ マユミ",
		grade: "G2",
		phone: "090-3456-7890",
		address: "東京都中央区銀座6-10-1 銀座スカイレジデンス1501",
		birthDate: "1988-07-15",
		skills: ["Java", "React", "プロジェクト管理"],
		certifications: ["基本情報技術者", "TOEIC 750点"],
		evaluations: [
			{ period: "2023年上期", overallRating: "A", date: "2023-06-30" },
			{ period: "2022年下期", overallRating: "A", date: "2023-01-31" },
		],
		goals: [
			{
				id: "goal006-1",
				title: "システム改善",
				description: "レガシーシステムのモダン化を推進",
				progress: 75,
				dueDate: "2023-12-31",
			},
			{
				id: "goal006-2",
				title: "メンター活動",
				description: "新人エンジニア3名の育成",
				progress: 50,
				dueDate: "2024-03-31",
			},
		],
	},
	{
		id: "007",
		name: "小林 大輔",
		department: "営業部",
		position: "担当",
		email: "kobayashi.daisuke@example.com",
		joinDate: "2022-04-01",
		address: "東京都港区六本木3-8-12 六本木ヒルズレジデンス702",
	},
	{
		id: "008",
		name: "加藤 健一",
		department: "財務部",
		position: "部長",
		email: "kato.kenichi@example.com",
		joinDate: "2010-04-01",
		address: "東京都千代田区麹町4-5-6 麹町パレス901",
	},
	{
		id: "009",
		name: "渡辺 直人",
		department: "開発部",
		position: "担当",
		email: "watanabe.naoto@example.com",
		joinDate: "2022-04-01",
		address: "東京都文京区本郷2-15-9 本郷パークハウス403",
	},
	{
		id: "010",
		name: "高橋 恵",
		department: "マーケティング部",
		position: "リーダー",
		email: "takahashi.megumi@example.com",
		joinDate: "2018-04-01",
		address: "東京都台東区上野5-7-8 上野グランドハイツ605",
	},
	{
		id: "011",
		name: "吉田 隆",
		department: "営業部",
		position: "主任",
		email: "yoshida.takashi@example.com",
		joinDate: "2019-04-01",
		address: "東京都墨田区錦糸1-2-3 錦糸町レジデンス1105",
	},
	{
		id: "012",
		name: "松本 さくら",
		department: "人事部",
		position: "部長",
		email: "matsumoto.sakura@example.com",
		joinDate: "2014-04-01",
		address: "東京都江東区豊洲4-9-10 豊洲ベイサイドタワー2205",
	},
	{
		id: "013",
		name: "木村 拓也",
		department: "開発部",
		position: "課長",
		email: "kimura.takuya@example.com",
		joinDate: "2016-04-01",
		nameKana: "キムラ タクヤ",
		grade: "G4",
		phone: "090-1234-5678",
		address: "東京都港区芝浦2-13-7 芝浦シーサイドマンション1803",
		birthDate: "1985-12-15",
		skills: [
			"TypeScript",
			"React",
			"Next.js",
			"Node.js",
			"Python",
			"Docker",
			"CI/CD",
		],
		certifications: [
			"応用情報技術者",
			"AWS Solutions Architect Associate",
			"TOEIC 800点",
		],
		evaluations: [
			{ period: "2023年上期", overallRating: "A", date: "2023-06-30" },
			{ period: "2022年下期", overallRating: "A", date: "2023-01-31" },
		],
		goals: [
			{
				id: "goal013-1",
				title: "マイクロフロントエンド導入",
				description:
					"既存のモノリシックなフロントエンドをマイクロフロントエンド化する",
				progress: 55,
				dueDate: "2024-03-31",
			},
			{
				id: "goal013-2",
				title: "開発生産性の向上",
				description: "CI/CDパイプラインの最適化とテスト自動化の拡充",
				progress: 70,
				dueDate: "2024-03-31",
			},
		],
	},
	{
		id: "014",
		name: "斎藤 雅子",
		department: "財務部",
		position: "担当",
		email: "saito.masako@example.com",
		joinDate: "2021-04-01",
		address: "東京都品川区大崎3-6-9 大崎パークタワー1501",
	},
	{
		id: "015",
		name: "清水 俊介",
		department: "マーケティング部",
		position: "主任",
		email: "shimizu.shunsuke@example.com",
		joinDate: "2020-04-01",
		address: "東京都渋谷区恵比寿1-12-5 恵比寿ガーデンプレイス805",
	},
	{
		id: "016",
		name: "山口 明美",
		department: "営業部",
		position: "リーダー",
		email: "yamaguchi.akemi@example.com",
		joinDate: "2017-04-01",
		address: "東京都新宿区高田馬場2-8-4 高田馬場マンション705",
	},
	{
		id: "017",
		name: "岡田 浩二",
		department: "人事部",
		position: "担当",
		email: "okada.koji@example.com",
		joinDate: "2022-04-01",
		address: "東京都中野区中野5-16-8 中野セントラルパーク303",
	},
	{
		id: "018",
		name: "後藤 麻衣",
		department: "開発部",
		position: "担当",
		email: "goto.mai@example.com",
		joinDate: "2023-04-01",
		address: "東京都杉並区荻窪4-23-7 荻窪パークハウス502",
	},
	{
		id: "019",
		name: "三浦 達也",
		department: "財務部",
		position: "リーダー",
		email: "miura.tatsuya@example.com",
		joinDate: "2019-04-01",
		address: "東京都豊島区池袋2-15-9 池袋アーバンハイツ1205",
	},
	{
		id: "020",
		name: "藤田 由美",
		department: "マーケティング部",
		position: "課長",
		email: "fujita.yumi@example.com",
		joinDate: "2016-04-01",
		address: "東京都北区赤羽1-8-6 赤羽レジデンス905",
	},
	{
		id: "021",
		name: "石川 翔太",
		department: "開発部",
		position: "担当",
		email: "ishikawa.shota@example.com",
		joinDate: "2022-04-01",
		address: "東京都荒川区町屋3-12-4 町屋グリーンコート405",
	},
	{
		id: "022",
		name: "橋本 恵理",
		department: "人事部",
		position: "リーダー",
		email: "hashimoto.eri@example.com",
		joinDate: "2018-04-01",
		address: "東京都板橋区板橋1-7-9 板橋パークマンション603",
	},
	{
		id: "023",
		name: "村上 博司",
		department: "営業部",
		position: "部長",
		email: "murakami.hiroshi@example.com",
		joinDate: "2013-04-01",
		address: "東京都練馬区練馬2-18-5 練馬ガーデンハウス802",
	},
	{
		id: "024",
		name: "長谷川 涼子",
		department: "マーケティング部",
		position: "担当",
		email: "hasegawa.ryoko@example.com",
		joinDate: "2021-04-01",
		address: "東京都足立区千住3-9-12 千住パークサイド505",
	},
	{
		id: "025",
		name: "大野 雄太",
		department: "財務部",
		position: "課長",
		email: "ono.yuta@example.com",
		joinDate: "2017-04-01",
		address: "東京都葛飾区亀有4-5-6 亀有レジデンス705",
	},
	{
		id: "026",
		name: "西村 美穂",
		department: "開発部",
		position: "主任",
		email: "nishimura.miho@example.com",
		joinDate: "2019-04-01",
		nameKana: "ニシムラ ミホ",
		grade: "G3",
		phone: "090-9876-5432",
		address: "東京都江戸川区西葛西5-8-13 葛西セントラルマンション908",
		birthDate: "1990-08-20",
		skills: [
			"Java",
			"Spring Boot",
			"MySQL",
			"Redis",
			"Kubernetes",
			"テスト自動化",
		],
		certifications: [
			"情報処理安全確保支援士",
			"Oracle Certified Professional",
			"TOEIC 820点",
		],
		evaluations: [
			{ period: "2023年上期", overallRating: "A", date: "2023-06-30" },
			{ period: "2022年下期", overallRating: "B", date: "2023-01-31" },
		],
		goals: [
			{
				id: "goal026-1",
				title: "バックエンドAPI最適化",
				description:
					"レスポンスタイムを50%改善し、スケーラビリティを向上させる",
				progress: 80,
				dueDate: "2023-12-31",
			},
			{
				id: "goal026-2",
				title: "セキュリティ強化",
				description: "セキュリティ監査の指摘事項の改善と、脆弱性診断の定期実施",
				progress: 60,
				dueDate: "2024-03-31",
			},
		],
	},
	{
		id: "027",
		name: "菊池 正樹",
		department: "営業部",
		position: "担当",
		email: "kikuchi.masaki@example.com",
		joinDate: "2023-04-01",
		address: "東京都渋谷区代々木2-11-8 代々木パークハイツ1102",
	},
	{
		id: "028",
		name: "坂本 梨花",
		department: "マーケティング部",
		position: "部長",
		email: "sakamoto.rika@example.com",
		joinDate: "2012-04-01",
		address: "東京都新宿区四谷3-15-7 四谷グランドマンション605",
	},
	{
		id: "029",
		name: "前田 健二",
		department: "人事部",
		position: "課長",
		email: "maeda.kenji@example.com",
		joinDate: "2015-04-01",
		address: "東京都千代田区神田駿河台1-8-11 お茶の水レジデンス705",
	},
	{
		id: "030",
		name: "遠藤 さやか",
		department: "財務部",
		position: "担当",
		email: "endo.sayaka@example.com",
		joinDate: "2022-04-01",
		address: "東京都中央区日本橋2-4-16 日本橋パークタワー1505",
	},
	{
		id: "031",
		name: "原田 隆之",
		department: "開発部",
		position: "リーダー",
		email: "harada.takayuki@example.com",
		joinDate: "2016-04-01",
		address: "東京都港区赤坂6-13-8 赤坂ヒルズ902",
	},
	{
		id: "032",
		name: "松田 優子",
		department: "営業部",
		position: "主任",
		email: "matsuda.yuko@example.com",
		joinDate: "2020-04-01",
		address: "東京都文京区小石川4-8-9 小石川パレス503",
	},
	{
		id: "033",
		name: "杉山 勇太",
		department: "マーケティング部",
		position: "担当",
		email: "sugiyama.yuta@example.com",
		joinDate: "2021-04-01",
		address: "東京都台東区浅草2-3-4 浅草ビューハイツ805",
	},
	{
		id: "034",
		name: "井上 千尋",
		department: "財務部",
		position: "主任",
		email: "inoue.chihiro@example.com",
		joinDate: "2019-04-01",
		address: "東京都墨田区両国3-7-8 両国パークマンション405",
	},
	{
		id: "035",
		name: "山本 大地",
		department: "開発部",
		position: "課長",
		email: "yamamoto.daichi@example.com",
		joinDate: "2017-04-01",
		address: "東京都江東区木場4-5-6 木場レジデンス1205",
	},
	{
		id: "036",
		name: "中島 綾",
		department: "人事部",
		position: "担当",
		email: "nakajima.aya@example.com",
		joinDate: "2023-04-01",
		address: "東京都品川区戸越2-9-10 戸越パークハウス305",
	},
	{
		id: "037",
		name: "阿部 隆司",
		department: "営業部",
		position: "リーダー",
		email: "abe.takashi@example.com",
		joinDate: "2018-04-01",
		nameKana: "アベ タカシ",
		grade: "G3",
		phone: "090-3333-4444",
		address: "東京都目黒区自由が丘1-25-12 自由が丘マンション705",
		birthDate: "1987-06-10",
		skills: [
			"ソリューション営業",
			"プレゼンテーション",
			"商談交渉",
			"マーケット分析",
			"Salesforce",
		],
		certifications: ["営業マネージャー認定", "ITパスポート", "TOEIC 750点"],
		evaluations: [
			{ period: "2023年上期", overallRating: "S", date: "2023-06-30" },
			{ period: "2022年下期", overallRating: "A", date: "2023-01-31" },
		],
		goals: [
			{
				id: "goal037-1",
				title: "新規顧客開拓",
				description: "エンタープライズ顧客を5社以上獲得する",
				progress: 60,
				dueDate: "2024-03-31",
			},
			{
				id: "goal037-2",
				title: "営業チーム強化",
				description: "チームメンバーの平均成約率を20%向上させる",
				progress: 75,
				dueDate: "2024-03-31",
			},
		],
	},
	{
		id: "038",
		name: "野口 真理",
		department: "マーケティング部",
		position: "主任",
		email: "noguchi.mari@example.com",
		joinDate: "2020-04-01",
		address: "東京都世田谷区下北沢3-8-15 下北沢グリーンハイツ402",
	},
	{
		id: "039",
		name: "竹内 俊介",
		department: "財務部",
		position: "部長",
		email: "takeuchi.shunsuke@example.com",
		joinDate: "2014-04-01",
		address: "東京都渋谷区広尾5-12-9 広尾レジデンス1105",
	},
	{
		id: "040",
		name: "市川 春香",
		department: "開発部",
		position: "担当",
		email: "ichikawa.haruka@example.com",
		joinDate: "2022-04-01",
		address: "東京都中野区東中野1-15-8 東中野パークマンション605",
	},
	{
		id: "041",
		name: "近藤 雄介",
		department: "営業部",
		position: "担当",
		email: "kondo.yusuke@example.com",
		joinDate: "2023-04-01",
		address: "東京都杉並区阿佐ヶ谷3-18-7 阿佐ヶ谷グリーンコート805",
	},
	{
		id: "042",
		name: "宮崎 絵美",
		department: "人事部",
		position: "主任",
		email: "miyazaki.emi@example.com",
		joinDate: "2019-04-01",
		address: "東京都豊島区巣鴨4-9-12 巣鴨パークサイド505",
	},
	{
		id: "043",
		name: "横山 裕太",
		department: "開発部",
		position: "部長",
		email: "yokoyama.yuta@example.com",
		joinDate: "2012-04-01",
		address: "東京都北区王子2-7-8 王子ガーデンハウス705",
	},
	{
		id: "044",
		name: "桜井 美香",
		department: "マーケティング部",
		position: "担当",
		email: "sakurai.mika@example.com",
		joinDate: "2022-04-01",
		address: "東京都荒川区西日暮里5-13-6 日暮里レジデンス905",
	},
	{
		id: "045",
		name: "内田 健司",
		department: "財務部",
		position: "課長",
		email: "uchida.kenji@example.com",
		joinDate: "2015-04-01",
		address: "東京都板橋区志村2-11-14 志村パークタワー1205",
	},
	{
		id: "046",
		name: "高木 裕美",
		department: "開発部",
		position: "主任",
		email: "takagi.hiromi@example.com",
		joinDate: "2018-04-01",
		address: "東京都練馬区光が丘1-5-8 光が丘パークハウス305",
	},
	{
		id: "047",
		name: "森 和也",
		department: "営業部",
		position: "リーダー",
		email: "mori.kazuya@example.com",
		joinDate: "2016-04-01",
		address: "東京都足立区綾瀬4-15-9 綾瀬グランドマンション805",
	},
	{
		id: "048",
		name: "上田 真理子",
		department: "マーケティング部",
		position: "担当",
		email: "ueda.mariko@example.com",
		joinDate: "2021-04-01",
		address: "東京都葛飾区立石3-8-12 立石パークサイド605",
	},
	{
		id: "049",
		name: "河野 智也",
		department: "人事部",
		position: "リーダー",
		email: "kawano.tomoya@example.com",
		joinDate: "2017-04-01",
		address: "東京都江戸川区小岩1-23-7 小岩レジデンス505",
	},
	{
		id: "050",
		name: "谷口 恵",
		department: "財務部",
		position: "担当",
		email: "taniguchi.megumi@example.com",
		joinDate: "2022-04-01",
		address: "東京都千代田区九段南2-3-8 九段下パレス1005",
	},
	{
		id: "051",
		name: "平田 修",
		department: "開発部",
		position: "課長",
		email: "hirata.osamu@example.com",
		joinDate: "2014-04-01",
		address: "東京都中央区月島3-15-9 月島ガーデンハウス705",
	},
	{
		id: "052",
		name: "服部 由美子",
		department: "営業部",
		position: "担当",
		email: "hattori.yumiko@example.com",
		joinDate: "2023-04-01",
		address: "東京都港区白金1-8-11 白金パークマンション505",
	},
	{
		id: "053",
		name: "吉川 拓真",
		department: "マーケティング部",
		position: "主任",
		email: "yoshikawa.takuma@example.com",
		joinDate: "2020-04-01",
		address: "東京都新宿区神楽坂4-12-6 神楽坂レジデンス805",
	},
	{
		id: "054",
		name: "久保 千春",
		department: "人事部",
		position: "部長",
		email: "kubo.chiharu@example.com",
		joinDate: "2013-04-01",
		address: "東京都文京区千駄木2-7-15 千駄木パークハウス405",
	},
	{
		id: "055",
		name: "西田 康弘",
		department: "財務部",
		position: "リーダー",
		email: "nishida.yasuhiro@example.com",
		joinDate: "2018-04-01",
		address: "東京都台東区入谷1-9-8 入谷グリーンコート605",
	},
	{
		id: "056",
		name: "荒井 美樹",
		department: "開発部",
		position: "担当",
		email: "arai.miki@example.com",
		joinDate: "2021-04-01",
		address: "東京都墨田区押上3-11-14 スカイツリーレジデンス1505",
	},
	{
		id: "057",
		name: "飯田 健太郎",
		department: "営業部",
		position: "主任",
		email: "iida.kentaro@example.com",
		joinDate: "2019-04-01",
		address: "東京都江東区東陽5-6-7 東陽町パークタワー905",
	},
	{
		id: "058",
		name: "篠原 彩",
		department: "マーケティング部",
		position: "リーダー",
		email: "shinohara.aya@example.com",
		joinDate: "2016-04-01",
		address: "東京都品川区五反田1-18-9 五反田パークハイツ705",
	},
	{
		id: "059",
		name: "石田 誠",
		department: "財務部",
		position: "担当",
		email: "ishida.makoto@example.com",
		joinDate: "2022-04-01",
		address: "東京都目黒区祐天寺2-8-15 祐天寺レジデンス505",
	},
	{
		id: "060",
		name: "榎本 真由美",
		department: "人事部",
		position: "課長",
		email: "enomoto.mayumi@example.com",
		joinDate: "2017-04-01",
		address: "東京都世田谷区経堂3-12-7 経堂グリーンハイツ605",
	},
];

// 部署データ
export const mockDepartments = [
	{ value: "all", label: "すべての部署" },
	{ value: "営業部", label: "営業部" },
	{ value: "人事部", label: "人事部" },
	{ value: "開発部", label: "開発部" },
	{ value: "マーケティング部", label: "マーケティング部" },
	{ value: "財務部", label: "財務部" },
];

// 役職データ
export const mockPositions = [
	{ value: "all", label: "すべての役職" },
	{ value: "部長", label: "部長" },
	{ value: "課長", label: "課長" },
	{ value: "リーダー", label: "リーダー" },
	{ value: "主任", label: "主任" },
	{ value: "担当", label: "担当" },
];

// 後方互換性のために残しておく関数
export function getEmployeeDetailWithDefaults(
	employeeId: string,
	employee: Employee,
): Employee {
	return getEmployeeWithDefaults(employee);
}
