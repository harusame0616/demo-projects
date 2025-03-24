"use server";

// 申請タイプの定義
export type ApplicationType = "attendance_correction" | "leave_request";

// 申請ステータスの定義
export type ApplicationStatus = "pending" | "approved" | "rejected";

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

// 未承認の申請のモックデータ
const mockPendingApplications: Application[] = [
	{
		id: "APP001",
		type: "attendance_correction",
		employeeId: "001",
		employeeName: "山田 太郎",
		submittedDate: "2023-12-01",
		targetDate: "2023-11-30",
		content: "出勤時間修正：9:30 → 9:00",
		reason: "打ち合わせのため早く来ていましたが、打刻を忘れていました。",
		status: "pending",
	},
	{
		id: "APP002",
		type: "leave_request",
		employeeId: "002",
		employeeName: "佐藤 花子",
		submittedDate: "2023-12-02",
		targetDate: "2023-12-15",
		content: "有給休暇",
		reason: "私用のため",
		status: "pending",
	},
	{
		id: "APP003",
		type: "attendance_correction",
		employeeId: "003",
		employeeName: "鈴木 一郎",
		submittedDate: "2023-12-02",
		targetDate: "2023-12-01",
		content: "退勤時間修正：17:30 → 19:00",
		reason: "システムトラブル対応のため残業しましたが、打刻を忘れました。",
		status: "pending",
	},
	{
		id: "APP004",
		type: "leave_request",
		employeeId: "004",
		employeeName: "田中 美咲",
		submittedDate: "2023-12-03",
		targetDate: "2023-12-20",
		content: "半休（午後）",
		reason: "通院のため",
		status: "pending",
	},
	{
		id: "APP005",
		type: "attendance_correction",
		employeeId: "005",
		employeeName: "伊藤 健太",
		submittedDate: "2023-12-03",
		targetDate: "2023-12-02",
		content: "出勤時間修正：10:00 → 9:00、退勤時間修正：18:00 → 19:00",
		reason: "客先訪問のため社外で業務を行いました。",
		status: "pending",
	},
];

// 履歴用モックデータ
const mockHistoryApplications: Application[] = [
	{
		id: "APP006",
		type: "attendance_correction",
		employeeId: "001",
		employeeName: "山田 太郎",
		submittedDate: "2023-11-25",
		targetDate: "2023-11-24",
		content: "退勤時間修正：18:00 → 20:00",
		reason: "クライアントミーティングが長引いたため",
		status: "approved",
		approvedDate: "2023-11-26",
		approvedBy: "人事部 鈴木",
		comment: "タイムカードの記録と一致することを確認しました。",
	},
	{
		id: "APP007",
		type: "leave_request",
		employeeId: "002",
		employeeName: "佐藤 花子",
		submittedDate: "2023-11-20",
		targetDate: "2023-11-30",
		content: "有給休暇",
		reason: "家族旅行のため",
		status: "approved",
		approvedDate: "2023-11-21",
		approvedBy: "人事部 鈴木",
	},
	{
		id: "APP008",
		type: "attendance_correction",
		employeeId: "003",
		employeeName: "鈴木 一郎",
		submittedDate: "2023-11-15",
		targetDate: "2023-11-14",
		content: "出勤時間修正：9:00 → 8:30",
		reason: "早朝会議のため",
		status: "rejected",
		approvedDate: "2023-11-16",
		approvedBy: "人事部 鈴木",
		comment: "会議の記録がありません。詳細な証明が必要です。",
	},
	{
		id: "APP009",
		type: "leave_request",
		employeeId: "004",
		employeeName: "田中 美咲",
		submittedDate: "2023-11-10",
		targetDate: "2023-11-17",
		content: "半休（午前）",
		reason: "私用のため",
		status: "approved",
		approvedDate: "2023-11-11",
		approvedBy: "人事部 鈴木",
	},
	{
		id: "APP010",
		type: "attendance_correction",
		employeeId: "005",
		employeeName: "伊藤 健太",
		submittedDate: "2023-11-05",
		targetDate: "2023-11-04",
		content: "休日出勤申請：9:00-17:00",
		reason: "システム更新作業のため",
		status: "approved",
		approvedDate: "2023-11-06",
		approvedBy: "人事部 鈴木",
		comment: "休日手当対象となります。",
	},
];

// すべての申請を取得する（内部用）
let allApplications = [...mockPendingApplications, ...mockHistoryApplications];

// 未承認の申請を取得
export async function getPendingApplications(params: {
	searchQuery?: string;
	type?: string;
}) {
	let applications = allApplications.filter((app) => app.status === "pending");

	// タイプでフィルタリング
	if (params.type && params.type !== "all") {
		applications = applications.filter(
			(app) => app.type === (params.type as ApplicationType),
		);
	}

	// 検索クエリでフィルタリング
	if (params.searchQuery) {
		const query = params.searchQuery.toLowerCase();
		applications = applications.filter(
			(app) =>
				app.employeeName.toLowerCase().includes(query) ||
				app.employeeId.toLowerCase().includes(query) ||
				app.content.toLowerCase().includes(query),
		);
	}

	return applications;
}

// 承認履歴を取得
export async function getApprovalHistory(params: {
	searchQuery?: string;
	type?: string;
	status?: string;
	date?: string;
}) {
	// pending以外のすべての申請を取得
	let applications = allApplications.filter((app) => app.status !== "pending");

	// タイプでフィルタリング
	if (params.type && params.type !== "all") {
		applications = applications.filter(
			(app) => app.type === (params.type as ApplicationType),
		);
	}

	// ステータスでフィルタリング
	if (params.status && params.status !== "all") {
		applications = applications.filter(
			(app) => app.status === (params.status as ApplicationStatus),
		);
	}

	// 日付でフィルタリング
	if (params.date) {
		applications = applications.filter((app) =>
			app.approvedDate?.startsWith(params.date),
		);
	}

	// 検索クエリでフィルタリング
	if (params.searchQuery) {
		const query = params.searchQuery.toLowerCase();
		applications = applications.filter(
			(app) =>
				app.employeeName.toLowerCase().includes(query) ||
				app.employeeId.toLowerCase().includes(query) ||
				app.content.toLowerCase().includes(query) ||
				app.comment?.toLowerCase().includes(query),
		);
	}

	return applications;
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
					comment: comment || undefined,
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
					comment: comment || undefined,
				}
			: app,
	);

	return { success: true };
}
