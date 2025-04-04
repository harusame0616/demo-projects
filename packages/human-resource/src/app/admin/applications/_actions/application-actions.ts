"use server";

import type { Pagination } from "@/lib/pagination";
import type { ApplicationStatus, ApplicationType } from "../application";
import type { SearchQuery } from "../search-query";

// 申請データの型定義
export interface Application {
	id: string;
	type: ApplicationType;
	employeeId: string;
	employeeName: string;
	submittedDate: string;
	targetDate: string;
	content: string;
	reason: string;
	status: ApplicationStatus;
	approvedDate?: string;
	approvedBy?: string;
	comment?: string;
}

// 検索パラメータの型定義
export interface ApplicationSearchParams {
	query?: string;
	type?: string;
	status?: string;
	date?: string;
	page?: string;
}

// モックデータ
const pendingApplications: Application[] = [
	{
		id: "app-001",
		type: "attendance_correction",
		employeeId: "emp-001",
		employeeName: "佐藤太郎",
		submittedDate: "2023-04-10",
		targetDate: "2023-04-08",
		content: "出勤：9:00 → 8:30",
		reason: "電車遅延のため、実際は8:30に出社していました。",
		status: "pending",
	},
	{
		id: "app-002",
		type: "paid_holiday",
		employeeId: "emp-002",
		employeeName: "鈴木花子",
		submittedDate: "2023-04-12",
		targetDate: "2023-04-20",
		content: "有給休暇：1日",
		reason: "私用のため",
		status: "pending",
	},
	{
		id: "app-003",
		type: "paid_holiday",
		employeeId: "emp-003",
		employeeName: "田中誠",
		submittedDate: "2023-04-14",
		targetDate: "2023-04-21",
		content: "有給休暇：1日",
		reason: "自宅での作業環境が整ったため",
		status: "pending",
	},
	{
		id: "app-004",
		type: "attendance_correction",
		employeeId: "emp-004",
		employeeName: "伊藤健太",
		submittedDate: "2023-04-15",
		targetDate: "2023-04-15",
		content: "退勤：18:00 → 21:00",
		reason: "プロジェクト締め切りのため",
		status: "pending",
	},
	{
		id: "app-005",
		type: "paid_holiday",
		employeeId: "emp-005",
		employeeName: "山本美咲",
		submittedDate: "2023-04-16",
		targetDate: "2023-04-25",
		content: "有給休暇：1日",
		reason: "クライアントミーティングのため",
		status: "pending",
	},
	// 追加データ
	{
		id: "app-006",
		type: "paid_holiday",
		employeeId: "emp-006",
		employeeName: "中村正人",
		submittedDate: "2023-04-16",
		targetDate: "2023-04-22",
		content: "有給休暇：1日",
		reason: "家族の用事のため",
		status: "pending",
	},
	{
		id: "app-007",
		type: "attendance_correction",
		employeeId: "emp-007",
		employeeName: "小林裕子",
		submittedDate: "2023-04-17",
		targetDate: "2023-04-15",
		content: "退勤：18:00 → 19:30",
		reason: "システム障害対応のため残業しました",
		status: "pending",
	},
	{
		id: "app-008",
		type: "paid_holiday",
		employeeId: "emp-008",
		employeeName: "加藤聡",
		submittedDate: "2023-04-17",
		targetDate: "2023-04-24",
		content: "有給休暇：3日間",
		reason: "在宅での集中作業が必要なタスクのため",
		status: "pending",
	},
	{
		id: "app-009",
		type: "attendance_correction",
		employeeId: "emp-009",
		employeeName: "吉田直樹",
		submittedDate: "2023-04-18",
		targetDate: "2023-04-20",
		content: "退勤：18:00 → 20:00",
		reason: "月末レポート作成のため",
		status: "pending",
	},
	{
		id: "app-010",
		type: "paid_holiday",
		employeeId: "emp-010",
		employeeName: "松本恵",
		submittedDate: "2023-04-18",
		targetDate: "2023-04-27",
		content: "有給休暇：3日間",
		reason: "新規顧客との商談のため",
		status: "pending",
	},
	{
		id: "app-011",
		type: "paid_holiday",
		employeeId: "emp-011",
		employeeName: "高橋俊介",
		submittedDate: "2023-04-19",
		targetDate: "2023-05-01",
		content: "有給休暇：2日間",
		reason: "連休を利用した旅行のため",
		status: "pending",
	},
	{
		id: "app-012",
		type: "attendance_correction",
		employeeId: "emp-012",
		employeeName: "渡辺明",
		submittedDate: "2023-04-20",
		targetDate: "2023-04-19",
		content: "出勤：9:00 → 9:30",
		reason: "通勤電車の遅延のため",
		status: "pending",
	},
	{
		id: "app-013",
		type: "paid_holiday",
		employeeId: "emp-013",
		employeeName: "斎藤真理子",
		submittedDate: "2023-04-21",
		targetDate: "2023-04-28",
		content: "有給休暇：1日",
		reason: "自宅での作業が効率的なタスクのため",
		status: "pending",
	},
	{
		id: "app-014",
		type: "attendance_correction",
		employeeId: "emp-014",
		employeeName: "近藤拓也",
		submittedDate: "2023-04-21",
		targetDate: "2023-04-25",
		content: "退勤：18:00 → 22:00",
		reason: "システムリリース前の最終チェックのため",
		status: "pending",
	},
	{
		id: "app-015",
		type: "paid_holiday",
		employeeId: "emp-015",
		employeeName: "井上雅彦",
		submittedDate: "2023-04-22",
		targetDate: "2023-05-10",
		content: "有給休暇：1日",
		reason: "パートナー企業との打ち合わせのため",
		status: "pending",
	},
	{
		id: "app-016",
		type: "paid_holiday",
		employeeId: "emp-016",
		employeeName: "木村典子",
		submittedDate: "2023-04-23",
		targetDate: "2023-05-15",
		content: "有給休暇：1日",
		reason: "健康診断のため",
		status: "pending",
	},
	{
		id: "app-017",
		type: "attendance_correction",
		employeeId: "emp-017",
		employeeName: "林孝之",
		submittedDate: "2023-04-24",
		targetDate: "2023-04-21",
		content: "退勤：17:30 → 18:45",
		reason: "クライアント対応で遅くなりました",
		status: "pending",
	},
	{
		id: "app-018",
		type: "paid_holiday",
		employeeId: "emp-018",
		employeeName: "山田由美",
		submittedDate: "2023-04-24",
		targetDate: "2023-05-02",
		content: "有給休暇：3日間",
		reason: "連休中の業務継続のため",
		status: "pending",
	},
	{
		id: "app-019",
		type: "attendance_correction",
		employeeId: "emp-019",
		employeeName: "清水謙太",
		submittedDate: "2023-04-25",
		targetDate: "2023-04-30",
		content: "退勤：18:00 → 21:00",
		reason: "月末処理対応のため",
		status: "pending",
	},
	{
		id: "app-020",
		type: "paid_holiday",
		employeeId: "emp-020",
		employeeName: "村上理沙",
		submittedDate: "2023-04-26",
		targetDate: "2023-05-08",
		content: "有給休暇：4日間",
		reason: "新規支店開設準備のため",
		status: "pending",
	},
];

