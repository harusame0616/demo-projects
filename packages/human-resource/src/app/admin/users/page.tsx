import { Button } from "@/components/ui/button";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { SearchFormPresenter } from "./_components/search-form-presenter";
import { UsersContainer } from "./_components/users-container";
import { UsersSkeleton } from "./_components/users-skeleton";

export const metadata: Metadata = {
	title: "ユーザー一覧 | 人材管理システム",
	description: "人材管理システムのユーザー一覧",
};

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

	return (
		<div className="space-y-4">
			<div className="flex justify-between items-center">
				<h1 className="text-2xl font-bold tracking-tight">ユーザー一覧</h1>
				<Button asChild variant="outline">
					<Link href="/admin/users/new">新規作成</Link>
				</Button>
			</div>

			<SearchFormPresenter
				searchQuery={resolvedParams.query}
				currentRole={resolvedParams.role}
				currentStatus={resolvedParams.status}
			/>

			<div className="w-full">
				<Suspense
					fallback={<UsersSkeleton />}
					key={`users-${JSON.stringify(resolvedParams)}`}
				>
					<UsersContainer searchParams={resolvedParams} />
				</Suspense>
			</div>
		</div>
	);
}
