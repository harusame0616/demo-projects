"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { SearchIcon, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import type { ApplicationSearchParams } from "../_actions/application-actions";

// フォームのスキーマ定義
const formSchema = z.object({
	query: z.string().optional(),
	type: z.string().optional(),
	status: z.string().optional(),
	date: z.string().optional(),
});

// フォームの値の型
type FormValues = z.infer<typeof formSchema>;

interface SearchFormPresenterProps {
	defaultQuery?: ApplicationSearchParams;
}

export function SearchFormPresenter({
	defaultQuery,
}: SearchFormPresenterProps) {
	const router = useRouter();
	const pathname = usePathname();

	// 検索フォームの初期化
	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			query: defaultQuery?.query || "",
			type: defaultQuery?.type || "all",
			status: defaultQuery?.status || "all",
			date: defaultQuery?.date || "",
		},
	});

	// defaultQueryが変更されたときにフォームの値をリセットする
	useEffect(() => {
		form.reset({
			query: defaultQuery?.query || "",
			type: defaultQuery?.type || "all",
			status: defaultQuery?.status || "all",
			date: defaultQuery?.date || "",
		});
	}, [defaultQuery, form]);

	// フォーム送信時の処理
	const onSubmit = (values: FormValues) => {
		const params = new URLSearchParams();

		// nullやundefinedまたは空文字でない場合だけパラメータに追加
		if (values.query) params.set("query", values.query);
		if (values.type && values.type !== "all") params.set("type", values.type);
		if (values.status && values.status !== "all")
			params.set("status", values.status);
		if (values.date) params.set("date", values.date);

		// ページをリセット
		params.set("page", "1");

		// 新しいURLでページを更新
		const url = `${pathname}?${params.toString()}`;
		router.push(url);
	};

	// クリアボタンの処理
	const handleClear = () => {
		form.reset({
			query: "",
			type: "all",
			status: "all",
			date: "",
		});
		router.push(pathname);
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>申請検索</CardTitle>
				<CardDescription>
					検索条件を指定して申請を絞り込むことができます
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<FormField
								control={form.control}
								name="query"
								render={({ field }) => (
									<FormItem>
										<FormLabel>検索キーワード</FormLabel>
										<FormControl>
											<Input
												placeholder="社員名または内容で検索"
												{...field}
												value={field.value || ""}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="type"
								render={({ field }) => (
									<FormItem>
										<FormLabel>申請種類</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value || "all"}
											value={field.value || "all"}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="すべての種類" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectGroup>
													<SelectItem value="all">すべての種類</SelectItem>
													<SelectItem value="attendance_correction">
														勤怠修正
													</SelectItem>
													<SelectItem value="leave_request">
														休暇申請
													</SelectItem>
													<SelectItem value="remote_work">
														リモートワーク
													</SelectItem>
													<SelectItem value="overtime">残業申請</SelectItem>
													<SelectItem value="business_trip">
														出張申請
													</SelectItem>
												</SelectGroup>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="status"
								render={({ field }) => (
									<FormItem>
										<FormLabel>ステータス</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value || "all"}
											value={field.value || "all"}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="すべてのステータス" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectGroup>
													<SelectItem value="all">
														すべてのステータス
													</SelectItem>
													<SelectItem value="pending">承認待ち</SelectItem>
													<SelectItem value="approved">承認済み</SelectItem>
													<SelectItem value="rejected">却下</SelectItem>
												</SelectGroup>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="date"
								render={({ field }) => (
									<FormItem>
										<FormLabel>日付</FormLabel>
										<FormControl>
											<Input type="date" {...field} value={field.value || ""} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<div className="flex justify-end gap-2">
							<Button
								type="button"
								variant="outline"
								onClick={handleClear}
								className="gap-1"
							>
								<X className="h-4 w-4" />
								クリア
							</Button>
							<Button type="submit" className="gap-1">
								<SearchIcon className="h-4 w-4" />
								検索
							</Button>
						</div>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
