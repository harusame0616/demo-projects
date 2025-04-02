import { mockEmployees } from "@/app/_mocks/employees";
import { type Condition, getUsers } from "../_actions/user-actions";
import { UsersPresenter } from "./users-presenter";

type Props = Condition;
export async function UsersContainer(props: Props) {
	const usersData = await getUsers(props);
	const employees = mockEmployees;

	return (
		<UsersPresenter
			users={usersData.items}
			employees={employees}
			pagination={usersData.pagination}
			order={props.order}
			searchQuery={props.searchQuery}
		/>
	);
}
