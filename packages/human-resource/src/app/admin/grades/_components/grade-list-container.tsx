"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PaginationNav } from "@/components/common/pagination-nav";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { ArrowDownIcon, ArrowUpIcon, MoreHorizontalIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Grade } from "../_data/grades-data";
import type { GradeSearchParams } from "../_actions/grade-actions";

// 日付をフォーマットする関数
function formatDate(dateString: string): string {
	const date = new Date(dateString);
	return new Intl.DateTimeFormat("ja-JP", {
		year: "numeric",
		month: "long",
		day: "numeric",
	}).format(date);
}

interface GradeListContainerProps {
	grades: Grade[];
	searchParams: GradeSearchParams;
	pagination: {
		total: number;
		page: number;
		limit: number;
		totalPages: number;
	};
}

export function GradeListContainer({
	grades,
	searchParams,
	pagination,
}: GradeListContainerProps) {
	const router = useRouter();
	const pathname = usePathname();
	const params = useSearchParams();
	const { sort = "id", order = "asc" } = searchParams;

	// ソートハンドラー
	const handleSort = (key: keyof Grade) => {
		const newOrder = sort === key && order === "asc" ? "desc" : "asc";
		const updatedParams = new URLSearchParams(params.toString());
		updatedParams.set("sort", key);
		updatedParams.set("order", newOrder);
		router.push(`${pathname}?${updatedParams.toString()}`);
	};

	// ページ切り替え処理
	const handlePageChange = (page: number) => {
		const updatedParams = new URLSearchParams(params.toString());
		updatedParams.set("page", page.toString());
		router.push(`${pathname}?${updatedParams.toString()}`);
	};

	// ソートアイコンの表示
	const getSortIcon = (key: keyof Grade) => {
		if (sort !== key) return null;
		return order === "asc" ? (
			<ArrowUpIcon className="h-4 w-4 ml-1" />
		) : (
			<ArrowDownIcon className="h-4 w-4 ml-1" />
		);
	};

	return (
		<div className="space-y-4 w-full">
			<div className="border rounded-md w-full overflow-auto">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead
								className="w-[100px] cursor-pointer whitespace-nowrap"
								onClick={() => handleSort("id")}
							>
								<div className="flex items-center">
									グレードコード
									{getSortIcon("id")}
								</div>
							</TableHead>
							<TableHead
								className="w-[180px] cursor-pointer whitespace-nowrap"
								onClick={() => handleSort("name")}
							>
								<div className="flex items-center">
									グレード名
									{getSortIcon("name")}
								</div>
							</TableHead>
							<TableHead
								className="w-[100px] cursor-pointer whitespace-nowrap"
								onClick={() => handleSort("level")}
							>
								<div className="flex items-center">
									レベル
									{getSortIcon("level")}
								</div>
							</TableHead>
							<TableHead
								className="cursor-pointer w-[150px] whitespace-nowrap"
								onClick={() => handleSort("createdAt")}
							>
								<div className="flex items-center">
									作成日
									{getSortIcon("createdAt")}
								</div>
							</TableHead>
							<TableHead className="w-[80px]">操作</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{grades.length === 0 ? (
							<TableRow>
								<TableCell colSpan={5} className="text-center py-6">
									該当するグレードがありません
								</TableCell>
							</TableRow>
						) : (
							grades.map((grade) => (
								<TableRow key={grade.id}>
									<TableCell className="whitespace-nowrap">
										<Link
											href={`/admin/grades/${grade.id}`}
											className="font-medium text-blue-600 hover:underline"
										>
											{grade.id}
										</Link>
									</TableCell>
									<TableCell className="whitespace-nowrap">
										<Link
											href={`/admin/grades/${grade.id}`}
											className="font-medium text-blue-600 hover:underline"
										>
											{grade.name}
										</Link>
									</TableCell>
									<TableCell className="whitespace-nowrap">
										<Badge
											variant={
												grade.level >= 4
													? "default"
													: grade.level >= 2
														? "secondary"
														: "outline"
											}
										>
											レベル {grade.level}
										</Badge>
									</TableCell>
									<TableCell className="text-gray-500 whitespace-nowrap">
										{formatDate(grade.createdAt)}
									</TableCell>
									<TableCell className="whitespace-nowrap">
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<Button variant="ghost" size="icon">
													<MoreHorizontalIcon className="h-4 w-4" />
													<span className="sr-only">メニューを開く</span>
												</Button>
											</DropdownMenuTrigger>
											<DropdownMenuContent align="end">
												<DropdownMenuItem asChild>
													<Link href={`/admin/grades/${grade.id}`}>
														詳細を表示
													</Link>
												</DropdownMenuItem>
												<DropdownMenuItem asChild>
													<Link href={`/admin/grades/${grade.id}/edit`}>
														編集
													</Link>
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</TableCell>
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</div>

			{pagination.totalPages > 1 && (
				<div className="flex justify-center mt-6 w-full">
					<PaginationNav
						currentPage={pagination.page}
						totalPages={pagination.totalPages}
						onPageChange={handlePageChange}
					/>
				</div>
			)}
		</div>
	);
}
