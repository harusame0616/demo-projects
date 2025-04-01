"use client";

import { useSearchForm } from "@/components/common/use-search-form";

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
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { type SearchQuery, searchParamsQuerySchema } from "../search-query";
import { ApplicationStatusLabel, ApplicationTypeLabel } from "../application";

interface Params {
	searchQuery: SearchQuery;
}

export function SearchFormPresenter({ searchQuery }: Params) {
	const searchForm = useSearchForm(searchParamsQuerySchema, searchQuery, {
		query: "",
		type: "all",
		status: "all",
		date: "",
	});

	return (
		<SearchForm {...searchForm}>
			<FormField
				name="query"
				control={searchForm.form.control}
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
				control={searchForm.form.control}
				render={({ field }) => (
					<FormItem className="col-span-4 sm:col-span-1">
						<FormLabel>申請種別</FormLabel>
						<Select onValueChange={field.onChange} value={field.value}>
							<FormControl>
								<SelectTrigger className="h-10 border-gray-200 w-full min-h-10 overflow-hidden">
									<SelectValue />
								</SelectTrigger>
							</FormControl>
							<SelectContent>
								<SelectItem value="all">すべて</SelectItem>
								{Object.entries(ApplicationTypeLabel).map(([key, label]) => (
									<SelectItem key={key} value={key}>
										{label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</FormItem>
				)}
			/>

			<FormField
				name="status"
				control={searchForm.form.control}
				render={({ field }) => (
					<FormItem className="col-span-4 sm:col-span-1">
						<FormLabel>ステータス</FormLabel>
						<Select onValueChange={field.onChange} value={field.value}>
							<FormControl>
								<SelectTrigger className="h-10 border-gray-200 w-full min-h-10 overflow-hidden">
									<SelectValue />
								</SelectTrigger>
							</FormControl>
							<SelectContent>
								<SelectItem value="all">すべて</SelectItem>
								{Object.entries(ApplicationStatusLabel).map(([key, label]) => (
									<SelectItem key={key} value={key}>
										{label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</FormItem>
				)}
			/>

			<FormField
				name="date"
				control={searchForm.form.control}
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
