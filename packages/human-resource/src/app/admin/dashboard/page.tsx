import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export const metadata = {
	title: "ダッシュボード | 人材管理システム",
	description: "人材管理システムのダッシュボード",
};

export default function DashboardPage() {
	return (
		<>
			<h2 className="text-3xl font-bold tracking-tight mb-6">ダッシュボード</h2>

			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
				<Card>
					<CardHeader>
						<CardTitle>従業員情報</CardTitle>
						<CardDescription>従業員の基本情報を管理</CardDescription>
					</CardHeader>
					<CardContent>
						<p className="text-sm text-muted-foreground mb-4">
							従業員データの登録・更新・検索ができます。
						</p>
						<Button className="w-full" asChild>
							<Link href="/employees">従業員一覧を見る</Link>
						</Button>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>評価管理</CardTitle>
						<CardDescription>従業員の業績評価を記録</CardDescription>
					</CardHeader>
					<CardContent>
						<p className="text-sm text-muted-foreground mb-4">
							定期評価・目標設定・フィードバックを管理します。
						</p>
						<Button className="w-full" asChild>
							<Link href="#">評価管理へ</Link>
						</Button>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>研修管理</CardTitle>
						<CardDescription>従業員の研修履歴を管理</CardDescription>
					</CardHeader>
					<CardContent>
						<p className="text-sm text-muted-foreground mb-4">
							研修の登録・参加状況・成果を記録します。
						</p>
						<Button className="w-full" asChild>
							<Link href="#">研修管理へ</Link>
						</Button>
					</CardContent>
				</Card>
			</div>
		</>
	);
}
