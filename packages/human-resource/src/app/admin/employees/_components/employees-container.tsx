import {
	getDepartments,
	getEmployees,
	getPositions,
} from "../_actions/employee-actions";
import { EmployeesPresenter } from "./employees-presenter";

interface EmployeeSearchParams {
	query?: string;
	department?: string;
	position?: string;
	sortBy?: string;
	sortOrder?: "asc" | "desc";
	page?: string;
}

interface EmployeesContainerProps {
	searchParams: EmployeeSearchParams;
}

export async function EmployeesContainer({
	searchParams,
}: EmployeesContainerProps) {
	// ページ番号のパラメータを処理（デフォルトは1ページ目）
	const currentPage = searchParams.page
		? Number.parseInt(searchParams.page, 10)
		: 1;

	// 検索とソートパラメータの取得
	const query = searchParams.query;
	const department = searchParams.department;
	const position = searchParams.position;
	const sortBy = searchParams.sortBy;
	const sortOrder = searchParams.sortOrder;

	// サーバーサイドでデータを取得
	const employeesData = await getEmployees({
		searchQuery: query,
		department,
		position,
		sortBy,
		sortOrder: sortOrder as "asc" | "desc",
		page: currentPage,
		limit: 20, // 1ページあたり20件
	});

	// データのみを返すのではなく、プレゼンターコンポーネントをレンダリングする
	return (
		<EmployeesPresenter
			employees={employeesData.items}
			searchParams={searchParams}
			pagination={employeesData.pagination}
		/>
	);
}
