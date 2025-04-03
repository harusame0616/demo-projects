import { getDepartments, getPositions } from "../_actions/employee-actions";
import type { EmployeeSearchQuery } from "../search-query";
import { SearchFormPresenter } from "./search-form-presenter";

interface Props {
	searchQuery: EmployeeSearchQuery;
}

export async function SearchFormContainer({ searchQuery }: Props) {
	// 部署と役職のオプションを取得
	const departmentOptions = await getDepartments();
	const positionOptions = await getPositions();

	return (
		<SearchFormPresenter
			departments={departmentOptions.map((option) => ({
				id: option.value,
				name: option.label,
			}))}
			positions={positionOptions.map((option) => ({
				id: option.value,
				name: option.label,
			}))}
			searchQuery={searchQuery}
		/>
	);
}
