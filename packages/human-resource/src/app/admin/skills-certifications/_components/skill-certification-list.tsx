"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
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
import { SearchIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";
import {
	type SkillCertification,
	type SkillCertificationType,
} from "../_data/skills-certifications-data";
import { Pagination } from "@/components/ui/pagination";

const TYPE_LABELS = {
	skill: "スキル",
	certification: "資格",
};

type SkillCertificationListProps = {
	skillCertifications: SkillCertification[];
	pagination: {
		total: number;
		page: number;
		limit: number;
		totalPages: number;
	};
	searchParams?: {
		query?: string;
		type?: SkillCertificationType | "all";
		sort?: string;
		order?: "asc" | "desc";
		page?: string;
	};
};

export function SkillCertificationList({
	skillCertifications,
	pagination,
	searchParams = {},
}: SkillCertificationListProps) {
	const {
		query = "",
		type = "all",
		sort = "name",
		order = "asc",
	} = searchParams;
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

	// フィルターとソートを適用する
	const handleSearch = (searchQuery: string) => {
		const updatedParams = new URLSearchParams(params.toString());
		updatedParams.set("query", searchQuery);
		// 検索時はページをリセット
		updatedParams.delete("page");
		router.push(`${pathname}?${updatedParams.toString()}`);
	};

	const handleTypeChange = (value: string) => {
		const updatedParams = new URLSearchParams(params.toString());
		updatedParams.set("type", value);
		// フィルター変更時はページをリセット
		updatedParams.delete("page");
		router.push(`${pathname}?${updatedParams.toString()}`);
	};

	const handleSort = (column: keyof SkillCertification) => {
		const newOrder = sort === column && order === "asc" ? "desc" : "asc";
		const queryStr = new URLSearchParams(params.toString());
		queryStr.set("sort", column);
		queryStr.set("order", newOrder);
		router.push(`${pathname}?${queryStr.toString()}`);
	};

	// ページ切り替え処理
	const handlePageChange = (page: number) => {
		const updatedParams = new URLSearchParams(params.toString());
		updatedParams.set("page", page.toString());
		router.push(`${pathname}?${updatedParams.toString()}`);
	};

	// ソートアイコンの表示
	const getSortIcon = (column: string) => {
		if (sort !== column) return null;
		return order === "asc" ? "↑" : "↓";
	};

	return (
		<div className="space-y-4 w-full">
			<div className="flex flex-col gap-4 md:flex-row md:items-center w-full">
				<div className="relative flex-1">
					<SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
					<Input
						placeholder="名称または説明で検索..."
						className="pl-8"
						defaultValue={query}
						onChange={(e) => {
							if (e.target.value === "") {
								handleSearch("");
							}
						}}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								handleSearch(e.currentTarget.value);
							}
						}}
					/>
				</div>
				<Select defaultValue={type} onValueChange={handleTypeChange}>
					<SelectTrigger className="w-[180px]">
						<SelectValue placeholder="種類でフィルター" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">すべて</SelectItem>
						<SelectItem value="skill">スキル</SelectItem>
						<SelectItem value="certification">資格</SelectItem>
					</SelectContent>
				</Select>
			</div>

			<div className="w-full overflow-auto rounded-md border">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead
								className="cursor-pointer hover:bg-gray-50 w-[200px] whitespace-nowrap"
								onClick={() => handleSort("name")}
							>
								名称 {getSortIcon("name")}
							</TableHead>
							<TableHead
								className="cursor-pointer hover:bg-gray-50 w-[100px] whitespace-nowrap"
								onClick={() => handleSort("type")}
							>
								種類 {getSortIcon("type")}
							</TableHead>
							<TableHead
								className="cursor-pointer hover:bg-gray-50 w-[200px] whitespace-nowrap"
								onClick={() => handleSort("levelOrAuthority")}
							>
								レベル/認定機関 {getSortIcon("levelOrAuthority")}
							</TableHead>
							<TableHead
								className="cursor-pointer hover:bg-gray-50 w-[120px] whitespace-nowrap"
								onClick={() => handleSort("createdAt")}
							>
								登録日 {getSortIcon("createdAt")}
							</TableHead>
							<TableHead className="text-right w-[80px] whitespace-nowrap">
								操作
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{skillCertifications.map((item) => (
							<TableRow key={item.id}>
								<TableCell className="font-medium whitespace-nowrap">
									<Link
										href={`/admin/skills-certifications/${item.id}`}
										className="hover:underline text-blue-600"
									>
										{item.name}
									</Link>
								</TableCell>
								<TableCell className="whitespace-nowrap">
									<Badge
										variant={item.type === "skill" ? "default" : "secondary"}
									>
										{TYPE_LABELS[item.type]}
									</Badge>
								</TableCell>
								<TableCell className="whitespace-nowrap">
									{item.levelOrAuthority}
								</TableCell>
								<TableCell className="whitespace-nowrap">
									{format(new Date(item.createdAt), "yyyy年MM月dd日", {
										locale: ja,
									})}
								</TableCell>
								<TableCell className="text-right whitespace-nowrap">
									<Button
										variant="outline"
										size="sm"
										asChild
										className="ml-auto"
									>
										<Link href={`/admin/skills-certifications/${item.id}/edit`}>
											編集
										</Link>
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>

			{pagination.totalPages > 1 && (
				<div className="flex justify-center mt-6 w-full">
					<Pagination
						currentPage={pagination.page}
						totalPages={pagination.totalPages}
						onPageChange={handlePageChange}
					/>
				</div>
			)}
		</div>
	);
}
