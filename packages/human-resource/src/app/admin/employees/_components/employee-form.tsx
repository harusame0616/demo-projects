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
	XIcon,
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
	employee?: Partial<EmployeeFormValues> & {
		skills?: string[];
		certifications?: string[];
	}; // 編集時に使用する既存データ
	departmentOptions: { value: string; label: string }[];
	positionOptions: { value: string; label: string }[];
	onSubmit: (
		values: EmployeeFormValues & { skills: string[]; certifications: string[] },
	) => void;
}

// スキルと資格の選択肢
const SKILL_OPTIONS = [
	"HTML/CSS",
	"JavaScript",
	"TypeScript",
	"React",
	"Next.js",
	"Node.js",
	"Express",
	"SQL",
	"Python",
	"Java",
	"C#",
	"PHP",
	"Laravel",
	"Docker",
	"AWS",
	"Azure",
	"GCP",
	"Excel",
	"PowerPoint",
	"Word",
	"UI/UXデザイン",
	"Figma",
	"Adobe XD",
	"Photoshop",
	"Illustrator",
	"動画編集",
	"営業",
	"マーケティング",
	"企画",
	"プロジェクト管理",
];

const CERTIFICATION_OPTIONS = [
	"TOEIC 600点",
	"TOEIC 730点",
	"TOEIC 800点",
	"TOEIC 900点",
	"英検2級",
	"英検準1級",
	"英検1級",
	"日商簿記3級",
	"日商簿記2級",
	"日商簿記1級",
	"基本情報技術者",
	"応用情報技術者",
	"ネットワークスペシャリスト",
	"データベーススペシャリスト",
	"情報セキュリティスペシャリスト",
	"プロジェクトマネージャ",
	"AWS認定ソリューションアーキテクト",
	"Google Cloud認定プロフェッショナル",
	"Microsoft認定ソリューションアーキテクト",
	"PMP",
	"ITIL",
	"Oracle認定Java資格",
	"Cisco認定資格",
	"営業士2級",
	"マーケティング検定",
	"簿記検定",
];

