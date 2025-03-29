"use client";

import { useSearchForm } from "@/components/common/use-search-form";
import * as v from "valibot";

import { SearchForm } from "@/components/common/search-form";
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
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

// フォームのスキーマ定義
const schema = v.object({
	query: v.optional(v.string()),
	type: v.optional(v.string()),
	status: v.optional(v.string()),
	date: v.optional(v.string()),
});

interface SearchFormPresenterProps {
	defaultQuery?: {
		query?: string;
		type?: string;
		status?: string;
		date?: string;
	};
}

export function SearchFormPresenter({
	defaultQuery,
}: SearchFormPresenterProps) {
	const searchForm = useSearchForm(
		schema,
		{
			query: defaultQuery?.query || "",
			type: defaultQuery?.type || "all",
			status: defaultQuery?.status || "all",
			date: defaultQuery?.date || "",
		},
		{
			query: "",
			type: "all",
			status: "all",
			date: "",
		},
	);

	return (
		<SearchForm {...searchForm}>
			<FormField
				name="query"
				render={({ field }) => (
					<FormItem className="col-span-4 sm:col-span-2">
						<FormLabel>検索キーワード</FormLabel>
						<FormControl>
							<Input
								placeholder="社員名または内容で検索"
								{...field}
								value={field.value || ""}
							/>
						</FormControl>
					</FormItem>
				)}
			/>

			<FormField
				name="type"
				render={({ field }) => (
					<FormItem className="col-span-4 sm:col-span-1">
						<FormLabel>申請種別</FormLabel>
						<Select onValueChange={field.onChange} value={field.value}>
							<FormControl>
								<SelectTrigger className="h-10 border-gray-200 w-full min-h-10 overflow-hidden">
									<SelectValue placeholder="すべての種別" />
								</SelectTrigger>
							</FormControl>
							<SelectContent>
								<SelectItem value="all">すべての種別</SelectItem>
								<SelectItem value="vacation">休暇申請</SelectItem>
								<SelectItem value="overtime">残業申請</SelectItem>
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
								<SelectItem value="pending">承認待ち</SelectItem>
								<SelectItem value="approved">承認済み</SelectItem>
								<SelectItem value="rejected">却下</SelectItem>
							</SelectContent>
						</Select>
					</FormItem>
				)}
			/>

			<FormField
				name="date"
				render={({ field }) => (
					<FormItem className="col-span-4 sm:col-span-1">
						<FormLabel>申請日</FormLabel>
						<FormControl>
							<Input type="month" {...field} value={field.value || ""} />
						</FormControl>
					</FormItem>
				)}
			/>
		</SearchForm>
	);
}
