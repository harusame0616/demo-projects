"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
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
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
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
import { Calendar, FileTextIcon, SearchIcon } from "lucide-react";
import { useState } from "react";

// 申請タイプの定義
type ApplicationType = "attendance_correction" | "leave_request";

// 申請ステータスの定義
type ApplicationStatus = "pending" | "approved" | "rejected";

// 申請データの型定義
interface Application {
	id: string;
	type: ApplicationType;
	employeeId: string;
	employeeName: string;
	submittedDate: string;
	targetDate: string;
	content: string;
	reason: string;
	status: ApplicationStatus;
	approvedDate?: string;
	approvedBy?: string;
	comment?: string;
}

// 履歴用モックデータ
const mockHistoryApplications: Application[] = [
	{
		id: "APP006",
		type: "attendance_correction",
		employeeId: "001",
		employeeName: "山田 太郎",
		submittedDate: "2023-11-25",
		targetDate: "2023-11-24",
		content: "退勤時間修正：18:00 → 20:00",
		reason: "クライアントミーティングが長引いたため",
		status: "approved",
		approvedDate: "2023-11-26",
		approvedBy: "人事部 鈴木",
		comment: "タイムカードの記録と一致することを確認しました。",
	},
	{
		id: "APP007",
		type: "leave_request",
		employeeId: "002",
		employeeName: "佐藤 花子",
		submittedDate: "2023-11-20",
		targetDate: "2023-11-30",
		content: "有給休暇",
		reason: "家族旅行のため",
		status: "approved",
		approvedDate: "2023-11-21",
		approvedBy: "人事部 鈴木",
	},
	{
		id: "APP008",
		type: "attendance_correction",
		employeeId: "003",
		employeeName: "鈴木 一郎",
		submittedDate: "2023-11-15",
		targetDate: "2023-11-14",
		content: "出勤時間修正：9:00 → 8:30",
		reason: "早朝会議のため",
		status: "rejected",
		approvedDate: "2023-11-16",
		approvedBy: "人事部 鈴木",
		comment: "会議の記録がありません。詳細な証明が必要です。",
	},
	{
		id: "APP009",
		type: "leave_request",
		employeeId: "004",
		employeeName: "田中 美咲",
		submittedDate: "2023-11-10",
		targetDate: "2023-11-17",
		content: "半休（午前）",
		reason: "私用のため",
		status: "approved",
		approvedDate: "2023-11-11",
		approvedBy: "人事部 鈴木",
	},
	{
		id: "APP010",
		type: "attendance_correction",
		employeeId: "005",
		employeeName: "伊藤 健太",
		submittedDate: "2023-11-05",
		targetDate: "2023-11-04",
		content: "休日出勤申請：9:00-17:00",
		reason: "システム更新作業のため",
		status: "approved",
		approvedDate: "2023-11-06",
		approvedBy: "人事部 鈴木",
		comment: "休日手当対象となります。",
	},
];

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

