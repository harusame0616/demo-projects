import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	getApplicationList,
	type ApplicationSearchParams,
} from "./_actions/application-actions";
import { ApplicationTable } from "./_components/application-table";
import { ApplicationFilter } from "./_components/application-filter";

import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "申請管理 | 人材管理システム",
	description: "勤怠修正・休暇申請の申請管理",
};

export default async function ApplicationsPage({
	searchParams,
}: {
	searchParams: ApplicationSearchParams;
}) {
	// 申請一覧を取得（ステータスによるフィルタリングを含む）
	const applicationsData = await getApplicationList({
		query: searchParams.query,
		type: searchParams.type,
		status: searchParams.status,
		date: searchParams.date,
		page: searchParams.page,
	});

	return (
		<>
			<h2 className="text-3xl font-bold tracking-tight mb-6">申請管理</h2>

			<Card>
				<CardHeader>
					<CardTitle>申請一覧</CardTitle>
					<CardDescription>
						従業員からの各種申請とその処理状況を表示します
					</CardDescription>
				</CardHeader>
				<CardContent>
					<ApplicationFilter searchParams={searchParams} />
					<ApplicationTable
						applications={applicationsData.items}
						pagination={applicationsData.pagination}
						searchParams={searchParams}
					/>
				</CardContent>
			</Card>
		</>
	);
}
