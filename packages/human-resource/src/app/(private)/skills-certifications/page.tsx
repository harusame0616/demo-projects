import { Suspense } from "react";
import { SkillCertificationList } from "./_components/skill-certification-list";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusIcon } from "lucide-react";

import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "スキル・資格一覧 | 人材管理システム",
	description: "社内のスキル・資格情報の一覧と管理を行います。",
};

// ローディング状態のスケルトン
function SkillCertificationListSkeleton() {
	return (
		<div className="space-y-4">
			<div className="h-10 w-full bg-gray-200 animate-pulse rounded-md" />
			<div className="h-96 w-full bg-gray-200 animate-pulse rounded-md" />
		</div>
	);
}

export default function SkillCertificationsPage() {
	return (
		<>
			<div className="flex justify-between items-center mb-6">
				<h2 className="text-3xl font-bold tracking-tight">スキル・資格一覧</h2>
				<Button asChild>
					<Link href="/skills-certifications/new">
						<PlusIcon className="mr-2 h-4 w-4" />
						新規登録
					</Link>
				</Button>
			</div>

			<Suspense fallback={<SkillCertificationListSkeleton />}>
				<SkillCertificationList />
			</Suspense>
		</>
	);
}
