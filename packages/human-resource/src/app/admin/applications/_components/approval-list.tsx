"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pagination } from "@/components/ui/pagination";
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
import { Textarea } from "@/components/ui/textarea";
import { CheckIcon, FileTextIcon, SearchIcon, XIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
	type Application,
	type ApplicationType,
	type ApprovalSearchParams,
	approveApplication,
	rejectApplication,
} from "../_actions/approval-actions";

// 申請タイプに応じた表示名を取得する関数
const getApplicationTypeName = (type: ApplicationType): string => {
	switch (type) {
		case "attendance_correction":
			return "勤怠修正";
		case "leave_request":
			return "休暇申請";
		default:
			return "不明";
	}
};

// 申請タイプに応じたバッジスタイルを取得する関数
const getApplicationTypeBadge = (type: ApplicationType) => {
	switch (type) {
		case "attendance_correction":
			return (
				<Badge
					variant="outline"
					className="bg-blue-50 text-blue-700 border-blue-200"
				>
					勤怠修正
				</Badge>
			);
		case "leave_request":
			return (
				<Badge
					variant="outline"
					className="bg-purple-50 text-purple-700 border-purple-200"
				>
					休暇申請
				</Badge>
			);
		default:
			return <Badge variant="outline">不明</Badge>;
	}
};

interface ApprovalListProps {
	applications: Application[];
	pagination: {
		total: number;
		page: number;
		limit: number;
		totalPages: number;
	};
	searchParams: ApprovalSearchParams;
}

