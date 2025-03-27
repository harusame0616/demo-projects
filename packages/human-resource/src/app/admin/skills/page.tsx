import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
	getSkillCertifications,
	type SkillCertificationSearchParams,
} from "../skills-certifications/_actions/skill-certification-actions";
import { SkillList } from "./_components/skill-list";
import { SkillSearchForm } from "./_components/search-form";
import type { SkillCertificationType } from "../skills-certifications/_data/skills-certifications-data";
import { PlusIcon } from "lucide-react";

export const metadata: Metadata = {
	title: "スキル管理 | 人材管理システム",
	description: "社員のスキルを管理します",
};

export default async function SkillsPage({
	searchParams,
}: {
	searchParams: Promise<SkillCertificationSearchParams>;
}) {
	// searchParamsをawaitして取得
	const resolvedParams = await searchParams;

	// 検索パラメータを安全に取得
	const query = resolvedParams.query;
	const sort = resolvedParams.sort;
	const order = resolvedParams.order as "asc" | "desc" | undefined;
	const page = resolvedParams.page;

	// 検索条件を基にデータを取得（常にスキルのみ）
	const paramsForFetch: SkillCertificationSearchParams = {
		query,
		sort,
		order,
		page,
		type: "skill" as SkillCertificationType,
	};
	const { items: skills, pagination } =
		await getSkillCertifications(paramsForFetch);

	// クライアントコンポーネントに渡すための安全なオブジェクト
	const safeSearchParams: SkillCertificationSearchParams = {
		query: query || undefined,
		type: "skill" as SkillCertificationType,
		sort: sort || undefined,
		order,
		page: page || undefined,
	};

	return (
		<div className="space-y-4">
			<div className="flex justify-between items-center">
				<h1 className="text-2xl font-bold tracking-tight">スキル一覧</h1>
				<Button asChild variant="outline">
					<Link href="/admin/skills/new">新規作成</Link>
				</Button>
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
