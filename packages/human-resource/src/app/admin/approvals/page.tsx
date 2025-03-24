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
import {
	getPendingApplications,
	getApprovalHistory,
	type ApprovalSearchParams,
} from "./_actions/approval-actions";

import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "承認管理 | 人材管理システム",
	description: "勤怠修正・休暇申請の承認管理",
};

export default async function ApprovalsPage({
	searchParams,
}: {
	searchParams: ApprovalSearchParams;
}) {
	// クエリパラメータから取得したタブ（デフォルトはpending）
	const activeTab = searchParams.tab || "pending";
	// ページ番号の取得（デフォルトは1ページ目）
	const currentPage = searchParams.page || "1";

	// 未承認申請を取得
	const pendingApplicationsData = await getPendingApplications({
		searchQuery: searchParams.query,
		type: searchParams.type,
		page: currentPage,
	});

	// 承認履歴を取得
	const historyApplicationsData = await getApprovalHistory({
		searchQuery: searchParams.query,
		type: searchParams.type,
		status: searchParams.status,
		date: searchParams.date,
		page: currentPage,
	});

	return (
		<>
			<h2 className="text-3xl font-bold tracking-tight mb-6">承認管理</h2>

			<Tabs defaultValue={activeTab} className="space-y-4">
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
							<ApprovalList
								applications={pendingApplicationsData.items}
								pagination={pendingApplicationsData.pagination}
								searchParams={searchParams}
							/>
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
							<ApprovalHistory
								applications={historyApplicationsData.items}
								pagination={historyApplicationsData.pagination}
								searchParams={searchParams}
							/>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</>
	);
}
