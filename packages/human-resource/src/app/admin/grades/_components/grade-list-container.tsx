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
import { useState } from "react";
import type { Grade } from "../_data/grades-data";

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
}

export function GradeListContainer({ grades }: GradeListContainerProps) {
	const [searchTerm, setSearchTerm] = useState("");
	const [sortConfig, setSortConfig] = useState<{
		key: keyof Grade | "salaryMin" | "salaryMax";
		direction: "asc" | "desc";
	}>({
		key: "level",
		direction: "desc",
	});

	// 検索フィルター
	const filteredGrades = grades.filter(
		(grade) =>
			grade.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			grade.description.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	// ソート関数
	const sortedGrades = [...filteredGrades].sort((a, b) => {
		let aValue: any = a[sortConfig.key as keyof Grade];
		let bValue: any = b[sortConfig.key as keyof Grade];

		// 給与最小・最大値でのソート対応
		if (sortConfig.key === "salaryMin") {
			aValue = a.salaryRange.min;
			bValue = b.salaryRange.min;
		} else if (sortConfig.key === "salaryMax") {
			aValue = a.salaryRange.max;
			bValue = b.salaryRange.max;
		}

		if (aValue < bValue) {
			return sortConfig.direction === "asc" ? -1 : 1;
		}
		if (aValue > bValue) {
			return sortConfig.direction === "asc" ? 1 : -1;
		}
		return 0;
	});

	// ソートリクエストハンドラー
	const requestSort = (key: keyof Grade | "salaryMin" | "salaryMax") => {
		if (sortConfig.key === key) {
			setSortConfig({
				key,
				direction: sortConfig.direction === "asc" ? "desc" : "asc",
			});
		} else {
			setSortConfig({ key, direction: "asc" });
		}
	};

	// ソートアイコンの表示
	const getSortIcon = (key: keyof Grade | "salaryMin" | "salaryMax") => {
		if (sortConfig.key !== key) return null;
		return sortConfig.direction === "asc" ? (
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
				onChange={(e) => setSearchTerm(e.target.value)}
				className="max-w-md"
			/>

			<div className="border rounded-md">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead
								className="w-[180px] cursor-pointer"
								onClick={() => requestSort("name")}
							>
								<div className="flex items-center">
									グレード名
									{getSortIcon("name")}
								</div>
							</TableHead>
							<TableHead
								className="w-[80px] cursor-pointer"
								onClick={() => requestSort("level")}
							>
								<div className="flex items-center">
									レベル
									{getSortIcon("level")}
								</div>
							</TableHead>
							<TableHead>説明</TableHead>
							<TableHead
								className="cursor-pointer"
								onClick={() => requestSort("salaryMin")}
							>
								<div className="flex items-center">
									給与範囲
									{getSortIcon("salaryMin")}
								</div>
							</TableHead>
							<TableHead
								className="cursor-pointer"
								onClick={() => requestSort("employeeCount")}
							>
								<div className="flex items-center">
									人数
									{getSortIcon("employeeCount")}
								</div>
							</TableHead>
							<TableHead
								className="cursor-pointer"
								onClick={() => requestSort("createdAt")}
							>
								<div className="flex items-center">
									作成日
									{getSortIcon("createdAt")}
								</div>
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{sortedGrades.length === 0 ? (
							<TableRow>
								<TableCell colSpan={6} className="text-center py-6">
									該当するグレードがありません
								</TableCell>
							</TableRow>
						) : (
							sortedGrades.map((grade) => (
								<TableRow key={grade.id}>
									<TableCell>
										<Link
											href={`/grades/${grade.id}`}
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
