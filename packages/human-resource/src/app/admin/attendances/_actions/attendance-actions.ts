import type { Attendance, AttendanceStatus } from "@/app/_mocks/attendances";
import { SAMPLE_ATTENDANCES } from "../_data/attendances-data";

// 月次集計データの型定義
export interface MonthlyAttendanceSummary {
	employeeId: string;
	employeeName: string;
	departmentId: string;
	departmentName: string;
	yearMonth: string;
	yearMonthDisplay: string;
	workdays: number;
	totalWorkingHours: number;
	totalOvertimeHours: number;
	absences: number;
	lateCount: number;
	earlyDepartureCount: number;
	paidLeaveCount: number;
}

// ソートフィールドの型定義（AttendanceとMonthlyAttendanceSummaryの両方のキーを許可）
export type SortField = keyof Attendance | keyof MonthlyAttendanceSummary;

export type AttendanceSearchParams = {
	query?: string; // 検索クエリ (従業員名または従業員ID)
	departmentId?: string; // 部署ID
	startYearMonth?: string; // 開始日
	endYearMonth?: string; // 終了日
	status?: AttendanceStatus; // 勤怠ステータス
	sort?: SortField; // ソート項目
	order?: "asc" | "desc"; // ソート順
	page?: number; // ページ番号
	limit?: number; // 1ページの表示件数
};

// 年月表示用フォーマット
export const formatYearMonth = (dateString: string): string => {
	const date = new Date(dateString);
	return new Intl.DateTimeFormat("ja-JP", {
		year: "numeric",
		month: "long",
	}).format(date);
};

// 勤怠情報一覧を取得し、月次集計に変換する
export async function getAttendances({
	query = "",
	departmentId,
	startYearMonth,
	endYearMonth,
	status,
	sort = "yearMonth",
	order = "desc",
	page = 1,
	limit = 20,
}: AttendanceSearchParams = {}) {
	// データベースからのデータ取得をシミュレート
	let attendances = [...SAMPLE_ATTENDANCES];

	// 検索クエリによるフィルタリング
	if (query) {
		const lowercaseQuery = query.toLowerCase();
		attendances = attendances.filter(
			(attendance) =>
				attendance.employeeName.toLowerCase().includes(lowercaseQuery) ||
				attendance.employeeId.toLowerCase().includes(lowercaseQuery),
		);
	}

	// 部署によるフィルタリング
	if (departmentId && departmentId !== "all") {
		attendances = attendances.filter(
			(attendance) => attendance.departmentId === departmentId,
		);
	}

	// 日付範囲によるフィルタリング
	if (startYearMonth) {
		attendances = attendances.filter(
			(attendance) => attendance.date >= startYearMonth,
		);
	}

	if (endYearMonth) {
		attendances = attendances.filter(
			(attendance) => attendance.date <= endYearMonth,
		);
	}

	// ステータスによるフィルタリング
	if (status) {
		attendances = attendances.filter(
			(attendance) => attendance.status === status,
		);
	}

	// 勤怠データを月次集計に変換
	const summaries = generateMonthlySummaries(attendances);

	// ソート処理
	const sortedSummaries = sortMonthlySummaries(summaries, sort, order);

	// ページネーション
	const total = sortedSummaries.length;
	const totalPages = Math.ceil(total / limit);
	const offset = (page - 1) * limit;
	const paginatedSummaries = sortedSummaries.slice(offset, offset + limit);

	return {
		attendances: paginatedSummaries,
		pagination: {
			total,
			page,
			limit,
			totalPages,
		},
	};
}

