"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
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
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { PencilIcon } from "lucide-react";
import { useState } from "react";

// モックデータの型定義
interface TimeRecord {
	id: number;
	date: string;
	clockIn: string;
	clockOut: string;
	workingHours: number;
	status: string;
}

// モックデータ
const mockTimeRecords: TimeRecord[] = [
	{
		id: 1,
		date: "2023-03-20",
		clockIn: "09:00",
		clockOut: "18:00",
		workingHours: 8,
		status: "承認済み",
	},
	{
		id: 2,
		date: "2023-03-21",
		clockIn: "08:45",
		clockOut: "18:30",
		workingHours: 8.75,
		status: "承認済み",
	},
	{
		id: 3,
		date: "2023-03-22",
		clockIn: "09:15",
		clockOut: "19:00",
		workingHours: 8.75,
		status: "承認済み",
	},
	{
		id: 4,
		date: "2023-03-23",
		clockIn: "09:00",
		clockOut: "17:30",
		workingHours: 7.5,
		status: "承認待ち",
	},
	{
		id: 5,
		date: "2023-03-24",
		clockIn: "09:00",
		clockOut: "18:15",
		workingHours: 8.25,
		status: "未申請",
	},
];

export function TimeHistory() {
	const [date, setDate] = useState<Date | undefined>(new Date());
	const [records, setRecords] = useState(mockTimeRecords);
	const [editRecord, setEditRecord] = useState<TimeRecord | null>(null);
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	// 日付を選択したときの処理
	const handleDateSelect = (selectedDate: Date | undefined) => {
		setDate(selectedDate);
		// ここで実際には選択した月のデータを取得する処理が入る
	};

	// 勤怠記録の編集ダイアログを開く
	const openEditDialog = (record: TimeRecord) => {
		setEditRecord({ ...record });
		setIsDialogOpen(true);
	};

	// 勤怠記録を更新する
	const handleUpdateRecord = () => {
		if (!editRecord) return;

		// モックデータを更新
		setRecords(
			records.map((record) =>
				record.id === editRecord.id ? { ...editRecord } : record,
			),
		);

		setIsDialogOpen(false);
		// ここで実際にはAPIを呼び出してデータを更新する
	};

	return (
		<div className="space-y-6">
			<div className="flex flex-col sm:flex-row gap-6">
				<Card className="flex-shrink-0">
					<CardContent className="p-4">
						<Calendar
							mode="single"
							selected={date}
							onSelect={handleDateSelect}
							className="rounded-md border"
						/>
					</CardContent>
				</Card>

				<div className="flex-1">
					<div className="rounded-md border">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>日付</TableHead>
									<TableHead>出勤時間</TableHead>
									<TableHead>退勤時間</TableHead>
									<TableHead>勤務時間</TableHead>
									<TableHead>状態</TableHead>
									<TableHead>操作</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{records.map((record) => (
									<TableRow key={record.id}>
										<TableCell>{record.date}</TableCell>
										<TableCell>{record.clockIn}</TableCell>
										<TableCell>{record.clockOut}</TableCell>
										<TableCell>{record.workingHours}時間</TableCell>
										<TableCell>{record.status}</TableCell>
										<TableCell>
											<Button
												variant="outline"
												size="icon"
												onClick={() => openEditDialog(record)}
											>
												<PencilIcon className="h-4 w-4" />
											</Button>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>
				</div>
			</div>

			<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>勤怠記録の修正</DialogTitle>
						<DialogDescription>
							勤怠時間を修正してください。変更には承認が必要です。
						</DialogDescription>
					</DialogHeader>

					{editRecord && (
						<div className="space-y-4">
							<div className="grid grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label htmlFor="clockIn">出勤時間</Label>
									<Input
										id="clockIn"
										type="time"
										value={editRecord.clockIn}
										onChange={(e) =>
											setEditRecord({ ...editRecord, clockIn: e.target.value })
										}
									/>
								</div>

								<div className="space-y-2">
									<Label htmlFor="clockOut">退勤時間</Label>
									<Input
										id="clockOut"
										type="time"
										value={editRecord.clockOut}
										onChange={(e) =>
											setEditRecord({ ...editRecord, clockOut: e.target.value })
										}
									/>
								</div>
							</div>

							<div className="space-y-2">
								<Label htmlFor="reason">修正理由</Label>
								<Input id="reason" placeholder="修正理由を入力してください" />
							</div>
						</div>
					)}

					<DialogFooter>
						<Button variant="outline" onClick={() => setIsDialogOpen(false)}>
							キャンセル
						</Button>
						<Button onClick={handleUpdateRecord}>更新を申請</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}
