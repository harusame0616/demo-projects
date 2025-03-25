import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { Suspense, use } from "react";
import { getSkillCertificationById } from "../../../skills-certifications/_actions/skill-certification-actions";
import { SkillForm } from "../../_components/skill-form";
import { SkillFormSkeleton } from "../../_components/skill-form-skeleton";

interface SkillEditPageProps {
	params: {
		id: string;
	};
}

// メタデータを動的に生成
export async function generateMetadata({
	params,
}: SkillEditPageProps): Promise<Metadata> {
	const skillId = params.id;
	const skill = await getSkillCertificationById(skillId);

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

export default function SkillEditPage({ params }: SkillEditPageProps) {
	const skillId = params.id;
	// サーバーアクションを使ってスキルデータを取得
	const skillPromise = getSkillCertificationById(skillId);
	const skill = use(skillPromise);

	if (!skill || skill.type !== "skill") {
		return (
			<div className="flex flex-col items-center justify-center h-[50vh]">
				<h2 className="text-2xl font-bold mb-4">スキルが見つかりません</h2>
				<p className="text-gray-500 mb-6">
					指定されたスキルID: {skillId} のスキルは存在しません。
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
			<div className="flex items-center gap-4 mb-6">
				<Button variant="outline" size="sm" asChild>
					<Link href={`/admin/skills/${skillId}`}>
						<ArrowLeftIcon className="mr-2 h-4 w-4" />
						戻る
					</Link>
				</Button>
				<h2 className="text-3xl font-bold tracking-tight">スキル編集</h2>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>スキル情報</CardTitle>
				</CardHeader>
				<CardContent>
					<Suspense fallback={<SkillFormSkeleton />}>
						<SkillForm skill={skill} isNew={false} />
					</Suspense>
				</CardContent>
			</Card>
		</>
	);
}
