"use client";

import { PaginationNav } from "@/components/common/pagination-nav";
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
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import {
	CheckIcon,
	FileTextIcon,
	MoreHorizontalIcon,
	XIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
	type Application,
	approveApplication,
	rejectApplication,
} from "../_actions/application-actions";
import type { ApplicationStatus, ApplicationType } from "../application";

// 申請タイプに応じた表示名を取得する関数
const getApplicationTypeName = (type: ApplicationType): string => {
	switch (type) {
		case "attendance_correction":
			return "勤怠修正";
		case "paid_holiday":
			return "有給休暇";
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
		case "paid_holiday":
			return (
				<Badge
					variant="outline"
					className="bg-purple-50 text-purple-700 border-purple-200"
				>
					有給休暇
				</Badge>
			);
		default:
			return <Badge variant="outline">不明</Badge>;
	}
};

// ステータスに応じたバッジスタイルを取得する関数
const getStatusBadge = (status: ApplicationStatus) => {
	switch (status) {
		case "pending":
			return (
				<Badge
					variant="outline"
					className="bg-yellow-50 text-yellow-700 border-yellow-200"
				>
					承認待ち
				</Badge>
			);
		case "approved":
			return (
				<Badge
					variant="outline"
					className="bg-green-50 text-green-700 border-green-200"
				>
					承認済み
				</Badge>
			);
		case "rejected":
			return (
				<Badge
					variant="outline"
					className="bg-red-50 text-red-700 border-red-200"
				>
					却下
				</Badge>
			);
		default:
			return <Badge variant="outline">不明</Badge>;
	}
};

interface ApplicationsPresenterProps {
	applications: Application[];
	pagination: {
		total: number;
		page: number;
		limit: number;
		totalPages: number;
	};
}

