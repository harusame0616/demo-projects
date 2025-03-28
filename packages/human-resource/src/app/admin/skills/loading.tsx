import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SearchFormPresenter } from "./_components/search-form-presenter";
import { SkillsSkeleton } from "./_components/skills-skeleton";

export default async function Loading() {
	return (
		<div className="space-y-4">
			<div className="flex justify-between items-center">
				<h1 className="text-2xl font-bold tracking-tight">スキル一覧</h1>
				<Button asChild variant="outline">
					<Link href="/admin/skills/new">新規作成</Link>
				</Button>
			</div>

			<SearchFormPresenter defaultQuery={""} />

			<SkillsSkeleton />
		</div>
	);
}
