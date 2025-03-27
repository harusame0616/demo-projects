import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeftIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { SkillForm } from "../_components/skill-form";
import { SkillFormSkeleton } from "../_components/skill-form-skeleton";

export const metadata: Metadata = {
	title: "スキル登録 | 人材管理システム",
	description: "新しいスキルを登録します。",
};

export default function NewSkillPage() {
	return (
		<>
			<div className="flex items-center gap-4 mb-6">
				<h2 className="text-3xl font-bold tracking-tight">スキル新規登録</h2>
			</div>

			<Suspense fallback={<SkillFormSkeleton />}>
				<SkillForm isNew={true} />
			</Suspense>
		</>
	);
}
