import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	ArrowLeftIcon,
	PencilIcon,
	Badge as BadgeIcon,
	UsersIcon,
	CalendarIcon,
	BookIcon,
	Award,
	Star,
	FileText,
} from "lucide-react";
import {
	skillCertificationData,
	type SkillCertification,
} from "../_data/skills-certifications-data";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ja } from "date-fns/locale";

import type { Metadata } from "next";

interface SkillCertificationDetailPageProps {
	params: {
		id: string;
	};
}

const TYPE_LABELS = {
	skill: "スキル",
	certification: "資格",
};

// メタデータを動的に生成
export async function generateMetadata({
	params,
}: SkillCertificationDetailPageProps): Promise<Metadata> {
	const id = params.id;
	const item = skillCertificationData.find(
		(item: SkillCertification) => item.id === id,
	);

	if (!item) {
		return {
			title: "スキル・資格が見つかりません | 人材管理システム",
			description: "指定されたスキル・資格が見つかりませんでした。",
		};
	}

	return {
		title: `${item.name} | 人材管理システム`,
		description: `${item.name}の詳細情報`,
	};
}

// 日付をフォーマットする関数
function formatDate(dateString: string): string {
	const date = new Date(dateString);
	return format(date, "yyyy年MM月dd日", { locale: ja });
}

export default function SkillCertificationDetailPage({
	params,
}: SkillCertificationDetailPageProps) {
	// ID
	const id = params.id;

	// データを取得
	const item = skillCertificationData.find(
		(item: SkillCertification) => item.id === id,
	);

	if (!item) {
		return (
			<div className="flex flex-col items-center justify-center h-[50vh]">
				<h2 className="text-2xl font-bold mb-4">
					スキル・資格が見つかりません
				</h2>
				<p className="text-gray-500 mb-6">
					指定されたID: {id} のスキル・資格は存在しません。
				</p>
				<Button asChild>
					<Link href="/skills-certifications">
						<ArrowLeftIcon className="mr-2 h-4 w-4" />
						スキル・資格一覧に戻る
					</Link>
				</Button>
			</div>
		);
	}

	return (
		<>
			<div className="flex items-center justify-between mb-6">
				<div className="flex items-center gap-4">
					<Button variant="outline" size="sm" asChild>
						<Link href="/skills-certifications">
							<ArrowLeftIcon className="mr-2 h-4 w-4" />
							戻る
						</Link>
					</Button>
					<h2 className="text-3xl font-bold tracking-tight">{item.name}</h2>
					<Badge
						variant={item.type === "skill" ? "default" : "secondary"}
						className="ml-2"
					>
						{TYPE_LABELS[item.type]}
					</Badge>
				</div>
				<Button asChild>
					<Link href={`/skills-certifications/${id}/edit`}>
						<PencilIcon className="mr-2 h-4 w-4" />
						編集
					</Link>
				</Button>
			</div>

			<div className="grid gap-6">
				<Card>
					<CardHeader>
						<CardTitle>基本情報</CardTitle>
					</CardHeader>
					<CardContent>
						<dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<dt className="text-sm font-medium text-gray-500">名称</dt>
								<dd className="mt-1 text-lg">{item.name}</dd>
							</div>
							<div>
								<dt className="text-sm font-medium text-gray-500">種類</dt>
								<dd className="mt-1 text-lg">
									<Badge
										variant={item.type === "skill" ? "default" : "secondary"}
									>
										{TYPE_LABELS[item.type]}
									</Badge>
								</dd>
							</div>
							<div>
								<dt className="text-sm font-medium text-gray-500">
									{item.type === "skill" ? "レベル" : "認定機関"}
								</dt>
								<dd className="mt-1 text-lg">{item.levelOrAuthority}</dd>
							</div>
							<div>
								<dt className="text-sm font-medium text-gray-500">取得者数</dt>
								<dd className="mt-1 text-lg">{item.holdersCount}名</dd>
							</div>
							<div className="md:col-span-2">
								<dt className="text-sm font-medium text-gray-500">説明</dt>
								<dd className="mt-1 text-lg whitespace-pre-wrap">
									{item.description}
								</dd>
							</div>
							{item.requirements && (
								<div className="md:col-span-2">
									<dt className="text-sm font-medium text-gray-500">
										取得条件
									</dt>
									<dd className="mt-1 text-lg whitespace-pre-wrap">
										{item.requirements}
									</dd>
								</div>
							)}
							<div>
								<dt className="text-sm font-medium text-gray-500">登録日</dt>
								<dd className="mt-1 text-lg">
									{format(new Date(item.createdAt), "yyyy年MM月dd日", {
										locale: ja,
									})}
								</dd>
							</div>
						</dl>
					</CardContent>
				</Card>
			</div>
		</>
	);
}
