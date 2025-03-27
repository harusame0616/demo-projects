import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { UserListContainer } from "./_components/user-list-container";
import { SearchForm } from "./_components/search-form";
import {
	getUsers,
	getUserRoles,
	getUserStatuses,
} from "./_actions/user-actions";
import { mockEmployees } from "@/app/_mocks/employees";

import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "ユーザー一覧 | 人材管理システム",
	description: "人材管理システムのユーザー一覧",
};

// ローディング状態を表示するスケルトンコンポーネント
function UserListSkeleton() {
	return (
		<div className="space-y-4 w-full">
			<div className="flex flex-col gap-4 md:flex-row md:items-center mb-6 w-full">
				<div className="h-10 w-full bg-gray-200 animate-pulse rounded-md" />
				<div className="flex gap-4">
					<div className="h-10 w-[180px] bg-gray-200 animate-pulse rounded-md" />
					<div className="h-10 w-[180px] bg-gray-200 animate-pulse rounded-md" />
				</div>
			</div>
			<div className="rounded-md border w-full">
				<div className="h-[400px] bg-gray-100 animate-pulse rounded-md" />
			</div>
			<div className="h-10 w-full bg-gray-200 animate-pulse rounded-md mt-4" />
		</div>
	);
}

interface UserSearchParams {
	query?: string;
	role?: string;
	status?: string;
	sortBy?: string;
	sortOrder?: "asc" | "desc";
	page?: string;
}

interface UsersPageProps {
	searchParams: Promise<UserSearchParams>;
}

export default async function UsersPage({ searchParams }: UsersPageProps) {
	// searchParamsをawaitして取得
	const resolvedParams = await searchParams;

	// ページ番号のパラメータを処理（デフォルトは1ページ目）
	const currentPage = resolvedParams.page
		? Number.parseInt(resolvedParams.page, 10)
		: 1;

	// 検索とソートパラメータの安全な取得
	const query = resolvedParams.query;
	const role = resolvedParams.role;
	const status = resolvedParams.status;
	const sortBy = resolvedParams.sortBy;
	const sortOrder = resolvedParams.sortOrder;

	// サーバーサイドでデータを取得
	const usersData = await getUsers({
		searchQuery: query,
		role,
		status,
		sortBy,
		sortOrder: sortOrder as "asc" | "desc",
		page: currentPage,
		limit: 20, // 1ページあたり20件
	});

	// 役割とステータスのオプションを取得
	const roleOptions = await getUserRoles();
	const statusOptions = await getUserStatuses();

	// 従業員データを取得
	const employees = mockEmployees;

	return (
		<div className="space-y-4">
			<div className="flex justify-between items-center">
				<h1 className="text-2xl font-bold tracking-tight">ユーザー一覧</h1>
				<Button asChild variant="outline">
					<Link href="/admin/users/new">新規作成</Link>
				</Button>
			</div>

			<SearchForm
				roleOptions={roleOptions}
				statusOptions={statusOptions}
				searchQuery={query}
				currentRole={role}
				currentStatus={status}
			/>

			<div className="w-full">
				<Suspense fallback={<UserListSkeleton />}>
					<UserListContainer
						users={usersData.items}
						employees={employees}
						searchParams={{
							query,
							role,
							status,
							sortBy,
							sortOrder,
							page: resolvedParams.page,
						}}
						pagination={usersData.pagination}
					/>
				</Suspense>
			</div>
		</div>
	);
}
