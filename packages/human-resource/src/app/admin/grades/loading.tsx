import { GradesSkeleton } from "./_grades/grades-skeleton";

import { PageHeader } from "@/components/common/page-header";
import { SearchFormPresenter } from "./_search-form/search-form-presenter";

export default async function Loading() {
	return (
		<>
			<PageHeader title="グレード一覧" />

			<SearchFormPresenter
				searchQuery={{
					query: "",
				}}
			/>

			<GradesSkeleton />
		</>
	);
}
