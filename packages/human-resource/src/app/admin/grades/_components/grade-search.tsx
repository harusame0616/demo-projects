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
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as v from "valibot";
import { valibotResolver } from "@hookform/resolvers/valibot";

// フォームのスキーマを定義
const gradeSearchSchema = v.object({
	query: v.string(),
});

type GradeSearchFormValues = v.InferType<typeof gradeSearchSchema>;

interface GradeSearchProps {
	initialQuery?: string;
}

export function GradeSearch({ initialQuery = "" }: GradeSearchProps) {
	const router = useRouter();
	const pathname = usePathname();
	const params = useSearchParams();

	// フォームの初期値を設定
	const defaultValues: GradeSearchFormValues = {
		query: initialQuery,
	};

	// フォームを初期化
	const form = useForm<GradeSearchFormValues>({
		resolver: valibotResolver(gradeSearchSchema),
		defaultValues,
	});

	// 外部からのpropsが変更されたらフォームの値をリセット
	useEffect(() => {
		form.reset({
			query: initialQuery,
		});
	}, [initialQuery, form]);

	// 検索ハンドラー
	const handleSearch = (values: GradeSearchFormValues) => {
		const updatedParams = new URLSearchParams(params.toString());
		if (values.query) {
			updatedParams.set("query", values.query);
		} else {
			updatedParams.delete("query");
		}
		// 検索時はページをリセット
		updatedParams.delete("page");
		router.push(`${pathname}?${updatedParams.toString()}`);
	};

	// クリアハンドラー
	const handleClear = () => {
		form.reset({
			query: "",
		});

		const updatedParams = new URLSearchParams(params.toString());
		updatedParams.delete("query");
		updatedParams.delete("page"); // ページもリセット
		router.push(`${pathname}?${updatedParams.toString()}`);
	};

	return (
		<div className="w-full mb-4 bg-white rounded-3xl shadow-sm p-4">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(handleSearch)} className="w-full">
					<div className="flex flex-col space-y-4">
						<FormField
							control={form.control}
							name="query"
							render={({ field }) => (
								<FormItem className="flex-1 min-w-[200px]">
									<FormLabel className="text-sm font-medium mb-1 block">
										キーワード（グレード）
									</FormLabel>
									<FormControl>
										<div className="relative w-full">
											<SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
											<Input
												placeholder="グレードを検索..."
												className="pl-10 h-10 rounded-lg border-gray-200"
												{...field}
												aria-label="グレードを検索"
											/>
										</div>
									</FormControl>
								</FormItem>
							)}
						/>

						<div className="flex gap-4 justify-end">
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
						</div>
					</div>
				</form>
			</Form>
		</div>
	);
}
