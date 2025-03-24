"use client";

import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Calendar, SearchIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import type { ApplicationSearchParams } from "../_actions/application-actions";

interface ApplicationFilterProps {
	searchParams: ApplicationSearchParams;
}

export function ApplicationFilter({ searchParams }: ApplicationFilterProps) {
	const router = useRouter();
	const pathname = usePathname();
	const [date, setDate] = useState<Date | undefined>(
		searchParams.date ? new Date(searchParams.date) : undefined,
	);
	const [type, setType] = useState<string>(searchParams.type || "all");
	const [status, setStatus] = useState<string>(searchParams.status || "all");
	const [query, setQuery] = useState<string>(searchParams.query || "");

	// フィルターの変更を処理
	const handleFilterChange = () => {
		const params = new URLSearchParams();

		if (query) {
			params.set("query", query);
		}

		if (type !== "all") {
			params.set("type", type);
		}

		if (status !== "all") {
			params.set("status", status);
		}

		if (date) {
			params.set("date", format(date, "yyyy-MM-dd"));
		}

		// フィルター変更時はページをリセット
		params.delete("page");

		const newPath = `${pathname}?${params.toString()}`;
		router.push(newPath);
	};

	// フォームをクリア
	const handleClear = () => {
		setQuery("");
		setType("all");
		setStatus("all");
		setDate(undefined);
		router.push(pathname);
	};

	return (
		<div className="w-full mb-6 bg-white rounded-xl border p-6 shadow-sm">
			<div className="space-y-6">
				{/* 検索フィールド行 */}
				<div className="flex flex-col md:flex-row gap-4 items-center">
					{/* 検索入力フィールド */}
					<div className="relative flex-1 w-full">
						<SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
						<Input
							placeholder="社員名や内容、コメントで検索..."
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							onKeyDown={(e) => {
								if (e.key === "Enter") {
									handleFilterChange();
								}
							}}
							className="pl-10 w-full h-10 rounded-lg"
						/>
					</div>

					{/* 申請タイプ選択 */}
					<div className="w-full md:w-48">
						<Select value={type} onValueChange={(value) => setType(value)}>
							<SelectTrigger className="h-10 rounded-lg">
								<SelectValue placeholder="申請タイプ" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">すべての申請</SelectItem>
								<SelectItem value="attendance_correction">勤怠修正</SelectItem>
								<SelectItem value="leave_request">休暇申請</SelectItem>
								<SelectItem value="remote_work">リモートワーク</SelectItem>
								<SelectItem value="overtime">残業申請</SelectItem>
								<SelectItem value="business_trip">出張申請</SelectItem>
							</SelectContent>
						</Select>
					</div>

					{/* ステータス選択 */}
					<div className="w-full md:w-48">
						<Select value={status} onValueChange={(value) => setStatus(value)}>
							<SelectTrigger className="h-10 rounded-lg">
								<SelectValue placeholder="ステータス" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">すべてのステータス</SelectItem>
								<SelectItem value="pending">承認待ち</SelectItem>
								<SelectItem value="approved">承認済み</SelectItem>
								<SelectItem value="rejected">却下</SelectItem>
							</SelectContent>
						</Select>
					</div>

					{/* 日付選択 */}
					<div className="w-full md:w-48">
						<Popover>
							<PopoverTrigger asChild>
								<Button
									variant="outline"
									className={`w-full h-10 rounded-lg justify-start text-left font-normal ${
										!date ? "text-muted-foreground" : ""
									}`}
								>
									<Calendar className="mr-2 h-4 w-4" />
									{date
										? format(date, "yyyy年MM月dd日", { locale: ja })
										: "日付を選択"}
								</Button>
							</PopoverTrigger>
							<PopoverContent className="w-auto p-0" align="start">
								<CalendarComponent
									mode="single"
									selected={date}
									onSelect={setDate}
									initialFocus
								/>
							</PopoverContent>
						</Popover>
					</div>

					{/* ボタン */}
					<div className="flex gap-4 w-full md:w-auto">
						<Button
							onClick={handleFilterChange}
							type="button"
							className="flex-1 md:flex-none md:w-32 bg-black text-white h-10 rounded-lg"
						>
							検索
						</Button>
						<Button
							onClick={handleClear}
							variant="outline"
							type="button"
							className="flex-1 md:flex-none md:w-32 border-gray-300 h-10 rounded-lg"
						>
							クリア
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
