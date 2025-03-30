import { PageHeader } from "@/components/common/page-header";
import { ApplicationsSkeleton } from "./_components/applications-skeleton";
import { SearchFormPresenter } from "./_components/search-form-presenter";

export default function Loading() {
	return (
		<>
			<PageHeader title="申請一覧" />
			<SearchFormPresenter defaultQuery={{}} />
			<ApplicationsSkeleton />
		</>
	);
}
