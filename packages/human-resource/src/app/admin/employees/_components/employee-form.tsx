"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import * as v from "valibot";
import { valibotResolver } from "@hookform/resolvers/valibot";
import {
	ArrowLeftIcon,
	Check,
	ChevronsUpDown,
	PlusIcon,
	SaveIcon,
	UserIcon,
	XIcon,
	MailIcon,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { Employee } from "../_actions/employee-actions";
import { Badge } from "@/components/ui/badge";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";

// フォーム用の拡張された従業員タイプ
interface EmployeeFormValues {
	id?: string;
	name: string;
	nameKana: string;
	email: string;
	phone: string;
	address: string;
	department: string;
	position: string;
	grade: string;
	birthDate: string;
	joinDate: string;
}

// フォームのバリデーションスキーマ
const formSchema = v.object({
	id: v.optional(v.string()),
	name: v.pipe(
		v.string(),
		v.minLength(1, "氏名は必須です"),
		v.maxLength(50, "氏名は50文字以内で入力してください"),
	),
	nameKana: v.pipe(
		v.string(),
		v.minLength(1, "氏名（カナ）は必須です"),
		v.maxLength(50, "氏名（カナ）は50文字以内で入力してください"),
	),
	email: v.pipe(
		v.string(),
		v.minLength(1, "メールアドレスは必須です"),
		v.email("有効なメールアドレスを入力してください"),
	),
	phone: v.pipe(v.string(), v.minLength(1, "電話番号は必須です")),
	address: v.pipe(v.string(), v.minLength(1, "住所は必須です")),
	department: v.pipe(v.string(), v.minLength(1, "部署は必須です")),
	position: v.pipe(v.string(), v.minLength(1, "役職は必須です")),
	grade: v.string(),
	birthDate: v.pipe(v.string(), v.minLength(1, "生年月日は必須です")),
	joinDate: v.pipe(v.string(), v.minLength(1, "入社日は必須です")),
});

interface EmployeeFormProps {
	employee?: Partial<EmployeeFormValues>; // 編集時に使用する既存データ（スキル・資格を削除）
	departmentOptions: { value: string; label: string }[];
	positionOptions: { value: string; label: string }[];
	onSubmit: (values: EmployeeFormValues) => void; // スキル・資格を削除
}

// スキルと資格の選択肢の定義は削除可能ですが、他で参照されている可能性があるため残しておきます

export function EmployeeForm({
	employee,
	departmentOptions,
	positionOptions,
	onSubmit,
}: EmployeeFormProps) {
	const router = useRouter();
	const isEditing = !!employee?.id;

	// フォームの初期値設定
	const defaultValues: EmployeeFormValues = {
		id: employee?.id || undefined,
		name: employee?.name || "",
		nameKana: employee?.nameKana || "",
		email: employee?.email || "",
		phone: employee?.phone || "",
		address: employee?.address || "",
		department: employee?.department || "",
		position: employee?.position || "",
		grade: employee?.grade || "",
		birthDate: employee?.birthDate || "",
		joinDate: employee?.joinDate || new Date().toISOString().split("T")[0], // 今日の日付をデフォルト値に
	};

	// フォーム定義
	const form = useForm<EmployeeFormValues>({
		resolver: valibotResolver(formSchema),
		defaultValues,
	});

	// キャンセルボタンのハンドラ
	const handleCancel = () => {
		router.push("/admin/employees");
	};

	// フォーム送信ハンドラ
	const handleSubmit = (values: EmployeeFormValues) => {
		onSubmit(values); // スキル・資格を削除
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleSubmit)}
				className="space-y-6"
				noValidate
			>
				{/* 基本情報フォーム */}
				<Card className="shadow-sm">
					<CardHeader className="border-b bg-muted/20 pb-3">
						<CardTitle className="flex items-center gap-2 text-lg">
							<UserIcon className="h-5 w-5 text-primary" />
							基本情報の編集
						</CardTitle>
					</CardHeader>
					<CardContent className="pt-4">
						<div className="grid grid-cols-1 gap-6">
							<FormField
								control={form.control}
								name="id"
								render={({ field }) => (
									<FormItem>
										<FormLabel>従業員コード</FormLabel>
										<FormControl>
											<Input
												className="max-w-[240px]"
												placeholder="例: E001"
												{...field}
												value={field.value || ""}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>氏名</FormLabel>
										<FormControl>
											<Input
												placeholder="例: 山田 太郎"
												className="max-w-md"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="nameKana"
								render={({ field }) => (
									<FormItem>
										<FormLabel>氏名（カナ）</FormLabel>
										<FormControl>
											<Input
												placeholder="例: ヤマダ タロウ"
												className="max-w-md"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="department"
								render={({ field }) => (
									<FormItem>
										<FormLabel>部署</FormLabel>
										<FormControl>
											<Select
												value={field.value}
												onValueChange={field.onChange}
											>
												<SelectTrigger className="max-w-[240px]">
													<SelectValue placeholder="部署を選択" />
												</SelectTrigger>
												<SelectContent>
													{departmentOptions
														.filter((option) => option.value !== "all")
														.map((option) => (
															<SelectItem
																key={option.value}
																value={option.value}
															>
																{option.label}
															</SelectItem>
														))}
												</SelectContent>
											</Select>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="position"
								render={({ field }) => (
									<FormItem>
										<FormLabel>役職</FormLabel>
										<FormControl>
											<Select
												value={field.value}
												onValueChange={field.onChange}
											>
												<SelectTrigger className="max-w-[240px]">
													<SelectValue placeholder="役職を選択" />
												</SelectTrigger>
												<SelectContent>
													{positionOptions
														.filter((option) => option.value !== "all")
														.map((option) => (
															<SelectItem
																key={option.value}
																value={option.value}
															>
																{option.label}
															</SelectItem>
														))}
												</SelectContent>
											</Select>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="grade"
								render={({ field }) => (
									<FormItem>
										<FormLabel>グレード</FormLabel>
										<FormControl>
											<Select
												value={field.value}
												onValueChange={field.onChange}
											>
												<SelectTrigger className="max-w-[240px]">
													<SelectValue placeholder="グレードを選択" />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value="G1">G1</SelectItem>
													<SelectItem value="G2">G2</SelectItem>
													<SelectItem value="G3">G3</SelectItem>
													<SelectItem value="G4">G4</SelectItem>
													<SelectItem value="G5">G5</SelectItem>
												</SelectContent>
											</Select>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="joinDate"
								render={({ field }) => (
									<FormItem>
										<FormLabel>入社日</FormLabel>
										<FormControl>
											<Input type="date" className="max-w-[240px]" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="birthDate"
								render={({ field }) => (
									<FormItem>
										<FormLabel>生年月日</FormLabel>
										<FormControl>
											<Input type="date" className="max-w-[240px]" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</CardContent>
				</Card>

				{/* 連絡先情報フォーム */}
				<Card className="shadow-sm">
					<CardHeader className="border-b bg-muted/20 pb-3">
						<CardTitle className="flex items-center gap-2 text-lg">
							<MailIcon className="h-5 w-5 text-primary" />
							連絡先情報
						</CardTitle>
					</CardHeader>
					<CardContent className="pt-4">
						<div className="grid grid-cols-1 gap-6">
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>メールアドレス</FormLabel>
										<FormControl>
											<Input
												type="email"
												placeholder="例: taro.yamada@example.com"
												className="max-w-md"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="phone"
								render={({ field }) => (
									<FormItem>
										<FormLabel>電話番号</FormLabel>
										<FormControl>
											<Input
												type="tel"
												placeholder="例: 090-1234-5678"
												className="max-w-[240px]"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="address"
								render={({ field }) => (
									<FormItem>
										<FormLabel>住所</FormLabel>
										<FormControl>
											<Input
												placeholder="例: 東京都渋谷区渋谷1-1-1"
												className="max-w-md"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</CardContent>
				</Card>

				<div className="flex justify-start pt-4 gap-2">
					<Button type="submit">
						<SaveIcon className="h-4 w-4 mr-2" />
						{isEditing ? "更新" : "登録"}
					</Button>
					<Button variant="outline" asChild>
						<Link
							href={
								employee?.id
									? `/admin/employees/${employee?.id}`
									: "/admin/employees"
							}
						>
							キャンセル
						</Link>
					</Button>
				</div>
			</form>
		</Form>
	);
}
