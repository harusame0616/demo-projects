import type { Stock } from "../(admin)/stocks/type";
import { mockUsers } from "./users";

// ユーザーIDを簡単に参照できるようにオブジェクトを作成
const USER_IDS = {
	YAMADA: mockUsers[0].userId, // 山田広斗
	SATO: mockUsers[1].userId, // 佐藤正樹
	TANAKA: mockUsers[2].userId, // 田中勇気
	SUZUKI: mockUsers[10].userId, // 鈴木一郎
	WATANABE: mockUsers[5].userId, // 渡辺健太
};

// 現在の年月を取得して棚卸し日付に設定するためのヘルパー関数
const getCurrentMonthDate = (): string => {
	const now = new Date();
	return new Date(now.getFullYear(), now.getMonth(), 2).toISOString();
};

// 今月の棚卸し日付
const currentMonthDate = getCurrentMonthDate();

export const mockStocks: Stock[] = [
	// ビール・酒類（今月の棚卸し実施済み）
	{
		stockId: "00000000-0000-4000-0000-000000000001",
		name: "アサヒスーパードライ 350ml缶",
		janCode: "4901004101839",
		setCount: 24,
		stockHistories: [
			{
				quantity: 120,
				fraction: 0,
				date: currentMonthDate,
				setCount: 24,
				userId: USER_IDS.YAMADA,
			},
		],
	},
	{
		stockId: "00000000-0000-4000-0000-000000000002",
		name: "キリン一番搾り 350ml缶",
		janCode: "4901411001035",
		setCount: 24,
		stockHistories: [],
	},
	{
		stockId: "00000000-0000-4000-0000-000000000003",
		name: "サントリープレミアムモルツ 350ml缶",
		janCode: "4901777001037",
		setCount: 24,
		stockHistories: [
			{
				quantity: 88,
				fraction: 16,
				date: currentMonthDate,
				setCount: 24,
				userId: USER_IDS.SUZUKI,
			},
		],
	},
	{
		stockId: "00000000-0000-4000-0000-000000000004",
		name: "アサヒスーパードライ 500ml缶",
		janCode: "4901004101846",
		setCount: 24,
		stockHistories: [],
	},
	{
		stockId: "00000000-0000-4000-0000-000000000005",
		name: "キリン一番搾り 500ml缶",
		janCode: "4901411001042",
		setCount: 24,
		stockHistories: [],
	},

	// スナック類（履歴1件）
	{
		stockId: "00000000-0000-4000-0000-000000000006",
		name: "ポテトチップス コンソメパンチ 80g",
		janCode: "4901330500436",
		setCount: 12,
		stockHistories: [
			{
				quantity: 45,
				fraction: 9,
				date: currentMonthDate,
				setCount: 12,
				userId: USER_IDS.YAMADA,
			},
			{
				quantity: 200,
				fraction: 8,
				date: "2024-04-01T10:30:00.000Z",
				setCount: 12,
				userId: USER_IDS.YAMADA,
			},
		],
	},
	{
		stockId: "00000000-0000-4000-0000-000000000007",
		name: "ポテトチップス うすしお味 80g",
		janCode: "4901330500429",
		setCount: 12,
		stockHistories: [
			{
				quantity: 180,
				fraction: 4,
				date: "2024-04-01T11:00:00.000Z",
				setCount: 12,
				userId: USER_IDS.WATANABE,
			},
		],
	},
	{
		stockId: "00000000-0000-4000-0000-000000000008",
		name: "ポテトチップス のりしお 80g",
		janCode: "4901330500443",
		setCount: 12,
		stockHistories: [
			{
				quantity: 150,
				fraction: 6,
				date: "2024-04-01T11:30:00.000Z",
				setCount: 12,
				userId: USER_IDS.TANAKA,
			},
		],
	},
	{
		stockId: "00000000-0000-4000-0000-000000000009",
		name: "じゃがりこ サラダ味",
		janCode: "4901330500450",
		setCount: 12,
		stockHistories: [
			{
				quantity: 220,
				fraction: 4,
				date: getCurrentMonthDate(),
				setCount: 12,
				userId: USER_IDS.SUZUKI,
			},
			{
				quantity: 220,
				fraction: 4,
				date: "2024-04-01T12:00:00.000Z",
				setCount: 12,
				userId: USER_IDS.SUZUKI,
			},
		],
	},
	{
		stockId: "00000000-0000-4000-0000-000000000010",
		name: "じゃがりこ チーズ味",
		janCode: "4901330500467",
		setCount: 12,
		stockHistories: [
			{
				quantity: 180,
				fraction: 2,
				date: "2024-04-01T12:30:00.000Z",
				setCount: 12,
				userId: USER_IDS.SATO,
			},
		],
	},

	// 飲料（履歴複数件）
	{
		stockId: "00000000-0000-4000-0000-000000000011",
		name: "コカ・コーラ 500mlペットボトル",
		janCode: "4902102000161",
		setCount: 24,
		stockHistories: [
			{
				quantity: 300,
				fraction: 0,
				date: "2024-04-01T11:30:00.000Z",
				setCount: 24,
				userId: USER_IDS.TANAKA,
			},
			{
				quantity: 280,
				fraction: 12,
				date: "2024-03-01T11:30:00.000Z",
				setCount: 24,
				userId: USER_IDS.SUZUKI,
			},
			{
				quantity: 250,
				fraction: 6,
				date: "2024-02-01T11:30:00.000Z",
				setCount: 24,
				userId: USER_IDS.SATO,
			},
		],
	},
	{
		stockId: "00000000-0000-4000-0000-000000000012",
		name: "ファンタオレンジ 500mlペットボトル",
		janCode: "4902102000321",
		setCount: 24,
		stockHistories: [
			{
				quantity: 150,
				fraction: 12,
				date: "2024-04-01T12:00:00.000Z",
				setCount: 24,
				userId: USER_IDS.SUZUKI,
			},
			{
				quantity: 140,
				fraction: 8,
				date: "2024-03-01T12:00:00.000Z",
				setCount: 24,
				userId: USER_IDS.YAMADA,
			},
		],
	},

	// インスタント食品（履歴なし）
	{
		stockId: "00000000-0000-4000-0000-000000000013",
		name: "カップヌードル",
		janCode: "4902105001013",
		setCount: 12,
		stockHistories: [],
	},
	{
		stockId: "00000000-0000-4000-0000-000000000014",
		name: "カップヌードル シーフード",
		janCode: "4902105001020",
		setCount: 12,
		stockHistories: [],
	},
	{
		stockId: "00000000-0000-4000-0000-000000000015",
		name: "カップヌードル カレー",
		janCode: "4902105001037",
		setCount: 12,
		stockHistories: [],
	},

	// お菓子（履歴1件）
	{
		stockId: "00000000-0000-4000-0000-000000000016",
		name: "キットカット ミニ 12枚入り",
		janCode: "4902201001014",
		setCount: 12,
		stockHistories: [
			{
				quantity: 180,
				fraction: 6,
				date: "2024-04-01T15:30:00.000Z",
				setCount: 12,
				userId: USER_IDS.YAMADA,
			},
		],
	},
	{
		stockId: "00000000-0000-4000-0000-000000000017",
		name: "明治 ミルクチョコレート",
		janCode: "4902777001018",
		setCount: 10,
		stockHistories: [
			{
				quantity: 250,
				fraction: 5,
				date: "2024-04-01T15:00:00.000Z",
				setCount: 10,
				userId: USER_IDS.SATO,
			},
		],
	},

	// 調味料（履歴複数件）
	{
		stockId: "00000000-0000-4000-0000-000000000018",
		name: "キッコーマン しょうゆ 1L",
		janCode: "4901515001025",
		setCount: 12,
		stockHistories: [
			{
				quantity: 120,
				fraction: 4,
				date: "2024-04-01T14:00:00.000Z",
				setCount: 12,
				userId: USER_IDS.TANAKA,
			},
			{
				quantity: 100,
				fraction: 8,
				date: "2024-03-01T14:00:00.000Z",
				setCount: 12,
				userId: USER_IDS.SUZUKI,
			},
		],
	},
	{
		stockId: "00000000-0000-4000-0000-000000000019",
		name: "味の素 1kg",
		janCode: "4901515002032",
		setCount: 10,
		stockHistories: [
			{
				quantity: 80,
				fraction: 2,
				date: "2024-04-01T14:30:00.000Z",
				setCount: 10,
				userId: USER_IDS.SATO,
			},
			{
				quantity: 75,
				fraction: 5,
				date: "2024-03-01T14:30:00.000Z",
				setCount: 10,
				userId: USER_IDS.YAMADA,
			},
			{
				quantity: 70,
				fraction: 0,
				date: "2024-02-01T14:30:00.000Z",
				setCount: 10,
				userId: USER_IDS.WATANABE,
			},
		],
	},

	// 以下同様のパターンで30件追加...
	{
		stockId: "00000000-0000-4000-0000-000000000020",
		name: "サントリー 天然水 2L",
		janCode: "4901777002034",
		setCount: 6,
		stockHistories: [],
	},
	{
		stockId: "00000000-0000-4000-0000-000000000021",
		name: "伊右衛門 500mlペットボトル",
		janCode: "4901777002041",
		setCount: 24,
		stockHistories: [
			{
				quantity: 200,
				fraction: 0,
				date: "2024-04-01T13:00:00.000Z",
				setCount: 24,
				userId: USER_IDS.TANAKA,
			},
		],
	},
	{
		stockId: "00000000-0000-4000-0000-000000000022",
		name: "午後の紅茶 レモンティー 500ml",
		janCode: "4901777002058",
		setCount: 24,
		stockHistories: [],
	},
	{
		stockId: "00000000-0000-4000-0000-000000000023",
		name: "カルビー フルグラ 800g",
		janCode: "4901330500481",
		setCount: 6,
		stockHistories: [
			{
				quantity: 90,
				fraction: 2,
				date: "2024-04-01T13:30:00.000Z",
				setCount: 6,
				userId: USER_IDS.SUZUKI,
			},
			{
				quantity: 85,
				fraction: 4,
				date: "2024-03-01T13:30:00.000Z",
				setCount: 6,
				userId: USER_IDS.YAMADA,
			},
		],
	},
	{
		stockId: "00000000-0000-4000-0000-000000000024",
		name: "日清 チキンラーメン 5食パック",
		janCode: "4902105002027",
		setCount: 6,
		stockHistories: [],
	},
	{
		stockId: "00000000-0000-4000-0000-000000000025",
		name: "サッポロ一番 塩ラーメン 5食パック",
		janCode: "4901734001022",
		setCount: 6,
		stockHistories: [
			{
				quantity: 110,
				fraction: 3,
				date: "2024-04-01T14:00:00.000Z",
				setCount: 6,
				userId: USER_IDS.SATO,
			},
		],
	},
	{
		stockId: "00000000-0000-4000-0000-000000000026",
		name: "マルちゃん 赤いきつねうどん",
		janCode: "4901990001015",
		setCount: 12,
		stockHistories: [
			{
				quantity: 160,
				fraction: 4,
				date: "2024-04-01T14:30:00.000Z",
				setCount: 12,
				userId: USER_IDS.WATANABE,
			},
			{
				quantity: 150,
				fraction: 6,
				date: "2024-03-01T14:30:00.000Z",
				setCount: 12,
				userId: USER_IDS.TANAKA,
			},
		],
	},
	{
		stockId: "00000000-0000-4000-0000-000000000027",
		name: "マルちゃん 緑のたぬき天そば",
		janCode: "4901990001022",
		setCount: 12,
		stockHistories: [],
	},
	{
		stockId: "00000000-0000-4000-0000-000000000028",
		name: "ハウス バーモントカレー 甘口",
		janCode: "4902402001018",
		setCount: 10,
		stockHistories: [
			{
				quantity: 75,
				fraction: 5,
				date: "2024-04-01T15:00:00.000Z",
				setCount: 10,
				userId: USER_IDS.SUZUKI,
			},
		],
	},
	{
		stockId: "00000000-0000-4000-0000-000000000029",
		name: "ハウス バーモントカレー 中辛",
		janCode: "4902402001025",
		setCount: 10,
		stockHistories: [
			{
				quantity: 80,
				fraction: 2,
				date: "2024-04-01T15:30:00.000Z",
				setCount: 10,
				userId: USER_IDS.SATO,
			},
			{
				quantity: 70,
				fraction: 8,
				date: "2024-03-01T15:30:00.000Z",
				setCount: 10,
				userId: USER_IDS.YAMADA,
			},
		],
	},
	{
		stockId: "00000000-0000-4000-0000-000000000030",
		name: "ハウス バーモントカレー 辛口",
		janCode: "4902402001032",
		setCount: 10,
		stockHistories: [],
	},
	{
		stockId: "00000000-0000-4000-0000-000000000031",
		name: "S&B カレー粉 400g",
		janCode: "4901002001017",
		setCount: 12,
		stockHistories: [
			{
				quantity: 57,
				fraction: 5,
				date: getCurrentMonthDate(),
				setCount: 12,
				userId: USER_IDS.WATANABE,
			},
			{
				quantity: 60,
				fraction: 6,
				date: "2024-04-01T16:00:00.000Z",
				setCount: 12,
				userId: USER_IDS.WATANABE,
			},
			{
				quantity: 58,
				fraction: 4,
				date: "2024-03-15T14:30:00.000Z",
				setCount: 12,
				userId: USER_IDS.TANAKA,
			},
			{
				quantity: 62,
				fraction: 2,
				date: "2024-03-01T09:45:00.000Z",
				setCount: 12,
				userId: USER_IDS.SATO,
			},
			{
				quantity: 65,
				fraction: 5,
				date: "2024-02-15T11:20:00.000Z",
				setCount: 12,
				userId: USER_IDS.YAMADA,
			},
			{
				quantity: 59,
				fraction: 7,
				date: "2024-02-01T13:15:00.000Z",
				setCount: 12,
				userId: USER_IDS.SUZUKI,
			},
			{
				quantity: 63,
				fraction: 3,
				date: "2024-01-15T10:30:00.000Z",
				setCount: 12,
				userId: USER_IDS.WATANABE,
			},
			{
				quantity: 61,
				fraction: 1,
				date: "2024-01-01T15:45:00.000Z",
				setCount: 12,
				userId: USER_IDS.TANAKA,
			},
			{
				quantity: 57,
				fraction: 9,
				date: "2023-12-15T16:20:00.000Z",
				setCount: 12,
				userId: USER_IDS.SATO,
			},
			{
				quantity: 64,
				fraction: 4,
				date: "2023-12-01T08:50:00.000Z",
				setCount: 12,
				userId: USER_IDS.YAMADA,
			},
			{
				quantity: 60,
				fraction: 0,
				date: "2023-11-15T14:10:00.000Z",
				setCount: 12,
				userId: USER_IDS.SUZUKI,
			},
			{
				quantity: 62,
				fraction: 6,
				date: "2023-11-01T11:35:00.000Z",
				setCount: 12,
				userId: USER_IDS.WATANABE,
			},
			{
				quantity: 59,
				fraction: 3,
				date: "2023-10-15T09:25:00.000Z",
				setCount: 12,
				userId: USER_IDS.TANAKA,
			},
			{
				quantity: 61,
				fraction: 7,
				date: "2023-10-01T13:40:00.000Z",
				setCount: 12,
				userId: USER_IDS.SATO,
			},
			{
				quantity: 63,
				fraction: 5,
				date: "2023-09-15T15:15:00.000Z",
				setCount: 12,
				userId: USER_IDS.YAMADA,
			},
			{
				quantity: 58,
				fraction: 2,
				date: "2023-09-01T10:50:00.000Z",
				setCount: 12,
				userId: USER_IDS.SUZUKI,
			},
			{
				quantity: 64,
				fraction: 8,
				date: "2023-08-15T14:05:00.000Z",
				setCount: 12,
				userId: USER_IDS.WATANABE,
			},
			{
				quantity: 60,
				fraction: 4,
				date: "2023-08-01T11:30:00.000Z",
				setCount: 12,
				userId: USER_IDS.TANAKA,
			},
			{
				quantity: 62,
				fraction: 0,
				date: "2023-07-15T16:45:00.000Z",
				setCount: 12,
				userId: USER_IDS.SATO,
			},
			{
				quantity: 59,
				fraction: 6,
				date: "2023-07-01T09:20:00.000Z",
				setCount: 12,
				userId: USER_IDS.YAMADA,
			},
			{
				quantity: 61,
				fraction: 3,
				date: "2023-06-15T13:55:00.000Z",
				setCount: 12,
				userId: USER_IDS.SUZUKI,
			},
			{
				quantity: 57,
				fraction: 5,
				date: "2023-06-01T10:15:00.000Z",
				setCount: 12,
				userId: USER_IDS.WATANABE,
			},
		],
	},
	{
		stockId: "00000000-0000-4000-0000-000000000032",
		name: "味の素 コンソメ 固形 21個入",
		janCode: "4901515002049",
		setCount: 12,
		stockHistories: [
			{
				quantity: 90,
				fraction: 3,
				date: "2024-04-01T16:30:00.000Z",
				setCount: 12,
				userId: USER_IDS.TANAKA,
			},
			{
				quantity: 85,
				fraction: 7,
				date: "2024-03-01T16:30:00.000Z",
				setCount: 12,
				userId: USER_IDS.SUZUKI,
			},
		],
	},
	{
		stockId: "00000000-0000-4000-0000-000000000033",
		name: "日清 カップヌードル シーフードヌードル ビッグ",
		janCode: "4902105001044",
		setCount: 12,
		stockHistories: [],
	},
	{
		stockId: "00000000-0000-4000-0000-000000000034",
		name: "日清 カップヌードル カレー ビッグ",
		janCode: "4902105001051",
		setCount: 12,
		stockHistories: [
			{
				quantity: 120,
				fraction: 0,
				date: "2024-04-01T17:00:00.000Z",
				setCount: 12,
				userId: USER_IDS.SATO,
			},
		],
	},
	{
		stockId: "00000000-0000-4000-0000-000000000035",
		name: "明治 アーモンドチョコレート",
		janCode: "4902777001025",
		setCount: 10,
		stockHistories: [
			{
				quantity: 180,
				fraction: 4,
				date: "2024-04-01T17:30:00.000Z",
				setCount: 10,
				userId: USER_IDS.YAMADA,
			},
			{
				quantity: 170,
				fraction: 6,
				date: "2024-03-01T17:30:00.000Z",
				setCount: 10,
				userId: USER_IDS.WATANABE,
			},
		],
	},
	{
		stockId: "00000000-0000-4000-0000-000000000036",
		name: "カルビー ポテトチップス わさびのり 80g",
		janCode: "4901330500498",
		setCount: 12,
		stockHistories: [],
	},
	{
		stockId: "00000000-0000-4000-0000-000000000037",
		name: "カルビー ポテトチップス 九州しょうゆ 80g",
		janCode: "4901330500504",
		setCount: 12,
		stockHistories: [
			{
				quantity: 140,
				fraction: 8,
				date: "2024-04-01T18:00:00.000Z",
				setCount: 12,
				userId: USER_IDS.TANAKA,
			},
		],
	},
	{
		stockId: "00000000-0000-4000-0000-000000000038",
		name: "カルビー じゃがりこ 明太子味",
		janCode: "4901330500511",
		setCount: 12,
		stockHistories: [
			{
				quantity: 160,
				fraction: 4,
				date: "2024-04-01T18:30:00.000Z",
				setCount: 12,
				userId: USER_IDS.SUZUKI,
			},
			{
				quantity: 150,
				fraction: 6,
				date: "2024-03-01T18:30:00.000Z",
				setCount: 12,
				userId: USER_IDS.SATO,
			},
		],
	},
	{
		stockId: "00000000-0000-4000-0000-000000000039",
		name: "カルビー じゃがりこ チーズ味",
		janCode: "4901330500528",
		setCount: 12,
		stockHistories: [],
	},
	{
		stockId: "00000000-0000-4000-0000-000000000040",
		name: "森永 ダース ミルク",
		janCode: "4902888001016",
		setCount: 12,
		stockHistories: [
			{
				quantity: 200,
				fraction: 0,
				date: "2024-04-01T19:00:00.000Z",
				setCount: 12,
				userId: USER_IDS.YAMADA,
			},
		],
	},
	{
		stockId: "00000000-0000-4000-0000-000000000041",
		name: "森永 ダース ビター",
		janCode: "4902888001023",
		setCount: 12,
		stockHistories: [
			{
				quantity: 180,
				fraction: 6,
				date: "2024-04-01T19:30:00.000Z",
				setCount: 12,
				userId: USER_IDS.WATANABE,
			},
			{
				quantity: 170,
				fraction: 8,
				date: "2024-03-01T19:30:00.000Z",
				setCount: 12,
				userId: USER_IDS.TANAKA,
			},
		],
	},
	{
		stockId: "00000000-0000-4000-0000-000000000042",
		name: "森永 ダース ホワイト",
		janCode: "4902888001030",
		setCount: 12,
		stockHistories: [],
	},
	{
		stockId: "00000000-0000-4000-0000-000000000043",
		name: "UCC 職人の珈琲 無糖 930ml",
		janCode: "4901201001017",
		setCount: 12,
		stockHistories: [
			{
				quantity: 120,
				fraction: 4,
				date: getCurrentMonthDate(),
				setCount: 12,
				userId: USER_IDS.SUZUKI,
			},
		],
	},
	{
		stockId: "00000000-0000-4000-0000-000000000044",
		name: "UCC 職人の珈琲 微糖 930ml",
		janCode: "4901201001024",
		setCount: 12,
		stockHistories: [
			{
				quantity: 110,
				fraction: 2,
				date: "2024-04-01T20:30:00.000Z",
				setCount: 12,
				userId: USER_IDS.SATO,
			},
			{
				quantity: 100,
				fraction: 8,
				date: "2024-03-01T20:30:00.000Z",
				setCount: 12,
				userId: USER_IDS.YAMADA,
			},
		],
	},
	{
		stockId: "00000000-0000-4000-0000-000000000045",
		name: "UCC 職人の珈琲 カフェオレ 930ml",
		janCode: "4901201001031",
		setCount: 12,
		stockHistories: [],
	},
	{
		stockId: "00000000-0000-4000-0000-000000000046",
		name: "日清 カップヌードル 醤油 ミニ 3食パック",
		janCode: "4902105001068",
		setCount: 8,
		stockHistories: [
			{
				quantity: 150,
				fraction: 6,
				date: "2024-04-01T21:00:00.000Z",
				setCount: 8,
				userId: USER_IDS.WATANABE,
			},
		],
	},
	{
		stockId: "00000000-0000-4000-0000-000000000047",
		name: "日清 カップヌードル シーフード ミニ 3食パック",
		janCode: "4902105001075",
		setCount: 8,
		stockHistories: [
			{
				quantity: 140,
				fraction: 4,
				date: "2024-04-01T21:30:00.000Z",
				setCount: 8,
				userId: USER_IDS.TANAKA,
			},
			{
				quantity: 130,
				fraction: 2,
				date: "2024-03-01T21:30:00.000Z",
				setCount: 8,
				userId: USER_IDS.SUZUKI,
			},
		],
	},
	{
		stockId: "00000000-0000-4000-0000-000000000048",
		name: "日清 カップヌードル カレー ミニ 3食パック",
		janCode: "4902105001082",
		setCount: 8,
		stockHistories: [],
	},
	{
		stockId: "00000000-0000-4000-0000-000000000049",
		name: "サントリー ボス レインボーマウンテン 185g",
		janCode: "4901777002065",
		setCount: 30,
		stockHistories: [
			{
				quantity: 250,
				fraction: 0,
				date: "2024-04-01T22:00:00.000Z",
				setCount: 30,
				userId: USER_IDS.SATO,
			},
		],
	},
	{
		stockId: "00000000-0000-4000-0000-000000000050",
		name: "サントリー ボス ブラック 185g",
		janCode: "4901777002072",
		setCount: 30,
		stockHistories: [
			{
				quantity: 280,
				fraction: 10,
				date: "2024-04-01T22:30:00.000Z",
				setCount: 30,
				userId: USER_IDS.YAMADA,
			},
			{
				quantity: 260,
				fraction: 20,
				date: "2024-03-01T22:30:00.000Z",
				setCount: 30,
				userId: USER_IDS.WATANABE,
			},
		],
	},
	{
		stockId: "00000000-0000-4000-0000-000000000051",
		name: "サントリー プレミアムボス ブラック 390ml",
		janCode: "4901777002089",
		setCount: 24,
		stockHistories: [
			{
				quantity: 300,
				fraction: 0,
				date: "2024-04-01T10:00:00.000Z",
				setCount: 24,
				userId: USER_IDS.YAMADA,
			},
			{
				quantity: 290,
				fraction: 12,
				date: "2024-03-01T10:00:00.000Z",
				setCount: 24,
				userId: USER_IDS.SATO,
			},
			{
				quantity: 280,
				fraction: 6,
				date: "2024-02-01T10:00:00.000Z",
				setCount: 24,
				userId: USER_IDS.TANAKA,
			},
			{
				quantity: 270,
				fraction: 18,
				date: "2024-01-01T10:00:00.000Z",
				setCount: 24,
				userId: USER_IDS.SUZUKI,
			},
			{
				quantity: 260,
				fraction: 0,
				date: "2023-12-01T10:00:00.000Z",
				setCount: 24,
				userId: USER_IDS.WATANABE,
			},
			{
				quantity: 250,
				fraction: 12,
				date: "2023-11-01T10:00:00.000Z",
				setCount: 24,
				userId: USER_IDS.YAMADA,
			},
			{
				quantity: 240,
				fraction: 6,
				date: "2023-10-01T10:00:00.000Z",
				setCount: 24,
				userId: USER_IDS.SATO,
			},
			{
				quantity: 230,
				fraction: 18,
				date: "2023-09-01T10:00:00.000Z",
				setCount: 24,
				userId: USER_IDS.TANAKA,
			},
			{
				quantity: 220,
				fraction: 0,
				date: "2023-08-01T10:00:00.000Z",
				setCount: 24,
				userId: USER_IDS.SUZUKI,
			},
			{
				quantity: 210,
				fraction: 12,
				date: "2023-07-01T10:00:00.000Z",
				setCount: 24,
				userId: USER_IDS.WATANABE,
			},
			{
				quantity: 200,
				fraction: 6,
				date: "2023-06-01T10:00:00.000Z",
				setCount: 24,
				userId: USER_IDS.YAMADA,
			},
			{
				quantity: 190,
				fraction: 18,
				date: "2023-05-01T10:00:00.000Z",
				setCount: 24,
				userId: USER_IDS.SATO,
			},
			{
				quantity: 180,
				fraction: 0,
				date: "2023-04-01T10:00:00.000Z",
				setCount: 24,
				userId: USER_IDS.TANAKA,
			},
			{
				quantity: 170,
				fraction: 12,
				date: "2023-03-01T10:00:00.000Z",
				setCount: 24,
				userId: USER_IDS.SUZUKI,
			},
			{
				quantity: 160,
				fraction: 6,
				date: "2023-02-01T10:00:00.000Z",
				setCount: 24,
				userId: USER_IDS.WATANABE,
			},
			{
				quantity: 150,
				fraction: 18,
				date: "2023-01-01T10:00:00.000Z",
				setCount: 24,
				userId: USER_IDS.YAMADA,
			},
			{
				quantity: 140,
				fraction: 0,
				date: "2022-12-01T10:00:00.000Z",
				setCount: 24,
				userId: USER_IDS.SATO,
			},
			{
				quantity: 130,
				fraction: 12,
				date: "2022-11-01T10:00:00.000Z",
				setCount: 24,
				userId: USER_IDS.TANAKA,
			},
			{
				quantity: 120,
				fraction: 6,
				date: "2022-10-01T10:00:00.000Z",
				setCount: 24,
				userId: USER_IDS.SUZUKI,
			},
			{
				quantity: 110,
				fraction: 18,
				date: "2022-09-01T10:00:00.000Z",
				setCount: 24,
				userId: USER_IDS.WATANABE,
			},
			{
				quantity: 100,
				fraction: 0,
				date: "2022-08-01T10:00:00.000Z",
				setCount: 24,
				userId: USER_IDS.YAMADA,
			},
			{
				quantity: 90,
				fraction: 12,
				date: "2022-07-01T10:00:00.000Z",
				setCount: 24,
				userId: USER_IDS.SATO,
			},
			{
				quantity: 80,
				fraction: 6,
				date: "2022-06-01T10:00:00.000Z",
				setCount: 24,
				userId: USER_IDS.TANAKA,
			},
			{
				quantity: 70,
				fraction: 18,
				date: "2022-05-01T10:00:00.000Z",
				setCount: 24,
				userId: USER_IDS.SUZUKI,
			},
		],
	},
	{
		stockId: "00000000-0000-4000-0000-000000000052",
		name: "コカ・コーラ ゼロ 500mlペットボトル",
		janCode: "4902102000178",
		setCount: 24,
		stockHistories: [
			{
				quantity: 400,
				fraction: 0,
				date: "2024-04-01T11:00:00.000Z",
				setCount: 24,
				userId: USER_IDS.YAMADA,
			},
			{
				quantity: 380,
				fraction: 12,
				date: "2024-03-01T11:00:00.000Z",
				setCount: 24,
				userId: USER_IDS.SATO,
			},
			{
				quantity: 360,
				fraction: 6,
				date: "2024-02-01T11:00:00.000Z",
				setCount: 24,
				userId: USER_IDS.TANAKA,
			},
			{
				quantity: 340,
				fraction: 18,
				date: "2024-01-01T11:00:00.000Z",
				setCount: 24,
				userId: USER_IDS.SUZUKI,
			},
			{
				quantity: 320,
				fraction: 0,
				date: "2023-12-01T11:00:00.000Z",
				setCount: 24,
				userId: USER_IDS.WATANABE,
			},
			{
				quantity: 300,
				fraction: 12,
				date: "2023-11-01T11:00:00.000Z",
				setCount: 24,
				userId: USER_IDS.YAMADA,
			},
			{
				quantity: 280,
				fraction: 6,
				date: "2023-10-01T11:00:00.000Z",
				setCount: 24,
				userId: USER_IDS.SATO,
			},
			{
				quantity: 260,
				fraction: 18,
				date: "2023-09-01T11:00:00.000Z",
				setCount: 24,
				userId: USER_IDS.TANAKA,
			},
			{
				quantity: 240,
				fraction: 0,
				date: "2023-08-01T11:00:00.000Z",
				setCount: 24,
				userId: USER_IDS.SUZUKI,
			},
			{
				quantity: 220,
				fraction: 12,
				date: "2023-07-01T11:00:00.000Z",
				setCount: 24,
				userId: USER_IDS.WATANABE,
			},
			{
				quantity: 200,
				fraction: 6,
				date: "2023-06-01T11:00:00.000Z",
				setCount: 24,
				userId: USER_IDS.YAMADA,
			},
			{
				quantity: 180,
				fraction: 18,
				date: "2023-05-01T11:00:00.000Z",
				setCount: 24,
				userId: USER_IDS.SATO,
			},
			{
				quantity: 160,
				fraction: 0,
				date: "2023-04-01T11:00:00.000Z",
				setCount: 24,
				userId: USER_IDS.TANAKA,
			},
			{
				quantity: 140,
				fraction: 12,
				date: "2023-03-01T11:00:00.000Z",
				setCount: 24,
				userId: USER_IDS.SUZUKI,
			},
			{
				quantity: 120,
				fraction: 6,
				date: "2023-02-01T11:00:00.000Z",
				setCount: 24,
				userId: USER_IDS.WATANABE,
			},
			{
				quantity: 100,
				fraction: 18,
				date: "2023-01-01T11:00:00.000Z",
				setCount: 24,
				userId: USER_IDS.YAMADA,
			},
			{
				quantity: 80,
				fraction: 0,
				date: "2022-12-01T11:00:00.000Z",
				setCount: 24,
				userId: USER_IDS.SATO,
			},
			{
				quantity: 60,
				fraction: 12,
				date: "2022-11-01T11:00:00.000Z",
				setCount: 24,
				userId: USER_IDS.TANAKA,
			},
			{
				quantity: 40,
				fraction: 6,
				date: "2022-10-01T11:00:00.000Z",
				setCount: 24,
				userId: USER_IDS.SUZUKI,
			},
			{
				quantity: 20,
				fraction: 18,
				date: "2022-09-01T11:00:00.000Z",
				setCount: 24,
				userId: USER_IDS.WATANABE,
			},
			{
				quantity: 10,
				fraction: 0,
				date: "2022-08-01T11:00:00.000Z",
				setCount: 24,
				userId: USER_IDS.YAMADA,
			},
			{
				quantity: 5,
				fraction: 12,
				date: "2022-07-01T11:00:00.000Z",
				setCount: 24,
				userId: USER_IDS.SATO,
			},
		],
	},
] as const;
