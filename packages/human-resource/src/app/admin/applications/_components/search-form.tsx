"use client";

import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
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
import { valibotResolver } from "@hookform/resolvers/valibot";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { Calendar, SearchIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as v from "valibot";
import type { ApplicationSearchParams } from "../_actions/application-actions";

// フォームのスキーマを定義
const applicationFilterSchema = v.object({
	query: v.string(),
	type: v.string(),
	status: v.string(),
	date: v.optional(v.string()),
});

type ApplicationFilterFormValues = {
	query: string;
	type: string;
	status: string;
	date?: Date;
};

interface SearchFormProps {
	searchParams: ApplicationSearchParams;
}

export function SearchForm({ searchParams }: SearchFormProps) {
	const router = useRouter();
	const pathname = usePathname();

	// フォームの初期値を設定
	const defaultValues: ApplicationFilterFormValues = {
		query: searchParams.query || "",
		type: searchParams.type || "all",
		status: searchParams.status || "all",
		date: searchParams.date ? new Date(searchParams.date) : undefined,
	};

	// フォームを初期化
	const form = useForm<ApplicationFilterFormValues>({
		resolver: valibotResolver(applicationFilterSchema),
		defaultValues,
	});

	// 外部からのpropsが変更されたらフォームの値をリセット
	useEffect(() => {
		form.reset({
			query: searchParams.query || "",
			type: searchParams.type || "all",
			status: searchParams.status || "all",
			date: searchParams.date ? new Date(searchParams.date) : undefined,
		});
	}, [searchParams, form]);

	// フィルターの変更を処理
	const handleFilterChange = (values: ApplicationFilterFormValues) => {
		const params = new URLSearchParams();

		if (values.query) {
			params.set("query", values.query);
		}

		if (values.type !== "all") {
			params.set("type", values.type);
		}

		if (values.status !== "all") {
			params.set("status", values.status);
		}

		if (values.date) {
			params.set("date", format(values.date, "yyyy-MM-dd"));
		}

		// フィルター変更時はページをリセット
		params.delete("page");

		const newPath = `${pathname}?${params.toString()}`;
		router.push(newPath);
	};

	// フォームをクリア
	const handleClear = () => {
		form.reset({
			query: "",
			type: "all",
			status: "all",
			date: undefined,
		});
		router.push(pathname);
	};

	return (
		<Card>
			<CardContent>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleFilterChange)}
						className="grid grid-cols-4 gap-4"
					>
						<FormField
							control={form.control}
							name="query"
							render={({ field }) => (
								<FormItem className="col-span-4 sm:col-span-2">
									<FormLabel>キーワード（社員名、内容、コメント）</FormLabel>
									<FormControl>
										<Input
											className="h-10 rounded-lg border-gray-200"
											{...field}
										/>
									</FormControl>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="type"
							render={({ field }) => (
								<FormItem className="col-span-4 sm:col-span-1">
									<FormLabel>申請タイプ</FormLabel>
									<FormControl>
										<Select value={field.value} onValueChange={field.onChange}>
											<SelectTrigger
												className="min-h-10 w-full min-w-0"
												aria-label="申請タイプ"
											>
												<SelectValue placeholder="申請タイプ" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="all">すべての申請</SelectItem>
												<SelectItem value="attendance_correction">
													勤怠修正
												</SelectItem>
												<SelectItem value="leave_request">休暇申請</SelectItem>
												<SelectItem value="remote_work">
													リモートワーク
												</SelectItem>
												<SelectItem value="overtime">残業申請</SelectItem>
												<SelectItem value="business_trip">出張申請</SelectItem>
											</SelectContent>
										</Select>
									</FormControl>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="status"
							render={({ field }) => (
								<FormItem className="col-span-4 sm:col-span-1">
									<FormLabel className="text-sm font-medium mb-1 block">
										ステータス
									</FormLabel>
									<FormControl>
										<Select value={field.value} onValueChange={field.onChange}>
											<SelectTrigger
												className="min-h-10 w-full min-w-0"
												aria-label="ステータス"
											>
												<SelectValue placeholder="すべてのステータス" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="all">すべてのステータス</SelectItem>
												<SelectItem value="pending">承認待ち</SelectItem>
												<SelectItem value="approved">承認済み</SelectItem>
												<SelectItem value="rejected">却下</SelectItem>
											</SelectContent>
										</Select>
									</FormControl>
								</FormItem>
							)}
						/>

						{/* 日付選択 */}
						<FormField
							control={form.control}
							name="date"
							render={({ field }) => (
								<FormItem className="col-span-4 sm:col-span-1">
									<FormLabel>日付</FormLabel>
									<FormControl>
										<Popover>
											<PopoverTrigger asChild>
												<Button
													variant="outline"
													className={`min-h-10 w-full rounded-lg justify-start text-left font-normal ${
														!field.value ? "text-muted-foreground" : ""
													}`}
													aria-label="日付選択"
												>
													<Calendar className="mr-2 h-4 w-4" />
													{field.value
														? format(field.value, "yyyy年MM月dd日", {
																locale: ja,
															})
														: "日付を選択"}
												</Button>
											</PopoverTrigger>
											<PopoverContent className="w-auto p-0" align="start">
												<CalendarComponent
													mode="single"
													selected={field.value}
													onSelect={field.onChange}
													initialFocus
												/>
											</PopoverContent>
										</Popover>
									</FormControl>
								</FormItem>
							)}
						/>

						{/* ボタン */}
						<div className="col-span-4 flex gap-2 flex-wrap">
							<Button type="submit" className="h-10 sm:max-w-32 w-full">
								検索
							</Button>
							<Button
								onClick={handleClear}
								variant="outline"
								type="button"
								className="h-10 sm:max-w-32 w-full"
							>
								クリア
							</Button>
						</div>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
