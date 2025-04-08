import { getUsers } from "./data";
import { UsersPresenter } from "./users-presenter";
import type { GetUsersCondition } from "./data";

type Props = GetUsersCondition;
export async function UsersContainer(props: Props) {
	const usersData = await getUsers(props);

	return (
		<UsersPresenter
			users={usersData.users}
			pagination={usersData.pagination}
			order={props.order}
		/>
	);
}
