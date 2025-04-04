import { PageHeader } from "@/components/common/page-header";
import { EmployeesSkeleton } from "./_employees/employees-skeleton";
import { SearchFormPresenter } from "./_search-form/search-form-presenter";

export default async function Loading() {
	return (
		<>
			<PageHeader title="従業員一覧" />

			<SearchFormPresenter
				departments={[]}
				positions={[]}
				searchQuery={{ query: "", department: "all", position: "all" }}
			/>

			<EmployeesSkeleton />
		</>
	);
}
