"use client";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { SearchIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { format, parse, startOfMonth, endOfMonth } from "date-fns";
import { ja } from "date-fns/locale";
import * as z from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const formSchema = z.object({
	query: z.string().optional(),
	departmentId: z.string().optional(),
	startYearMonth: z.string().optional(),
	endYearMonth: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface Department {
	id: string;
	name: string;
}

interface SearchFormPresenterProps {
	defaultValues?: Partial<FormValues>;
	departments: Department[] | null;
	isLoading?: boolean;
}

export function SearchFormPresenter({
	defaultValues = {},
	departments = [],
	isLoading = false,
}: SearchFormPresenterProps) {
	const router = useRouter();
	const pathname = usePathname();

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			query: defaultValues.query || "",
			departmentId: defaultValues.departmentId || "all",
			startYearMonth: defaultValues.startYearMonth || "",
			endYearMonth: defaultValues.endYearMonth || "",
		},
	});

	const handleSubmit = (values: FormValues) => {
		const updatedValues = {
			...values,
			departmentId:
				values.departmentId === "all" ? undefined : values.departmentId,
			startDate: values.startYearMonth
				? `${values.startYearMonth}-01`
				: undefined,
			endDate: values.endYearMonth
				? (() => {
						const [year, month] = values.endYearMonth.split("-").map(Number);
						const lastDay = new Date(year, month, 0).getDate();
						return `${values.endYearMonth}-${lastDay}`;
					})()
				: undefined,
		};

		// 検索パラメータを構築
		const params = new URLSearchParams();

		if (updatedValues.query) {
			params.set("query", updatedValues.query);
		}

		if (updatedValues.departmentId) {
			params.set("departmentId", updatedValues.departmentId);
		}

		if (updatedValues.startDate) {
			params.set("startDate", updatedValues.startDate);
		}

		if (updatedValues.endDate) {
			params.set("endDate", updatedValues.endDate);
		}

		// ページをリセット
		params.set("page", "1");

		// URLを更新して画面遷移
		router.push(`${pathname}?${params.toString()}`);
	};

	const handleReset = () => {
		form.reset({
			query: "",
			departmentId: "all",
			startYearMonth: "",
			endYearMonth: "",
		});

		const params = new URLSearchParams();
		params.set("page", "1");
		router.push(`${pathname}?${params.toString()}`);
	};

	// データがロード中またはデータが利用できない場合
	const isDisabled = isLoading || !departments || departments.length === 0;

	return (
		<Card>
			<CardContent>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleSubmit)}
						className="gap-4 grid grid-cols-4"
					>
						{/* 検索クエリ（従業員名またはID） */}
						<FormField
							control={form.control}
							name="query"
							render={({ field }) => (
								<FormItem className="col-span-4 sm:col-span-2">
									<FormLabel>キーワード（名前、ID）</FormLabel>
									<FormControl>
										<Input
											placeholder="従業員名または従業員IDで検索"
											{...field}
											disabled={isDisabled}
										/>
									</FormControl>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="departmentId"
							render={({ field }) => (
								<FormItem className="col-span-4 sm:col-span-1">
									<FormLabel>部署</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
										disabled={isDisabled}
									>
										<FormControl>
											<SelectTrigger className="w-full overflow-hidden">
												<SelectValue placeholder="部署を選択" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value="all">すべて</SelectItem>
											{departments?.map((department) => (
												<SelectItem key={department.id} value={department.id}>
													{department.name}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</FormItem>
							)}
						/>

						{/* 年月範囲選択 */}
						<div className="col-span-4 sm:col-span-2">
							<FormLabel>期間</FormLabel>
							<div className="flex items-center gap-2">
								<FormField
									control={form.control}
									name="startYearMonth"
									render={({ field }) => (
										<FormItem className="flex-1">
											<FormControl>
												<Input
													type="month"
													placeholder="開始年月"
													className="w-full h-10"
													{...field}
													disabled={isDisabled}
												/>
											</FormControl>
										</FormItem>
									)}
								/>
								<span>～</span>
								<FormField
									control={form.control}
									name="endYearMonth"
									render={({ field }) => (
										<FormItem className="flex-1">
											<FormControl>
												<Input
													type="month"
													placeholder="終了年月"
													className="w-full h-10"
													{...field}
													disabled={isDisabled}
												/>
											</FormControl>
										</FormItem>
									)}
								/>
							</div>
						</div>

						<div className="col-span-4 flex gap-2 flex-wrap">
							<Button
								type="submit"
								className="h-10 sm:max-w-32 w-full"
								disabled={isDisabled}
							>
								検索
							</Button>
							<Button
								type="button"
								variant="outline"
								onClick={handleReset}
								className="h-10 sm:max-w-32 w-full"
								disabled={isDisabled}
							>
								リセット
							</Button>
						</div>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
