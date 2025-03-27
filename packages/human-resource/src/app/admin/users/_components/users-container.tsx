import { mockEmployees } from "@/app/_mocks/employees";
import {
	getUserRoles,
	getUserStatuses,
	getUsers,
} from "../_actions/user-actions";
import { UsersPresenter } from "./users-presenter";

interface UserSearchParams {
	query?: string;
	role?: string;
	status?: string;
	sortBy?: string;
	sortOrder?: "asc" | "desc";
	page?: string;
}

interface UsersContainerProps {
	searchParams: UserSearchParams;
}

export async function UsersContainer({ searchParams }: UsersContainerProps) {
	// ページ番号のパラメータを処理（デフォルトは1ページ目）
	const currentPage = searchParams.page
		? Number.parseInt(searchParams.page, 10)
		: 1;

	// 検索とソートパラメータの取得
	const query = searchParams.query;
	const role = searchParams.role;
	const status = searchParams.status;
	const sortBy = searchParams.sortBy;
	const sortOrder = searchParams.sortOrder;

	// サーバーサイドでデータを取得
	const usersData = await getUsers({
		searchQuery: query,
		role,
		status,
		sortBy,
		sortOrder: sortOrder as "asc" | "desc",
		page: currentPage,
		limit: 20, // 1ページあたり20件
	});

	// 従業員データを取得
	const employees = mockEmployees;

	return (
		<UsersPresenter
			users={usersData.items}
			employees={employees}
			searchParams={searchParams}
			pagination={usersData.pagination}
		/>
	);
}
