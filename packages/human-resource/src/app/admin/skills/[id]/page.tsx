import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	ArrowLeftIcon,
	CalendarIcon,
	FileTextIcon,
	UsersIcon,
} from "lucide-react";
import Link from "next/link";
import { getSkillCertificationById } from "../../skills-certifications/_actions/skill-certification-actions";

import type { Metadata } from "next";

interface SkillDetailPageProps {
	params: Promise<{
		id: string;
	}>;
}

// メタデータを動的に生成
export async function generateMetadata({
	params,
}: SkillDetailPageProps): Promise<Metadata> {
	const { id } = await params;
	const skill = await getSkillCertificationById(id);

	if (!skill || skill.type !== "skill") {
		return {
			title: "スキルが見つかりません | 人材管理システム",
			description: "指定されたスキルが見つかりませんでした。",
		};
	}

	return {
		title: "スキル詳細 | 人材管理システム",
		description: `${skill.name}の詳細情報`,
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

export default async function SkillDetailPage({
	params,
}: SkillDetailPageProps) {
	const { id } = await params;
	// サーバーアクションを使ってスキルデータを取得
	const skillPromise = getSkillCertificationById(id);
	const skill = await skillPromise;

	if (!skill || skill.type !== "skill") {
		return (
			<div className="flex flex-col items-center justify-center h-[50vh]">
				<h2 className="text-2xl font-bold mb-4">スキルが見つかりません</h2>
				<p className="text-gray-500 mb-6">
					指定されたスキルID: {id} のスキルは存在しません。
				</p>
				<Button asChild>
					<Link href="/admin/skills">
						<ArrowLeftIcon className="mr-2 h-4 w-4" />
						スキル一覧に戻る
					</Link>
				</Button>
			</div>
		);
	}

	return (
		<>
			<PageHeader
				title="スキル詳細"
				operations={[
					<Button key="edit-skill" asChild variant="outline">
						<Link href={`/admin/skills/${id}/edit`}>編集</Link>
					</Button>,
				]}
			/>

			<div className="space-y-6">
				{/* スキル基本情報 */}
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
											スキルコード
										</dt>
										<dd className="mt-1 text-lg font-semibold flex items-center">
											<FileTextIcon className="h-5 w-5 mr-1 text-gray-500" />
											{skill.code}
										</dd>
									</div>
									<div>
										<dt className="text-sm font-medium text-gray-500">
											スキル名
										</dt>
										<dd className="mt-1">{skill.name}</dd>
									</div>
									<div>
										<dt className="text-sm font-medium text-gray-500">説明</dt>
										<dd className="mt-1">{skill.description}</dd>
									</div>
								</dl>
							</div>
							<div>
								<dl className="space-y-4">
									<div>
										<dt className="text-sm font-medium text-gray-500">
											レベル
										</dt>
										<dd className="mt-1">{skill.levelOrAuthority}</dd>
									</div>
									{skill.requirements && (
										<div>
											<dt className="text-sm font-medium text-gray-500">
												要件
											</dt>
											<dd className="mt-1">{skill.requirements}</dd>
										</div>
									)}
									<div>
										<dt className="text-sm font-medium text-gray-500">
											保有者数
										</dt>
										<dd className="mt-1 flex items-center">
											<UsersIcon className="h-4 w-4 mr-1 text-gray-500" />
											{skill.holdersCount}人
										</dd>
									</div>
									<div>
										<dt className="text-sm font-medium text-gray-500">
											登録日
										</dt>
										<dd className="mt-1 flex items-center">
											<CalendarIcon className="h-4 w-4 mr-1 text-gray-500" />
											{formatDate(skill.createdAt)}
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