// 勤怠データを月次集計に変換する関数
function generateMonthlySummaries(
	attendances: Attendance[],
): MonthlyAttendanceSummary[] {
	// 月ごとに従業員ごとにデータをグループ化
	type GroupedDataType = {
		employeeId: string;
		employeeName: string;
		departmentId: string;
		departmentName: string;
		yearMonth: string;
		attendances: Attendance[];
	};

	const groupedData: Record<string, GroupedDataType> = {};

	// 勤怠データを月ごと、従業員ごとにグループ化
	for (const attendance of attendances) {
		// YYYY-MM-DD から YYYY-MM を抽出
		const yearMonth = attendance.date.substring(0, 7);
		const key = `${attendance.employeeId}_${yearMonth}`;

		if (!groupedData[key]) {
			groupedData[key] = {
				employeeId: attendance.employeeId,
				employeeName: attendance.employeeName,
				departmentId: attendance.departmentId,
				departmentName: attendance.departmentName,
				yearMonth: yearMonth,
				attendances: [],
			};
		}

		groupedData[key].attendances.push(attendance);
	}

	// グループ化されたデータから月次集計を計算
	return Object.values(groupedData).map((group) => {
		const yearMonth = group.yearMonth;
		const employeeId = group.employeeId;
		const employeeName = group.employeeName;
		const departmentId = group.departmentId;
		const departmentName = group.departmentName;
		const attendanceList = group.attendances;

		let workdays = 0;
		let totalWorkingHours = 0;
		let totalOvertimeHours = 0;
		let absences = 0;
		let lateCount = 0;
		let earlyDepartureCount = 0;
		let paidLeaveCount = 0;

		// 各勤怠データを集計
		for (const attendance of attendanceList) {
			// 休日以外の場合にカウント
			if (attendance.status !== "holiday") {
				if (attendance.status === "normal") {
					workdays++;
				} else if (attendance.status === "late") {
					workdays++;
					lateCount++;
				} else if (attendance.status === "early_departure") {
					workdays++;
					earlyDepartureCount++;
				} else if (attendance.status === "absent") {
					absences++;
				} else if (attendance.status === "paid_leave") {
					paidLeaveCount++;
				}

				totalWorkingHours += attendance.workingHours;
				totalOvertimeHours += attendance.overtimeHours;
			}
		}

		// 月次集計データを返す
		return {
			employeeId,
			employeeName,
			departmentId,
			departmentName,
			yearMonth,
			yearMonthDisplay: formatYearMonth(`${yearMonth}-01`),
			workdays,
			totalWorkingHours,
			totalOvertimeHours,
			absences,
			lateCount,
			earlyDepartureCount,
			paidLeaveCount,
		};
	});
}

// 月次集計データをソートする関数
function sortMonthlySummaries(
	summaries: MonthlyAttendanceSummary[],
	sortField: SortField,
	sortOrder: string,
): MonthlyAttendanceSummary[] {
	return [...summaries].sort((a, b) => {
		const aValue = a[sortField as keyof MonthlyAttendanceSummary];
		const bValue = b[sortField as keyof MonthlyAttendanceSummary];

		if (typeof aValue === "string" && typeof bValue === "string") {
			return sortOrder === "asc"
				? aValue.localeCompare(bValue)
				: bValue.localeCompare(aValue);
		}

		// 数値の場合
		if (typeof aValue === "number" && typeof bValue === "number") {
			return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
		}

		return 0;
	});
}

// 勤怠情報詳細を取得する
export async function getAttendanceById(id: string) {
	return SAMPLE_ATTENDANCES.find((attendance) => attendance.id === id) || null;
}

// 勤怠情報ステータスの表示名を取得する
export function getAttendanceStatusName(status: AttendanceStatus): string {
	switch (status) {
		case "normal":
			return "通常";
		case "late":
			return "遅刻";
		case "early_departure":
			return "早退";
		case "absent":
			return "欠勤";
		case "holiday":
			return "休日";
		case "paid_leave":
			return "有給休暇";
		default:
			return "不明";
	}
}

// 分から時間:分形式に変換する（例: 90分 → 1:30）
export function minutesToHoursMinutes(minutes: number): string {
	const hours = Math.floor(minutes / 60);
	const mins = minutes % 60;
	return `${hours}:${mins.toString().padStart(2, "0")}`;
}
