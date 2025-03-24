import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { EmployeeForm, PageHeader } from "./_components";

export const metadata: Metadata = {
	title: "従業員編集 | 人材管理システム",
	description: "従業員情報の編集",
};

// モックデータ（実際にはIDに基づいてデータを取得する）
const employees = {
	"001": {
		id: "001",
		name: "山田 太郎",
		nameKana: "ヤマダ タロウ",
		department: "営業部",
		position: "課長",
		grade: "G3",
		email: "yamada.taro@example.com",
		phone: "090-1234-5678",
		address: "東京都渋谷区渋谷1-1-1",
		birthDate: "1985-05-15",
		joinDate: "2018-04-01",
		skills: ["Excel", "PowerPoint", "営業戦略立案"],
		certifications: ["TOEIC 800点", "営業士2級"],
	},
	"002": {
		id: "002",
		name: "佐藤 花子",
		nameKana: "サトウ ハナコ",
		department: "人事部",
		position: "主任",
		grade: "",
		email: "sato.hanako@example.com",
		phone: "090-2345-6789",
		address: "東京都新宿区新宿2-2-2",
		birthDate: "1990-10-20",
		joinDate: "2019-04-01",
	},
};

export default function EmployeeEditPage({
	params,
}: { params: { id: string } }) {
	const employee = employees[params.id as keyof typeof employees];

	if (!employee) {
		return (
			<div className="flex flex-col items-center justify-center h-96">
				<h2 className="text-2xl font-bold mb-4">従業員が見つかりません</h2>
				<Button asChild>
					<Link href="/employees">
						<ArrowLeftIcon className="mr-2 h-4 w-4" />
						従業員一覧に戻る
					</Link>
				</Button>
			</div>
		);
	}

	return (
		<>
			<PageHeader employeeId={employee.id} />
			<EmployeeForm employee={employee} />
		</>
	);
}
