import type { Pagination } from "@/lib/pagination";
import {
	getDepartments,
	getEmployees,
	getPositions,
} from "../_actions/employee-actions";
import type { EmployeeOrder } from "../order";
import type { EmployeeSearchQuery } from "../search-query";
import { EmployeesPresenter } from "./employees-presenter";

type Props = Parameters<typeof getEmployees>[0];

export async function EmployeesContainer(props: Props) {
	// サーバーサイドでデータを取得
	const { items, pagination } = await getEmployees(props);

	// データのみを返すのではなく、プレゼンターコンポーネントをレンダリングする
	return (
		<EmployeesPresenter
			employees={items}
			order={props.order}
			pagination={pagination}
		/>
	);
}
