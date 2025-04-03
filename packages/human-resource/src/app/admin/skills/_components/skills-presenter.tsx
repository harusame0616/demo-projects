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
import { ArrowDownIcon, ArrowUpIcon, MoreHorizontalIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { PaginationResult } from "@/lib/pagination";
import { SkillOrderField, type SkillOrder } from "../order";
import { OrderDirection } from "@/lib/order";
import type { Skill } from "@/app/_mocks/skills";

type Props = {
	skills: Skill[];
	pagination: PaginationResult;
	order: SkillOrder;
};

export function SkillsPresenter({ skills, pagination, order }: Props) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const handleSort = (column: SkillOrderField) => {
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

		params.delete("page");

		router.push(`${pathname}?${params}`);
	};

	// ソートアイコンの表示
	const getSortIcon = (key: SkillOrderField) => {
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
								className="w-[180px] cursor-pointer whitespace-nowrap"
								onClick={() => handleSort(SkillOrderField.SkillName)}
							>
								<div className="flex items-center">
									スキル名
									{getSortIcon(SkillOrderField.SkillName)}
								</div>
							</TableHead>
							<TableHead
								className="w-[180px] cursor-pointer whitespace-nowrap"
								onClick={() => handleSort(SkillOrderField.SkillLevel)}
							>
								<div className="flex items-center">
									レベル
									{getSortIcon(SkillOrderField.SkillLevel)}
								</div>
							</TableHead>
							<TableHead className="hidden md:table-cell w-[300px]">
								説明
							</TableHead>
							<TableHead className="w-[80px]">操作</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{skills.length === 0 ? (
							<TableRow>
								<TableCell colSpan={4} className="text-center py-6">
									該当するスキルがありません
								</TableCell>
							</TableRow>
						) : (
							skills.map((skill) => (
								<TableRow key={skill.code}>
									<TableCell className="whitespace-nowrap">
										<Link
											href={`/admin/skills/${skill.code}`}
											className="font-medium underline"
										>
											{skill.name}
										</Link>
									</TableCell>
									<TableCell className="whitespace-nowrap">
										<Badge variant="outline">{skill.level}</Badge>
									</TableCell>
									<TableCell className="hidden md:table-cell">
										<p className="truncate max-w-xs">{skill.description}</p>
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
														href={`/admin/skills/${skill.code}`}
														className="underline"
													>
														詳細を表示
													</Link>
												</DropdownMenuItem>
												<DropdownMenuItem asChild>
													<Link
														href={`/admin/skills/${skill.code}/edit`}
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
