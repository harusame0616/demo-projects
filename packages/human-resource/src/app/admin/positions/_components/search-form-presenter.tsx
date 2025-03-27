"use client";

import { Button } from "@/components/ui/button";
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
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as v from "valibot";

// フォームのスキーマを定義
const positionFilterSchema = v.object({
	query: v.string(),
	level: v.string(),
});

type PositionFilterFormValues = v.InferInput<typeof positionFilterSchema>;

interface SearchFormPresenterProps {
	defaultQuery: string;
	defaultLevel: string;
	levelOptions: string[];
	isLoading?: boolean;
}

export function SearchFormPresenter({
	defaultQuery = "",
	defaultLevel = "all",
	levelOptions = [],
	isLoading = false,
}: SearchFormPresenterProps) {
	const router = useRouter();

	// フォームの初期値を設定
	const defaultValues: PositionFilterFormValues = {
		query: defaultQuery,
		level: defaultLevel,
	};

	// フォームを初期化
	const form = useForm<PositionFilterFormValues>({
		resolver: valibotResolver(positionFilterSchema),
		defaultValues,
	});

	// 外部からのpropsが変更されたらフォームの値をリセット
	useEffect(() => {
		form.reset({
			query: defaultQuery || "",
			level: defaultLevel || "all",
		});
	}, [defaultQuery, defaultLevel, form]);

	// 検索処理
	const handleSearch = async (values: PositionFilterFormValues) => {
		const searchParams = new URLSearchParams();

		if (values.query) {
			searchParams.set("query", values.query);
		}

		if (values.level && values.level !== "all") {
			searchParams.set("level", values.level);
		}

		router.push(`/admin/positions?${searchParams}`);
	};

	// フォームをクリア
	const handleClear = async () => {
		form.reset({
			query: "",
			level: "all",
		});
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
									<FormLabel>キーワード（役職名、説明）</FormLabel>
									<FormControl>
										<Input
											className="h-10 rounded-lg border-gray-200"
											{...field}
											aria-label="役職名や説明で検索"
											disabled={isLoading}
										/>
									</FormControl>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="level"
							render={({ field }) => (
								<FormItem className="col-span-4 sm:col-span-1">
									<FormLabel>レベル</FormLabel>
									<FormControl>
										<Select
											value={field.value}
											onValueChange={field.onChange}
											disabled={isLoading}
										>
											<SelectTrigger
												className="min-h-10 w-full overflow-hidden"
												aria-label="レベルでフィルター"
											>
												<SelectValue placeholder="レベルでフィルター" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="all">すべて</SelectItem>
												{levelOptions.map((level) => (
													<SelectItem key={level} value={level}>
														レベル {level}
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
								disabled={isLoading}
							>
								検索
							</Button>
							<Button
								onClick={handleClear}
								variant="outline"
								type="button"
								className="h-10 sm:max-w-32 w-full"
								disabled={isLoading}
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
