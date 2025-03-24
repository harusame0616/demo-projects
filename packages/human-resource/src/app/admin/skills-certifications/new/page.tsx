import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { SkillCertificationForm } from "./_components/skill-certification-form";

import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "スキル・資格登録 | 人材管理システム",
	description: "新しいスキル・資格を登録します。",
};

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

export default function NewSkillCertificationPage() {
	return (
		<>
			<div className="flex items-center gap-4 mb-6">
				<Button variant="outline" size="sm" asChild>
					<Link href="/skills-certifications">
						<ArrowLeftIcon className="mr-2 h-4 w-4" />
						戻る
					</Link>
				</Button>
				<h2 className="text-3xl font-bold tracking-tight">
					スキル・資格の新規登録
				</h2>
			</div>

			<Suspense fallback={<SkillCertificationFormSkeleton />}>
				<SkillCertificationForm />
			</Suspense>
		</>
	);
}
