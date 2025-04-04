import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { type Grade, gradeData } from "../../_data/grades-data";
import { GradeForm } from "../../_edit-form/grade-form";
import { GradeFormSkeleton } from "../../_edit-form/grade-form-skeleton";

import type { Metadata } from "next";

interface GradeEditPageProps {
	params: Promise<{
		id: string;
	}>;
}

// メタデータを動的に生成
export async function generateMetadata({
	params,
}: {
	params: Promise<{ id: string }>;
}): Promise<Metadata> {
	const { id } = await params;
	const grade = gradeData.find((grade: Grade) => grade.id === id);

	if (!grade) {
		return {
			title: "グレードが見つかりません | 人材管理システム",
			description: "指定されたグレードが見つかりませんでした。",
		};
	}

	return {
		title: `${grade.name}の編集 | 人材管理システム`,
		description: `${grade.name}の情報編集`,
	};
}

export default async function GradeEditPage({ params }: GradeEditPageProps) {
	const { id } = await params;
	const grade = gradeData.find((grade: Grade) => grade.id === id);

	if (!grade) {
		return (
			<div className="flex flex-col items-center justify-center h-[50vh]">
				<h2 className="text-2xl font-bold mb-4">グレードが見つかりません</h2>
				<p className="text-gray-500 mb-6">
					指定されたグレードID: {id} のグレードは存在しません。
				</p>
				<Button asChild>
					<Link href="/admin/grades">
						<ArrowLeftIcon className="mr-2 h-4 w-4" />
						グレード一覧に戻る
					</Link>
				</Button>
			</div>
		);
	}

	return (
		<>
			<PageHeader title="グレード編集" />

			<Suspense fallback={<GradeFormSkeleton />}>
				<GradeForm grade={grade} isNew={false} />
			</Suspense>
		</>
	);
}
