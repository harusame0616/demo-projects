import { PageHeader } from "@/components/common/page-header";
import { SearchFormPresenter } from "./_components/search-form-presenter";
import { SkillsSkeleton } from "./_components/skills-skeleton";

export default async function Loading() {
	return (
		<>
			<PageHeader title="スキル一覧" />

			<SearchFormPresenter defaultQuery={""} />

			<SkillsSkeleton />
		</>
	);
}
