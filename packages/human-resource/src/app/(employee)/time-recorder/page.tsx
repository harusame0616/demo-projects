"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { TimeRecorder } from "./components/time-recorder";
import { TimeHistory } from "./components/time-history";
import { LeaveRequest } from "./components/leave-request";
import { ApplicationList } from "./components/application-list";

export default function TimeRecorderPage() {
	const [activeTab, setActiveTab] = useState("record");

	return (
		<div className="container mx-auto py-8">
			<h1 className="text-3xl font-bold mb-8">勤怠管理</h1>

			<Tabs
				defaultValue="record"
				value={activeTab}
				onValueChange={setActiveTab}
				className="w-full"
			>
				<TabsList className="grid w-full grid-cols-4">
					<TabsTrigger value="record">出退勤登録</TabsTrigger>
					<TabsTrigger value="history">勤怠履歴</TabsTrigger>
					<TabsTrigger value="leave">休暇申請</TabsTrigger>
					<TabsTrigger value="applications">申請一覧</TabsTrigger>
				</TabsList>

				<TabsContent value="record">
					<Card>
						<CardHeader>
							<CardTitle>出退勤登録</CardTitle>
							<CardDescription>
								出勤・退勤を記録します。現在の時刻が自動的に記録されます。
							</CardDescription>
						</CardHeader>
						<CardContent>
							<TimeRecorder />
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="history">
					<Card>
						<CardHeader>
							<CardTitle>勤怠履歴</CardTitle>
							<CardDescription>
								過去の勤怠記録を確認・修正できます。
							</CardDescription>
						</CardHeader>
						<CardContent>
							<TimeHistory />
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="leave">
					<Card>
						<CardHeader>
							<CardTitle>休暇申請</CardTitle>
							<CardDescription>休暇の申請を行います。</CardDescription>
						</CardHeader>
						<CardContent>
							<LeaveRequest />
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="applications">
					<Card>
						<CardHeader>
							<CardTitle>申請一覧</CardTitle>
							<CardDescription>
								勤怠修正や休暇などの申請状況を確認できます。
							</CardDescription>
						</CardHeader>
						<CardContent>
							<ApplicationList />
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
}
