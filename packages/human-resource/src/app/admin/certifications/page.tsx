import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
	getSkillCertifications,
	type SkillCertificationSearchParams,
} from "../skills-certifications/_actions/skill-certification-actions";
import { CertificationList } from "./_components/certification-list";
import { CertificationSearchForm } from "./_components/certification-search-form";
import type { SkillCertificationType } from "../skills-certifications/_data/skills-certifications-data";
import { PlusIcon } from "lucide-react";

export const metadata: Metadata = {
	title: "資格管理 | 人材管理システム",
	description: "社員の資格を管理します",
};

export default async function CertificationsPage({
	searchParams,
}: {
	searchParams: SkillCertificationSearchParams;
}) {
	// 検索条件を基にデータを取得（常に資格のみ）
	const paramsForFetch: SkillCertificationSearchParams = {
		...searchParams,
		type: "certification" as SkillCertificationType,
	};
	const { items: certifications, pagination } =
		await getSkillCertifications(paramsForFetch);

	// クライアントコンポーネントに渡すための安全なオブジェクト
	const safeSearchParams: SkillCertificationSearchParams = {
		query: searchParams.query || undefined,
		type: "certification" as SkillCertificationType,
		sort: searchParams.sort || undefined,
		order: searchParams.order as "asc" | "desc" | undefined,
		page: searchParams.page || undefined,
	};

	return (
		<div className="space-y-4">
			<div className="flex justify-between items-center">
				<h1 className="text-2xl font-bold tracking-tight">資格一覧</h1>
				<Button asChild>
					<Link href="/admin/certifications/new">
						<PlusIcon className="h-4 w-4 mr-2" />
						資格追加
					</Link>
				</Button>
			</div>

			<CertificationSearchForm searchParams={safeSearchParams} />

			<CertificationList
				certifications={certifications}
				searchParams={safeSearchParams}
				pagination={pagination}
			/>
		</div>
	);
}
