import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { Suspense, use } from "react";
import { type Department, departmentData } from "../../_data/departments-data";
import { DepartmentForm } from "../../_components/department-form";
import { DepartmentFormSkeleton } from "../../_components/department-form-skeleton";

import type { Metadata } from "next";

interface DepartmentEditPageProps {
	params: Promise<{
		id: string;
	}>;
}

// メタデータを動的に生成
export async function generateMetadata({
	params,
}: {
	params: { id: string };
}): Promise<Metadata> {
	const departmentId = params.id;
	const department = departmentData.find(
		(dept: Department) => dept.id === departmentId,
	);

	if (!department) {
		return {
			title: "部署が見つかりません | 人材管理システム",
			description: "指定された部署が見つかりませんでした。",
		};
	}

	return {
		title: `${department.name}の編集 | 人材管理システム`,
		description: `${department.name}の情報編集`,
	};
}

export default function DepartmentEditPage({
	params,
}: DepartmentEditPageProps) {
	// paramsをReact.use()でアンラップする
	const { id: departmentId } = use(params);

	const department = departmentData.find(
		(dept: Department) => dept.id === departmentId,
	);

	if (!department) {
		return (
			<div className="flex flex-col items-center justify-center h-[50vh]">
				<h2 className="text-2xl font-bold mb-4">部署が見つかりません</h2>
				<p className="text-gray-500 mb-6">
					指定された部署ID: {departmentId} の部署は存在しません。
				</p>
				<Button asChild>
					<Link href="/admin/departments">
						<ArrowLeftIcon className="mr-2 h-4 w-4" />
						部署一覧に戻る
					</Link>
				</Button>
			</div>
		);
	}

	return (
		<>
			<div className="flex items-center gap-4 mb-6">
				<Button variant="outline" size="sm" asChild>
					<Link href={`/admin/departments/${departmentId}`}>
						<ArrowLeftIcon className="mr-2 h-4 w-4" />
						戻る
					</Link>
				</Button>
				<h2 className="text-3xl font-bold tracking-tight">
					{department.name}の編集
				</h2>
			</div>

			<Suspense fallback={<DepartmentFormSkeleton />}>
				<DepartmentForm department={department} isNew={false} />
			</Suspense>
		</>
	);
}
