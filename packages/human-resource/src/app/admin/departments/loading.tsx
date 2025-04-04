import { PageHeader } from "@/components/common/page-header";
import { DepartmentsSkeleton } from "./_departments/departments-skeleton";
import { SearchFormPresenter } from "./_search-form/search-form-presenter";

export default async function Loading() {
	return (
		<>
			<PageHeader title="部署一覧" />

			<SearchFormPresenter
				searchQuery={{
					query: "",
				}}
			/>

			<DepartmentsSkeleton />
		</>
	);
}
