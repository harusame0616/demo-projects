import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ApprovalHistory } from "./_components/approval-history";
import { ApprovalList } from "./_components/approval-list";

import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "承認管理 | 人材管理システム",
	description: "勤怠修正・休暇申請の承認管理",
};

export default function ApprovalsPage() {
	return (
		<>
			<h2 className="text-3xl font-bold tracking-tight mb-6">承認管理</h2>

			<Tabs defaultValue="pending" className="space-y-4">
				<TabsList>
					<TabsTrigger value="pending">未承認申請</TabsTrigger>
					<TabsTrigger value="history">承認履歴</TabsTrigger>
				</TabsList>

				<TabsContent value="pending">
					<Card>
						<CardHeader>
							<CardTitle>未承認申請一覧</CardTitle>
							<CardDescription>
								従業員からの勤怠修正・休暇申請などの承認待ちリクエストを表示します
							</CardDescription>
						</CardHeader>
						<CardContent>
							<ApprovalList />
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="history">
					<Card>
						<CardHeader>
							<CardTitle>承認履歴</CardTitle>
							<CardDescription>
								過去の申請とその承認結果を確認できます
							</CardDescription>
						</CardHeader>
						<CardContent>
							<ApprovalHistory />
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</>
	);
}
