"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import { SearchIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import * as v from "valibot";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

// フォームのスキーマを定義
const departmentFilterSchema = v.object({
	query: v.string(),
});

type DepartmentFilterFormValues = v.InferInput<typeof departmentFilterSchema>;

interface SearchFormPresenterProps {
	defaultValue: string;
	isLoading?: boolean;
}

export function SearchFormPresenter({
	defaultValue = "",
	isLoading = false,
}: SearchFormPresenterProps) {
	const router = useRouter();

	// フォームの初期値を設定
	const defaultValues: DepartmentFilterFormValues = {
		query: defaultValue,
	};

	// フォームを初期化
	const form = useForm<DepartmentFilterFormValues>({
		resolver: valibotResolver(departmentFilterSchema),
		defaultValues,
	});

	// 外部からのpropsが変更されたらフォームの値をリセット
	useEffect(() => {
		form.reset({
			query: defaultValue || "",
		});
	}, [defaultValue, form]);

	// 検索処理
	const handleSearch = async (values: DepartmentFilterFormValues) => {
		const searchParams = new URLSearchParams();

		if (values.query) {
			searchParams.set("query", values.query);
		}

		searchParams.toString();

		// router.pushを使用して検索を実行
		router.push(`/admin/departments?${searchParams}`);
	};

	// フォームをクリア
	const handleClear = async () => {
		form.reset({
			query: "",
		});
	};

	return (
		<Card>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(handleSearch)}>
						<div className="grid grid-cols-4 gap-4">
							<FormField
								control={form.control}
								name="query"
								render={({ field }) => (
									<FormItem className="col-span-4 sm:col-span-2">
										<FormLabel>キーワード（部署名）</FormLabel>
										<FormControl>
											<Input
												className="h-10 rounded-lg border-gray-200"
												{...field}
												aria-label="部署名で検索"
												disabled={isLoading}
											/>
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
						</div>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
