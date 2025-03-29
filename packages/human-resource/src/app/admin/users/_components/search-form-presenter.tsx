"use client";

import * as v from "valibot";

import { userRoles, userStatuses } from "@/app/_mocks/users";
import { SearchForm } from "@/components/common/search-form";
import { useSearchForm } from "@/components/common/use-search-form";
import {
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
// 検索フォームのスキーマ
const schema = v.object(
	{
		query: v.pipe(v.string()),
		role: v.optional(v.string()),
		status: v.optional(v.string()),
	},
	"検索フォームの入力が不正です",
);

interface SearchFormPresenterProps {
	searchQuery?: string;
	currentRole?: string;
	currentStatus?: string;
}

export function SearchFormPresenter({
	searchQuery = "",
	currentRole = "all",
	currentStatus = "all",
}: SearchFormPresenterProps) {
	const searchForm = useSearchForm(
		schema,
		{
			query: searchQuery,
			role: currentRole,
			status: currentStatus,
		},
		{
			query: "",
			role: "all",
			status: "all",
		},
	);
	return (
		<SearchForm {...searchForm}>
			<FormField
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
				name="role"
				render={({ field }) => (
					<FormItem className="col-span-4 sm:col-span-1">
						<FormLabel>権限</FormLabel>
						<Select onValueChange={field.onChange} value={field.value}>
							<FormControl>
								<SelectTrigger className="h-10 border-gray-200 w-full min-h-10 overflow-hidden">
									<SelectValue placeholder="すべての権限" />
								</SelectTrigger>
							</FormControl>
							<SelectContent>
								<SelectItem value="all">すべての権限</SelectItem>
								{userRoles.map((role) => (
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
				name="status"
				render={({ field }) => (
					<FormItem className="col-span-4 sm:col-span-1">
						<FormLabel>ステータス</FormLabel>
						<Select onValueChange={field.onChange} value={field.value}>
							<FormControl>
								<SelectTrigger className="h-10 border-gray-200 w-full min-h-10 overflow-hidden">
									<SelectValue placeholder="すべてのステータス" />
								</SelectTrigger>
							</FormControl>
							<SelectContent>
								<SelectItem value="all">すべてのステータス</SelectItem>
								{userStatuses.map((status) => (
									<SelectItem key={status.id} value={status.id}>
										{status.name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</FormItem>
				)}
			/>
		</SearchForm>
	);
}
