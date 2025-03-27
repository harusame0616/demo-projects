"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";

type ClockInStatus = "not_started" | "working" | "finished";

export function TimeRecorder() {
	const [currentTime, setCurrentTime] = useState(new Date());
	const [status, setStatus] = useState<ClockInStatus>("not_started");
	const [clockInTime, setClockInTime] = useState<Date | null>(null);
	const [clockOutTime, setClockOutTime] = useState<Date | null>(null);

	// 現在時刻を1秒ごとに更新
	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentTime(new Date());
		}, 1000);

		return () => clearInterval(timer);
	}, []);

	const handleClockIn = () => {
		const now = new Date();
		setClockInTime(now);
		setStatus("working");
		// ここで実際にはAPIを呼び出して記録する
	};

	const handleClockOut = () => {
		const now = new Date();
		setClockOutTime(now);
		setStatus("finished");
		// ここで実際にはAPIを呼び出して記録する
	};

	const handleReset = () => {
		setStatus("not_started");
		setClockInTime(null);
		setClockOutTime(null);
	};

	const formatTime = (date: Date) => {
		return date.toLocaleTimeString("ja-JP", {
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit",
		});
	};

	const formatDate = (date: Date) => {
		return date.toLocaleDateString("ja-JP", {
			year: "numeric",
			month: "long",
			day: "numeric",
			weekday: "long",
		});
	};

	return (
		<div className="flex flex-col items-center space-y-8">
			<div className="text-center">
				<h2 className="text-xl font-semibold mb-2">
					{formatDate(currentTime)}
				</h2>
				<div className="text-4xl font-bold">{formatTime(currentTime)}</div>
			</div>

			<div className="w-full max-w-md">
				{status === "working" && clockInTime ? (
					// 出勤中は退勤ボタンのみ
					<div className="flex flex-col space-y-4">
						<div className="text-center mb-2">
							<span className="font-medium">出勤時間:</span>{" "}
							{formatTime(clockInTime)}
						</div>
						<Button
							size="lg"
							className="h-32 text-xl w-full"
							variant="destructive"
							onClick={handleClockOut}
						>
							退勤
						</Button>
					</div>
				) : status === "finished" && clockInTime && clockOutTime ? (
					// 退勤後は新しい勤務ボタンのみ
					<div className="flex flex-col space-y-4">
						<div className="text-center mb-2">
							<span className="font-medium">出勤時間:</span>{" "}
							{formatTime(clockInTime)}
						</div>
						<div className="text-center mb-2">
							<span className="font-medium">退勤時間:</span>{" "}
							{formatTime(clockOutTime)}
						</div>
						<Button
							size="lg"
							className="h-32 text-xl w-full"
							variant="default"
							onClick={handleReset}
						>
							新しい勤務を開始
						</Button>
					</div>
				) : (
					// 出勤前は出勤ボタンのみ
					<Button
						size="lg"
						className="h-32 text-xl w-full"
						variant="default"
						onClick={handleClockIn}
					>
						出勤
					</Button>
				)}
			</div>

			{status === "finished" && (
				<Card className="p-4 w-full max-w-md">
					<div className="text-center">
						<p className="font-semibold">本日の勤務時間</p>
						<p className="text-2xl font-bold">
							{clockInTime && clockOutTime
								? `${
										Math.round(
											(clockOutTime.getTime() - clockInTime.getTime()) / 36000,
										) / 100
									}時間`
								: "計算中..."}
						</p>
					</div>
				</Card>
			)}
		</div>
	);
}
