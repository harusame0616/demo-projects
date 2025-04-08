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

interface LocalPaginationNavProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
	className?: string;
}

export function LocalPaginationNav({
	currentPage,
	totalPages,
	onPageChange,
	className,
}: LocalPaginationNavProps) {
	const isPreviousDisabled = currentPage <= 1;
	const isNextDisabled = currentPage >= totalPages;

	const renderPageNumbers = () => {
		const pageNumbers = [];
		const maxVisiblePages = 5;
		const halfMaxVisiblePages = Math.floor(maxVisiblePages / 2);

		let startPage = Math.max(1, currentPage - halfMaxVisiblePages);
		const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

		if (endPage - startPage + 1 < maxVisiblePages) {
			startPage = Math.max(1, endPage - maxVisiblePages + 1);
		}

		// 最初のページ
		if (startPage > 1) {
			pageNumbers.push(
				<PaginationItem key={1}>
					<PaginationLink onClick={() => onPageChange(1)}>{1}</PaginationLink>
				</PaginationItem>,
			);
			if (startPage > 2) {
				pageNumbers.push(
					<PaginationItem key="start-ellipsis">
						<PaginationEllipsis />
					</PaginationItem>,
				);
			}
		}

		// ページ番号
		for (let i = startPage; i <= endPage; i++) {
			pageNumbers.push(
				<PaginationItem key={i}>
					<PaginationLink
						isActive={i === currentPage}
						onClick={() => onPageChange(i)}
					>
						{i}
					</PaginationLink>
				</PaginationItem>,
			);
		}

		// 最後のページ
		if (endPage < totalPages) {
			if (endPage < totalPages - 1) {
				pageNumbers.push(
					<PaginationItem key="end-ellipsis">
						<PaginationEllipsis />
					</PaginationItem>,
				);
			}
			pageNumbers.push(
				<PaginationItem key={totalPages}>
					<PaginationLink onClick={() => onPageChange(totalPages)}>
						{totalPages}
					</PaginationLink>
				</PaginationItem>,
			);
		}

		return pageNumbers;
	};

	return (
		<div className={className}>
			<Pagination>
				<PaginationContent>
					<PaginationItem>
						<PaginationPrevious
							onClick={() =>
								!isPreviousDisabled && onPageChange(currentPage - 1)
							}
							aria-disabled={isPreviousDisabled}
							className={
								isPreviousDisabled ? "pointer-events-none opacity-50" : ""
							}
						/>
					</PaginationItem>

					{renderPageNumbers()}

					<PaginationItem>
						<PaginationNext
							onClick={() => !isNextDisabled && onPageChange(currentPage + 1)}
							aria-disabled={isNextDisabled}
							className={isNextDisabled ? "pointer-events-none opacity-50" : ""}
						/>
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		</div>
	);
}
