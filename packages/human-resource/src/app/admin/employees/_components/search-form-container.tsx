import { getDepartments, getPositions } from "../_actions/employee-actions";
import { SearchFormPresenter } from "./search-form-presenter";

interface SearchFormContainerProps {
	searchQuery?: string;
	currentDepartment?: string;
	currentPosition?: string;
}

export async function SearchFormContainer({
	searchQuery,
	currentDepartment,
	currentPosition,
}: SearchFormContainerProps) {
	// 部署と役職のオプションを取得
	const departmentOptions = await getDepartments();
	const positionOptions = await getPositions();

	return (
		<SearchFormPresenter
			departmentOptions={departmentOptions}
			positionOptions={positionOptions}
			searchQuery={searchQuery}
			currentDepartment={currentDepartment}
			currentPosition={currentPosition}
		/>
	);
}
