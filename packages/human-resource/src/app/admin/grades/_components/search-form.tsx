"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as v from "valibot";
import { valibotResolver } from "@hookform/resolvers/valibot";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import type { GradeSearchParams } from "../_actions/grade-actions";

// フォームのスキーマを定義
const gradeSearchSchema = v.object({
	query: v.string(),
});

type GradeSearchFormValues = {
	query: string;
};

interface SearchFormProps {
	searchParams: GradeSearchParams;
}

export function SearchForm({ searchParams }: SearchFormProps) {
	const router = useRouter();
	const pathname = usePathname();

	// フォームの初期値を設定
	const defaultValues: GradeSearchFormValues = {
		query: searchParams.query || "",
	};

	// フォームを初期化
	const form = useForm<GradeSearchFormValues>({
		resolver: valibotResolver(gradeSearchSchema),
		defaultValues,
	});

	// 外部からのpropsが変更されたらフォームの値をリセット
	useEffect(() => {
		form.reset({
			query: searchParams.query || "",
		});
	}, [searchParams, form]);

	// 検索処理
	const handleSearch = (values: GradeSearchFormValues) => {
		const params = new URLSearchParams();

		if (values.query) {
			params.set("query", values.query);
		}

		// 検索時はページをリセット
		params.delete("page");

		const newPath = `${pathname}?${params.toString()}`;
		router.push(newPath);
	};

	// フォームをクリア
	const handleClear = () => {
		form.reset({
			query: "",
		});
		router.push(pathname);
	};

	return (
		<div className="w-full mb-6 bg-white rounded-xl border p-6 shadow-sm">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(handleSearch)} className="space-y-6">
					{/* 検索フィールド行 */}
					<div className="flex flex-col gap-4">
						{/* 検索入力フィールド */}
						<div className="w-full">
							<FormField
								control={form.control}
								name="query"
								render={({ field }) => (
									<FormItem className="w-full">
										<FormLabel className="text-sm font-medium mb-1 block">
											キーワード（グレード）
										</FormLabel>
										<FormControl>
											<div className="relative w-full">
												<SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
												<Input
													placeholder="グレード名で検索..."
													className="pl-10 w-full h-10 rounded-lg"
													{...field}
													aria-label="グレード名で検索"
												/>
											</div>
										</FormControl>
									</FormItem>
								)}
							/>
						</div>

						{/* ボタン */}
						<div className="flex gap-4">
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
