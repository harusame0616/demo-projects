import { getGrades } from "../_actions/grade-actions";
import { GradesPresenter } from "./grades-presenter";
import type { GradeSearchParams } from "../_actions/grade-actions";

interface GradesContainerProps {
	searchParams: GradeSearchParams;
}

export async function GradesContainer({ searchParams }: GradesContainerProps) {
	// データ取得
	const { items, pagination } = await getGrades(searchParams);

	return <GradesPresenter grades={items} pagination={pagination} />;
}
