import { Button } from "@/components/ui/button";
import type { Metadata } from "next";
import Link from "next/link";
import { CertificationsSkeleton } from "./_components/certifications-skeleton";
import { SearchFormPresenter } from "./_components/search-form-presenter";

export const metadata: Metadata = {
	title: "資格管理 | 人材管理システム",
	description: "社員の資格を管理します",
};

export default function Loading() {
	return (
		<div className="space-y-4">
			<div className="flex justify-between items-center">
				<h1 className="text-2xl font-bold tracking-tight">資格一覧</h1>
				<Button asChild variant="outline">
					<Link href="/admin/certifications/new">新規作成</Link>
				</Button>
			</div>

			<SearchFormPresenter defaultQuery={""} />

			<CertificationsSkeleton />
		</div>
	);
}
