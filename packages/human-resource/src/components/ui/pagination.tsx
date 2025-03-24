import * as React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export interface PaginationProps extends React.HTMLAttributes<HTMLDivElement> {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
	siblingCount?: number;
}

export function Pagination({
	currentPage,
	totalPages,
	onPageChange,
	siblingCount = 1,
	className,
	...props
}: PaginationProps) {
	// ページボタンの範囲を計算
	const getPageRange = () => {
		// 常に表示するページ数（現在のページ + 兄弟ページ + 最初と最後のページ + 省略記号）
		const totalPageNumbers = siblingCount * 2 + 5;

		// ページ総数が表示できるページ数より少ない場合は全ページを表示
		if (totalPageNumbers >= totalPages) {
			return Array.from({ length: totalPages }, (_, i) => i + 1);
		}

		// 左右の兄弟ページの範囲を計算
		const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
		const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

		// 省略記号を表示するかどうか
		const shouldShowLeftDots = leftSiblingIndex > 2;
		const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

		// 最初のページと最後のページは常に表示
		const firstPageIndex = 1;
		const lastPageIndex = totalPages;

		// 左側の省略記号のみ表示する場合
		if (!shouldShowLeftDots && shouldShowRightDots) {
			const leftItemCount = 3 + 2 * siblingCount;
			const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
			return [...leftRange, "dots-right", totalPages];
		}

		// 右側の省略記号のみ表示する場合
		if (shouldShowLeftDots && !shouldShowRightDots) {
			const rightItemCount = 3 + 2 * siblingCount;
			const rightRange = Array.from(
				{ length: rightItemCount },
				(_, i) => totalPages - rightItemCount + i + 1,
			);
			return [1, "dots-left", ...rightRange];
		}

		// 両方の省略記号を表示する場合
		if (shouldShowLeftDots && shouldShowRightDots) {
			const middleRange = Array.from(
				{ length: rightSiblingIndex - leftSiblingIndex + 1 },
				(_, i) => leftSiblingIndex + i,
			);
			return [1, "dots-left", ...middleRange, "dots-right", totalPages];
		}

		// デフォルトケース（通常はここには到達しない）
		return [1];
	};

	const pages = getPageRange();

	return (
		<div
			className={cn("flex items-center justify-center space-x-2", className)}
			{...props}
		>
			<Button
				variant="outline"
				size="icon"
				onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
				disabled={currentPage === 1}
			>
				<ChevronLeftIcon className="h-4 w-4" />
				<span className="sr-only">前のページ</span>
			</Button>

			{pages.map((page) => {
				if (page === "dots-left" || page === "dots-right") {
					return (
						<div key={`${page}`} className="px-4 py-2">
							...
						</div>
					);
				}

				return (
					<Button
						key={`page-${page}`}
						variant={currentPage === page ? "default" : "outline"}
						onClick={() => typeof page === "number" && onPageChange(page)}
						className="h-9 w-9"
					>
						{page}
					</Button>
				);
			})}

			<Button
				variant="outline"
				size="icon"
				onClick={() =>
					currentPage < totalPages && onPageChange(currentPage + 1)
				}
				disabled={currentPage === totalPages || totalPages === 0}
			>
				<ChevronRightIcon className="h-4 w-4" />
				<span className="sr-only">次のページ</span>
			</Button>
		</div>
	);
}
