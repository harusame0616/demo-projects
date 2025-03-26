"use client";

import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { MoreHorizontalIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import type { SkillCertification } from "../../skills-certifications/_data/skills-certifications-data";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PaginationNav } from "@/components/common/pagination-nav";

type Skill = SkillCertification;

type SkillListProps = {
	skills: Skill[];
	pagination: {
		total: number;
		page: number;
		limit: number;
		totalPages: number;
	};
	searchParams?: {
		query?: string;
		sort?: string;
		order?: "asc" | "desc";
		page?: string;
	};
};

export function SkillList({
	skills,
	pagination,
	searchParams = {},
}: SkillListProps) {
	const { sort = "code", order = "asc" } = searchParams;
	const router = useRouter();
	const pathname = usePathname();
	const params = useSearchParams();

	// 検索パラメータを更新する関数
	const createQueryString = useCallback(
		(name: string, value: string) => {
			const updatedParams = new URLSearchParams(params.toString());
			updatedParams.set(name, value);
			return updatedParams.toString();
		},
		[params],
	);

	const handleSort = (column: keyof Skill) => {
		const newOrder = sort === column && order === "asc" ? "desc" : "asc";
		const queryStr = new URLSearchParams(params.toString());

		// 既存のパラメータを維持
		if (searchParams.query) {
			queryStr.set("query", searchParams.query);
		}
		if (searchParams.page) {
			queryStr.set("page", searchParams.page);
		}

		// ソート条件を更新
		queryStr.set("sort", column);
		queryStr.set("order", newOrder);

		// デバッグ用ログ
		console.log(
			`Sorting: ${column}, Order: ${newOrder}, Params: ${queryStr.toString()}`,
		);

		router.push(`${pathname}?${queryStr.toString()}`);
	};

	// ページ切り替え処理
	const handlePageChange = (page: number) => {
		const updatedParams = new URLSearchParams(params.toString());

		// 既存のパラメータを維持
		if (searchParams.query) {
			updatedParams.set("query", searchParams.query);
		}
		if (searchParams.sort) {
			updatedParams.set("sort", searchParams.sort);
		}
		if (searchParams.order) {
			updatedParams.set("order", searchParams.order);
		}

		// ページを更新
		updatedParams.set("page", page.toString());

		router.push(`${pathname}?${updatedParams.toString()}`);
	};

	// ソートアイコンの表示
	const getSortIcon = (column: string) => {
		// デバッグ用ログ
		console.log(`Column: ${column}, Sort: ${sort}, Order: ${order}`);

		if (sort !== column) return null;
		return order === "asc" ? "↑" : "↓";
	};

	return (
		<div className="space-y-4 w-full">
			<div className="w-full overflow-auto rounded-md border">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead
								className="cursor-pointer hover:bg-gray-50 w-[100px] whitespace-nowrap"
								onClick={() => handleSort("code")}
							>
								スキルコード {getSortIcon("code")}
							</TableHead>
							<TableHead
								className="cursor-pointer hover:bg-gray-50 w-[200px] whitespace-nowrap"
								onClick={() => handleSort("name")}
							>
								名称 {getSortIcon("name")}
							</TableHead>
							<TableHead
								className="cursor-pointer hover:bg-gray-50 w-[200px] whitespace-nowrap"
								onClick={() => handleSort("levelOrAuthority")}
							>
								レベル {getSortIcon("levelOrAuthority")}
							</TableHead>
							<TableHead className="text-right w-[80px] whitespace-nowrap">
								操作
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{skills.map((skill) => (
							<TableRow key={skill.id}>
								<TableCell className="font-medium whitespace-nowrap">
									<Link
										href={`/admin/skills/${skill.id}`}
										className="underline  "
									>
										{skill.code}
									</Link>
								</TableCell>
								<TableCell className="whitespace-nowrap">
									{skill.name}
								</TableCell>
								<TableCell className="whitespace-nowrap">
									{skill.levelOrAuthority}
								</TableCell>
								<TableCell className="text-right whitespace-nowrap">
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
													href={`/admin/skills/${skill.id}`}
													className="underline "
												>
													詳細を表示
												</Link>
											</DropdownMenuItem>
											<DropdownMenuItem asChild>
												<Link
													href={`/admin/skills/${skill.id}/edit`}
													className="underline "
												>
													編集
												</Link>
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</TableCell>
							</TableRow>
						))}
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
