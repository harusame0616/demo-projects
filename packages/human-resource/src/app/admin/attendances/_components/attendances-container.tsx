import { getAttendances } from "../_actions/attendance-actions";
import { getDepartments } from "../_actions/department-actions";
import { AttendancesPresenter } from "./attendances-presenter";
import type {
	AttendanceSearchParams,
	MonthlyAttendanceSummary,
} from "../_actions/attendance-actions";

interface AttendancesContainerProps {
	searchParams: AttendanceSearchParams;
}

export async function AttendancesContainer({
	searchParams,
}: AttendancesContainerProps) {
	// 勤怠データと部署データを取得
	const [attendanceData, departments] = await Promise.all([
		getAttendances(searchParams),
		getDepartments(),
	]);

	const { attendances, pagination } = attendanceData;

	return (
		<AttendancesPresenter
			attendances={{
				items: attendances,
				totalItems: pagination.total,
				totalPages: pagination.totalPages,
				page: pagination.page,
				limit: pagination.limit,
			}}
			departments={departments}
		/>
	);
}
