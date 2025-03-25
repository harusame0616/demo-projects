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
import { use } from "react";
import { positionData } from "../_data/positions-data";

interface PositionDetailPageProps {
	params: Promise<{
		id: string;
	}>;
}

export function generateMetadata({ params }: { params: { id: string } }) {
	const position = positionData.find((p) => p.id === params.id);

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

export default function PositionDetailPage({
	params,
}: PositionDetailPageProps) {
	const { id } = use(params);
	const position = positionData.find((p) => p.id === id);

	if (!position) {
		notFound();
	}

	return (
		<>
			<div className="flex items-center gap-4 mb-6">
				<Button variant="outline" size="icon" asChild>
					<Link href="/admin/positions">
						<ArrowLeftIcon className="h-4 w-4" />
						<span className="sr-only">戻る</span>
					</Link>
				</Button>
				<h2 className="text-3xl font-bold tracking-tight">役職詳細</h2>
			</div>

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
				<CardFooter className="flex justify-between">
					<Button variant="outline" asChild>
						<Link href="/admin/positions">
							<ArrowLeftIcon className="h-4 w-4 mr-2" />
							戻る
						</Link>
					</Button>
					<div className="flex gap-2">
						<Button
							variant="outline"
							className="text-red-500 hover:text-red-600"
						>
							<TrashIcon className="h-4 w-4 mr-2" />
							削除
						</Button>
						<Button variant="default" asChild>
							<Link href={`/admin/positions/${position.id}/edit`}>
								<Edit2Icon className="h-4 w-4 mr-2" />
								編集
							</Link>
						</Button>
					</div>
				</CardFooter>
			</Card>
		</>
	);
}
