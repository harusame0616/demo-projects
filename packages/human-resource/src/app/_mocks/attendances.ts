/**
 * 勤怠ステータスの型定義
 */
export type AttendanceStatus =
	| "normal" // 通常
	| "late" // 遅刻
	| "early_departure" // 早退
	| "absent" // 欠勤
	| "paid_leave" // 有給休暇
	| "holiday"; // 休日出勤

/**
 * 勤怠ステータスの配列
 */
export const STATUS_ARRAY: AttendanceStatus[] = [
	"normal",
	"late",
	"early_departure",
	"absent",
	"paid_leave",
	"holiday",
];

/**
 * 勤怠ステータスの表示名
 */
export const STATUS_LABELS: Record<AttendanceStatus, string> = {
	normal: "通常",
	late: "遅刻",
	early_departure: "早退",
	absent: "欠勤",
	paid_leave: "有給休暇",
	holiday: "休日出勤",
};

/**
 * 勤怠データの型定義
 */
export type Attendance = {
	/** 勤怠データID */
	id: string;
	/** 従業員ID */
	employeeId: string;
	/** 従業員名 */
	employeeName: string;
	/** 部署ID */
	departmentId: string;
	/** 部署名 */
	departmentName: string;
	/** 日付 (YYYY-MM-DD) */
	date: string;
	/** 出勤時刻 (HH:MM) */
	clockIn: string | null;
	/** 退勤時刻 (HH:MM) */
	clockOut: string | null;
	/** 休憩時間 (分) */
	breakTime: number;
	/** 勤務時間 (分) */
	workingHours: number;
	/** 残業時間 (分) */
	overtimeHours: number;
	/** 勤怠ステータス */
	status: AttendanceStatus;
	/** 備考 */
	remarks: string;
	/** 作成日時 */
	createdAt: string;
};
