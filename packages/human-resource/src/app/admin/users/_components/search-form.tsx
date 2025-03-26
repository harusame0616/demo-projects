"use client";

import { useRouter, usePathname } from "next/navigation";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useForm } from "react-hook-form";
import * as v from "valibot";

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
import { Card, CardContent } from "@/components/ui/card";
import { SearchIcon } from "lucide-react";

// 検索フォームのスキーマ
const searchFormSchema = v.object({
	query: v.optional(v.string()),
	role: v.optional(v.string()),
	status: v.optional(v.string()),
});

type SearchFormValues = v.Input<typeof searchFormSchema>;

interface RoleOption {
	id: string;
	name: string;
}

interface StatusOption {
	id: string;
	name: string;
}

interface SearchFormProps {
	roleOptions: RoleOption[];
	statusOptions: StatusOption[];
	searchQuery?: string;
	currentRole?: string;
	currentStatus?: string;
}

export function SearchForm({
	roleOptions,
	statusOptions,
	searchQuery = "",
	currentRole = "all",
	currentStatus = "all",
}: SearchFormProps) {
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
						className="grid grid-cols-1 md:grid-cols-4 gap-4"
					>
						<FormField
							control={form.control}
							name="query"
							render={({ field }) => (
								<FormItem className="col-span-2">
									<FormLabel>
										キーワード（名前、メールアドレス、従業員コード）
									</FormLabel>
									<FormControl>
										<div className="relative w-full">
											<SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
											<Input
												placeholder="名前、メールアドレス、従業員コードで検索"
												className="pl-10 h-10 rounded-lg border-gray-200"
												{...field}
												value={field.value || ""}
											/>
										</div>
									</FormControl>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="role"
							render={({ field }) => (
								<FormItem>
									<FormLabel>権限</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger className="h-10 border-gray-200 w-full min-h-10">
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
								<FormItem>
									<FormLabel>ステータス</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger className="h-10 border-gray-200 w-full min-h-10">
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

						<div className="col-span-4 flex gap-2">
							<Button type="submit" className="h-10 w-24">
								検索
							</Button>
							<Button
								type="button"
								variant="outline"
								className="h-10 w-24"
								onClick={clearFilters}
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
