"use client";

import * as v from "valibot";

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
import type { EmployeeSearchQuery } from "../search-query";

// フォームのスキーマを定義
const schema = v.object(
	{
		query: v.string(),
		department: v.string(),
		position: v.string(),
	},
	"検索フォームの入力が不正です",
);

interface Option {
	id: string;
	name: string;
}

interface Props {
	departments: Option[];
	positions: Option[];
	searchQuery: EmployeeSearchQuery;
}

export function SearchFormPresenter({
	departments,
	positions,
	searchQuery,
}: Props) {
	const searchForm = useSearchForm(schema, searchQuery, {
		query: "",
		department: "all",
		position: "all",
	});

	return (
		<SearchForm {...searchForm}>
			<FormField
				control={searchForm.form.control}
				name="query"
				render={({ field }) => (
					<FormItem className="col-span-4 sm:col-span-2">
						<FormLabel>キーワード（名前、ID）</FormLabel>
						<FormControl>
							<Input className="h-10 rounded-lg border-gray-200" {...field} />
						</FormControl>
					</FormItem>
				)}
			/>

			<FormField
				control={searchForm.form.control}
				name="department"
				render={({ field }) => (
					<FormItem className="col-span-4 sm:col-span-1">
						<FormLabel>部署</FormLabel>
						<Select onValueChange={field.onChange} value={field.value}>
							<FormControl>
								<SelectTrigger className="h-10 border-gray-200 w-full min-h-10 overflow-hidden">
									<SelectValue placeholder="すべての部署" />
								</SelectTrigger>
							</FormControl>
							<SelectContent>
								{departments.map((department) => (
									<SelectItem key={department.id} value={department.id}>
										{department.name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</FormItem>
				)}
			/>

			<FormField
				control={searchForm.form.control}
				name="position"
				render={({ field }) => (
					<FormItem className="col-span-4 sm:col-span-1">
						<FormLabel>ポジション</FormLabel>
						<Select onValueChange={field.onChange} value={field.value}>
							<FormControl>
								<SelectTrigger className="h-10 border-gray-200 w-full min-h-10 overflow-hidden">
									<SelectValue placeholder="すべてのポジション" />
								</SelectTrigger>
							</FormControl>
							<SelectContent>
								{positions.map((position) => (
									<SelectItem key={position.id} value={position.id}>
										{position.name}
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
