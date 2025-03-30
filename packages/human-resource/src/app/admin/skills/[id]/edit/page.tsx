import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { getSkillCertificationById } from "../../../skills-certifications/_actions/skill-certification-actions";
import { SkillForm } from "../../_components/skill-form";
import { SkillFormSkeleton } from "../../_components/skill-form-skeleton";

interface SkillEditPageProps {
	params: Promise<{
		id: string;
	}>;
}

// メタデータを動的に生成
export async function generateMetadata({
	params,
}: SkillEditPageProps): Promise<Metadata> {
	const { id } = await params;
	const skill = await getSkillCertificationById(id);

	if (!skill || skill.type !== "skill") {
		return {
			title: "スキルが見つかりません | 人材管理システム",
			description: "指定されたスキルが見つかりませんでした。",
		};
	}

	return {
		title: "スキル編集 | 人材管理システム",
		description: `${skill.name}の情報編集`,
	};
}

export default async function SkillEditPage({ params }: SkillEditPageProps) {
	const { id } = await params;
	// サーバーアクションを使ってスキルデータを取得
	const skillPromise = getSkillCertificationById(id);
	const skill = await skillPromise;

	if (!skill || skill.type !== "skill") {
		return (
			<div className="flex flex-col items-center justify-center h-[50vh]">
				<h2 className="text-2xl font-bold mb-4">スキルが見つかりません</h2>
				<p className="text-gray-500 mb-6">
					指定されたスキルID: {id} のスキルは存在しません。
				</p>
				<Button asChild>
					<Link href="/admin/skills">
						<ArrowLeftIcon className="mr-2 h-4 w-4" />
						スキル一覧に戻る
					</Link>
				</Button>
			</div>
		);
	}

	return (
		<>
			<PageHeader title="スキル編集" />

			<Suspense fallback={<SkillFormSkeleton />}>
				<SkillForm skill={skill} isNew={false} />
			</Suspense>
		</>
	);
}
