import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { ArrowLeftIcon, Edit2Icon, TrashIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { positionData } from "../_data/positions-data";

interface PositionDetailPageProps {
	params: Promise<{
		id: string;
	}>;
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const position = positionData.find((p) => p.id === id);

	if (!position) {
		return {
			title: "役職が見つかりません | 人材管理システム",
		};
	}

	return {
		title: `${position.name} | 役職詳細 | 人材管理システム`,
		description: `${position.name}の詳細情報ページです。`,
	};
}

export default async function PositionDetailPage({
	params,
}: PositionDetailPageProps) {
	const { id } = await params;
	const position = positionData.find((p) => p.id === id);

	if (!position) {
		notFound();
	}

	return (
		<>
			<PageHeader
				title="役職詳細"
				operations={[
					<Button key="edit-position" variant="outline" asChild>
						<Link href={`/admin/positions/${position.id}/edit`}>編集</Link>
					</Button>,
				]}
			/>

			<Card>
				<CardHeader>
					<CardTitle className="text-2xl">{position.name}</CardTitle>
					<CardDescription>役職ID: {position.id}</CardDescription>
				</CardHeader>
				<CardContent className="grid gap-6">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<h3 className="text-sm font-medium text-muted-foreground mb-1">
								役職レベル
							</h3>
							<p>{position.level}</p>
						</div>
						<div>
							<h3 className="text-sm font-medium text-muted-foreground mb-1">
								所属人数
							</h3>
							<p>{position.memberCount}名</p>
						</div>
						<div>
							<h3 className="text-sm font-medium text-muted-foreground mb-1">
								作成日
							</h3>
							<p>{position.createdAt}</p>
						</div>
					</div>
					<div>
						<h3 className="text-sm font-medium text-muted-foreground mb-1">
							説明
						</h3>
						<p className="whitespace-pre-wrap">{position.description}</p>
					</div>
				</CardContent>
			</Card>
		</>
	);
}
