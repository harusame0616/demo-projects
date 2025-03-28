import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DepartmentsSkeleton } from "./_components/departments-skeleton";
import { SearchFormPresenter } from "./_components/search-form-presenter";

export default async function Loading() {
	return (
		<div className="space-y-4">
			<div className="flex justify-between items-center">
				<h1 className="text-2xl font-bold tracking-tight">部署一覧</h1>
				<Button asChild variant="outline">
					<Link href="/admin/departments/new">新規作成</Link>
				</Button>
			</div>

			<SearchFormPresenter defaultValue={""} isLoading={false} />

			<DepartmentsSkeleton />
		</div>
	);
}
