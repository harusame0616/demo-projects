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
import * as v from "valibot";
import { valibotResolver } from "@hookform/resolvers/valibot";
import {
	ArrowLeftIcon,
	SaveIcon,
	UserIcon,
	MailIcon,
	ShieldIcon,
	Check,
	ChevronsUpDown,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import type { User } from "@/app/_mocks/users";
import { cn } from "@/lib/utils";
import { useState } from "react";

// フォーム用のユーザータイプ
interface UserFormValues {
	id?: string;
	email: string;
	role: string;
	status: string;
	employeeId: string | null;
}

// フォームのバリデーションスキーマ
const formSchema = v.object({
	id: v.optional(v.string()),
	email: v.pipe(
		v.string(),
		v.minLength(1, "メールアドレスは必須です"),
		v.email("有効なメールアドレスを入力してください"),
	),
	role: v.pipe(v.string(), v.minLength(1, "権限は必須です")),
	status: v.pipe(v.string(), v.minLength(1, "ステータスは必須です")),
	employeeId: v.nullable(v.string()),
});

interface RoleOption {
	id: string;
	name: string;
}

interface StatusOption {
	id: string;
	name: string;
}

interface EmployeeOption {
	id: string;
	name: string;
}

interface UserFormProps {
	user?: Partial<UserFormValues>;
	roleOptions: RoleOption[];
	statusOptions: StatusOption[];
	employeeOptions: EmployeeOption[];
	onSubmit: (values: UserFormValues) => void;
}

export function UserForm({
	user,
	roleOptions,
	statusOptions,
	employeeOptions,
	onSubmit,
}: UserFormProps) {
	const router = useRouter();
	const isEditing = !!user?.id;

	// フォームの初期値設定
	const defaultValues: UserFormValues = {
		id: user?.id || undefined,
		email: user?.email || "",
		role: user?.role || "user",
		status: user?.status || "active",
		employeeId: user?.employeeId,
	};

	// フォーム定義
	const form = useForm<UserFormValues>({
		resolver: valibotResolver(formSchema),
		defaultValues,
	});

	// キャンセルボタンのハンドラ
	const handleCancel = () => {
		router.push("/admin/users");
	};

	// フォーム送信ハンドラ
	const handleSubmit = (values: UserFormValues) => {
		onSubmit(values);
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleSubmit)}
				className="space-y-6"
				noValidate
			>
				{/* ユーザー基本情報フォーム */}
				<Card className="shadow-sm">
					<CardHeader className="border-b bg-muted/20 pb-3">
						<CardTitle className="flex items-center gap-2 text-lg">
							<UserIcon className="h-5 w-5 text-primary" />
							ユーザー基本情報
						</CardTitle>
					</CardHeader>
					<CardContent className="pt-4">
						<div className="grid grid-cols-1 gap-6">
							{isEditing && (
								<FormField
									control={form.control}
									name="id"
									render={({ field }) => (
										<FormItem>
											<FormLabel>ユーザーID</FormLabel>
											<FormControl>
												<Input
													className="max-w-[240px]"
													{...field}
													value={field.value || ""}
													disabled
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							)}

							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>メールアドレス</FormLabel>
										<FormControl>
											<Input
												placeholder="例: user@example.com"
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
								name="role"
								render={({ field }) => (
									<FormItem>
										<FormLabel>権限</FormLabel>
										<FormControl>
											<Select
												value={field.value}
												onValueChange={field.onChange}
											>
												<SelectTrigger className="max-w-[240px]">
													<SelectValue placeholder="権限を選択" />
												</SelectTrigger>
												<SelectContent>
													{roleOptions.map((role) => (
														<SelectItem key={role.id} value={role.id}>
															{role.name}
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
								name="status"
								render={({ field }) => (
									<FormItem>
										<FormLabel>ステータス</FormLabel>
										<FormControl>
											<Select
												value={field.value}
												onValueChange={field.onChange}
											>
												<SelectTrigger className="max-w-[240px]">
													<SelectValue placeholder="ステータスを選択" />
												</SelectTrigger>
												<SelectContent>
													{statusOptions.map((status) => (
														<SelectItem key={status.id} value={status.id}>
															{status.name}
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
								name="employeeId"
								render={({ field }) => {
									const [open, setOpen] = useState(false);
									return (
										<FormItem className="flex flex-col">
											<FormLabel>紐づける従業員</FormLabel>
											<Popover open={open} onOpenChange={setOpen}>
												<PopoverTrigger asChild>
													<FormControl>
														<Button
															variant="outline"
															aria-expanded={open}
															className={cn(
																"w-[240px] justify-between",
																!field.value && "text-muted-foreground",
															)}
														>
															{field.value
																? employeeOptions.find(
																		(employee) => employee.id === field.value,
																	)?.name
																: "従業員を選択"}
															<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
														</Button>
													</FormControl>
												</PopoverTrigger>
												<PopoverContent className="w-[240px] p-0">
													<Command
														filter={(value, search) => {
															if (value === "none" && search === "") return 1;
															if (value === "none") return 0;

															const employee = employeeOptions.find(
																(e) => e.id === value,
															);
															if (!employee) return 0;

															// 名前で検索
															if (
																employee.name
																	.toLowerCase()
																	.includes(search.toLowerCase())
															) {
																return 1;
															}

															// 従業員IDで検索
															if (
																employee.id
																	.toLowerCase()
																	.includes(search.toLowerCase())
															) {
																return 1;
															}

															return 0;
														}}
													>
														<CommandInput placeholder="従業員を検索..." />
														<CommandList>
															<CommandEmpty>
																従業員が見つかりません
															</CommandEmpty>
															<CommandGroup>
																<CommandItem
																	onSelect={() => {
																		field.onChange(null);
																		setOpen(false);
																	}}
																	value="none"
																>
																	<Check
																		className={cn(
																			"mr-2 h-4 w-4",
																			!field.value
																				? "opacity-100"
																				: "opacity-0",
																		)}
																	/>
																	紐づけなし
																</CommandItem>
																{employeeOptions.map((employee) => (
																	<CommandItem
																		value={employee.id}
																		key={employee.id}
																		onSelect={() => {
																			field.onChange(employee.id);
																			setOpen(false);
																		}}
																	>
																		<Check
																			className={cn(
																				"mr-2 h-4 w-4",
																				field.value === employee.id
																					? "opacity-100"
																					: "opacity-0",
																			)}
																		/>
																		{employee.name}
																	</CommandItem>
																))}
															</CommandGroup>
														</CommandList>
													</Command>
												</PopoverContent>
											</Popover>
											<FormMessage />
										</FormItem>
									);
								}}
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
						<Link href="/admin/users">キャンセル</Link>
					</Button>
				</div>
			</form>
		</Form>
	);
}
