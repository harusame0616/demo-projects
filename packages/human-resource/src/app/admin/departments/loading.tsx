import { PageHeader } from "@/components/common/page-header";
import { DepartmentsSkeleton } from "./_components/departments-skeleton";
import { SearchFormPresenter } from "./_components/search-form-presenter";

export default async function Loading() {
	return (
		<>
			<PageHeader title="部署一覧" />

			<SearchFormPresenter defaultValue={""} isLoading={false} />

			<DepartmentsSkeleton />
		</>
	);
}
