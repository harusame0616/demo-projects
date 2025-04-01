import {
	type Condition,
	getApplicationList,
} from "../_actions/application-actions";
import { ApplicationsPresenter } from "./applications-presenter";

export async function ApplicationsContainer(props: Condition) {
	// 申請一覧データを取得
	const { items: applications, pagination } = await getApplicationList(props);

	// プレゼンターコンポーネントに渡す
	return (
		<ApplicationsPresenter
			applications={applications}
			pagination={pagination}
		/>
	);
}
