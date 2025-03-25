"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, SearchIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { format, parse, isValid, startOfMonth, endOfMonth } from "date-fns";
import { ja } from "date-fns/locale";
import * as z from "zod";
import { cn } from "@/lib/utils";

const formSchema = z.object({
	query: z.string().optional(),
	employeeId: z.string().optional(),
	yearMonth: z.date().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface SearchFormProps {
	onSearch: (values: FormValues) => void;
	defaultValues?: Partial<FormValues>;
}

export function SearchForm({ onSearch, defaultValues = {} }: SearchFormProps) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const [selectedYearMonth, setSelectedYearMonth] = useState<Date | undefined>(
		defaultValues.yearMonth,
	);

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			query: defaultValues.query || "",
			employeeId: defaultValues.employeeId || "",
		},
	});

	const handleSubmit = (values: FormValues) => {
		// 年月のみを使用するように変更
		const updatedValues = { ...values };

		if (values.yearMonth) {
			// 選択された年月の初日と末日を計算
			const firstDayOfMonth = startOfMonth(values.yearMonth);
			const lastDayOfMonth = endOfMonth(values.yearMonth);

			// 実際に検索に使用される値を設定する際に、startDate と endDate を追加
			(updatedValues as any).startDate = format(firstDayOfMonth, "yyyy-MM-dd");
			(updatedValues as any).endDate = format(lastDayOfMonth, "yyyy-MM-dd");
		}

		onSearch(updatedValues);
	};

	const handleReset = () => {
		form.reset({
			query: "",
			employeeId: "",
		});
		setSelectedYearMonth(undefined);

		const params = new URLSearchParams();
		params.set("page", "1");
		router.push(`${pathname}?${params.toString()}`);
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleSubmit)}
				className="space-y-4 border rounded-md p-4 bg-white"
			>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{/* 検索クエリ（従業員名またはID） */}
					<FormField
						control={form.control}
						name="query"
						render={({ field }) => (
							<FormItem>
								<FormLabel>従業員名/ID</FormLabel>
								<FormControl>
									<Input
										placeholder="従業員名または従業員IDで検索"
										{...field}
									/>
								</FormControl>
							</FormItem>
						)}
					/>

					{/* 従業員ID (完全一致) */}
					<FormField
						control={form.control}
						name="employeeId"
						render={({ field }) => (
							<FormItem>
								<FormLabel>従業員ID (完全一致)</FormLabel>
								<FormControl>
									<Input placeholder="例: E001" {...field} />
								</FormControl>
							</FormItem>
						)}
					/>

					{/* 年月選択 */}
					<FormField
						control={form.control}
						name="yearMonth"
						render={({ field }) => (
							<FormItem className="flex flex-col">
								<FormLabel>年月</FormLabel>
								<Popover>
									<PopoverTrigger asChild>
										<FormControl>
											<Button
												variant={"outline"}
												className={cn(
													"w-full pl-3 text-left font-normal",
													!field.value && "text-muted-foreground",
												)}
											>
												{field.value ? (
													format(field.value, "yyyy年MM月", {
														locale: ja,
													})
												) : (
													<span>年月を選択</span>
												)}
												<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
											</Button>
										</FormControl>
									</PopoverTrigger>
									<PopoverContent className="w-auto p-0" align="start">
										<Calendar
											mode="single"
											selected={selectedYearMonth}
											onSelect={(date) => {
												if (date) {
													// 日付を月の1日に設定して保存
													const firstDay = new Date(
														date.getFullYear(),
														date.getMonth(),
														1,
													);
													setSelectedYearMonth(firstDay);
													field.onChange(firstDay);
												} else {
													setSelectedYearMonth(undefined);
													field.onChange(undefined);
												}
											}}
											locale={ja}
											initialFocus
										/>
									</PopoverContent>
								</Popover>
							</FormItem>
						)}
					/>
				</div>

				<div className="flex items-center justify-end space-x-2">
					<Button
						type="button"
						variant="outline"
						onClick={handleReset}
						className="flex items-center gap-1"
					>
						リセット
					</Button>
					<Button type="submit" className="flex items-center gap-1">
						<SearchIcon className="w-4 h-4" />
						検索
					</Button>
				</div>
			</form>
		</Form>
	);
}
