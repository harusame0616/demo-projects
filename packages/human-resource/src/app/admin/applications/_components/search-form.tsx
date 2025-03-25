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
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import { Calendar, SearchIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { useForm } from "react-hook-form";
import * as v from "valibot";
import { valibotResolver } from "@hookform/resolvers/valibot";
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
		<div className="w-full mb-6 bg-white rounded-xl border p-6 shadow-sm">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(handleFilterChange)}
					className="space-y-6"
				>
					{/* 検索フィールド行 */}
					<div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-4">
						{/* 検索入力フィールド */}
						<FormField
							control={form.control}
							name="query"
							render={({ field }) => (
								<FormItem className="col-span-2">
									<FormLabel className="text-sm font-medium mb-1 block">
										キーワード（社員名、内容、コメント）
									</FormLabel>
									<FormControl>
										<div className="relative w-full">
											<SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
											<Input
												className="pl-10 w-full h-10 rounded-lg"
												{...field}
												aria-label="社員名や内容、コメントで検索"
											/>
										</div>
									</FormControl>
								</FormItem>
							)}
						/>

						{/* 申請タイプ選択 */}
						<FormField
							control={form.control}
							name="type"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormLabel className="text-sm font-medium mb-1 block">
										申請タイプ
									</FormLabel>
									<FormControl>
										<Select value={field.value} onValueChange={field.onChange}>
											<SelectTrigger
												className="h-10 rounded-lg w-full min-w-0"
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

						{/* ステータス選択 */}
						<FormField
							control={form.control}
							name="status"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormLabel className="text-sm font-medium mb-1 block">
										ステータス
									</FormLabel>
									<FormControl>
										<Select value={field.value} onValueChange={field.onChange}>
											<SelectTrigger
												className="h-10 rounded-lg w-full min-w-0"
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
								<FormItem className="w-full">
									<FormLabel className="text-sm font-medium mb-1 block">
										日付
									</FormLabel>
									<FormControl>
										<Popover>
											<PopoverTrigger asChild>
												<Button
													variant="outline"
													className={`w-full h-10 rounded-lg justify-start text-left font-normal ${
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
						<div className="flex gap-4 col-span-4 justify-start">
							<Button
								type="submit"
								className="bg-black text-white h-10 rounded-lg w-32"
							>
								検索
							</Button>
							<Button
								onClick={handleClear}
								variant="outline"
								type="button"
								className="border-gray-300 h-10 rounded-lg w-32"
							>
								クリア
							</Button>
						</div>
					</div>
				</form>
			</Form>
		</div>
	);
}