// 承認済み/拒否済み申請のモックデータ
const approvedApplications: Application[] = [
	{
		id: "app-101",
		type: "paid_holiday",
		employeeId: "emp-001",
		employeeName: "佐藤太郎",
		submittedDate: "2023-03-15",
		targetDate: "2023-03-20",
		content: "有給休暇：1日",
		reason: "私用のため",
		status: "approved",
		approvedDate: "2023-03-16",
		approvedBy: "上司A",
		comment: "承認します。業務引継ぎをお願いします。",
	},
	{
		id: "app-102",
		type: "paid_holiday",
		employeeId: "emp-002",
		employeeName: "鈴木花子",
		submittedDate: "2023-03-18",
		targetDate: "2023-03-25",
		content: "有給休暇：1日",
		reason: "在宅での作業効率向上のため",
		status: "approved",
		approvedDate: "2023-03-19",
		approvedBy: "上司B",
		comment: "承認します。オンラインミーティングの設定をお願いします。",
	},
	{
		id: "app-103",
		type: "attendance_correction",
		employeeId: "emp-003",
		employeeName: "田中誠",
		submittedDate: "2023-03-20",
		targetDate: "2023-03-22",
		content: "退勤：18:00 → 20:00",
		reason: "納期対応のため",
		status: "approved",
		approvedDate: "2023-03-21",
		approvedBy: "上司C",
		comment: "承認します。健康管理に気をつけてください。",
	},
	{
		id: "app-104",
		type: "paid_holiday",
		employeeId: "emp-004",
		employeeName: "伊藤健太",
		submittedDate: "2023-03-22",
		targetDate: "2023-03-28",
		content: "有給休暇：2日間",
		reason: "取引先訪問のため",
		status: "rejected",
		approvedDate: "2023-03-23",
		approvedBy: "上司D",
		comment:
			"新型コロナウイルス感染拡大のため、出張は延期してください。オンライン会議での対応を検討してください。",
	},
	{
		id: "app-105",
		type: "attendance_correction",
		employeeId: "emp-005",
		employeeName: "山本美咲",
		submittedDate: "2023-03-25",
		targetDate: "2023-03-24",
		content: "出勤：9:00 → 8:45",
		reason: "実際には8:45に出社していました",
		status: "approved",
		approvedDate: "2023-03-26",
		approvedBy: "上司E",
		comment: "確認しました。修正を承認します。",
	},
	// 追加データ
	{
		id: "app-106",
		type: "paid_holiday",
		employeeId: "emp-006",
		employeeName: "中村正人",
		submittedDate: "2023-03-26",
		targetDate: "2023-04-01",
		content: "有給休暇：1日",
		reason: "私用のため",
		status: "approved",
		approvedDate: "2023-03-27",
		approvedBy: "上司A",
		comment: "承認します。月初めの業務は前日に引き継ぎをお願いします。",
	},
	{
		id: "app-107",
		type: "paid_holiday",
		employeeId: "emp-007",
		employeeName: "小林裕子",
		submittedDate: "2023-03-27",
		targetDate: "2023-04-03",
		content: "有給休暇：2日間",
		reason: "集中作業が必要なプロジェクトのため",
		status: "approved",
		approvedDate: "2023-03-28",
		approvedBy: "上司B",
		comment: "承認します。進捗報告をSlackで行ってください。",
	},
	{
		id: "app-108",
		type: "attendance_correction",
		employeeId: "emp-008",
		employeeName: "加藤聡",
		submittedDate: "2023-03-28",
		targetDate: "2023-03-30",
		content: "退勤：18:00 → 21:00",
		reason: "月末のシステム更新対応のため",
		status: "approved",
		approvedDate: "2023-03-29",
		approvedBy: "上司C",
		comment: "承認します。作業後の報告をお願いします。",
	},
	{
		id: "app-109",
		type: "paid_holiday",
		employeeId: "emp-009",
		employeeName: "吉田直樹",
		submittedDate: "2023-03-29",
		targetDate: "2023-04-05",
		content: "有給休暇：1日",
		reason: "クライアントミーティングのため",
		status: "rejected",
		approvedDate: "2023-03-30",
		approvedBy: "上司D",
		comment:
			"予算の関係で今回の出張は見送ります。オンラインでの対応を検討してください。",
	},
	{
		id: "app-110",
		type: "attendance_correction",
		employeeId: "emp-010",
		employeeName: "松本恵",
		submittedDate: "2023-03-30",
		targetDate: "2023-03-29",
		content: "退勤：18:00 → 19:15",
		reason: "クライアント対応で遅くなりました",
		status: "approved",
		approvedDate: "2023-03-31",
		approvedBy: "上司E",
		comment: "確認しました。修正を承認します。お疲れ様でした。",
	},
	{
		id: "app-111",
		type: "paid_holiday",
		employeeId: "emp-011",
		employeeName: "高橋俊介",
		submittedDate: "2023-03-31",
		targetDate: "2023-04-07",
		content: "有給休暇：半日",
		reason: "歯科検診のため",
		status: "approved",
		approvedDate: "2023-04-01",
		approvedBy: "上司A",
		comment: "承認します。午前中の業務の引き継ぎをお願いします。",
	},
	{
		id: "app-112",
		type: "paid_holiday",
		employeeId: "emp-012",
		employeeName: "渡辺明",
		submittedDate: "2023-04-01",
		targetDate: "2023-04-10",
		content: "有給休暇：1日",
		reason: "自宅での作業効率向上のため",
		status: "approved",
		approvedDate: "2023-04-02",
		approvedBy: "上司B",
		comment: "承認します。リモート日のスケジュールを事前に共有してください。",
	},
	{
		id: "app-113",
		type: "attendance_correction",
		employeeId: "emp-013",
		employeeName: "斎藤真理子",
		submittedDate: "2023-04-02",
		targetDate: "2023-04-05",
		content: "退勤：18:00 → 20:00",
		reason: "データ移行作業のため",
		status: "approved",
		approvedDate: "2023-04-03",
		approvedBy: "上司C",
		comment: "承認します。作業完了後の報告をお願いします。",
	},
	{
		id: "app-114",
		type: "paid_holiday",
		employeeId: "emp-014",
		employeeName: "近藤拓也",
		submittedDate: "2023-04-03",
		targetDate: "2023-04-12",
		content: "有給休暇：2日間",
		reason: "パートナー企業との打ち合わせのため",
		status: "approved",
		approvedDate: "2023-04-04",
		approvedBy: "上司D",
		comment: "承認します。出張報告書の提出をお願いします。",
	},
	{
		id: "app-115",
		type: "attendance_correction",
		employeeId: "emp-015",
		employeeName: "井上雅彦",
		submittedDate: "2023-04-04",
		targetDate: "2023-04-03",
		content: "出勤：9:00 → 8:30",
		reason: "実際には8:30に出社していました",
		status: "approved",
		approvedDate: "2023-04-05",
		approvedBy: "上司E",
		comment: "確認しました。修正を承認します。",
	},
	{
		id: "app-116",
		type: "paid_holiday",
		employeeId: "emp-016",
		employeeName: "木村典子",
		submittedDate: "2023-04-05",
		targetDate: "2023-04-14",
		content: "有給休暇：1日",
		reason: "家族の用事のため",
		status: "rejected",
		approvedDate: "2023-04-06",
		approvedBy: "上司A",
		comment:
			"申し訳ありませんが、その日は部門会議があるため、別の日での調整をお願いします。",
	},
	{
		id: "app-117",
		type: "paid_holiday",
		employeeId: "emp-017",
		employeeName: "林孝之",
		submittedDate: "2023-04-06",
		targetDate: "2023-04-17",
		content: "有給休暇：3日間",
		reason: "プロジェクト集中期間のため",
		status: "approved",
		approvedDate: "2023-04-07",
		approvedBy: "上司B",
		comment: "承認します。日次の進捗報告をお願いします。",
	},
	{
		id: "app-118",
		type: "attendance_correction",
		employeeId: "emp-018",
		employeeName: "山田由美",
		submittedDate: "2023-04-07",
		targetDate: "2023-04-10",
		content: "退勤：18:00 → 22:00",
		reason: "プロジェクト納期対応のため",
		status: "approved",
		approvedDate: "2023-04-08",
		approvedBy: "上司C",
		comment: "承認します。タクシー代の精算も忘れずに行ってください。",
	},
	{
		id: "app-119",
		type: "paid_holiday",
		employeeId: "emp-019",
		employeeName: "清水謙太",
		submittedDate: "2023-04-08",
		targetDate: "2023-04-18",
		content: "有給休暇：3日間",
		reason: "新規顧客訪問のため",
		status: "approved",
		approvedDate: "2023-04-09",
		approvedBy: "上司D",
		comment: "承認します。訪問先との調整も忘れずにお願いします。",
	},
	{
		id: "app-120",
		type: "attendance_correction",
		employeeId: "emp-020",
		employeeName: "村上理沙",
		submittedDate: "2023-04-09",
		targetDate: "2023-04-07",
		content: "退勤：17:30 → 18:45",
		reason: "急な問い合わせ対応で残業しました",
		status: "approved",
		approvedDate: "2023-04-10",
		approvedBy: "上司E",
		comment: "確認しました。修正を承認します。対応ありがとうございました。",
	},
];

