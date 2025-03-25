import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
	getSkillCertifications,
	type SkillCertificationSearchParams,
} from "./_actions/skill-certification-actions";
import { SkillCertificationList } from "./_components/skill-certification-list";
import { SearchForm } from "./_components/search-form";

export const metadata: Metadata = {
	title: "スキル・資格管理 | 人材管理システム",
	description: "社員のスキルと資格を管理します",
};

export default async function SkillsCertificationsPage({
	searchParams,
}: {
	searchParams: SkillCertificationSearchParams;
}) {
	// 検索条件を基にデータを取得
	const { items, pagination } = await getSkillCertifications(searchParams);

	return (
		<div className="space-y-4">
			<div className="flex justify-between items-center">
				<h1 className="text-2xl font-bold tracking-tight">スキル・資格管理</h1>
				<div className="flex space-x-2">
					<Button asChild>
						<Link href="/admin/skills-certifications/new?type=skill">
							スキル追加
						</Link>
					</Button>
					<Button asChild variant="outline">
						<Link href="/admin/skills-certifications/new?type=certification">
							資格追加
						</Link>
					</Button>
				</div>
			</div>

			<SearchForm searchParams={searchParams} />

			<SkillCertificationList
				skillCertifications={items}
				searchParams={searchParams}
				pagination={pagination}
			/>
		</div>
	);
}
