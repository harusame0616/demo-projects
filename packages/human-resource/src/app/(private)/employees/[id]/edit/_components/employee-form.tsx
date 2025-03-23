"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, SaveIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

type Employee = {
	id: string;
	name: string;
	nameKana: string;
	department: string;
	position: string;
	grade: string;
	email: string;
	phone: string;
	address: string;
	birthDate: string;
	joinDate: string;
	skills?: string[];
	certifications?: string[];
};

type EmployeeFormProps = {
	employee: Employee;
};

export function EmployeeForm({ employee }: EmployeeFormProps) {
	// React Hook Formの設定
	const form = useForm<Employee>({
		defaultValues: { ...employee },
	});

	// スキル・資格の状態管理
	const [skills, setSkills] = useState<string[]>(employee.skills || []);
	const [certifications, setCertifications] = useState<string[]>(
		employee.certifications || [],
	);
	const [newSkill, setNewSkill] = useState("");
	const [newCertification, setNewCertification] = useState("");

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

	// フォーム送信
	const onSubmit = (data: Employee) => {
		// 実際の処理は実装不要
		console.log("送信データ:", { ...data, skills, certifications });
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				{/* 基本情報フォーム */}
				<Card className="shadow-sm">
					<CardHeader className="border-b bg-muted/20 pb-3">
						<CardTitle className="text-lg">基本情報</CardTitle>
					</CardHeader>
					<CardContent className="pt-4">
						<div className="grid grid-cols-1 gap-6">
							<FormField
								control={form.control}
								name="id"
								render={({ field }) => (
									<FormItem>
										<FormLabel>社員ID</FormLabel>
										<FormControl>
											<Input {...field} disabled />
										</FormControl>
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
											<Input {...field} />
										</FormControl>
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
											<Input {...field} />
										</FormControl>
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="department"
								render={({ field }) => (
									<FormItem>
										<FormLabel>部署</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<SelectTrigger>
												<SelectValue placeholder="部署を選択" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="営業部">営業部</SelectItem>
												<SelectItem value="人事部">人事部</SelectItem>
												<SelectItem value="開発部">開発部</SelectItem>
												<SelectItem value="マーケティング部">
													マーケティング部
												</SelectItem>
												<SelectItem value="財務部">財務部</SelectItem>
											</SelectContent>
										</Select>
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="position"
								render={({ field }) => (
									<FormItem>
										<FormLabel>役職</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<SelectTrigger>
												<SelectValue placeholder="役職を選択" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="部長">部長</SelectItem>
												<SelectItem value="課長">課長</SelectItem>
												<SelectItem value="主任">主任</SelectItem>
												<SelectItem value="担当">担当</SelectItem>
											</SelectContent>
										</Select>
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="grade"
								render={({ field }) => (
									<FormItem>
										<FormLabel>グレード</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<SelectTrigger>
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
											<Input type="date" {...field} />
										</FormControl>
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
											<Input type="email" {...field} />
										</FormControl>
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
											<Input {...field} />
										</FormControl>
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
											<Input {...field} />
										</FormControl>
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
											<Input type="date" {...field} />
										</FormControl>
									</FormItem>
								)}
							/>
						</div>
					</CardContent>
				</Card>

				{/* スキル・資格フォーム */}
				{(employee.skills || employee.certifications) && (
					<Card className="shadow-sm">
						<CardHeader className="border-b bg-muted/20 pb-3">
							<CardTitle className="text-lg">スキル・資格</CardTitle>
						</CardHeader>
						<CardContent className="pt-4">
							<div className="space-y-6">
								<div>
									<FormLabel htmlFor="skills">保有スキル</FormLabel>
									<div className="flex flex-wrap gap-2 mt-2 mb-2">
										{skills.map((skill) => (
											<div
												key={skill}
												className="bg-primary/10 text-primary rounded-full px-3 py-1 flex items-center"
											>
												<span className="mr-2">{skill}</span>
												<button
													type="button"
													className="text-primary/80 hover:text-primary"
													onClick={() => handleRemoveSkill(skill)}
												>
													×
												</button>
											</div>
										))}
									</div>
									<div className="flex items-center gap-2 mt-3">
										<Input
											id="newSkill"
											value={newSkill}
											onChange={(e) => setNewSkill(e.target.value)}
											placeholder="新しいスキルを入力"
											className="max-w-xs"
										/>
										<Button
											type="button"
											variant="outline"
											size="sm"
											onClick={handleAddSkill}
										>
											追加
										</Button>
									</div>
								</div>

								<div className="pt-4 border-t">
									<FormLabel htmlFor="certifications">保有資格</FormLabel>
									<div className="flex flex-wrap gap-2 mt-2 mb-2">
										{certifications.map((cert) => (
											<div
												key={cert}
												className="bg-secondary/20 text-secondary-foreground rounded-full px-3 py-1 flex items-center"
											>
												<span className="mr-2">{cert}</span>
												<button
													type="button"
													className="text-secondary-foreground/80 hover:text-secondary-foreground"
													onClick={() => handleRemoveCertification(cert)}
												>
													×
												</button>
											</div>
										))}
									</div>
									<div className="flex items-center gap-2 mt-3">
										<Input
											id="newCertification"
											value={newCertification}
											onChange={(e) => setNewCertification(e.target.value)}
											placeholder="新しい資格を入力"
											className="max-w-xs"
										/>
										<Button
											type="button"
											variant="outline"
											size="sm"
											onClick={handleAddCertification}
										>
											追加
										</Button>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				)}

				{/* アクションボタン */}
				<div className="mt-8 flex justify-end space-x-2">
					<Button variant="outline" asChild>
						<Link href={`/employees/${employee.id}`}>キャンセル</Link>
					</Button>
					<Button type="submit">
						<SaveIcon className="mr-2 h-4 w-4" />
						保存
					</Button>
				</div>
			</form>
		</Form>
	);
}
