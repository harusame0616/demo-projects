import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	ArrowLeftIcon,
	BuildingIcon,
	CalendarIcon,
	PencilIcon,
	UsersIcon,
} from "lucide-react";
import Link from "next/link";
import { type Department, departmentData } from "../_data/departments-data";

import type { Metadata } from "next";

interface DepartmentDetailPageProps {
	params: Promise<{ id: string }>;
}

// メタデータを動的に生成
export async function generateMetadata({
	params,
}: DepartmentDetailPageProps): Promise<Metadata> {
	const { id } = await params;
	const department = departmentData.find((dept: Department) => dept.id === id);

	if (!department) {
		return {
			title: "部署が見つかりません | 人材管理システム",
			description: "指定された部署が見つかりませんでした。",
		};
	}

	return {
		title: `${department.name} | 部署詳細 | 人材管理システム`,
		description: `${department.name}の詳細情報`,
	};
}

// 日付をフォーマットする関数
function formatDate(dateString: string): string {
	const date = new Date(dateString);
	return new Intl.DateTimeFormat("ja-JP", {
		year: "numeric",
		month: "numeric",
		day: "numeric",
	}).format(date);
}

export default async function DepartmentDetailPage({
	params,
}: DepartmentDetailPageProps) {
	const { id } = await params;
	// 部署ID
	const departmentId = id;

	// 部署データを取得
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

	// 子部署一覧を取得
	const childDepartments = departmentData.filter(
		(dept: Department) => dept.parentId === departmentId,
	);

	// 親部署を取得
	const parentDepartment = department.parentId
		? departmentData.find((dept: Department) => dept.id === department.parentId)
		: null;

	return (
		<>
			<div className="flex items-center justify-between mb-6">
				<div className="flex items-center gap-2">
					<h2 className="text-3xl font-bold tracking-tight">部署詳細</h2>
				</div>
				<Button asChild variant="outline">
					<Link href={`/admin/departments/${departmentId}/edit`}>編集</Link>
				</Button>
			</div>

			<div className="space-y-6">
				{/* 部署基本情報 */}
				<Card>
					<CardHeader>
						<CardTitle>基本情報</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div>
								<dl className="space-y-4">
									<div>
										<dt className="text-sm font-medium text-gray-500">
											部署名
										</dt>
										<dd className="mt-1 text-lg font-semibold">
											{department.name}
										</dd>
									</div>
									<div>
										<dt className="text-sm font-medium text-gray-500">
											上位部署
										</dt>
										<dd className="mt-1">
											{parentDepartment ? (
												<Link
													href={`/admin/departments/${parentDepartment.id}`}
													className=" hover:underline flex items-center"
												>
													<BuildingIcon className="h-4 w-4 mr-1" />
													{parentDepartment.name}
												</Link>
											) : (
												<span className="text-gray-500">-</span>
											)}
										</dd>
									</div>
								</dl>
							</div>
							<div>
								<dl className="space-y-4">
									<div>
										<dt className="text-sm font-medium text-gray-500">
											所属人数
										</dt>
										<dd className="mt-1 flex items-center">
											<UsersIcon className="h-4 w-4 mr-1 text-gray-500" />
											{department.memberCount}人
										</dd>
									</div>
									<div>
										<dt className="text-sm font-medium text-gray-500">
											作成日
										</dt>
										<dd className="mt-1 flex items-center">
											<CalendarIcon className="h-4 w-4 mr-1 text-gray-500" />
											{formatDate(department.createdAt)}
										</dd>
									</div>
								</dl>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* 下位部署一覧 */}
				<Card>
					<CardHeader>
						<CardTitle>下位部署</CardTitle>
					</CardHeader>
					<CardContent>
						{childDepartments.length === 0 ? (
							<p className="text-gray-500">下位部署はありません</p>
						) : (
							<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
								{childDepartments.map((childDept: Department) => (
									<Link
										key={childDept.id}
										href={`/admin/departments/${childDept.id}`}
										className="block p-4 border rounded-lg hover:bg-gray-50 transition-colors"
									>
										<div className="flex items-center mb-2">
											<BuildingIcon className="h-5 w-5 mr-2 text-gray-500" />
											<h3 className="font-medium">{childDept.name}</h3>
										</div>
										<div className="flex items-center text-sm text-gray-500">
											<UsersIcon className="h-4 w-4 mr-1" />
											<span>{childDept.memberCount}人</span>
										</div>
									</Link>
								))}
							</div>
						)}
					</CardContent>
				</Card>
			</div>
		</>
	);
}
