import type { Attendance, AttendanceStatus } from "@/app/_mocks/attendances";
import { SAMPLE_ATTENDANCES } from "../../../../attendances/_data/attendances-data";

// 月次の勤怠集計データ
export type MonthlyAttendanceSummary = {
	year: number;
	month: number;
	attendances: Attendance[];
	totalWorkDays: number;
	normalDays: number;
	lateDays: number;
	earlyDepartureDays: number;
	absentDays: number;
	paidLeaveDays: number;
	holidayDays: number;
	totalWorkingHours: number;
	totalOvertimeHours: number;
};

// 従業員勤怠集計データ
export type EmployeeAttendanceSummary = {
	employeeId: string;
	monthlyData: MonthlyAttendanceSummary[];
};

// 月次勤怠データの取得
export async function getEmployeeMonthlyAttendance(
	employeeId: string,
	year: number,
	month: number,
): Promise<MonthlyAttendanceSummary | null> {
	// サンプルデータから従業員の勤怠データを取得
	const attendances = SAMPLE_ATTENDANCES.filter(
		(attendance) => attendance.employeeId === employeeId,
	);

	// 指定された年月のデータを絞り込む
	const targetMonthAttendances = attendances.filter((attendance) => {
		const date = new Date(attendance.date);
		return date.getFullYear() === year && date.getMonth() + 1 === month;
	});

	// データがない場合は null を返す
	// (オリジナルのコードではモックデータを生成していましたが、
	// SAMPLE_ATTENDANCESに含まれないデータは表示しないように変更)
	if (attendances.length === 0 || targetMonthAttendances.length === 0) {
		return null;
	}

	// 各種集計を計算
	const normalDays = countByStatus(targetMonthAttendances, "normal");
	const lateDays = countByStatus(targetMonthAttendances, "late");
	const earlyDepartureDays = countByStatus(
		targetMonthAttendances,
		"early_departure",
	);
	const absentDays = countByStatus(targetMonthAttendances, "absent");
	const paidLeaveDays = countByStatus(targetMonthAttendances, "paid_leave");
	const holidayDays = countByStatus(targetMonthAttendances, "holiday");

	// 総労働時間と残業時間
	const totalWorkingHours = targetMonthAttendances.reduce(
		(total, attendance) => total + attendance.workingHours,
		0,
	);

	const totalOvertimeHours = targetMonthAttendances.reduce(
		(total, attendance) => total + attendance.overtimeHours,
		0,
	);

	return {
		year,
		month,
		totalWorkDays: targetMonthAttendances.length,
		normalDays,
		lateDays,
		earlyDepartureDays,
		absentDays,
		paidLeaveDays,
		holidayDays,
		totalWorkingHours,
		totalOvertimeHours,
		attendances: targetMonthAttendances,
	};
}

// 従業員の全期間の勤怠集計データを取得
export async function getEmployeeAttendanceSummary(
	employeeId: string,
): Promise<EmployeeAttendanceSummary | null> {
	// サンプルデータから従業員の勤怠データを取得
	const attendances = SAMPLE_ATTENDANCES.filter(
		(attendance) => attendance.employeeId === employeeId,
	);

	// 勤怠データがない場合は null を返す
	// (オリジナルのコードではモックデータを生成していましたが、
	// SAMPLE_ATTENDANCESに含まれない従業員は表示しないように変更)
	if (attendances.length === 0) {
		return null;
	}

	// データを年月ごとにグループ化
	const groupedByMonth: Record<string, Attendance[]> = {};

	for (const attendance of attendances) {
		const date = new Date(attendance.date);
		const key = `${date.getFullYear()}-${date.getMonth() + 1}`;

		if (!groupedByMonth[key]) {
			groupedByMonth[key] = [];
		}

		groupedByMonth[key].push(attendance);
	}

	// 月次データを作成
	const monthlyData: MonthlyAttendanceSummary[] = [];

	for (const key in groupedByMonth) {
		const [year, month] = key.split("-").map(Number);
		const monthAttendances = groupedByMonth[key];

		// 各種集計を計算
		const normalDays = countByStatus(monthAttendances, "normal");
		const lateDays = countByStatus(monthAttendances, "late");
		const earlyDepartureDays = countByStatus(
			monthAttendances,
			"early_departure",
		);
		const absentDays = countByStatus(monthAttendances, "absent");
		const paidLeaveDays = countByStatus(monthAttendances, "paid_leave");
		const holidayDays = countByStatus(monthAttendances, "holiday");

		// 総労働時間と残業時間
		const totalWorkingHours = monthAttendances.reduce(
			(total, attendance) => total + attendance.workingHours,
			0,
		);

		const totalOvertimeHours = monthAttendances.reduce(
			(total, attendance) => total + attendance.overtimeHours,
			0,
		);

		monthlyData.push({
			year,
			month,
			totalWorkDays: monthAttendances.length,
			normalDays,
			lateDays,
			earlyDepartureDays,
			absentDays,
			paidLeaveDays,
			holidayDays,
			totalWorkingHours,
			totalOvertimeHours,
			attendances: monthAttendances,
		});
	}

	// 最新のデータ順にソート
	monthlyData.sort((a, b) => {
		if (a.year !== b.year) return b.year - a.year;
		return b.month - a.month;
	});

	return {
		employeeId,
		monthlyData,
	};
}

// ステータス別の日数をカウント
function countByStatus(
	attendances: Attendance[],
	status: AttendanceStatus,
): number {
	return attendances.filter((attendance) => attendance.status === status)
		.length;
}

// 労働時間を表示用にフォーマット
export function formatWorkingHours(minutes: number): string {
	const hours = Math.floor(minutes / 60);
	const mins = minutes % 60;

	if (hours === 0) {
		return `${mins}分`;
	}

	if (mins === 0) {
		return `${hours}時間`;
	}

	return `${hours}時間${mins}分`;
}
