import { PageHeader } from "@/components/common/page-header";
import { EmployeesSkeleton } from "./_components/employee-list-skeleton";
import { SearchFormPresenter } from "./_components/search-form-presenter";

export default async function Loading() {
	return (
		<>
			<PageHeader title="従業員一覧" />

			<SearchFormPresenter
				departmentOptions={[]}
				positionOptions={[]}
				searchQuery={""}
				currentDepartment={""}
				currentPosition={""}
			/>

			<EmployeesSkeleton />
		</>
	);
}
