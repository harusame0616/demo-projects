import { Button } from "@/components/ui/button";
import { Suspense } from "react";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
import { GradeForm } from "../_components/grade-form";
import { GradeFormSkeleton } from "../_components/grade-form-skeleton";

import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "グレード新規作成 | 人材管理システム",
	description: "新しいグレードを作成します",
};

export default function GradeNewPage() {
	return (
		<>
			<div className="flex items-center gap-4 mb-6">
				<h2 className="text-3xl font-bold tracking-tight">グレード新規作成</h2>
			</div>

			<Suspense fallback={<GradeFormSkeleton />}>
				<GradeForm isNew={true} />
			</Suspense>
		</>
	);
}
