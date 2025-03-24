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
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { SearchIcon } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as v from "valibot";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

// フォームのスキーマを定義
const positionFilterSchema = v.object({
	query: v.string(),
	level: v.string(),
});

type PositionFilterFormValues = v.InferType<typeof positionFilterSchema>;

interface PositionFilterProps {
	searchQuery: string;
	currentLevel: string;
	levelOptions: string[];
	onFilter?: (query: string, level: string) => void; // オプショナルに変更
}

export function PositionFilter({
	searchQuery,
	currentLevel,
	levelOptions,
	onFilter,
}: PositionFilterProps) {
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
		<div className="w-full mb-4 bg-white rounded-3xl shadow-sm flex flex-wrap items-center gap-2 p-2">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(handleSearch)}
					className="flex flex-wrap items-center gap-2 w-full"
				>
					<FormField
						control={form.control}
						name="query"
						render={({ field }) => (
							<FormItem className="relative flex-1 min-w-[200px]">
								<FormControl>
									<div className="relative w-full">
										<SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
										<Input
											placeholder="役職名や説明で検索..."
											className="pl-10 h-10 rounded-lg border-gray-200"
											{...field}
										/>
									</div>
								</FormControl>
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="level"
						render={({ field }) => (
							<FormItem className="w-auto">
								<FormControl>
									<Select value={field.value} onValueChange={field.onChange}>
										<SelectTrigger className="h-10 rounded-lg w-[180px] border-gray-200">
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

					<Button
						type="submit"
						className="bg-black text-white h-10 rounded-lg w-24"
					>
						検索
					</Button>
					<Button
						onClick={handleClear}
						variant="outline"
						type="button"
						className="border-gray-300 h-10 rounded-lg w-24"
					>
						クリア
					</Button>
				</form>
			</Form>
		</div>
	);
}
