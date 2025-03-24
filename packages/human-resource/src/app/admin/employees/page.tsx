import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { EmployeeListContainer } from "./_components/employee-list-container";

import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "従業員一覧 | 人材管理システム",
	description: "人材管理システムの従業員一覧",
};

// モックデータ
const employees = [
	{
		id: "001",
		name: "山田 太郎",
		department: "営業部",
		position: "課長",
		email: "yamada.taro@example.com",
		joinDate: "2018-04-01",
	},
	{
		id: "002",
		name: "佐藤 花子",
		department: "人事部",
		position: "主任",
		email: "sato.hanako@example.com",
		joinDate: "2019-04-01",
	},
	{
		id: "003",
		name: "鈴木 一郎",
		department: "開発部",
		position: "部長",
		email: "suzuki.ichiro@example.com",
		joinDate: "2015-04-01",
	},
	{
		id: "004",
		name: "田中 美咲",
		department: "マーケティング部",
		position: "担当",
		email: "tanaka.misaki@example.com",
		joinDate: "2021-04-01",
	},
	{
		id: "005",
		name: "伊藤 健太",
		department: "財務部",
		position: "主任",
		email: "ito.kenta@example.com",
		joinDate: "2020-04-01",
	},
	{
		id: "006",
		name: "中村 真由美",
		department: "開発部",
		position: "リーダー",
		email: "nakamura.mayumi@example.com",
		joinDate: "2017-04-01",
	},
	{
		id: "007",
		name: "小林 大輔",
		department: "営業部",
		position: "担当",
		email: "kobayashi.daisuke@example.com",
		joinDate: "2022-04-01",
	},
	{
		id: "008",
		name: "加藤 健一",
		department: "財務部",
		position: "部長",
		email: "kato.kenichi@example.com",
		joinDate: "2010-04-01",
	},
];

// ローディング状態を表示するスケルトンコンポーネント
function EmployeeListSkeleton() {
	return (
		<div className="space-y-4">
			<div className="flex flex-col gap-4 md:flex-row md:items-center mb-6">
				<div className="h-10 w-full bg-gray-200 animate-pulse rounded-md" />
				<div className="flex gap-4">
					<div className="h-10 w-[180px] bg-gray-200 animate-pulse rounded-md" />
					<div className="h-10 w-[180px] bg-gray-200 animate-pulse rounded-md" />
				</div>
			</div>
			<div className="rounded-md border">
				<div className="h-[400px] bg-gray-100 animate-pulse rounded-md" />
			</div>
		</div>
	);
}

export default function EmployeesPage() {
	return (
		<>
			<div className="flex items-center justify-between mb-6">
				<h2 className="text-3xl font-bold tracking-tight">従業員一覧</h2>
				<Button asChild>
					<Link href="/employees/new">
						<PlusIcon className="mr-2 h-4 w-4" />
						従業員を追加
					</Link>
				</Button>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>従業員一覧</CardTitle>
				</CardHeader>
				<CardContent>
					<Suspense fallback={<EmployeeListSkeleton />}>
						<EmployeeListContainer employees={employees} />
					</Suspense>
				</CardContent>
			</Card>
		</>
	);
}
