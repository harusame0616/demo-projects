import { getUserRoles, getUserStatuses } from "../_actions/user-actions";
import { SearchFormPresenter } from "./search-form-presenter";

interface SearchFormContainerProps {
	searchQuery?: string;
	currentRole?: string;
	currentStatus?: string;
}

export async function SearchFormContainer({
	searchQuery,
	currentRole,
	currentStatus,
}: SearchFormContainerProps) {
	// 役割とステータスのオプションを取得
	const roleOptions = await getUserRoles();
	const statusOptions = await getUserStatuses();

	return (
		<SearchFormPresenter
			roleOptions={roleOptions}
			statusOptions={statusOptions}
			searchQuery={searchQuery}
			currentRole={currentRole}
			currentStatus={currentStatus}
		/>
	);
}
