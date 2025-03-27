import {
	type Attendance,
	type AttendanceStatus,
	STATUS_ARRAY,
} from "@/app/_mocks/attendances";
import { type Employee, mockEmployees } from "@/app/_mocks/employees";

// 従業員データはmockEmployeesから取得（共通のソースを使用）
const EMPLOYEE_DATA = mockEmployees;

// 従業員ごとに割り当てるステータスの傾向を定義
// [normal, late, early_departure, absent, paid_leave, holiday] の出現確率（重み）
const EMPLOYEE_STATUS_WEIGHTS: Record<string, number[]> = {};

// 部署と役職に基づいた勤怠傾向の設定
for (const employee of EMPLOYEE_DATA) {
	// 標準的な出現確率（デフォルト）
	let weights = [85, 5, 3, 2, 3, 2];

	// 部署による調整
	if (employee.department === "営業部") {
		weights = [80, 7, 3, 3, 3, 4]; // 営業部は遅刻が少し多め
	} else if (employee.department === "開発部") {
		weights = [75, 5, 5, 3, 2, 10]; // 開発部は残業が多く休日出勤も多い
	} else if (employee.department === "人事部") {
		weights = [90, 2, 2, 1, 4, 1]; // 人事部は非常に規則正しい
	} else if (employee.department === "財務部") {
		weights = [88, 3, 2, 1, 5, 1]; // 財務部も規則正しい
	} else if (employee.department === "マーケティング部") {
		weights = [82, 6, 4, 2, 3, 3]; // マーケティングは少し流動的
	}

	// 役職による調整
	if (employee.position === "部長") {
		weights[0] -= 5; // 部長は通常出勤が少し少なめ
		weights[2] += 2; // 早退が少し多め
		weights[4] += 3; // 有給取得が多め
	} else if (employee.position === "担当") {
		weights[1] += 2; // 担当は遅刻が少し多め
	}

	// 入社年次による調整（入社2年以内は遅刻・欠勤がやや多め）
	const joinYear = Number.parseInt(employee.joinDate.split("-")[0], 10);
	const currentYear = new Date().getFullYear();
	if (currentYear - joinYear <= 2) {
		weights[1] += 3; // 遅刻増加
		weights[0] -= 3; // その分通常出勤減少
	}

	EMPLOYEE_STATUS_WEIGHTS[employee.id] = weights;
}

// 休日（土日）かどうかを判定する関数
function isWeekend(date: Date): boolean {
	const day = date.getDay();
	return day === 0 || day === 6; // 0:日曜日, 6:土曜日
}

// ランダムな勤怠ステータスを生成する関数（従業員ごとの傾向を考慮）
function generateRandomStatus(employeeId: string): AttendanceStatus {
	// 従業員ごとの重み付けを取得
	const weights = EMPLOYEE_STATUS_WEIGHTS[employeeId] || [80, 5, 5, 3, 5, 2];

	// 重みの合計を計算
	const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);

	// 0～合計重み-1の範囲でランダムな値を生成
	const random = Math.floor(Math.random() * totalWeight);

	// ランダム値がどの範囲に入るかを判定
	let cumulativeWeight = 0;
	for (let i = 0; i < weights.length; i++) {
		cumulativeWeight += weights[i];
		if (random < cumulativeWeight) {
			return STATUS_ARRAY[i];
		}
	}

	// デフォルトで通常を返す
	return "normal";
}

