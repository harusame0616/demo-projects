import type { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SkillForm } from "../_components/skill-form";
import { ArrowLeftIcon } from "lucide-react";
import { Suspense } from "react";
import { SkillFormSkeleton } from "../_components/skill-form-skeleton";

export const metadata: Metadata = {
	title: "スキル登録 | 人材管理システム",
	description: "新しいスキルを登録します。",
};

export default function NewSkillPage() {
	return (
		<>
			<div className="flex items-center gap-4 mb-6">
				<Button variant="outline" size="sm" asChild>
					<Link href="/admin/skills">
						<ArrowLeftIcon className="mr-2 h-4 w-4" />
						戻る
					</Link>
				</Button>
				<h2 className="text-3xl font-bold tracking-tight">スキルの新規登録</h2>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>スキル情報</CardTitle>
				</CardHeader>
				<CardContent>
					<Suspense fallback={<SkillFormSkeleton />}>
						<SkillForm isNew={true} />
					</Suspense>
				</CardContent>
			</Card>
		</>
	);
}
