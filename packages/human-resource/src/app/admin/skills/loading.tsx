import { PageHeader } from "@/components/common/page-header";
import { SearchFormPresenter } from "./_search-form/search-form-presenter";
import { SkillsSkeleton } from "./_skills/skills-skeleton";

export default async function Loading() {
	return (
		<>
			<PageHeader title="スキル一覧" />

			<SearchFormPresenter
				searchQuery={{
					query: "",
				}}
			/>

			<SkillsSkeleton />
		</>
	);
}
