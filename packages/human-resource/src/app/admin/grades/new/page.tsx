import { PageHeader } from "@/components/common/page-header";
import { Suspense } from "react";
import { GradeForm } from "../_edit-form/grade-form";
import { GradeFormSkeleton } from "../_edit-form/grade-form-skeleton";

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
