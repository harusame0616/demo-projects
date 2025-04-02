import { PageHeader } from "@/components/common/page-header";
import { ApplicationsSkeleton } from "./_applications";
import { SearchFormPresenter } from "./_search-form";

export default function Loading() {
	return (
		<>
			<PageHeader title="申請一覧" />
			<SearchFormPresenter
				searchQuery={{
					status: "all",
					type: "all",
					query: "",
					date: "",
				}}
			/>
			<ApplicationsSkeleton />
		</>
	);
}
