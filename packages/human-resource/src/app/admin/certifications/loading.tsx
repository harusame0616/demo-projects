import { PageHeader } from "@/components/common/page-header";
import type { Metadata } from "next";
import { CertificationsSkeleton } from "./_components/certifications-skeleton";
import { SearchFormPresenter } from "./_components/search-form-presenter";

export const metadata: Metadata = {
	title: "資格管理 | 人材管理システム",
	description: "社員の資格を管理します",
};

export default function Loading() {
	return (
		<>
			<PageHeader title="資格一覧" />

			<SearchFormPresenter
				searchQuery={{
					query: "",
				}}
			/>

			<CertificationsSkeleton />
		</>
	);
}
