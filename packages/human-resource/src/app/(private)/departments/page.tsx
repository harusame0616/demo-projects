import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusIcon } from "lucide-react";
import { Suspense } from "react";
import { DepartmentListContainer } from "./_components/department-list-container";

import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "部署一覧 | 人材管理システム",
	description: "人材管理システムの部署一覧",
};

// モックデータ (部署の上下関係を表現)
const departments = [
	{
		id: "001",
		name: "営業部",
		parentId: null,
		level: 0,
		memberCount: 12,
		createdAt: "2015-04-01",
	},
	{
		id: "002",
		name: "人事部",
		parentId: null,
		level: 0,
		memberCount: 8,
		createdAt: "2015-04-01",
	},
	{
		id: "003",
		name: "開発部",
		parentId: null,
		level: 0,
		memberCount: 25,
		createdAt: "2015-04-01",
	},
	{
		id: "004",
		name: "マーケティング部",
		parentId: null,
		level: 0,
		memberCount: 10,
		createdAt: "2018-04-01",
	},
	{
		id: "005",
		name: "財務部",
		parentId: null,
		level: 0,
		memberCount: 7,
		createdAt: "2015-04-01",
	},
	{
		id: "006",
		name: "第一営業課",
		parentId: "001",
		level: 1,
		memberCount: 6,
		createdAt: "2017-04-01",
	},
	{
		id: "007",
		name: "第二営業課",
		parentId: "001",
		level: 1,
		memberCount: 6,
		createdAt: "2019-04-01",
	},
	{
		id: "008",
		name: "Web開発課",
		parentId: "003",
		level: 1,
		memberCount: 12,
		createdAt: "2018-04-01",
	},
	{
		id: "009",
		name: "モバイル開発課",
		parentId: "003",
		level: 1,
		memberCount: 8,
		createdAt: "2020-04-01",
	},
	{
		id: "010",
		name: "インフラ課",
		parentId: "003",
		level: 1,
		memberCount: 5,
		createdAt: "2019-04-01",
	},
];

// ローディング状態を表示するスケルトンコンポーネント
function DepartmentListSkeleton() {
	return (
		<div className="space-y-4">
			<div className="flex flex-col gap-4 md:flex-row md:items-center mb-6">
				<div className="h-10 w-full bg-gray-200 animate-pulse rounded-md" />
			</div>
			<div className="rounded-md border">
				<div className="h-[400px] bg-gray-100 animate-pulse rounded-md" />
			</div>
		</div>
	);
}

export default function DepartmentsPage() {
	return (
		<>
			<div className="flex items-center justify-between mb-6">
				<h2 className="text-3xl font-bold tracking-tight">部署一覧</h2>
				<Button asChild>
					<Link href="/departments/new">
						<PlusIcon className="mr-2 h-4 w-4" />
						部署を追加
					</Link>
				</Button>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>部署一覧</CardTitle>
				</CardHeader>
				<CardContent>
					<Suspense fallback={<DepartmentListSkeleton />}>
						<DepartmentListContainer departments={departments} />
					</Suspense>
				</CardContent>
			</Card>
		</>
	);
}
