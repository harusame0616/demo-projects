"use client";

import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname, useSearchParams } from "next/navigation";

interface PaginationNavProps {
	currentPage: number;
	totalPages: number;
	className?: string;
}

export function PaginationNav({
	currentPage,
	totalPages,
	className,
}: PaginationNavProps) {
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const createPageUrl = (page: number): string => {
		const params = new URLSearchParams(searchParams.toString());
		params.set("page", page.toString());
		return `${pathname}?${params.toString()}`;
	};

	// ページボタンの範囲を計算
	const renderPageNumbers = () => {
		const maxVisiblePages = 7;
		const items = [];

		if (totalPages <= maxVisiblePages) {
			// 少ないページ数の場合はすべて表示
			for (let i = 1; i <= totalPages; i++) {
				items.push(
					<PaginationItem key={i}>
						<PaginationLink
							href={createPageUrl(i)}
							isActive={i === currentPage}
						>
							{i}
						</PaginationLink>
					</PaginationItem>,
				);
			}
		} else {
			// 現在のページの前後に表示するページ数
			const sidePages = 1;

			// 最初のページを追加
			items.push(
				<PaginationItem key={1}>
					<PaginationLink href={createPageUrl(1)} isActive={1 === currentPage}>
						1
					</PaginationLink>
				</PaginationItem>,
			);

			// 左側の省略記号
			if (currentPage > 2 + sidePages) {
				items.push(
					<PaginationItem key="ellipsis-left">
						<PaginationEllipsis />
					</PaginationItem>,
				);
			}

			// 中央のページ
			const startPage = Math.max(2, currentPage - sidePages);
			const endPage = Math.min(totalPages - 1, currentPage + sidePages);

			for (let i = startPage; i <= endPage; i++) {
				items.push(
					<PaginationItem key={i}>
						<PaginationLink
							href={createPageUrl(i)}
							isActive={i === currentPage}
						>
							{i}
						</PaginationLink>
					</PaginationItem>,
				);
			}

			// 右側の省略記号
			if (currentPage < totalPages - 1 - sidePages) {
				items.push(
					<PaginationItem key="ellipsis-right">
						<PaginationEllipsis />
					</PaginationItem>,
				);
			}

			// 最後のページを追加
			if (totalPages > 1) {
				items.push(
					<PaginationItem key={totalPages}>
						<PaginationLink
							href={createPageUrl(totalPages)}
							isActive={totalPages === currentPage}
						>
							{totalPages}
						</PaginationLink>
					</PaginationItem>,
				);
			}
		}

		return items;
	};

	const isPreviousDisabled = currentPage <= 1;
	const isNextDisabled = currentPage >= totalPages;

	return (
		<div className={className}>
			<Pagination>
				<PaginationContent>
					<PaginationItem>
						<PaginationPrevious
							href={!isPreviousDisabled ? createPageUrl(currentPage - 1) : ""}
							aria-disabled={isPreviousDisabled}
							className={
								isPreviousDisabled ? "pointer-events-none opacity-50" : ""
							}
						/>
					</PaginationItem>

					{renderPageNumbers()}

					<PaginationItem>
						<PaginationNext
							href={!isNextDisabled ? createPageUrl(currentPage + 1) : ""}
							aria-disabled={isNextDisabled}
							className={isNextDisabled ? "pointer-events-none opacity-50" : ""}
						/>
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		</div>
	);
}
