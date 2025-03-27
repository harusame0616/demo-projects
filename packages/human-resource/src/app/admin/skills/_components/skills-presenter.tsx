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
import type { SkillCertification } from "../../skills-certifications/_data/skills-certifications-data";

interface SkillsPresenterProps {
	skills: SkillCertification[];
	pagination: {
		total: number;
		page: number;
		limit: number;
		totalPages: number;
	};
}

export function SkillsPresenter({ skills, pagination }: SkillsPresenterProps) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	// 現在のソート状態
	const currentSort = searchParams.get("sort") || "name";
	const currentOrder = searchParams.get("order") || "asc";

	// ページ変更処理
	const handlePageChange = (page: number) => {
		const params = new URLSearchParams(searchParams.toString());
		params.set("page", page.toString());
		router.push(`${pathname}?${params.toString()}`);
	};

	// ソート処理
	const handleSort = (column: keyof SkillCertification) => {
		const params = new URLSearchParams(searchParams.toString());

		// 同じカラムをクリックした場合は、昇順・降順を切り替え
		if (currentSort === column) {
			params.set("order", currentOrder === "asc" ? "desc" : "asc");
		} else {
			// 異なるカラムの場合は、そのカラムの昇順でソート
			params.set("sort", column as string);
			params.set("order", "asc");
		}

		// ページを1に戻す
		params.delete("page");

		router.push(`${pathname}?${params.toString()}`);
	};

	// ソートアイコンの表示
	const getSortIcon = (key: keyof SkillCertification) => {
		if (currentSort !== key) return null;
		return currentOrder === "asc" ? (
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
								onClick={() => handleSort("name")}
							>
								<div className="flex items-center">
									スキル名
									{getSortIcon("name")}
								</div>
							</TableHead>
							<TableHead
								className="w-[180px] cursor-pointer whitespace-nowrap"
								onClick={() => handleSort("levelOrAuthority")}
							>
								<div className="flex items-center">
									レベル
									{getSortIcon("levelOrAuthority")}
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
								<TableRow key={skill.id}>
									<TableCell className="whitespace-nowrap">
										<Link
											href={`/admin/skills/${skill.id}`}
											className="font-medium underline"
										>
											{skill.name}
										</Link>
									</TableCell>
									<TableCell className="whitespace-nowrap">
										<Badge variant="outline">{skill.levelOrAuthority}</Badge>
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
														href={`/admin/skills/${skill.id}`}
														className="underline"
													>
														詳細を表示
													</Link>
												</DropdownMenuItem>
												<DropdownMenuItem asChild>
													<Link
														href={`/admin/skills/${skill.id}/edit`}
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
						onPageChange={handlePageChange}
					/>
				</div>
			)}
		</div>
	);
}
