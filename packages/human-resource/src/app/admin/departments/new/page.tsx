import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { DepartmentForm } from "../_components/department-form";
import { DepartmentFormSkeleton } from "../_components/department-form-skeleton";

import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "部署新規作成 | 人材管理システム",
	description: "新しい部署を作成します",
};

export default function DepartmentNewPage() {
	return (
		<>
			<PageHeader title="部署新規作成" />

			<Suspense fallback={<DepartmentFormSkeleton />}>
				<DepartmentForm isNew={true} />
			</Suspense>
		</>
	);
}
