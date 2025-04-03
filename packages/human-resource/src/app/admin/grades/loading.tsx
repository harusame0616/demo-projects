import { GradesSkeleton } from "./_components/grades-skeleton";

import { PageHeader } from "@/components/common/page-header";
import { SearchFormPresenter } from "./_components/search-form-presenter";

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
