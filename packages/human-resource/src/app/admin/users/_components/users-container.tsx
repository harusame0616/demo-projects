import { mockEmployees } from "@/app/_mocks/employees";
import { type Condition, getUsers } from "../_actions/user-actions";
import { UsersPresenter } from "./users-presenter";

type Props = Condition;
export async function UsersContainer(props: Props) {
	// デバッグ用にソート情報をコンソールに出力
	console.log("UsersContainer props:", {
		order: props.order,
		pagination: props.pagination,
		searchQuery: props.searchQuery,
	});

	// サーバーサイドでデータを取得
	const usersData = await getUsers(props);

	// 従業員データを取得
	const employees = mockEmployees;

	return (
		<UsersPresenter
			users={usersData.items}
			employees={employees}
			pagination={usersData.pagination}
		/>
	);
}
