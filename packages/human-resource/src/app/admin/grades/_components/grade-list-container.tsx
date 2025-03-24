"use client";

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { ArrowDownIcon, ArrowUpIcon, UsersIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
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

// 給与範囲をフォーマットする関数
function formatSalaryRange(min: number, max: number): string {
	return `${min.toLocaleString()}円 〜 ${max.toLocaleString()}円`;
}

interface GradeListContainerProps {
	grades: Grade[];
	searchParams: GradeSearchParams;
}

export function GradeListContainer({
	grades,
	searchParams,
}: GradeListContainerProps) {
	const router = useRouter();
	const pathname = usePathname();
	const params = useSearchParams();
	const { query = "", sort = "level", order = "desc" } = searchParams;
	const [searchTerm, setSearchTerm] = useState(query);

	// 検索ハンドラー
	const handleSearch = () => {
		const updatedParams = new URLSearchParams(params.toString());
		updatedParams.set("query", searchTerm);
		router.push(`${pathname}?${updatedParams.toString()}`);
	};

	// ソートハンドラー
	const handleSort = (key: keyof Grade | "salaryMin" | "salaryMax") => {
		const newOrder = sort === key && order === "asc" ? "desc" : "asc";
		const updatedParams = new URLSearchParams(params.toString());
		updatedParams.set("sort", key);
		updatedParams.set("order", newOrder);
		router.push(`${pathname}?${updatedParams.toString()}`);
	};

	// ソートアイコンの表示
	const getSortIcon = (key: keyof Grade | "salaryMin" | "salaryMax") => {
		if (sort !== key) return null;
		return order === "asc" ? (
			<ArrowUpIcon className="h-4 w-4 ml-1" />
		) : (
			<ArrowDownIcon className="h-4 w-4 ml-1" />
		);
	};

	return (
		<div className="space-y-4">
			<Input
				placeholder="グレードを検索..."
				value={searchTerm}
				onChange={(e) => {
					setSearchTerm(e.target.value);
					if (e.target.value === "") {
						const updatedParams = new URLSearchParams(params.toString());
						updatedParams.delete("query");
						router.push(`${pathname}?${updatedParams.toString()}`);
					}
				}}
				onKeyDown={(e) => {
					if (e.key === "Enter") {
						handleSearch();
					}
				}}
				onBlur={handleSearch}
				className="max-w-md"
			/>

			<div className="border rounded-md">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead
								className="w-[180px] cursor-pointer"
								onClick={() => handleSort("name")}
							>
								<div className="flex items-center">
									グレード名
									{getSortIcon("name")}
								</div>
							</TableHead>
							<TableHead
								className="w-[80px] cursor-pointer"
								onClick={() => handleSort("level")}
							>
								<div className="flex items-center">
									レベル
									{getSortIcon("level")}
								</div>
							</TableHead>
							<TableHead>説明</TableHead>
							<TableHead
								className="cursor-pointer"
								onClick={() => handleSort("salaryMin")}
							>
								<div className="flex items-center">
									給与範囲
									{getSortIcon("salaryMin")}
								</div>
							</TableHead>
							<TableHead
								className="cursor-pointer"
								onClick={() => handleSort("employeeCount")}
							>
								<div className="flex items-center">
									人数
									{getSortIcon("employeeCount")}
								</div>
							</TableHead>
							<TableHead
								className="cursor-pointer"
								onClick={() => handleSort("createdAt")}
							>
								<div className="flex items-center">
									作成日
									{getSortIcon("createdAt")}
								</div>
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{grades.length === 0 ? (
							<TableRow>
								<TableCell colSpan={6} className="text-center py-6">
									該当するグレードがありません
								</TableCell>
							</TableRow>
						) : (
							grades.map((grade) => (
								<TableRow key={grade.id}>
									<TableCell>
										<Link
											href={`/admin/grades/${grade.id}`}
											className="font-medium text-blue-600 hover:underline"
										>
											{grade.name}
										</Link>
									</TableCell>
									<TableCell>
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
									<TableCell className="max-w-xs truncate">
										{grade.description}
									</TableCell>
									<TableCell>
										{formatSalaryRange(
											grade.salaryRange.min,
											grade.salaryRange.max,
										)}
									</TableCell>
									<TableCell>
										<div className="flex items-center">
											<UsersIcon className="h-4 w-4 mr-1 text-gray-500" />
											{grade.employeeCount}人
										</div>
									</TableCell>
									<TableCell className="text-gray-500">
										{formatDate(grade.createdAt)}
									</TableCell>
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
