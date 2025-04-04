import { getAttendances } from "../_actions/attendance-actions";
import type { AttendanceSearchParams } from "../_actions/attendance-actions";
import { AttendancesPresenter } from "./attendances-presenter";

interface AttendancesContainerProps {
	searchParams: AttendanceSearchParams;
}

export async function AttendancesContainer({
	searchParams,
}: AttendancesContainerProps) {
	// 勤怠データを取得
	const attendanceData = await getAttendances(searchParams);

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
		/>
	);
}
