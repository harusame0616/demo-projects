"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { type Department, departmentData } from "../_data/departments-data";
import {
	createDepartment,
	updateDepartment,
} from "../_actions/department-actions";

interface DepartmentFormProps {
	department?: Department; // 編集時は必須、新規作成時は不要
	isNew?: boolean;
}

export function DepartmentForm({
	department,
	isNew = false,
}: DepartmentFormProps) {
	const router = useRouter();
	const [formData, setFormData] = useState({
		id: department?.id || "",
		name: department?.name || "",
		parentId: department?.parentId || "",
		level: department?.level || 0,
		memberCount: department?.memberCount || 0,
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);

	// 編集中の部署自身とその子部署を除いた部署リストを取得（循環参照防止）
	const availableParentDepartments = departmentData.filter((dept) => {
		// 新規作成時はすべての部署が候補
		if (isNew) return true;

		// departmentが存在しない場合（安全のため）
		if (!department) return true;

		// 自分自身を除外
		if (dept.id === department.id) return false;

		// 子部署を除外（循環参照防止）
		const isChildDepartment = (
			currentDeptId: string,
			targetParentId: string | null,
		): boolean => {
			if (!targetParentId) return false;
			if (targetParentId === currentDeptId) return true;

			const targetDept = departmentData.find((d) => d.id === targetParentId);
			if (!targetDept || !targetDept.parentId) return false;

			return isChildDepartment(currentDeptId, targetDept.parentId);
		};

		return !isChildDepartment(department.id, dept.id);
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSelectChange = (value: string, field: string) => {
		setFormData((prev) => ({
			...prev,
			[field]: value === "none" ? "" : value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		setError(null);

		try {
			if (isNew) {
				// 部署コードの重複チェック
				const exists = departmentData.some((dept) => dept.id === formData.id);
				if (exists) {
					throw new Error("部署コードが既に使用されています");
				}

				// 新規作成
				const newDepartment = await createDepartment({
					name: formData.name,
					parentId: formData.parentId || null,
					level: formData.level,
					memberCount: formData.memberCount,
				});

				// 作成成功
				router.push(`/admin/departments/${newDepartment.id}`);
			} else if (department) {
				// departmentが存在する場合のみ更新処理を行う
				// 更新
				const updatedDepartment = await updateDepartment(department.id, {
					name: formData.name,
					parentId: formData.parentId || null,
				});

				// 更新成功
				router.push(`/admin/departments/${department.id}`);
			}

			router.refresh(); // データを更新するため
		} catch (error) {
			console.error(isNew ? "作成エラー:" : "更新エラー:", error);
			setError(error instanceof Error ? error.message : "エラーが発生しました");
			setIsSubmitting(false);
		}
	};

	const handleCancel = () => {
		router.back();
	};

	return (
		<form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
			<Card>
				<CardHeader>
					<CardTitle>{isNew ? "部署登録" : "部署情報"}</CardTitle>
				</CardHeader>
				<CardContent className="space-y-6">
					{error && (
						<div className="bg-red-50 p-4 rounded-md text-red-600 mb-4">
							{error}
						</div>
					)}

					<div className="space-y-2">
						<Label htmlFor="id">部署コード</Label>
						<Input
							id="id"
							name="id"
							value={formData.id}
							onChange={handleChange}
							placeholder="部署コードを入力"
							required
							className="max-w-[200px]"
							disabled={!isNew} // 編集時は変更不可
						/>
						{isNew && (
							<p className="text-sm text-muted-foreground">
								一意の部署コードを設定してください
							</p>
						)}
					</div>

					<div className="space-y-2">
						<Label htmlFor="name">部署名</Label>
						<Input
							id="name"
							name="name"
							value={formData.name}
							onChange={handleChange}
							placeholder="部署名を入力"
							required
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="parentId">上位部署</Label>
						<Select
							value={formData.parentId || "none"}
							onValueChange={(value) => handleSelectChange(value, "parentId")}
						>
							<SelectTrigger>
								<SelectValue placeholder="上位部署を選択" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="none">なし（トップレベル部署）</SelectItem>
								{availableParentDepartments.map((dept) => (
									<SelectItem key={dept.id} value={dept.id}>
										{dept.name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
				</CardContent>
			</Card>
			<div className="flex gap-2 flex-wrap">
				<Button type="submit" className="h-10 sm:max-w-32 w-full">
					{isSubmitting
						? isNew
							? "作成中..."
							: "保存中..."
						: isNew
							? "作成"
							: "保存"}
				</Button>
				<Button
					type="button"
					variant="outline"
					className="h-10 sm:max-w-32 w-full"
					onClick={handleCancel}
					disabled={isSubmitting}
				>
					キャンセル
				</Button>
			</div>
		</form>
	);
}
