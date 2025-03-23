import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { Suspense } from "react";
import { gradeData, type Grade } from "../../_data/grades-data";
import { GradeForm } from "./_components/grade-form";

import type { Metadata } from "next";

interface GradeEditPageProps {
	params: {
		id: string;
	};
}

// メタデータを動的に生成
export async function generateMetadata({
	params,
}: GradeEditPageProps): Promise<Metadata> {
	const gradeId = params.id;
	const grade = gradeData.find((grade: Grade) => grade.id === gradeId);

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

// ローディング状態を表示するスケルトンコンポーネント
function GradeFormSkeleton() {
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

export default function GradeEditPage({ params }: GradeEditPageProps) {
	const gradeId = params.id;
	const grade = gradeData.find((grade: Grade) => grade.id === gradeId);

	if (!grade) {
		return (
			<div className="flex flex-col items-center justify-center h-[50vh]">
				<h2 className="text-2xl font-bold mb-4">グレードが見つかりません</h2>
				<p className="text-gray-500 mb-6">
					指定されたグレードID: {gradeId} のグレードは存在しません。
				</p>
				<Button asChild>
					<Link href="/grades">
						<ArrowLeftIcon className="mr-2 h-4 w-4" />
						グレード一覧に戻る
					</Link>
				</Button>
			</div>
		);
	}

	return (
		<>
			<div className="flex items-center gap-4 mb-6">
				<Button variant="outline" size="sm" asChild>
					<Link href={`/grades/${gradeId}`}>
						<ArrowLeftIcon className="mr-2 h-4 w-4" />
						戻る
					</Link>
				</Button>
				<h2 className="text-3xl font-bold tracking-tight">
					{grade.name}の編集
				</h2>
			</div>

			<Suspense fallback={<GradeFormSkeleton />}>
				<GradeForm grade={grade} />
			</Suspense>
		</>
	);
}