export function ApplicationsPresenter({
	applications,
	pagination,
}: ApplicationsPresenterProps) {
	const router = useRouter();
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

	// 申請を承認する（ステータスがpendingの場合のみ）
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

	// 申請を却下する（ステータスがpendingの場合のみ）
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

	// 申請IDを作成（実際のidから）
	const getApplicationCode = (id: string) => {
		return id.toUpperCase();
	};

	return (
		<div className="space-y-4 w-full">
			{/* 申請リスト */}
			<div className="w-full overflow-auto">
				<div className="min-w-full rounded-md border">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="w-[100px]">申請コード</TableHead>
								<TableHead className="w-[120px]">申請種類</TableHead>
								<TableHead className="w-[100px]">ステータス</TableHead>
								<TableHead className="w-[150px]">社員</TableHead>
								<TableHead className="w-[120px]">申請日</TableHead>
								<TableHead className="min-w-[150px]">内容</TableHead>
								<TableHead className="w-[80px] text-right">操作</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{applications.length === 0 ? (
								<TableRow>
									<TableCell colSpan={7} className="h-24 text-center">
										該当する申請はありません
									</TableCell>
								</TableRow>
							) : (
								applications.map((application) => (
									<TableRow key={application.id}>
										<TableCell className="font-medium">
											{getApplicationCode(application.id)}
										</TableCell>
										<TableCell>
											{getApplicationTypeBadge(application.type)}
										</TableCell>
										<TableCell>{getStatusBadge(application.status)}</TableCell>
										<TableCell>{application.employeeName}</TableCell>
										<TableCell>
											{new Date(application.submittedDate).toLocaleDateString(
												"ja-JP",
											)}
										</TableCell>
										<TableCell className="max-w-[300px] truncate">
											{application.content}
										</TableCell>
										<TableCell className="text-right">
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button variant="ghost" size="icon">
														<MoreHorizontalIcon className="h-4 w-4" />
														<span className="sr-only">メニューを開く</span>
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent align="end">
													<DropdownMenuItem
														onClick={() => openDetails(application)}
													>
														<FileTextIcon className="h-4 w-4 mr-2" />
														詳細を表示
													</DropdownMenuItem>
													{application.status === "pending" && (
														<>
															<DropdownMenuItem
																onClick={() => {
																	setSelectedApplication(application);
																	setComment("");
																	setIsDetailsOpen(true);
																}}
																className="text-green-600"
															>
																<CheckIcon className="h-4 w-4 mr-2" />
																承認する
															</DropdownMenuItem>
															<DropdownMenuItem
																onClick={() => {
																	setSelectedApplication(application);
																	setComment("");
																	setIsDetailsOpen(true);
																}}
																className="text-red-600"
															>
																<XIcon className="h-4 w-4 mr-2" />
																却下する
															</DropdownMenuItem>
														</>
													)}
												</DropdownMenuContent>
											</DropdownMenu>
										</TableCell>
									</TableRow>
								))
							)}
						</TableBody>
					</Table>
				</div>
			</div>

			{/* ページネーション */}
			{pagination && pagination.totalPages > 1 && (
				<div className="mt-4 flex justify-center">
					<PaginationNav
						currentPage={pagination.page}
						totalPages={pagination.totalPages}
					/>
				</div>
			)}

			{/* 申請詳細ダイアログ */}
			{selectedApplication && (
				<Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
					<DialogContent className="sm:max-w-md">
						<DialogHeader>
							<DialogTitle>申請詳細</DialogTitle>
							<DialogDescription>
								申請ID: {getApplicationCode(selectedApplication.id)}
							</DialogDescription>
						</DialogHeader>
						<div className="space-y-4 py-4">
							<div className="grid grid-cols-3 gap-4">
								<div>
									<Label className="text-muted-foreground">申請種類</Label>
									<div className="font-medium mt-1">
										{getApplicationTypeName(selectedApplication.type)}
									</div>
								</div>
								<div>
									<Label className="text-muted-foreground">ステータス</Label>
									<div className="font-medium mt-1">
										{selectedApplication.status === "pending"
											? "承認待ち"
											: selectedApplication.status === "approved"
												? "承認済み"
												: "却下"}
									</div>
								</div>
								<div>
									<Label className="text-muted-foreground">申請日</Label>
									<div className="font-medium mt-1">
										{new Date(
											selectedApplication.submittedDate,
										).toLocaleDateString("ja-JP")}
									</div>
								</div>
							</div>

							<div>
								<Label className="text-muted-foreground">社員</Label>
								<div className="font-medium mt-1">
									{selectedApplication.employeeName}
								</div>
							</div>

							<div>
								<Label className="text-muted-foreground">内容</Label>
								<div className="font-medium mt-1 whitespace-pre-wrap">
									{selectedApplication.content}
								</div>
							</div>

							<div>
								<Label className="text-muted-foreground">理由</Label>
								<div className="font-medium mt-1 whitespace-pre-wrap">
									{selectedApplication.reason}
								</div>
							</div>

							{selectedApplication.status !== "pending" && (
								<div>
									<Label className="text-muted-foreground">
										{selectedApplication.status === "approved"
											? "承認コメント"
											: "却下理由"}
									</Label>
									<div className="font-medium mt-1 whitespace-pre-wrap">
										{selectedApplication.comment || "コメントなし"}
									</div>
								</div>
							)}

							{selectedApplication.status === "pending" && (
								<div>
									<Label htmlFor="comment">コメント（任意）</Label>
									<Textarea
										id="comment"
										value={comment}
										onChange={(e) => setComment(e.target.value)}
										placeholder="コメントを入力してください"
										className="mt-1"
									/>
								</div>
							)}
						</div>

						<DialogFooter className="flex sm:justify-between">
							<Button
								variant="ghost"
								onClick={() => setIsDetailsOpen(false)}
								disabled={isProcessing}
							>
								閉じる
							</Button>
							{selectedApplication.status === "pending" && (
								<div className="flex gap-2">
									<Button
										variant="outline"
										onClick={handleReject}
										className="text-red-600 border-red-200 hover:bg-red-50"
										disabled={isProcessing}
									>
										<XIcon className="h-4 w-4 mr-2" />
										却下
									</Button>
									<Button
										onClick={handleApprove}
										className="bg-green-600 hover:bg-green-700"
										disabled={isProcessing}
									>
										<CheckIcon className="h-4 w-4 mr-2" />
										承認
									</Button>
								</div>
							)}
						</DialogFooter>
					</DialogContent>
				</Dialog>
			)}
		</div>
	);
}
