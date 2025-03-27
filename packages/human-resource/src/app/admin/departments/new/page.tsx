import { Button } from "@/components/ui/button";
import { Suspense } from "react";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
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
			<div className="flex items-center gap-4 mb-6">
				<h2 className="text-3xl font-bold tracking-tight">部署新規作成</h2>
			</div>

			<Suspense fallback={<DepartmentFormSkeleton />}>
				<DepartmentForm isNew={true} />
			</Suspense>
		</>
	);
}
