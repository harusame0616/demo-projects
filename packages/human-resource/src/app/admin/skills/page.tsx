import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
	getSkillCertifications,
	type SkillCertificationSearchParams,
} from "../skills-certifications/_actions/skill-certification-actions";
import { SkillList } from "./_components/skill-list";
import { SkillSearchForm } from "./_components/skill-search-form";
import type { SkillCertificationType } from "../skills-certifications/_data/skills-certifications-data";

export const metadata: Metadata = {
	title: "スキル管理 | 人材管理システム",
	description: "社員のスキルを管理します",
};

export default async function SkillsPage({
	searchParams,
}: {
	searchParams: SkillCertificationSearchParams;
}) {
	// 検索条件を基にデータを取得（常にスキルのみ）
	const paramsForFetch: SkillCertificationSearchParams = {
		...searchParams,
		type: "skill" as SkillCertificationType,
	};
	const { items: skills, pagination } =
		await getSkillCertifications(paramsForFetch);

	// クライアントコンポーネントに渡すための安全なオブジェクト
	const safeSearchParams: SkillCertificationSearchParams = {
		query: searchParams.query || undefined,
		type: "skill" as SkillCertificationType,
		sort: searchParams.sort || undefined,
		order: searchParams.order as "asc" | "desc" | undefined,
		page: searchParams.page || undefined,
	};

	return (
		<div className="space-y-4">
			<div className="flex justify-between items-center">
				<h1 className="text-2xl font-bold tracking-tight">スキル一覧</h1>
				<div className="flex space-x-2">
					<Button asChild variant="outline">
						<Link href="/admin/skills/new">スキル追加</Link>
					</Button>
				</div>
			</div>

			<SkillSearchForm searchParams={safeSearchParams} />

			<SkillList
				skills={skills}
				searchParams={safeSearchParams}
				pagination={pagination}
			/>
		</div>
	);
}
