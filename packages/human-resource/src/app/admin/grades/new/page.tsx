import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
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
			<PageHeader title="グレード新規作成" />

			<Suspense fallback={<GradeFormSkeleton />}>
				<GradeForm isNew={true} />
			</Suspense>
		</>
	);
}
