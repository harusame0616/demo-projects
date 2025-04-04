import { getEmployees } from "../_actions/employee-actions";
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
