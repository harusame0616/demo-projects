import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { Suspense } from "react";
import {
	skillCertificationData,
	type SkillCertification,
} from "../../_data/skills-certifications-data";
import { SkillCertificationForm } from "./_components/skill-certification-form";

import type { Metadata } from "next";

interface SkillCertificationEditPageProps {
	params: {
		id: string;
	};
}

// メタデータを動的に生成
export async function generateMetadata({
	params,
}: SkillCertificationEditPageProps): Promise<Metadata> {
	const id = params.id;
	const item = skillCertificationData.find(
		(item: SkillCertification) => item.id === id,
	);

	if (!item) {
		return {
			title: "スキル・資格が見つかりません | 人材管理システム",
			description: "指定されたスキル・資格が見つかりませんでした。",
		};
	}

	return {
		title: `${item.name}の編集 | 人材管理システム`,
		description: `${item.name}の情報編集`,
	};
}

// ローディング状態を表示するスケルトンコンポーネント
function SkillCertificationFormSkeleton() {
	return (
		<div className="space-y-6">
			<div className="space-y-4">
				<div className="h-8 w-1/3 bg-gray-200 animate-pulse rounded-md" />
				<div className="h-10 w-full bg-gray-200 animate-pulse rounded-md" />
			</div>
			<div className="space-y-4">
				<div className="h-8 w-1/3 bg-gray-200 animate-pulse rounded-md" />
				<div className="h-10 w-full bg-gray-200 animate-pulse rounded-md" />
			</div>
			<div className="h-10 w-48 bg-gray-200 animate-pulse rounded-md" />
		</div>
	);
}

export default function SkillCertificationEditPage({
	params,
}: SkillCertificationEditPageProps) {
	const id = params.id;
	const item = skillCertificationData.find(
		(item: SkillCertification) => item.id === id,
	);

	if (!item) {
		return (
			<div className="flex flex-col items-center justify-center h-[50vh]">
				<h2 className="text-2xl font-bold mb-4">
					スキル・資格が見つかりません
				</h2>
				<p className="text-gray-500 mb-6">
					指定されたID: {id} のスキル・資格は存在しません。
				</p>
				<Button asChild>
					<Link href="/skills-certifications">
						<ArrowLeftIcon className="mr-2 h-4 w-4" />
						スキル・資格一覧に戻る
					</Link>
				</Button>
			</div>
		);
	}

	return (
		<>
			<div className="flex items-center gap-4 mb-6">
				<Button variant="outline" size="sm" asChild>
					<Link href={`/skills-certifications/${id}`}>
						<ArrowLeftIcon className="mr-2 h-4 w-4" />
						戻る
					</Link>
				</Button>
				<h2 className="text-3xl font-bold tracking-tight">{item.name}の編集</h2>
			</div>

			<Suspense fallback={<SkillCertificationFormSkeleton />}>
				<SkillCertificationForm skillCertification={item} />
			</Suspense>
		</>
	);
}
