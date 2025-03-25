import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	ArrowLeftIcon,
	BadgeIcon,
	CalendarIcon,
	DollarSignIcon,
	PencilIcon,
	StarIcon,
	UsersIcon,
} from "lucide-react";
import Link from "next/link";
import { use } from "react";
import { type Grade, gradeData } from "../_data/grades-data";

import type { Metadata } from "next";

interface GradeDetailPageProps {
	params: Promise<{
		id: string;
	}>;
}

// メタデータを動的に生成
export async function generateMetadata({
	params,
}: {
	params: { id: string };
}): Promise<Metadata> {
	const gradeId = params.id;
	const grade = gradeData.find((grade: Grade) => grade.id === gradeId);

	if (!grade) {
		return {
			title: "グレードが見つかりません | 人材管理システム",
			description: "指定されたグレードが見つかりませんでした。",
		};
	}

	return {
		title: `${grade.name} | グレード詳細 | 人材管理システム`,
		description: `${grade.name}の詳細情報`,
	};
}

// 日付をフォーマットする関数
function formatDate(dateString: string): string {
	const date = new Date(dateString);
	return new Intl.DateTimeFormat("ja-JP", {
		year: "numeric",
		month: "numeric",
		day: "numeric",
	}).format(date);
}

// 給与範囲をフォーマットする関数
function formatSalaryRange(min: number, max: number): string {
	return `${min.toLocaleString()}円 〜 ${max.toLocaleString()}円`;
}

export default function GradeDetailPage({ params }: GradeDetailPageProps) {
	// paramsをReact.use()でアンラップする
	const { id: gradeId } = use(params);

	// グレードデータを取得
	const grade = gradeData.find((grade: Grade) => grade.id === gradeId);

	if (!grade) {
		return (
			<div className="flex flex-col items-center justify-center h-[50vh]">
				<h2 className="text-2xl font-bold mb-4">グレードが見つかりません</h2>
				<p className="text-gray-500 mb-6">
					指定されたグレードID: {gradeId} のグレードは存在しません。
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
			<div className="flex items-center justify-between mb-6">
				<div className="flex items-center gap-2">
					<Button variant="outline" size="sm" asChild>
						<Link href="/admin/grades">
							<ArrowLeftIcon className="mr-2 h-4 w-4" />
							戻る
						</Link>
					</Button>
					<h2 className="text-3xl font-bold tracking-tight">{grade.name}</h2>
				</div>
				<Button asChild>
					<Link href={`/admin/grades/${gradeId}/edit`}>
						<PencilIcon className="mr-2 h-4 w-4" />
						編集
					</Link>
				</Button>
			</div>

			<div className="space-y-6">
				{/* グレード基本情報 */}
				<Card>
					<CardHeader>
						<CardTitle>基本情報</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div>
								<dl className="space-y-4">
									<div>
										<dt className="text-sm font-medium text-gray-500">
											グレード名
										</dt>
										<dd className="mt-1 text-lg font-semibold flex items-center">
											<BadgeIcon className="h-5 w-5 mr-1 text-gray-500" />
											{grade.name}
										</dd>
									</div>
									<div>
										<dt className="text-sm font-medium text-gray-500">
											レベル
										</dt>
										<dd className="mt-1 flex items-center">
											<StarIcon className="h-4 w-4 mr-1 text-yellow-500" />
											レベル {grade.level}
										</dd>
									</div>
									<div>
										<dt className="text-sm font-medium text-gray-500">説明</dt>
										<dd className="mt-1">{grade.description}</dd>
									</div>
								</dl>
							</div>
							<div>
								<dl className="space-y-4">
									<div>
										<dt className="text-sm font-medium text-gray-500">
											給与範囲
										</dt>
										<dd className="mt-1 flex items-center">
											<DollarSignIcon className="h-4 w-4 mr-1 text-gray-500" />
											{formatSalaryRange(
												grade.salaryRange.min,
												grade.salaryRange.max,
											)}
										</dd>
									</div>
									<div>
										<dt className="text-sm font-medium text-gray-500">
											所属人数
										</dt>
										<dd className="mt-1 flex items-center">
											<UsersIcon className="h-4 w-4 mr-1 text-gray-500" />
											{grade.employeeCount}人
										</dd>
									</div>
									<div>
										<dt className="text-sm font-medium text-gray-500">
											作成日
										</dt>
										<dd className="mt-1 flex items-center">
											<CalendarIcon className="h-4 w-4 mr-1 text-gray-500" />
											{formatDate(grade.createdAt)}
										</dd>
									</div>
								</dl>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</>
	);
}