export function ApprovalHistory() {
	const [applications] = useState<Application[]>(mockHistoryApplications);
	const [selectedApplication, setSelectedApplication] =
		useState<Application | null>(null);
	const [isDetailsOpen, setIsDetailsOpen] = useState(false);
	const [filterType, setFilterType] = useState<string>("all");
	const [filterStatus, setFilterStatus] = useState<string>("all");
	const [searchQuery, setSearchQuery] = useState("");
	const [date, setDate] = useState<Date | undefined>(undefined);

	// 申請の詳細を表示する
	const openDetails = (application: Application) => {
		setSelectedApplication(application);
		setIsDetailsOpen(true);
	};

	// フィルタリングされた申請リストを取得
	const filteredApplications = applications.filter((app) => {
		// タイプでフィルタリング
		if (filterType !== "all" && app.type !== filterType) return false;

		// ステータスでフィルタリング
		if (filterStatus !== "all" && app.status !== filterStatus) return false;

		// 日付でフィルタリング
		if (date) {
			const formattedDate = format(date, "yyyy-MM-dd");
			if (!app.approvedDate?.startsWith(formattedDate)) return false;
		}

		// 検索クエリでフィルタリング
		if (searchQuery.trim() !== "") {
			const query = searchQuery.toLowerCase();
			return (
				app.employeeName.toLowerCase().includes(query) ||
				app.employeeId.toLowerCase().includes(query) ||
				app.content.toLowerCase().includes(query) ||
				app.comment?.toLowerCase().includes(query)
			);
		}

		return true;
	});

	return (
		<div className="space-y-4">
			{/* フィルターとサーチ */}
			<div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-6">
				<div className="flex-1 min-w-[200px]">
					<div className="relative">
						<SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
						<Input
							placeholder="社員名や内容で検索..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className="pl-10"
						/>
					</div>
				</div>

				<Select value={filterType} onValueChange={setFilterType}>
					<SelectTrigger className="w-[150px]">
						<SelectValue placeholder="申請タイプ" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">すべての申請</SelectItem>
						<SelectItem value="attendance_correction">勤怠修正</SelectItem>
						<SelectItem value="leave_request">休暇申請</SelectItem>
					</SelectContent>
				</Select>

				<Select value={filterStatus} onValueChange={setFilterStatus}>
					<SelectTrigger className="w-[150px]">
						<SelectValue placeholder="ステータス" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">すべて</SelectItem>
						<SelectItem value="approved">承認済み</SelectItem>
						<SelectItem value="rejected">却下</SelectItem>
					</SelectContent>
				</Select>

				<Popover>
					<PopoverTrigger asChild>
						<Button
							variant="outline"
							className={`w-[150px] justify-start text-left font-normal ${!date ? "text-muted-foreground" : ""}`}
						>
							<Calendar className="mr-2 h-4 w-4" />
							{date ? format(date, "yyyy/MM/dd") : "日付で絞り込み"}
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-auto p-0" align="start">
						<CalendarComponent
							mode="single"
							selected={date}
							onSelect={setDate}
							locale={ja}
							initialFocus
						/>
					</PopoverContent>
				</Popover>

				{date && (
					<Button
						variant="ghost"
						size="sm"
						onClick={() => setDate(undefined)}
						className="h-10"
					>
						日付の絞り込みを解除
					</Button>
				)}
			</div>

			{/* 申請履歴リスト */}
			<div className="rounded-md border">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>申請ID</TableHead>
							<TableHead>種類</TableHead>
							<TableHead>申請者</TableHead>
							<TableHead>対象日</TableHead>
							<TableHead>ステータス</TableHead>
							<TableHead>承認/却下日</TableHead>
							<TableHead className="text-right">操作</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{filteredApplications.length === 0 ? (
							<TableRow>
								<TableCell colSpan={7} className="h-24 text-center">
									該当する申請履歴はありません
								</TableCell>
							</TableRow>
						) : (
							filteredApplications.map((application) => (
								<TableRow key={application.id}>
									<TableCell className="font-medium">
										{application.id}
									</TableCell>
									<TableCell>
										{getApplicationTypeBadge(application.type)}
									</TableCell>
									<TableCell>
										{application.employeeName} ({application.employeeId})
									</TableCell>
									<TableCell>{application.targetDate}</TableCell>
									<TableCell>{getStatusBadge(application.status)}</TableCell>
									<TableCell>{application.approvedDate}</TableCell>
									<TableCell className="text-right">
										<Button
											variant="outline"
											size="sm"
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

			{/* 申請詳細ダイアログ */}
			{selectedApplication && (
				<Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
					<DialogContent className="sm:max-w-[600px]">
						<DialogHeader>
							<DialogTitle>申請詳細（履歴）</DialogTitle>
							<DialogDescription>
								過去の申請内容と承認/却下結果を確認できます。
							</DialogDescription>
						</DialogHeader>

						<div className="grid gap-4 py-4">
							<div className="grid grid-cols-2 gap-4">
								<div>
									<Label className="text-sm text-gray-500">申請ID</Label>
									<div className="font-medium">{selectedApplication.id}</div>
								</div>
								<div>
									<Label className="text-sm text-gray-500">申請種類</Label>
									<div>{getApplicationTypeName(selectedApplication.type)}</div>
								</div>
							</div>

							<div className="grid grid-cols-2 gap-4">
								<div>
									<Label className="text-sm text-gray-500">申請者</Label>
									<div className="font-medium">
										{selectedApplication.employeeName} (
										{selectedApplication.employeeId})
									</div>
								</div>
								<div>
									<Label className="text-sm text-gray-500">提出日</Label>
									<div>{selectedApplication.submittedDate}</div>
								</div>
							</div>

							<div className="grid grid-cols-2 gap-4">
								<div>
									<Label className="text-sm text-gray-500">対象日</Label>
									<div>{selectedApplication.targetDate}</div>
								</div>
								<div>
									<Label className="text-sm text-gray-500">ステータス</Label>
									<div className="flex items-center mt-1">
										{getStatusBadge(selectedApplication.status)}
									</div>
								</div>
							</div>

							<div className="grid grid-cols-2 gap-4">
								<div>
									<Label className="text-sm text-gray-500">承認/却下日</Label>
									<div>{selectedApplication.approvedDate || "-"}</div>
								</div>
								<div>
									<Label className="text-sm text-gray-500">承認/却下者</Label>
									<div>{selectedApplication.approvedBy || "-"}</div>
								</div>
							</div>

							<div>
								<Label className="text-sm text-gray-500">申請内容</Label>
								<div className="p-2 border rounded-md bg-gray-50 min-h-[40px]">
									{selectedApplication.content}
								</div>
							</div>

							<div>
								<Label className="text-sm text-gray-500">申請理由</Label>
								<div className="p-2 border rounded-md bg-gray-50 min-h-[60px]">
									{selectedApplication.reason}
								</div>
							</div>

							{selectedApplication.comment && (
								<div>
									<Label className="text-sm text-gray-500">
										承認/却下コメント
									</Label>
									<div className="p-2 border rounded-md bg-gray-50 min-h-[60px]">
										{selectedApplication.comment}
									</div>
								</div>
							)}
						</div>

						<DialogFooter>
							<Button onClick={() => setIsDetailsOpen(false)}>閉じる</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			)}
		</div>
	);
}
