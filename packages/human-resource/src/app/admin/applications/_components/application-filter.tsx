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
		<div className="w-full flex flex-col space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4 mb-6">
			<div className="flex-1 flex gap-2">
				<div className="relative flex-1">
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
						className="pl-10 w-full"
					/>
				</div>
			</div>

			<div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 w-full lg:w-auto">
				<Select value={type} onValueChange={(value) => setType(value)}>
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

				<Select value={status} onValueChange={(value) => setStatus(value)}>
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
							onSelect={setDate}
							initialFocus
						/>
					</PopoverContent>
				</Popover>

				<div className="flex gap-2">
					<Button onClick={handleFilterChange} type="button">
						検索
					</Button>
					<Button onClick={handleClear} variant="outline" type="button">
						クリア
					</Button>
				</div>
			</div>
		</div>
	);
}
