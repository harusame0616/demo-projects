import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	ArrowLeftIcon,
	CalendarIcon,
	FileTextIcon,
	PencilIcon,
	UsersIcon,
} from "lucide-react";
import Link from "next/link";
import { use } from "react";
import { getSkillCertificationById } from "../../skills-certifications/_actions/skill-certification-actions";

import type { Metadata } from "next";

interface CertificationDetailPageProps {
	params: {
		id: string;
	};
}

// メタデータを動的に生成
export async function generateMetadata({
	params,
}: CertificationDetailPageProps): Promise<Metadata> {
	const certificationId = params.id;
	const certification = await getSkillCertificationById(certificationId);

	if (!certification || certification.type !== "certification") {
		return {
			title: "資格が見つかりません | 人材管理システム",
			description: "指定された資格が見つかりませんでした。",
		};
	}

	return {
		title: "資格詳細 | 人材管理システム",
		description: `${certification.name}の詳細情報`,
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

export default function CertificationDetailPage({
	params,
}: CertificationDetailPageProps) {
	const certificationId = params.id;
	// サーバーアクションを使って資格データを取得
	const certificationPromise = getSkillCertificationById(certificationId);
	const certification = use(certificationPromise);

	if (!certification || certification.type !== "certification") {
		return (
			<div className="flex flex-col items-center justify-center h-[50vh]">
				<h2 className="text-2xl font-bold mb-4">資格が見つかりません</h2>
				<p className="text-gray-500 mb-6">
					指定された資格ID: {certificationId} の資格は存在しません。
				</p>
				<Button asChild>
					<Link href="/admin/certifications">
						<ArrowLeftIcon className="mr-2 h-4 w-4" />
						資格一覧に戻る
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
						<Link href="/admin/certifications">
							<ArrowLeftIcon className="mr-2 h-4 w-4" />
							戻る
						</Link>
					</Button>
					<h2 className="text-3xl font-bold tracking-tight">資格詳細</h2>
				</div>
				<Button asChild>
					<Link href={`/admin/certifications/${certificationId}/edit`}>
						<PencilIcon className="mr-2 h-4 w-4" />
						編集
					</Link>
				</Button>
			</div>

			<div className="space-y-6">
				{/* 資格基本情報 */}
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
											資格コード
										</dt>
										<dd className="mt-1 text-lg font-semibold flex items-center">
											<FileTextIcon className="h-5 w-5 mr-1 text-gray-500" />
											{certification.code}
										</dd>
									</div>
									<div>
										<dt className="text-sm font-medium text-gray-500">
											資格名
										</dt>
										<dd className="mt-1">{certification.name}</dd>
									</div>
									<div>
										<dt className="text-sm font-medium text-gray-500">説明</dt>
										<dd className="mt-1">{certification.description}</dd>
									</div>
								</dl>
							</div>
							<div>
								<dl className="space-y-4">
									<div>
										<dt className="text-sm font-medium text-gray-500">
											認定機関
										</dt>
										<dd className="mt-1">{certification.levelOrAuthority}</dd>
									</div>
									{certification.requirements && (
										<div>
											<dt className="text-sm font-medium text-gray-500">
												取得条件
											</dt>
											<dd className="mt-1">{certification.requirements}</dd>
										</div>
									)}
									<div>
										<dt className="text-sm font-medium text-gray-500">
											取得者数
										</dt>
										<dd className="mt-1 flex items-center">
											<UsersIcon className="h-4 w-4 mr-1 text-gray-500" />
											{certification.holdersCount}人
										</dd>
									</div>
									<div>
										<dt className="text-sm font-medium text-gray-500">
											登録日
										</dt>
										<dd className="mt-1 flex items-center">
											<CalendarIcon className="h-4 w-4 mr-1 text-gray-500" />
											{formatDate(certification.createdAt)}
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
