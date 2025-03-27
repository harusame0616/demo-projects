import { getDepartments } from "../_actions/department-actions";
import { DepartmentsPresenter } from "./departments-presenter";
import type { DepartmentSearchParams } from "../_actions/department-actions";

interface DepartmentsContainerProps {
	searchParams: DepartmentSearchParams;
}

export async function DepartmentsContainer({
	searchParams,
}: DepartmentsContainerProps) {
	// データ取得
	const { items: departments, pagination } = await getDepartments(searchParams);

	return (
		<DepartmentsPresenter departments={departments} pagination={pagination} />
	);
}
