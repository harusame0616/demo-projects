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

// フォームのスキーマを定義
const schema = v.object(
	{
		query: v.optional(v.string()),
		departmentId: v.optional(v.string()),
		startYearMonth: v.optional(v.string()),
		endYearMonth: v.optional(v.string()),
	},
	"検索フォームの入力が不正です",
);

interface Department {
	id: string;
	name: string;
}

interface SearchFormPresenterProps {
	defaultValues?: {
		query?: string;
		departmentId?: string;
		startYearMonth?: string;
		endYearMonth?: string;
	};
	departments?: Department[];
	isLoading?: boolean;
}

export function SearchFormPresenter({
	defaultValues = {},
	departments = [],
	isLoading = false,
}: SearchFormPresenterProps) {
	const searchForm = useSearchForm(schema, defaultValues, {
		query: "",
		departmentId: "all",
		startYearMonth: "",
		endYearMonth: "",
	});
	return (
		<SearchForm {...searchForm}>
			<FormField
				name="query"
				control={searchForm.form.control}
				render={({ field }) => (
					<FormItem className="col-span-4 sm:col-span-2">
						<FormLabel>キーワード（名前、ID）</FormLabel>
						<FormControl>
							<Input
								placeholder="従業員名または従業員IDで検索"
								{...field}
								disabled={isLoading}
							/>
						</FormControl>
					</FormItem>
				)}
			/>

			<FormField
				name="departmentId"
				control={searchForm.form.control}
				render={({ field }) => (
					<FormItem className="col-span-4 sm:col-span-1">
						<FormLabel>部署</FormLabel>
						<Select
							onValueChange={field.onChange}
							value={field.value}
							disabled={isLoading}
						>
							<FormControl>
								<SelectTrigger
									className="w-full overflow-hidden"
									value={field.value}
								>
									<SelectValue placeholder="部署を選択" />
								</SelectTrigger>
							</FormControl>
							<SelectContent>
								<SelectItem value="all">すべて</SelectItem>
								{departments?.map((department) => (
									<SelectItem key={department.id} value={department.id}>
										{department.name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</FormItem>
				)}
			/>
			{/* 開始年月日と終了年月日を２行目に揃えるための空グリッド */}
			<div />

			<FormField
				name="startYearMonth"
				control={searchForm.form.control}
				render={({ field }) => (
					<FormItem className="col-span-4 sm:col-span-1">
						<FormLabel>開始年月</FormLabel>
						<FormControl>
							<Input type="month" {...field} disabled={isLoading} />
						</FormControl>
					</FormItem>
				)}
			/>

			<FormField
				name="endYearMonth"
				control={searchForm.form.control}
				render={({ field }) => (
					<FormItem className="col-span-4 sm:col-span-1">
						<FormLabel>終了年月</FormLabel>
						<FormControl>
							<Input type="month" {...field} disabled={isLoading} />
						</FormControl>
					</FormItem>
				)}
			/>
		</SearchForm>
	);
}