// すべての申請を取得する（内部用）
let allApplications = [...pendingApplications, ...approvedApplications];

// 申請一覧を取得（未承認申請と承認履歴を統合）
export type Condition = {
	pagination: Pagination;
	searchQuery: SearchQuery;
};
export async function getApplicationList(condition: Condition) {
	let applications = allApplications;

	// ステータスでフィルタリング
	if (condition.searchQuery.status && condition.searchQuery.status !== "all") {
		applications = applications.filter(
			(app) =>
				app.status === (condition.searchQuery.status as ApplicationStatus),
		);
	}

	// タイプでフィルタリング
	if (condition.searchQuery.type && condition.searchQuery.type !== "all") {
		applications = applications.filter(
			(app) => app.type === (condition.searchQuery.type as ApplicationType),
		);
	}

	// 日付でフィルタリング
	if (condition.searchQuery.date) {
		const date = condition.searchQuery.date;
		applications = applications.filter((app) => {
			// 未承認申請の場合は提出日でフィルタリング
			if (app.status === "pending") {
				return app.submittedDate.startsWith(date);
			}
			// 承認済み/却下済みの場合は承認日でフィルタリング
			return app.approvedDate ? app.approvedDate.startsWith(date) : false;
		});
	}

	// 検索クエリでフィルタリング
	if (condition.searchQuery.query) {
		const query = condition.searchQuery.query.toLowerCase();
		applications = applications.filter(
			(app) =>
				app.employeeName.toLowerCase().includes(query) ||
				app.employeeId.toLowerCase().includes(query) ||
				app.content.toLowerCase().includes(query) ||
				(app.comment ? app.comment.toLowerCase().includes(query) : false),
		);
	}

	// デフォルトで申請コード(id)によるソート
	applications = applications.sort((a, b) => a.id.localeCompare(b.id));

	// ページネーション
	const page = condition.pagination.page;
	const limit = 10; // 1ページあたりの表示数
	const total = applications.length;
	const totalPages = Math.ceil(total / limit);
	const start = (page - 1) * limit;
	const end = start + limit;
	const paginatedData = applications.slice(start, end);

	return {
		items: paginatedData,
		pagination: {
			total,
			page,
			limit,
			totalPages,
		},
	};
}

// 申請を承認する
export async function approveApplication(id: string, comment?: string) {
	const now = new Date();
	const formattedDate = now.toISOString().split("T")[0];

	// 承認処理（本番環境ではDBに保存する）
	allApplications = allApplications.map((app) =>
		app.id === id
			? {
					...app,
					status: "approved" as const,
					approvedDate: formattedDate,
					approvedBy: "人事部 鈴木", // 実際にはログインユーザー情報を使用
					comment: comment || "", // 空文字列をデフォルト値として使用
				}
			: app,
	);

	return { success: true };
}

// 申請を却下する
export async function rejectApplication(id: string, comment?: string) {
	const now = new Date();
	const formattedDate = now.toISOString().split("T")[0];

	// 却下処理（本番環境ではDBに保存する）
	allApplications = allApplications.map((app) =>
		app.id === id
			? {
					...app,
					status: "rejected" as const,
					approvedDate: formattedDate,
					approvedBy: "人事部 鈴木", // 実際にはログインユーザー情報を使用
					comment: comment || "", // 空文字列をデフォルト値として使用
				}
			: app,
	);

	return { success: true };
}
