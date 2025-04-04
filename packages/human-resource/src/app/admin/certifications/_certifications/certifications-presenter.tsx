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
import type { SkillCertification } from "../_data/skills-certifications-data";
import type { CertificationOrder } from "../order";

interface CertificationsPresenterProps {
	certifications: SkillCertification[];
	pagination: PaginationResult;
	order: CertificationOrder;
}

export function CertificationsPresenter({
	certifications,
	pagination,
	order,
}: CertificationsPresenterProps) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const handleSort = (column: keyof SkillCertification) => {
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
			// 異なるカラムの場合は、そのカラムの昇順でソート
			params.set("field", column as string);
			params.set("direction", OrderDirection.Asc);
		}

		// ページを1に戻す
		params.delete("page");

		router.push(`${pathname}?${params}`);
	};

	// ソートアイコンの表示
	const getSortIcon = (key: keyof SkillCertification) => {
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
								onClick={() => handleSort("name")}
							>
								<div className="flex items-center">
									資格名
									{getSortIcon("name")}
								</div>
							</TableHead>
							<TableHead
								className="w-[180px] cursor-pointer whitespace-nowrap"
								onClick={() => handleSort("levelOrAuthority")}
							>
								<div className="flex items-center">
									認定機関
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
						{certifications.length === 0 ? (
							<TableRow>
								<TableCell colSpan={4} className="text-center py-6">
									該当する資格がありません
								</TableCell>
							</TableRow>
						) : (
							certifications.map((certification) => (
								<TableRow key={certification.id}>
									<TableCell className="whitespace-nowrap">
										<Link
											href={`/admin/certifications/${certification.id}`}
											className="font-medium underline"
										>
											{certification.name}
										</Link>
									</TableCell>
									<TableCell className="whitespace-nowrap">
										<Badge variant="outline">
											{certification.levelOrAuthority}
										</Badge>
									</TableCell>
									<TableCell className="hidden md:table-cell">
										<p className="truncate max-w-xs">
											{certification.description}
										</p>
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
														href={`/admin/certifications/${certification.id}`}
														className="underline"
													>
														詳細を表示
													</Link>
												</DropdownMenuItem>
												<DropdownMenuItem asChild>
													<Link
														href={`/admin/certifications/${certification.id}/edit`}
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