export function EmployeeForm({
	employee,
	departmentOptions,
	positionOptions,
	onSubmit,
}: EmployeeFormProps) {
	const router = useRouter();
	const isEditing = !!employee?.id;

	// スキル・資格の状態管理
	const [skills, setSkills] = useState<string[]>(employee?.skills || []);
	const [certifications, setCertifications] = useState<string[]>(
		employee?.certifications || [],
	);
	const [newSkill, setNewSkill] = useState("");
	const [newCertification, setNewCertification] = useState("");

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

	// スキルの追加
	const handleAddSkill = () => {
		if (newSkill && !skills.includes(newSkill)) {
			setSkills([...skills, newSkill]);
			setNewSkill("");
		}
	};

	// スキルの削除
	const handleRemoveSkill = (skillToRemove: string) => {
		setSkills(skills.filter((skill) => skill !== skillToRemove));
	};

	// 資格の追加
	const handleAddCertification = () => {
		if (newCertification && !certifications.includes(newCertification)) {
			setCertifications([...certifications, newCertification]);
			setNewCertification("");
		}
	};

	// 資格の削除
	const handleRemoveCertification = (certToRemove: string) => {
		setCertifications(certifications.filter((cert) => cert !== certToRemove));
	};

	// キャンセルボタンのハンドラ
	const handleCancel = () => {
		router.push("/admin/employees");
	};

	// フォーム送信ハンドラ
	const handleSubmit = (values: EmployeeFormValues) => {
		onSubmit({ ...values, skills, certifications });
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
						<CardTitle className="text-lg">基本情報</CardTitle>
					</CardHeader>
					<CardContent className="pt-4">
						<div className="grid grid-cols-1 gap-6">
							{isEditing && (
								<FormField
									control={form.control}
									name="id"
									render={({ field }) => (
										<FormItem>
											<FormLabel>社員ID</FormLabel>
											<FormControl>
												<Input
													className="max-w-[240px]"
													disabled
													{...field}
													value={field.value || ""}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							)}

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
						<CardTitle className="text-lg">連絡先情報</CardTitle>
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

				{/* スキル・資格情報 */}
				<Card className="shadow-sm">
					<CardHeader className="border-b bg-muted/20 pb-3">
						<CardTitle className="text-lg">スキル・資格</CardTitle>
					</CardHeader>
					<CardContent className="pt-4">
						<div className="grid grid-cols-1 gap-6">
							{/* スキル入力 */}
							<div className="space-y-2">
								<FormLabel>スキル</FormLabel>
								<div className="flex gap-2">
									<Popover>
										<PopoverTrigger asChild>
											<Button
												variant="outline"
												aria-expanded={true}
												className="w-full max-w-md justify-between"
											>
												{newSkill
													? SKILL_OPTIONS.find((skill) => skill === newSkill)
													: "スキルを選択"}
												<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
											</Button>
										</PopoverTrigger>
										<PopoverContent className="w-full max-w-md p-0">
											<Command>
												<CommandInput placeholder="スキルを検索..." />
												<CommandEmpty>見つかりませんでした</CommandEmpty>
												<CommandList>
													<CommandGroup>
														{SKILL_OPTIONS.filter(
															(skill) => !skills.includes(skill),
														).map((skill) => (
															<CommandItem
																key={skill}
																value={skill}
																onSelect={() => {
																	if (!skills.includes(skill)) {
																		setSkills([...skills, skill]);
																	}
																	setNewSkill("");
																}}
															>
																<Check
																	className={cn(
																		"mr-2 h-4 w-4",
																		newSkill === skill
																			? "opacity-100"
																			: "opacity-0",
																	)}
																/>
																{skill}
															</CommandItem>
														))}
													</CommandGroup>
												</CommandList>
											</Command>
										</PopoverContent>
									</Popover>
								</div>
								<div className="flex flex-wrap gap-2 mt-2">
									{skills.map((skill) => (
										<Badge key={skill} variant="secondary" className="pl-2">
											{skill}
											<Button
												type="button"
												size="sm"
												variant="ghost"
												className="h-5 w-5 p-0 ml-1"
												onClick={() => handleRemoveSkill(skill)}
											>
												<XIcon className="h-3 w-3" />
											</Button>
										</Badge>
									))}
								</div>
							</div>

							{/* 資格入力 */}
							<div className="space-y-2">
								<FormLabel>資格</FormLabel>
								<div className="flex gap-2">
									<Popover>
										<PopoverTrigger asChild>
											<Button
												variant="outline"
												aria-expanded={true}
												className="w-full max-w-md justify-between"
											>
												{newCertification
													? CERTIFICATION_OPTIONS.find(
															(cert) => cert === newCertification,
														)
													: "資格を選択"}
												<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
											</Button>
										</PopoverTrigger>
										<PopoverContent className="w-full max-w-md p-0">
											<Command>
												<CommandInput placeholder="資格を検索..." />
												<CommandEmpty>見つかりませんでした</CommandEmpty>
												<CommandList>
													<CommandGroup>
														{CERTIFICATION_OPTIONS.filter(
															(cert) => !certifications.includes(cert),
														).map((cert) => (
															<CommandItem
																key={cert}
																value={cert}
																onSelect={() => {
																	if (!certifications.includes(cert)) {
																		setCertifications([
																			...certifications,
																			cert,
																		]);
																	}
																	setNewCertification("");
																}}
															>
																<Check
																	className={cn(
																		"mr-2 h-4 w-4",
																		newCertification === cert
																			? "opacity-100"
																			: "opacity-0",
																	)}
																/>
																{cert}
															</CommandItem>
														))}
													</CommandGroup>
												</CommandList>
											</Command>
										</PopoverContent>
									</Popover>
								</div>
								<div className="flex flex-wrap gap-2 mt-2">
									{certifications.map((cert) => (
										<Badge key={cert} variant="secondary" className="pl-2">
											{cert}
											<Button
												type="button"
												size="sm"
												variant="ghost"
												className="h-5 w-5 p-0 ml-1"
												onClick={() => handleRemoveCertification(cert)}
											>
												<XIcon className="h-3 w-3" />
											</Button>
										</Badge>
									))}
								</div>
							</div>
						</div>
					</CardContent>
				</Card>

				<div className="flex justify-start pt-4 gap-2">
					<Button type="submit">
						<SaveIcon className="h-4 w-4 mr-2" />
						{isEditing ? "更新" : "登録"}
					</Button>
					<Button type="button" variant="outline" onClick={handleCancel}>
						キャンセル
					</Button>
				</div>
			</form>
		</Form>
	);
}