export function ApprovalList({
	applications,
	pagination,
	searchParams,
}: ApprovalListProps) {
	const router = useRouter();
	const pathname = usePathname();
	const [selectedApplication, setSelectedApplication] =
		useState<Application | null>(null);
	const [isDetailsOpen, setIsDetailsOpen] = useState(false);
	const [comment, setComment] = useState("");
	const [isProcessing, setIsProcessing] = useState(false);

	// 申請の詳細を表示する
	const openDetails = (application: Application) => {
		setSelectedApplication(application);
		setIsDetailsOpen(true);
		setComment("");
	};

	// 申請を承認する
	const handleApprove = async () => {
		if (!selectedApplication) return;

		setIsProcessing(true);
		try {
			await approveApplication(selectedApplication.id, comment);
			// 現在のURLパラメータを維持したままページをリロード
			router.refresh();
			setIsDetailsOpen(false);
		} catch (error) {
			console.error("承認処理に失敗しました", error);
		} finally {
			setIsProcessing(false);
		}
	};

	// 申請を却下する
	const handleReject = async () => {
		if (!selectedApplication) return;

		setIsProcessing(true);
		try {
			await rejectApplication(selectedApplication.id, comment);
			// 現在のURLパラメータを維持したままページをリロード
			router.refresh();
			setIsDetailsOpen(false);
		} catch (error) {
			console.error("却下処理に失敗しました", error);
		} finally {
			setIsProcessing(false);
		}
	};

	// フィルターの変更を処理
	const handleFilterChange = (value: string) => {
		const params = new URLSearchParams(searchParams as Record<string, string>);

		if (value === "all") {
			params.delete("type");
		} else {
			params.set("type", value);
		}

		// フィルター変更時はページをリセット
		params.delete("page");

		const newPath = `${pathname}?${params.toString()}`;
		router.push(newPath);
	};

	// 検索クエリの変更を処理
	const handleSearchChange = (query: string) => {
		const params = new URLSearchParams(searchParams as Record<string, string>);

		if (query) {
			params.set("query", query);
		} else {
			params.delete("query");
		}

		// 検索時はページをリセット
		params.delete("page");

		const newPath = `${pathname}?${params.toString()}`;
		router.push(newPath);
	};

	// ページ切り替え処理
	const handlePageChange = (page: number) => {
		const params = new URLSearchParams(searchParams as Record<string, string>);
		params.set("page", page.toString());
		const newPath = `${pathname}?${params.toString()}`;
		router.push(newPath);
	};

	return (
		<div className="space-y-4">
			{/* フィルターとサーチ */}
			<div className="flex flex-col sm:flex-row gap-4 mb-6">
				<div className="flex-1">
					<div className="relative">
						<SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
						<Input
							placeholder="社員名や内容で検索..."
							defaultValue={searchParams.query || ""}
							onChange={(e) => {
								// デバウンス処理
								const timeoutId = setTimeout(() => {
									handleSearchChange(e.target.value);
								}, 500);
								return () => clearTimeout(timeoutId);
							}}
							className="pl-10"
						/>
					</div>
				</div>
				<Select
					defaultValue={searchParams.type || "all"}
					onValueChange={handleFilterChange}
				>
					<SelectTrigger className="w-[180px]">
						<SelectValue placeholder="申請タイプ" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">すべての申請</SelectItem>
						<SelectItem value="attendance_correction">勤怠修正</SelectItem>
						<SelectItem value="leave_request">休暇申請</SelectItem>
					</SelectContent>
				</Select>
			</div>

			{/* 申請リスト */}
			<div className="rounded-md border">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>申請ID</TableHead>
							<TableHead>申請種類</TableHead>
							<TableHead>社員</TableHead>
							<TableHead>申請日</TableHead>
							<TableHead>対象日</TableHead>
							<TableHead>内容</TableHead>
							<TableHead className="text-right">アクション</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{applications.length === 0 ? (
							<TableRow>
								<TableCell colSpan={7} className="h-24 text-center">
									未承認の申請はありません
								</TableCell>
							</TableRow>
						) : (
							applications.map((application) => (
								<TableRow key={application.id}>
									<TableCell className="font-medium">
										{application.id}
									</TableCell>
									<TableCell>
										{getApplicationTypeBadge(application.type)}
									</TableCell>
									<TableCell>
										{application.employeeName}
										<br />
										<span className="text-xs text-muted-foreground">
											ID: {application.employeeId}
										</span>
									</TableCell>
									<TableCell>{application.submittedDate}</TableCell>
									<TableCell>{application.targetDate}</TableCell>
									<TableCell className="max-w-xs truncate">
										{application.content}
									</TableCell>
									<TableCell className="text-right">
										<Button
											size="sm"
											variant="ghost"
											onClick={() => openDetails(application)}
										>
											<FileTextIcon className="h-4 w-4 mr-1" />
											詳細
										</Button>
									</TableCell>
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</div>

			{/* ページネーション */}
			{pagination.totalPages > 1 && (
				<div className="flex justify-center mt-6">
					<Pagination
						currentPage={pagination.page}
						totalPages={pagination.totalPages}
						onPageChange={handlePageChange}
					/>
				</div>
			)}

			{/* 申請詳細ダイアログ */}
			{selectedApplication && (
				<Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
					<DialogContent className="max-w-md">
						<DialogHeader>
							<DialogTitle>申請詳細 - {selectedApplication.id}</DialogTitle>
							<DialogDescription>
								申請内容を確認して、承認または却下してください
							</DialogDescription>
						</DialogHeader>

						<div className="space-y-4 py-4">
							<div className="grid grid-cols-4 gap-4 text-sm">
								<div className="font-medium">申請種類</div>
								<div className="col-span-3">
									{getApplicationTypeName(selectedApplication.type)}
								</div>

								<div className="font-medium">社員</div>
								<div className="col-span-3">
									{selectedApplication.employeeName} (ID:{" "}
									{selectedApplication.employeeId})
								</div>

								<div className="font-medium">申請日</div>
								<div className="col-span-3">
									{selectedApplication.submittedDate}
								</div>

								<div className="font-medium">対象日</div>
								<div className="col-span-3">
									{selectedApplication.targetDate}
								</div>

								<div className="font-medium">内容</div>
								<div className="col-span-3">{selectedApplication.content}</div>

								<div className="font-medium">理由</div>
								<div className="col-span-3">{selectedApplication.reason}</div>
							</div>

							<div className="space-y-2">
								<Label htmlFor="comment">コメント（オプション）</Label>
								<Textarea
									id="comment"
									value={comment}
									onChange={(e) => setComment(e.target.value)}
									placeholder="承認/却下に関するコメントを入力してください"
									rows={3}
								/>
							</div>
						</div>

						<DialogFooter className="gap-2 sm:gap-0">
							<Button
								type="button"
								variant="outline"
								onClick={() => setIsDetailsOpen(false)}
							>
								キャンセル
							</Button>
							<Button
								type="button"
								variant="destructive"
								onClick={handleReject}
								disabled={isProcessing}
							>
								<XIcon className="h-4 w-4 mr-1" />
								却下
							</Button>
							<Button
								type="button"
								variant="default"
								onClick={handleApprove}
								disabled={isProcessing}
							>
								<CheckIcon className="h-4 w-4 mr-1" />
								承認
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			)}
		</div>
	);
}
