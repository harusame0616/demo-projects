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
import {
	type Department,
	departmentData,
} from "../../../_data/departments-data";

interface DepartmentFormProps {
	department: Department;
}

export function DepartmentForm({ department }: DepartmentFormProps) {
	const router = useRouter();
	const [formData, setFormData] = useState({
		name: department.name,
		parentId: department.parentId || "",
	});
	const [isSubmitting, setIsSubmitting] = useState(false);

	// 編集中の部署自身とその子部署を除いた部署リストを取得（循環参照防止）
	const availableParentDepartments = departmentData.filter((dept) => {
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

		try {
			// ここで実際のAPIリクエストを行う
			// 今回はモックデータなので、成功したふりをする
			await new Promise((resolve) => setTimeout(resolve, 1000));

			// 更新成功
			router.push(`/departments/${department.id}`);
			router.refresh(); // データを更新するため
		} catch (error) {
			console.error("更新エラー:", error);
			setIsSubmitting(false);
		}
	};

	const handleCancel = () => {
		router.back();
	};

	return (
		<form onSubmit={handleSubmit}>
			<Card>
				<CardHeader>
					<CardTitle>部署情報</CardTitle>
				</CardHeader>
				<CardContent className="space-y-6">
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
				<CardFooter className="flex justify-end">
					<div className="flex gap-2">
						<Button
							type="button"
							variant="outline"
							onClick={handleCancel}
							disabled={isSubmitting}
						>
							キャンセル
						</Button>
						<Button type="submit" disabled={isSubmitting}>
							{isSubmitting ? "保存中..." : "保存"}
						</Button>
					</div>
				</CardFooter>
			</Card>
		</form>
	);
}
