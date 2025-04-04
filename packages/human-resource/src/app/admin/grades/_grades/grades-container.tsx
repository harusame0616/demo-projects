import { getGrades } from "../_actions/grade-actions";
import { GradesPresenter } from "./grades-presenter";

type Props = Parameters<typeof getGrades>[0];

export async function GradesContainer(props: Props) {
	const { items, pagination } = await getGrades(props);

	return (
		<GradesPresenter
			grades={items}
			pagination={pagination}
			order={props.order}
		/>
	);
}
