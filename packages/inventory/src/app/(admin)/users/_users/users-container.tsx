import { getUsers } from "./data";
import type { GetUsersCondition } from "./data";
import { UsersPresenter } from "./users-presenter";

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
