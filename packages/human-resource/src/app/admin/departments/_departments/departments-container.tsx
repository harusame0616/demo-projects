import { getDepartments } from "../_actions/department-actions";
import { DepartmentsPresenter } from "./departments-presenter";

type Props = Parameters<typeof getDepartments>[0];

export async function DepartmentsContainer(props: Props) {
	// データ取得
	const { items: departments, pagination } = await getDepartments(props);

	return (
		<DepartmentsPresenter
			departments={departments}
			pagination={pagination}
			order={props.order}
		/>
	);
}
