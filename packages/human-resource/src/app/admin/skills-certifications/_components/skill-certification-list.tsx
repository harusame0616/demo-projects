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

const TYPE_LABELS = {
	skill: "スキル",
	certification: "資格",
};

type SkillCertificationListProps = {
	skillCertifications: SkillCertification[];
	searchParams?: {
		query?: string;
		type?: SkillCertificationType | "all";
		sort?: string;
		order?: "asc" | "desc";
	};
};

export function SkillCertificationList({
	skillCertifications,
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
		router.push(`${pathname}?${createQueryString("query", searchQuery)}`);
	};

	const handleTypeChange = (value: string) => {
		router.push(`${pathname}?${createQueryString("type", value)}`);
	};

	const handleSort = (column: keyof SkillCertification) => {
		const newOrder = sort === column && order === "asc" ? "desc" : "asc";
		const queryStr = new URLSearchParams(params.toString());
		queryStr.set("sort", column);
		queryStr.set("order", newOrder);
		router.push(`${pathname}?${queryStr.toString()}`);
	};

	// ソートアイコンの表示
	const getSortIcon = (column: string) => {
		if (sort !== column) return null;
		return order === "asc" ? "↑" : "↓";
	};

	return (
		<div className="space-y-4">
			<div className="flex flex-col gap-4 md:flex-row md:items-center">
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

			<Table>
				<TableHeader>
					<TableRow>
						<TableHead
							className="cursor-pointer"
							onClick={() => handleSort("name")}
						>
							名称 {getSortIcon("name")}
						</TableHead>
						<TableHead
							className="cursor-pointer"
							onClick={() => handleSort("type")}
						>
							種類 {getSortIcon("type")}
						</TableHead>
						<TableHead
							className="cursor-pointer"
							onClick={() => handleSort("levelOrAuthority")}
						>
							レベル/認定機関 {getSortIcon("levelOrAuthority")}
						</TableHead>
						<TableHead
							className="text-center cursor-pointer"
							onClick={() => handleSort("holdersCount")}
						>
							取得者数 {getSortIcon("holdersCount")}
						</TableHead>
						<TableHead
							className="cursor-pointer"
							onClick={() => handleSort("createdAt")}
						>
							登録日 {getSortIcon("createdAt")}
						</TableHead>
						<TableHead className="text-right">操作</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{skillCertifications.map((item) => (
						<TableRow key={item.id}>
							<TableCell className="font-medium">
								<Link
									href={`/admin/skills-certifications/${item.id}`}
									className="hover:underline text-blue-600"
								>
									{item.name}
								</Link>
							</TableCell>
							<TableCell>
								<Badge
									variant={item.type === "skill" ? "default" : "secondary"}
								>
									{TYPE_LABELS[item.type]}
								</Badge>
							</TableCell>
							<TableCell>{item.levelOrAuthority}</TableCell>
							<TableCell className="text-center">
								{item.holdersCount}名
							</TableCell>
							<TableCell>
								{format(new Date(item.createdAt), "yyyy年MM月dd日", {
									locale: ja,
								})}
							</TableCell>
							<TableCell className="text-right">
								<Button variant="outline" size="sm" asChild className="ml-auto">
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
	);
}
