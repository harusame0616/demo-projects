"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as v from "valibot";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { Card, CardContent } from "@/components/ui/card";
// フォームのスキーマを定義
const employeeFilterSchema = v.object({
	query: v.string(),
	department: v.string(),
	position: v.string(),
});

type EmployeeFilterFormValues = v.InferInput<typeof employeeFilterSchema>;

interface SearchFormPresenterProps {
	departmentOptions: { value: string; label: string }[];
	positionOptions: { value: string; label: string }[];
	searchQuery?: string;
	currentDepartment?: string;
	currentPosition?: string;
}

export function SearchFormPresenter({
	departmentOptions,
	positionOptions,
	searchQuery = "",
	currentDepartment = "all",
	currentPosition = "all",
}: SearchFormPresenterProps) {
	const router = useRouter();
	const pathname = usePathname();

	// フォームの初期値を設定
	const defaultValues: EmployeeFilterFormValues = {
		query: searchQuery || "",
		department: currentDepartment || "all",
		position: currentPosition || "all",
	};

	// フォームを初期化
	const form = useForm<EmployeeFilterFormValues>({
		resolver: valibotResolver(employeeFilterSchema),
		defaultValues,
	});

	// 外部からのpropsが変更されたらフォームの値をリセット
	useEffect(() => {
		form.reset({
			query: searchQuery || "",
			department: currentDepartment || "all",
			position: currentPosition || "all",
		});
	}, [searchQuery, currentDepartment, currentPosition, form]);

	// 検索を実行する関数
	const handleSearch = (values: EmployeeFilterFormValues) => {
		// 現在のURLパラメータを取得
		const params = new URLSearchParams();

		// 有効な値のみパラメータに追加
		if (values.query) params.set("query", values.query);
		if (values.department && values.department !== "all")
			params.set("department", values.department);
		if (values.position && values.position !== "all")
			params.set("position", values.position);

		// ページは1に戻す（フィルタリング時はページをリセット）
		params.set("page", "1");

		// URLをアップデート
		const queryString = params.toString();
		const url = queryString ? `${pathname}?${queryString}` : pathname;
		router.push(url);
	};

	// フォームをクリアする関数
	const handleClear = () => {
		form.reset({
			query: "",
			department: "all",
			position: "all",
		});

		// URLをリセット（すべてのフィルタパラメータを削除）
		router.push(pathname);
	};

	return (
		<Card>
			<CardContent>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleSearch)}
						className="grid grid-cols-4 gap-4"
					>
						<FormField
							control={form.control}
							name="query"
							render={({ field }) => (
								<FormItem className="col-span-4 sm:col-span-2">
									<FormLabel>キーワード（名前、メール、ID）</FormLabel>
									<FormControl>
										<Input
											className="h-10 rounded-lg"
											{...field}
											aria-label="名前、メール、IDで検索"
										/>
									</FormControl>
								</FormItem>
							)}
						/>

						{/* 部署選択 */}
						<FormField
							control={form.control}
							name="department"
							render={({ field }) => (
								<FormItem className="col-span-4 sm:col-span-1">
									<FormLabel>部署</FormLabel>
									<FormControl>
										<Select
											value={field.value}
											onValueChange={field.onChange}
											disabled={departmentOptions.length === 0}
										>
											<SelectTrigger
												className="min-h-10 w-full min-w-0 overflow-hidden"
												aria-label="部署でフィルター"
											>
												<SelectValue placeholder="すべての部署" />
											</SelectTrigger>
											<SelectContent>
												{departmentOptions.map((department) => (
													<SelectItem
														key={department.value}
														value={department.value}
													>
														{department.label}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</FormControl>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="position"
							render={({ field }) => (
								<FormItem className="col-span-4 sm:col-span-1">
									<FormLabel>役職</FormLabel>
									<FormControl>
										<Select
											value={field.value}
											onValueChange={field.onChange}
											disabled={positionOptions.length === 0}
										>
											<SelectTrigger
												aria-label="役職でフィルター"
												className="min-h-10 min-w-0 w-full overflow-hidden"
											>
												<SelectValue placeholder="すべての役職" />
											</SelectTrigger>
											<SelectContent>
												{positionOptions.map((position) => (
													<SelectItem
														key={position.value}
														value={position.value}
													>
														{position.label}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</FormControl>
								</FormItem>
							)}
						/>

						<div className="col-span-4 flex gap-2 flex-wrap">
							<Button
								type="submit"
								className="h-10 sm:max-w-32 w-full"
								disabled={
									departmentOptions.length === 0 && positionOptions.length === 0
								}
							>
								検索
							</Button>
							<Button
								onClick={handleClear}
								type="button"
								variant="outline"
								className="h-10 sm:max-w-32 w-full"
								disabled={
									departmentOptions.length === 0 && positionOptions.length === 0
								}
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
