import { PageHeader } from "@/components/common/page-header";
import { ApplicationsSkeleton } from "./_components/applications-skeleton";
import { SearchFormPresenter } from "./_components/search-form-presenter";

export default function Loading() {
	return (
		<div className="space-y-4">
			<PageHeader heading="申請一覧" />
			<SearchFormPresenter defaultQuery={{}} />
			<ApplicationsSkeleton />
		</div>
	);
}
