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
}

// モックデータ
const mockApplications: Application[] = [
	{
		id: "APP001",
		type: "attendance_correction",
		employeeId: "001",
		employeeName: "山田 太郎",
		submittedDate: "2023-12-01",
		targetDate: "2023-11-30",
		content: "出勤時間修正：9:30 → 9:00",
		reason: "打ち合わせのため早く来ていましたが、打刻を忘れていました。",
		status: "pending",
	},
	{
		id: "APP002",
		type: "leave_request",
		employeeId: "002",
		employeeName: "佐藤 花子",
		submittedDate: "2023-12-02",
		targetDate: "2023-12-15",
		content: "有給休暇",
		reason: "私用のため",
		status: "pending",
	},
	{
		id: "APP003",
		type: "attendance_correction",
		employeeId: "003",
		employeeName: "鈴木 一郎",
		submittedDate: "2023-12-02",
		targetDate: "2023-12-01",
		content: "退勤時間修正：17:30 → 19:00",
		reason: "システムトラブル対応のため残業しましたが、打刻を忘れました。",
		status: "pending",
	},
	{
		id: "APP004",
		type: "leave_request",
		employeeId: "004",
		employeeName: "田中 美咲",
		submittedDate: "2023-12-03",
		targetDate: "2023-12-20",
		content: "半休（午後）",
		reason: "通院のため",
		status: "pending",
	},
	{
		id: "APP005",
		type: "attendance_correction",
		employeeId: "005",
		employeeName: "伊藤 健太",
		submittedDate: "2023-12-03",
		targetDate: "2023-12-02",
		content: "出勤時間修正：10:00 → 9:00、退勤時間修正：18:00 → 19:00",
		reason: "客先訪問のため社外で業務を行いました。",
		status: "pending",
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

export function ApprovalList() {
	const [applications, setApplications] =
		useState<Application[]>(mockApplications);
	const [selectedApplication, setSelectedApplication] =
		useState<Application | null>(null);
	const [isDetailsOpen, setIsDetailsOpen] = useState(false);
	const [comment, setComment] = useState("");
	const [filterType, setFilterType] = useState<string>("all");
	const [searchQuery, setSearchQuery] = useState("");

	// 申請の詳細を表示する
	const openDetails = (application: Application) => {
		setSelectedApplication(application);
		setIsDetailsOpen(true);
		setComment("");
	};

	// 申請を承認する
	const approveApplication = () => {
		if (!selectedApplication) return;

		const updatedApplications = applications.map((app) =>
			app.id === selectedApplication.id
				? { ...app, status: "approved" as const }
				: app,
		);

		setApplications(updatedApplications);
		setIsDetailsOpen(false);
		setSelectedApplication(null);
	};

	// 申請を却下する
	const rejectApplication = () => {
		if (!selectedApplication) return;

		const updatedApplications = applications.map((app) =>
			app.id === selectedApplication.id
				? { ...app, status: "rejected" as const }
				: app,
		);

		setApplications(updatedApplications);
		setIsDetailsOpen(false);
		setSelectedApplication(null);
	};

	// フィルタリングされた申請リストを取得
	const filteredApplications = applications.filter((app) => {
		// ステータスでフィルタリング (未承認のみ)
		if (app.status !== "pending") return false;

		// タイプでフィルタリング
		if (filterType !== "all" && app.type !== filterType) return false;

		// 検索クエリでフィルタリング
		if (searchQuery.trim() !== "") {
			const query = searchQuery.toLowerCase();
			return (
				app.employeeName.toLowerCase().includes(query) ||
				app.employeeId.toLowerCase().includes(query) ||
				app.content.toLowerCase().includes(query)
			);
		}

		return true;
	});

	return (
		<div className="space-y-4">
			{/* フィルターとサーチ */}
			<div className="flex flex-col sm:flex-row gap-4 mb-6">
				<div className="flex-1">
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
							<TableHead>種類</TableHead>
							<TableHead>申請者</TableHead>
							<TableHead>提出日</TableHead>
							<TableHead>申請内容</TableHead>
							<TableHead>対象日</TableHead>
							<TableHead className="text-right">操作</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{filteredApplications.length === 0 ? (
							<TableRow>
								<TableCell colSpan={7} className="h-24 text-center">
									承認待ちの申請はありません
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
									<TableCell>{application.submittedDate}</TableCell>
									<TableCell className="max-w-xs truncate">
										{application.content}
									</TableCell>
									<TableCell>{application.targetDate}</TableCell>
									<TableCell className="text-right">
										<Button
											variant="outline"
											size="sm"
											className="mr-2"
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
							<DialogTitle>申請詳細</DialogTitle>
							<DialogDescription>
								申請内容を確認し、承認または却下してください。
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

							<div>
								<Label className="text-sm text-gray-500">対象日</Label>
								<div>{selectedApplication.targetDate}</div>
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

							<div>
								<Label htmlFor="comment">コメント（任意）</Label>
								<Textarea
									id="comment"
									placeholder="承認/却下に関するコメントを入力してください"
									value={comment}
									onChange={(e) => setComment(e.target.value)}
								/>
							</div>
						</div>

						<DialogFooter>
							<Button variant="outline" onClick={() => setIsDetailsOpen(false)}>
								キャンセル
							</Button>
							<Button
								variant="destructive"
								onClick={rejectApplication}
								className="gap-1"
							>
								<XIcon className="h-4 w-4" />
								却下
							</Button>
							<Button onClick={approveApplication} className="gap-1">
								<CheckIcon className="h-4 w-4" />
								承認
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			)}
		</div>
	);
}
