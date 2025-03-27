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
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as v from "valibot";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";

// フォームのスキーマを定義
const positionFilterSchema = v.object({
	query: v.string(),
	level: v.string(),
});

type PositionFilterFormValues = v.InferInput<typeof positionFilterSchema>;

interface SearchFormProps {
	searchQuery: string;
	currentLevel: string;
	levelOptions: string[];
	onFilter?: (query: string, level: string) => void; // オプショナルに変更
}

export function SearchForm({
	searchQuery,
	currentLevel,
	levelOptions,
	onFilter,
}: SearchFormProps) {
	const router = useRouter();
	const pathname = usePathname();
	const params = useSearchParams();

	// フォームの初期値を設定
	const defaultValues: PositionFilterFormValues = {
		query: searchQuery || "",
		level: currentLevel || "all",
	};

	// フォームを初期化
	const form = useForm<PositionFilterFormValues>({
		resolver: valibotResolver(positionFilterSchema),
		defaultValues,
	});

	// 外部からのpropsが変更されたらフォームの値をリセット
	useEffect(() => {
		form.reset({
			query: searchQuery || "",
			level: currentLevel || "all",
		});
	}, [searchQuery, currentLevel, form]);

	const handleSearch = (values: PositionFilterFormValues) => {
		if (onFilter) {
			onFilter(values.query, values.level);
			return;
		}

		// onFilterが提供されていない場合は内部でナビゲーション
		const updatedParams = new URLSearchParams(params.toString());
		if (values.query) {
			updatedParams.set("query", values.query);
		} else {
			updatedParams.delete("query");
		}

		if (values.level && values.level !== "all") {
			updatedParams.set("level", values.level);
		} else {
			updatedParams.delete("level");
		}

		// ページをリセット
		updatedParams.delete("page");
		router.push(`${pathname}?${updatedParams.toString()}`);
	};

	const handleClear = () => {
		form.reset({
			query: "",
			level: "all",
		});

		if (onFilter) {
			onFilter("", "all");
			return;
		}

		// onFilterが提供されていない場合は内部でナビゲーション
		const updatedParams = new URLSearchParams(params.toString());
		updatedParams.delete("query");
		updatedParams.delete("level");
		updatedParams.delete("page");
		router.push(`${pathname}?${updatedParams.toString()}`);
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
										<Select value={field.value} onValueChange={field.onChange}>
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
