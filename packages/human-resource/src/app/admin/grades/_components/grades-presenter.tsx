"use client";

import { PaginationNav } from "@/components/common/pagination-nav";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { OrderDirection } from "@/lib/order";
import type { PaginationResult } from "@/lib/pagination";
import { ArrowDownIcon, ArrowUpIcon, MoreHorizontalIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Grade } from "../_data/grades-data";
import { GradeOrderField, type GradeOrder } from "../order";

interface GradesPresenterProps {
	grades: Grade[];
	pagination: PaginationResult;
	order: GradeOrder;
}

export function GradesPresenter({
	grades,
	pagination,
	order,
}: GradesPresenterProps) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	// ソート処理
	const handleSort = (column: keyof Grade) => {
		const params = new URLSearchParams(searchParams.toString());

		// 同じカラムをクリックした場合は、昇順・降順を切り替え
		if (order.field === column) {
			params.set(
				"direction",
				order.direction === OrderDirection.Asc
					? OrderDirection.Desc
					: OrderDirection.Asc,
			);
		} else {
			params.set("field", column as string);
			params.set("direction", OrderDirection.Asc);
		}

		// ページを1に戻す
		params.delete("page");

		router.push(`${pathname}?${params}`);
	};

	// ソートアイコンの表示
	const getSortIcon = (key: keyof Grade) => {
		if (order.field !== key) return null;
		return order.direction === OrderDirection.Asc ? (
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
								onClick={() => handleSort(GradeOrderField.GradeCode)}
							>
								<div className="flex items-center">
									グレードコード
									{getSortIcon(GradeOrderField.GradeCode)}
								</div>
							</TableHead>
							<TableHead
								className="w-[180px] cursor-pointer whitespace-nowrap"
								onClick={() => handleSort(GradeOrderField.GradeName)}
							>
								<div className="flex items-center">
									グレード名
									{getSortIcon(GradeOrderField.GradeName)}
								</div>
							</TableHead>
							<TableHead
								className="w-[100px] cursor-pointer whitespace-nowrap"
								onClick={() => handleSort(GradeOrderField.GradeLevel)}
							>
								<div className="flex items-center">
									レベル
									{getSortIcon(GradeOrderField.GradeLevel)}
								</div>
							</TableHead>
							<TableHead className="w-[80px]">操作</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{grades.length === 0 ? (
							<TableRow>
								<TableCell colSpan={4} className="text-center py-6">
									該当するグレードがありません
								</TableCell>
							</TableRow>
						) : (
							grades.map((grade) => (
								<TableRow key={grade.id}>
									<TableCell className="whitespace-nowrap">
										<Link
											href={`/admin/grades/${grade.id}`}
											className="font-medium underline"
										>
											{grade.id}
										</Link>
									</TableCell>
									<TableCell className="whitespace-nowrap">
										{grade.name}
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
													<Link
														href={`/admin/grades/${grade.id}`}
														className="underline"
													>
														詳細を表示
													</Link>
												</DropdownMenuItem>
												<DropdownMenuItem asChild>
													<Link
														href={`/admin/grades/${grade.id}/edit`}
														className="underline"
													>
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
					/>
				</div>
			)}
		</div>
	);
}
