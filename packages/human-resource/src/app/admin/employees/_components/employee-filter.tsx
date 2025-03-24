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
import { SearchIcon } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as v from "valibot";
import { valibotResolver } from "@hookform/resolvers/valibot";

// フォームのスキーマを定義
const employeeFilterSchema = v.object({
	query: v.string(),
	department: v.string(),
	position: v.string(),
});

type EmployeeFilterFormValues = v.InferType<typeof employeeFilterSchema>;

interface EmployeeFilterProps {
	departmentOptions: { value: string; label: string }[];
	positionOptions: { value: string; label: string }[];
	searchQuery?: string;
	currentDepartment?: string;
	currentPosition?: string;
}

export function EmployeeFilter({
	departmentOptions,
	positionOptions,
	searchQuery = "",
	currentDepartment = "all",
	currentPosition = "all",
}: EmployeeFilterProps) {
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
		<div className="w-full mb-6 bg-white rounded-xl border p-6 shadow-sm">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(handleSearch)} className="space-y-6">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						{/* 検索入力フィールド */}
						<FormField
							control={form.control}
							name="query"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormLabel className="text-sm font-medium mb-1 block">
										キーワード（名前、メール、ID）
									</FormLabel>
									<FormControl>
										<div className="relative w-full">
											<SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
											<Input
												placeholder="名前、メール、IDで検索..."
												className="pl-10 w-full h-10 rounded-lg"
												{...field}
												aria-label="名前、メール、IDで検索"
											/>
										</div>
									</FormControl>
								</FormItem>
							)}
						/>

						{/* 部署選択 */}
						<FormField
							control={form.control}
							name="department"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormLabel className="text-sm font-medium mb-1 block">
										部署
									</FormLabel>
									<FormControl>
										<Select value={field.value} onValueChange={field.onChange}>
											<SelectTrigger
												className="h-10 rounded-lg"
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

						{/* 役職選択 */}
						<FormField
							control={form.control}
							name="position"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormLabel className="text-sm font-medium mb-1 block">
										役職
									</FormLabel>
									<FormControl>
										<Select value={field.value} onValueChange={field.onChange}>
											<SelectTrigger
												className="h-10 rounded-lg"
												aria-label="役職でフィルター"
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

						{/* ボタン */}
						<div className="flex gap-4 col-span-1 md:col-span-3 justify-end mt-2">
							<Button
								type="submit"
								className="bg-black text-white h-10 rounded-lg w-32"
							>
								検索
							</Button>
							<Button
								onClick={handleClear}
								type="button"
								variant="outline"
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