// ステータスに基づいて時間情報を生成する関数
function generateTimeInfo(
	status: AttendanceStatus,
	date: Date,
	employeeId: string,
): {
	clockIn: string | null;
	clockOut: string | null;
	breakTime: number;
	workingHours: number;
	overtimeHours: number;
	remarks: string;
} {
	// 従業員の情報を取得
	const employee = EMPLOYEE_DATA.find((e) => e.id === employeeId);
	const department = employee?.department || "";
	const position = employee?.position || "";

	// 従業員ごとの基本出勤時間の揺らぎ（分）を計算
	const baseVariation = Math.floor(Math.random() * 15);

	const clockIn: string | null = null;
	const clockOut: string | null = null;
	const breakTime = 60; // 標準的な休憩時間
	let workingHours = 0;
	let overtimeHours = 0;
	let remarks = "";

	switch (status) {
		case "normal": {
			// 通常出勤: 9:00前後に出勤、18:00前後に退勤
			const normalClockIn = `09:${baseVariation.toString().padStart(2, "0")}`;
			let normalClockOut: string;

			// 残業確率（部署と役職によって調整）
			let overtimeProbability = 0.2; // 標準

			// 開発部は残業確率が高い
			if (department === "開発部") {
				overtimeProbability = 0.4;
			} else if (department === "営業部") {
				overtimeProbability = 0.3;
			}

			// 役職による調整
			if (position === "部長" || position === "課長") {
				overtimeProbability += 0.1;
			}

			// 残業の生成
			if (Math.random() < overtimeProbability) {
				// 役職や部署によって残業時間の傾向を変える
				let maxOvertime = 90; // 標準
				if (position === "部長") {
					maxOvertime = 120;
				} else if (position === "担当") {
					maxOvertime = 60;
				}

				const overtime = 15 + Math.floor(Math.random() * maxOvertime); // 15-maxの残業
				overtimeHours = overtime;
				normalClockOut = `${18 + Math.floor(overtime / 60)}:${(overtime % 60).toString().padStart(2, "0")}`;

				// 部署別の残業理由
				if (department === "開発部") {
					remarks =
						Math.random() < 0.6
							? "プロジェクト締め切り対応"
							: "システム障害対応";
				} else if (department === "営業部") {
					remarks = Math.random() < 0.7 ? "顧客対応" : "商談準備";
				} else if (overtime >= 60) {
					remarks = "業務多忙のため残業";
				}
			} else {
				normalClockOut = `18:${Math.floor(Math.random() * 15)
					.toString()
					.padStart(2, "0")}`;
			}
			workingHours = 8 * 60 + overtimeHours;

			return {
				clockIn: normalClockIn,
				clockOut: normalClockOut,
				breakTime,
				workingHours,
				overtimeHours,
				remarks,
			};
		}

		case "late": {
			// 遅刻: 9:15-9:45に出勤
			const lateMins = 15 + Math.floor(Math.random() * 30);
			const lateClockIn = `09:${lateMins.toString().padStart(2, "0")}`;
			const lateClockOut = `18:${Math.floor(Math.random() * 30)
				.toString()
				.padStart(2, "0")}`;
			workingHours = 8 * 60 - lateMins;

			// 部署による遅刻理由の調整
			if (department === "営業部") {
				remarks = Math.random() < 0.6 ? "電車遅延" : "朝の打ち合わせ長引き";
			} else {
				remarks = Math.random() < 0.7 ? "電車遅延" : "私用による遅刻";
			}

			return {
				clockIn: lateClockIn,
				clockOut: lateClockOut,
				breakTime,
				workingHours,
				overtimeHours,
				remarks,
			};
		}

		case "early_departure": {
			// 早退: 9:00前後に出勤、16:00-17:30に退勤
			const earlyClockIn = `09:${baseVariation.toString().padStart(2, "0")}`;
			const earlyHour = 16 + Math.floor(Math.random() * 1.5);
			const earlyMin = Math.floor(Math.random() * 30);
			const earlyClockOut = `${earlyHour}:${earlyMin.toString().padStart(2, "0")}`;
			workingHours = (earlyHour - 9) * 60 + earlyMin - baseVariation;

			// 早退理由（部署と役職による調整）
			if (position === "部長" || position === "課長") {
				remarks =
					Math.random() < 0.7 ? "外部打ち合わせのため早退" : "私用のため早退";
			} else {
				remarks = Math.random() < 0.5 ? "私用のため早退" : "体調不良のため早退";
			}

			return {
				clockIn: earlyClockIn,
				clockOut: earlyClockOut,
				breakTime,
				workingHours,
				overtimeHours,
				remarks,
			};
		}

		case "absent": {
			// 欠勤: 出退勤時間なし
			if (position === "部長" || position === "課長") {
				remarks =
					Math.random() < 0.5 ? "体調不良のため欠勤" : "家庭の事情による欠勤";
			} else {
				remarks = Math.random() < 0.7 ? "体調不良のため欠勤" : "私用のため欠勤";
			}

			return {
				clockIn,
				clockOut,
				breakTime,
				workingHours,
				overtimeHours,
				remarks,
			};
		}

		case "paid_leave": {
			// 有給休暇: 出退勤時間なし
			remarks = "有給休暇";

			return {
				clockIn,
				clockOut,
				breakTime,
				workingHours,
				overtimeHours,
				remarks,
			};
		}

		case "holiday": {
			// 休日: 出退勤時間なし
			if (department === "開発部") {
				remarks = Math.random() < 0.6 ? "リリース作業" : "指定休日";
			} else {
				remarks = Math.random() < 0.7 ? "指定休日" : "会社カレンダー休日";
			}

			return {
				clockIn,
				clockOut,
				breakTime,
				workingHours,
				overtimeHours,
				remarks,
			};
		}

		default: {
			return {
				clockIn,
				clockOut,
				breakTime,
				workingHours,
				overtimeHours,
				remarks,
			};
		}
	}
}

