import {
	SAMPLE_ATTENDANCES,
	type Attendance,
	type AttendanceStatus,
} from "../_data/attendances-data";

export type AttendanceSearchParams = {
	query?: string; // 検索クエリ (従業員名または従業員ID)
	employeeId?: string; // 従業員ID
	startDate?: string; // 開始日
	endDate?: string; // 終了日
	status?: AttendanceStatus; // 勤怠ステータス
	sort?: keyof Attendance; // ソート項目
	order?: "asc" | "desc"; // ソート順
	page?: number; // ページ番号
	limit?: number; // 1ページの表示件数
	yearMonth?: string; // 年月 (YYYY-MM形式) - 検索フォーム用に追加
};

// 勤怠情報一覧を取得する
export async function getAttendances({
	query = "",
	employeeId,
	startDate,
	endDate,
	status,
	sort = "date",
	order = "desc",
	page = 1,
	limit = 10,
	yearMonth,
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

	// 従業員IDによるフィルタリング
	if (employeeId) {
		attendances = attendances.filter(
			(attendance) => attendance.employeeId === employeeId,
		);
	}

	// 年月によるフィルタリング (UI側から yearMonth パラメータを渡す場合に使用)
	if (yearMonth) {
		attendances = attendances.filter(
			(attendance) => attendance.date.substring(0, 7) === yearMonth,
		);
	} else {
		// 日付範囲によるフィルタリング
		if (startDate) {
			attendances = attendances.filter(
				(attendance) => attendance.date >= startDate,
			);
		}

		if (endDate) {
			attendances = attendances.filter(
				(attendance) => attendance.date <= endDate,
			);
		}
	}

	// ステータスによるフィルタリング
	if (status) {
		attendances = attendances.filter(
			(attendance) => attendance.status === status,
		);
	}

	// ソート処理
	attendances.sort((a, b) => {
		const valueA = a[sort];
		const valueB = b[sort];

		if (typeof valueA === "string" && typeof valueB === "string") {
			return order === "asc"
				? valueA.localeCompare(valueB)
				: valueB.localeCompare(valueA);
		}

		// 数値の場合
		if (typeof valueA === "number" && typeof valueB === "number") {
			return order === "asc" ? valueA - valueB : valueB - valueA;
		}

		return 0;
	});

	// ページネーション
	const total = attendances.length;
	const totalPages = Math.ceil(total / limit);
	const offset = (page - 1) * limit;
	const paginatedAttendances = attendances.slice(offset, offset + limit);

	return {
		attendances: paginatedAttendances,
		pagination: {
			total,
			page,
			limit,
			totalPages,
		},
	};
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
