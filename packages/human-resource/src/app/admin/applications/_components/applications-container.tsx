import {
	type ApplicationSearchParams,
	getApplicationList,
} from "../_actions/application-actions";
import { ApplicationsPresenter } from "./applications-presenter";

interface ApplicationsContainerProps {
	searchParams: ApplicationSearchParams;
}

export async function ApplicationsContainer({
	searchParams,
}: ApplicationsContainerProps) {
	// 申請一覧データを取得
	const { items: applications, pagination } =
		await getApplicationList(searchParams);

	// プレゼンターコンポーネントに渡す
	return (
		<ApplicationsPresenter
			applications={applications}
			pagination={pagination}
			searchParams={searchParams}
		/>
	);
}