// 部署名から部署IDを取得するヘルパー関数
function getDepartmentId(departmentName: string): string {
	switch (departmentName) {
		case "営業部":
			return "1";
		case "開発部":
			return "2";
		case "人事部":
			return "3";
		case "総務部":
			return "4";
		case "経理部":
			return "5";
		case "マーケティング部":
			return "6";
		case "財務部":
			return "7";
		default:
			return "99"; // 不明な部署の場合
	}
}

// 月間勤怠データを生成する関数
function generateMonthlyAttendance(
	employee: Employee,
	year: number,
	month: number,
): Attendance[] {
	const result: Attendance[] = [];
	const daysInMonth = new Date(year, month, 0).getDate();

	// 現在の日付
	const now = new Date();
	const currentYear = now.getFullYear();
	const currentMonth = now.getMonth() + 1;
	const currentDay = now.getDate();

	// 従業員の入社日（YYYY-MM-DD形式）
	const joinDate = new Date(employee.joinDate);
	const joinYear = joinDate.getFullYear();
	const joinMonth = joinDate.getMonth() + 1;
	const joinDay = joinDate.getDate();

	// 各日の勤怠データを生成
	for (let day = 1; day <= daysInMonth; day++) {
		// 未来の日付はスキップ
		if (
			year > currentYear ||
			(year === currentYear && month > currentMonth) ||
			(year === currentYear && month === currentMonth && day > currentDay)
		) {
			continue;
		}

		// 入社前の日付はスキップ
		if (
			year < joinYear ||
			(year === joinYear && month < joinMonth) ||
			(year === joinYear && month === joinMonth && day < joinDay)
		) {
			continue;
		}

		const date = new Date(year, month - 1, day);

		// 土日はスキップ（holiday として記録しない）
		if (isWeekend(date)) {
			continue;
		}

		// 日付の文字列表現 YYYY-MM-DD
		const dateStr = date.toISOString().split("T")[0];

		// ランダムな勤怠ステータスを生成
		const status = generateRandomStatus(employee.id);

		// ステータスに基づいて時間情報を生成
		const timeInfo = generateTimeInfo(status, date, employee.id);

		// 勤怠データのID生成（employee idは3桁の数字）
		const id = `ATT-${employee.id}-${year}${month.toString().padStart(2, "0")}${day.toString().padStart(2, "0")}`;

		// 勤怠データを追加
		result.push({
			id,
			employeeId: employee.id,
			employeeName: employee.name,
			departmentId: getDepartmentId(employee.department), // 部署名から部署IDを取得
			departmentName: employee.department, // 従業員情報から部署名を取得
			date: dateStr,
			clockIn: timeInfo.clockIn,
			clockOut: timeInfo.clockOut,
			breakTime: timeInfo.breakTime,
			workingHours: timeInfo.workingHours,
			overtimeHours: timeInfo.overtimeHours,
			status,
			remarks: timeInfo.remarks,
			createdAt: new Date(dateStr).toISOString(),
		});
	}

	return result;
}

// すべての従業員の2000年から現在までの勤怠データを生成
function generateAllAttendanceData(): Attendance[] {
	console.log("勤怠データを生成中...");
	const result: Attendance[] = [];
	const now = new Date();
	const currentYear = now.getFullYear();
	const currentMonth = now.getMonth() + 1;

	// 各従業員に対して処理
	for (const employee of EMPLOYEE_DATA) {
		// 2000年から現在までループ
		for (let year = 2000; year <= currentYear; year++) {
			// 各月に対して処理
			for (let month = 1; month <= 12; month++) {
				// 未来の月はスキップ
				if (year === currentYear && month > currentMonth) {
					continue;
				}

				// 各月の勤怠データを生成して結果に追加
				const monthlyData = generateMonthlyAttendance(employee, year, month);
				result.push(...monthlyData);
			}
		}
	}

	console.log(`生成完了: ${result.length}件の勤怠データ`);
	return result;
}

// サンプルデータ
export const SAMPLE_ATTENDANCES: Attendance[] = generateAllAttendanceData();
