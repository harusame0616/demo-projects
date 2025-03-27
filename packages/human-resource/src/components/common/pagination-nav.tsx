import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import React from "react";

interface PaginationNavProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
	className?: string;
}

export function PaginationNav({
	currentPage,
	totalPages,
	onPageChange,
	className,
}: PaginationNavProps) {
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
							href="#"
							onClick={(e) => {
								e.preventDefault();
								onPageChange(i);
							}}
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
					<PaginationLink
						href="#"
						onClick={(e) => {
							e.preventDefault();
							onPageChange(1);
						}}
						isActive={1 === currentPage}
					>
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
							href="#"
							onClick={(e) => {
								e.preventDefault();
								onPageChange(i);
							}}
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
							href="#"
							onClick={(e) => {
								e.preventDefault();
								onPageChange(totalPages);
							}}
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
							href="#"
							onClick={(e) => {
								e.preventDefault();
								if (!isPreviousDisabled) {
									onPageChange(currentPage - 1);
								}
							}}
							aria-disabled={isPreviousDisabled}
							className={
								isPreviousDisabled ? "pointer-events-none opacity-50" : ""
							}
						/>
					</PaginationItem>

					{renderPageNumbers()}

					<PaginationItem>
						<PaginationNext
							href="#"
							onClick={(e) => {
								e.preventDefault();
								if (!isNextDisabled) {
									onPageChange(currentPage + 1);
								}
							}}
							aria-disabled={isNextDisabled}
							className={isNextDisabled ? "pointer-events-none opacity-50" : ""}
						/>
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		</div>
	);
}
