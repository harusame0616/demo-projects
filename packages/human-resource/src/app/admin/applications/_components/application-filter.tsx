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

	// フィルターの変更を処理
	const handleFilterChange = (key: string, value: string) => {
		const params = new URLSearchParams(searchParams as Record<string, string>);

		if (value === "all") {
			params.delete(key);
		} else {
			params.set(key, value);
		}

		// フィルター変更時はページをリセット
		params.delete("page");

		const newPath = `${pathname}?${params.toString()}`;
		router.push(newPath);
	};

	// 日付フィルターの変更を処理
	const handleDateChange = (newDate: Date | undefined) => {
		setDate(newDate);

		const params = new URLSearchParams(searchParams as Record<string, string>);

		if (newDate) {
			params.set("date", format(newDate, "yyyy-MM-dd"));
		} else {
			params.delete("date");
		}

		// 日付変更時はページをリセット
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

	return (
		<div className="w-full flex flex-col space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4 mb-6">
			<div className="flex-1">
				<div className="relative">
					<SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
					<Input
						placeholder="社員名や内容、コメントで検索..."
						defaultValue={searchParams.query || ""}
						onChange={(e) => {
							// デバウンス処理
							const timeoutId = setTimeout(() => {
								handleSearchChange(e.target.value);
							}, 500);
							return () => clearTimeout(timeoutId);
						}}
						className="pl-10 w-full"
					/>
				</div>
			</div>

			<div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 w-full lg:w-auto">
				<Select
					defaultValue={searchParams.type || "all"}
					onValueChange={(value) => handleFilterChange("type", value)}
				>
					<SelectTrigger className="w-full sm:w-[180px]">
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

				<Select
					defaultValue={searchParams.status || "all"}
					onValueChange={(value) => handleFilterChange("status", value)}
				>
					<SelectTrigger className="w-full sm:w-[180px]">
						<SelectValue placeholder="ステータス" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">すべてのステータス</SelectItem>
						<SelectItem value="pending">承認待ち</SelectItem>
						<SelectItem value="approved">承認済み</SelectItem>
						<SelectItem value="rejected">却下</SelectItem>
					</SelectContent>
				</Select>

				<Popover>
					<PopoverTrigger asChild>
						<Button
							variant="outline"
							className={`w-full sm:w-[180px] justify-start text-left font-normal ${
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
							onSelect={handleDateChange}
							initialFocus
						/>
					</PopoverContent>
				</Popover>
			</div>
		</div>
	);
}
