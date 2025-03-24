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
import {
	ArrowDownIcon,
	ArrowUpIcon,
	CalendarIcon,
	UsersIcon,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import type {
	SkillCertification,
	SkillCertificationType,
} from "../_data/skills-certifications-data";

// 日付をフォーマットする関数
function formatDate(dateString: string): string {
	const date = new Date(dateString);
	return new Intl.DateTimeFormat("ja-JP", {
		year: "numeric",
		month: "long",
		day: "numeric",
	}).format(date);
}

interface SkillCertificationListContainerProps {
	skillCertifications: SkillCertification[];
}

export function SkillCertificationListContainer({
	skillCertifications,
}: SkillCertificationListContainerProps) {
	const [searchTerm, setSearchTerm] = useState("");
	const [typeFilter, setTypeFilter] = useState<SkillCertificationType | "all">(
		"all",
	);
	const [sortConfig, setSortConfig] = useState<{
		key: keyof SkillCertification;
		direction: "asc" | "desc";
	}>({
		key: "name",
		direction: "asc",
	});

	// フィルター処理
	const filteredItems = skillCertifications.filter((item) => {
		// 検索フィルター
		const matchesSearch =
			item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
			item.levelOrAuthority.toLowerCase().includes(searchTerm.toLowerCase());

		// タイプフィルター
		const matchesType = typeFilter === "all" || item.type === typeFilter;

		return matchesSearch && matchesType;
	});

	// ソート処理
	const sortedItems = [...filteredItems].sort((a, b) => {
		const aValue = a[sortConfig.key];
		const bValue = b[sortConfig.key];

		if (aValue !== undefined && bValue !== undefined) {
			if (String(aValue) < String(bValue)) {
				return sortConfig.direction === "asc" ? -1 : 1;
			}
			if (String(aValue) > String(bValue)) {
				return sortConfig.direction === "asc" ? 1 : -1;
			}
		}
		return 0;
	});

	// ソートリクエストハンドラー
	const requestSort = (key: keyof SkillCertification) => {
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
	const getSortIcon = (key: keyof SkillCertification) => {
		if (sortConfig.key !== key) return null;
		return sortConfig.direction === "asc" ? (
			<ArrowUpIcon className="h-4 w-4 ml-1" />
		) : (
			<ArrowDownIcon className="h-4 w-4 ml-1" />
		);
	};

	return (
		<div className="space-y-4">
			<div className="flex flex-col sm:flex-row gap-4">
				<Input
					placeholder="スキル・資格を検索..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className="max-w-md"
				/>
				<div className="flex space-x-2">
					<Badge
						variant={typeFilter === "all" ? "default" : "outline"}
						className="cursor-pointer"
						onClick={() => setTypeFilter("all")}
					>
						すべて
					</Badge>
					<Badge
						variant={typeFilter === "skill" ? "default" : "outline"}
						className="cursor-pointer"
						onClick={() => setTypeFilter("skill")}
					>
						スキル
					</Badge>
					<Badge
						variant={typeFilter === "certification" ? "default" : "outline"}
						className="cursor-pointer"
						onClick={() => setTypeFilter("certification")}
					>
						資格
					</Badge>
				</div>
			</div>

			<div className="border rounded-md">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead
								className="w-[180px] cursor-pointer"
								onClick={() => requestSort("name")}
							>
								<div className="flex items-center">
									名称
									{getSortIcon("name")}
								</div>
							</TableHead>
							<TableHead
								className="w-[100px] cursor-pointer"
								onClick={() => requestSort("type")}
							>
								<div className="flex items-center">
									種類
									{getSortIcon("type")}
								</div>
							</TableHead>
							<TableHead>説明</TableHead>
							<TableHead
								className="cursor-pointer"
								onClick={() => requestSort("levelOrAuthority")}
							>
								<div className="flex items-center">
									レベル/認定機関
									{getSortIcon("levelOrAuthority")}
								</div>
							</TableHead>
							<TableHead
								className="cursor-pointer"
								onClick={() => requestSort("holdersCount")}
							>
								<div className="flex items-center">
									保有者数
									{getSortIcon("holdersCount")}
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
						{sortedItems.length === 0 ? (
							<TableRow>
								<TableCell colSpan={6} className="text-center py-6">
									該当するスキル・資格がありません
								</TableCell>
							</TableRow>
						) : (
							sortedItems.map((item) => (
								<TableRow key={item.id}>
									<TableCell>
										<Link
											href={`/skills-certifications/${item.id}`}
											className="font-medium text-blue-600 hover:underline"
										>
											{item.name}
										</Link>
									</TableCell>
									<TableCell>
										<Badge
											variant={item.type === "skill" ? "secondary" : "default"}
										>
											{item.type === "skill" ? "スキル" : "資格"}
										</Badge>
									</TableCell>
									<TableCell className="max-w-xs truncate">
										{item.description}
									</TableCell>
									<TableCell>
										{item.type === "skill" ? (
											<span className="flex items-center">
												レベル {item.levelOrAuthority}
											</span>
										) : (
											<span>{item.levelOrAuthority}</span>
										)}
									</TableCell>
									<TableCell>
										<div className="flex items-center">
											<UsersIcon className="h-4 w-4 mr-1 text-gray-500" />
											{item.holdersCount}人
										</div>
									</TableCell>
									<TableCell className="text-gray-500">
										<div className="flex items-center">
											<CalendarIcon className="h-4 w-4 mr-1 text-gray-500" />
											{formatDate(item.createdAt)}
										</div>
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
