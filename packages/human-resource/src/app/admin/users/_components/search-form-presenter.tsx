"use client";

import { valibotResolver } from "@hookform/resolvers/valibot";
import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as v from "valibot";

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
import { SearchIcon } from "lucide-react";

// 検索フォームのスキーマ
const searchFormSchema = v.object({
	query: v.optional(v.string()),
	role: v.optional(v.string()),
	status: v.optional(v.string()),
});

type SearchFormValues = v.InferInput<typeof searchFormSchema>;

interface RoleOption {
	id: string;
	name: string;
}

interface StatusOption {
	id: string;
	name: string;
}

interface SearchFormPresenterProps {
	roleOptions: RoleOption[];
	statusOptions: StatusOption[];
	searchQuery?: string;
	currentRole?: string;
	currentStatus?: string;
}

export function SearchFormPresenter({
	roleOptions,
	statusOptions,
	searchQuery = "",
	currentRole = "all",
	currentStatus = "all",
}: SearchFormPresenterProps) {
	const router = useRouter();
	const pathname = usePathname();

	// フォームの初期値を設定
	const form = useForm<SearchFormValues>({
		resolver: valibotResolver(searchFormSchema),
		defaultValues: {
			query: searchQuery,
			role: currentRole,
			status: currentStatus,
		},
	});

	// 検索ハンドラー
	const onSubmit = (values: SearchFormValues) => {
		// 検索クエリを構築
		const params = new URLSearchParams();

		if (values.query) {
			params.set("query", values.query);
		}

		if (values.role && values.role !== "all") {
			params.set("role", values.role);
		}

		if (values.status && values.status !== "all") {
			params.set("status", values.status);
		}

		// ページング情報をリセット
		params.set("page", "1");

		// 現在のURLに検索クエリを追加して遷移
		router.push(`${pathname}?${params.toString()}`);
	};

	// フィルターをクリア
	const clearFilters = () => {
		form.reset({
			query: "",
			role: "all",
			status: "all",
		});

		router.push(pathname);
	};

	return (
		<Card>
			<CardContent>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="grid grid-cols-4 gap-4"
					>
						<FormField
							control={form.control}
							name="query"
							render={({ field }) => (
								<FormItem className="col-span-4 sm:col-span-2">
									<FormLabel>
										キーワード（名前、メールアドレス、従業員コード）
									</FormLabel>
									<FormControl>
										<Input
											className="h-10 rounded-lg border-gray-200"
											{...field}
											value={field.value || ""}
										/>
									</FormControl>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="role"
							render={({ field }) => (
								<FormItem className="col-span-4 sm:col-span-1">
									<FormLabel>権限</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger
												className="h-10 border-gray-200 w-full min-h-10 overflow-hidden"
												disabled={roleOptions.length === 0}
											>
												<SelectValue placeholder="すべての権限" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value="all">すべての権限</SelectItem>
											{roleOptions.map((role) => (
												<SelectItem key={role.id} value={role.id}>
													{role.name}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="status"
							render={({ field }) => (
								<FormItem className="col-span-4 sm:col-span-1">
									<FormLabel>ステータス</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger
												className="h-10 border-gray-200 w-full min-h-10 overflow-hidden"
												disabled={roleOptions.length === 0}
											>
												<SelectValue placeholder="すべてのステータス" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value="all">すべてのステータス</SelectItem>
											{statusOptions.map((status) => (
												<SelectItem key={status.id} value={status.id}>
													{status.name}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</FormItem>
							)}
						/>

						<div className="col-span-4 flex gap-2 flex-wrap">
							<Button
								type="submit"
								className="h-10 sm:max-w-32 w-full"
								disabled={
									roleOptions.length === 0 && statusOptions.length === 0
								}
							>
								検索
							</Button>
							<Button
								type="button"
								variant="outline"
								className="h-10 sm:max-w-32 w-full"
								onClick={clearFilters}
								disabled={
									roleOptions.length === 0 && statusOptions.length === 0
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
