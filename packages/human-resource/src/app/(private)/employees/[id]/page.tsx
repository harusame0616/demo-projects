import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { ArrowLeftIcon, PencilIcon } from "lucide-react";

export const metadata = {
	title: "従業員詳細 | 人材管理システム",
	description: "従業員の詳細情報",
};

// モックデータ（実際にはIDに基づいてデータを取得する）
const employees = {
	"001": {
		id: "001",
		name: "山田 太郎",
		nameKana: "ヤマダ タロウ",
		department: "営業部",
		position: "課長",
		email: "yamada.taro@example.com",
		phone: "090-1234-5678",
		address: "東京都渋谷区渋谷1-1-1",
		birthDate: "1985-05-15",
		joinDate: "2018-04-01",
	},
	"002": {
		id: "002",
		name: "佐藤 花子",
		nameKana: "サトウ ハナコ",
		department: "人事部",
		position: "主任",
		email: "sato.hanako@example.com",
		phone: "090-2345-6789",
		address: "東京都新宿区新宿2-2-2",
		birthDate: "1990-10-20",
		joinDate: "2019-04-01",
	},
	"003": {
		id: "003",
		name: "鈴木 一郎",
		nameKana: "スズキ イチロウ",
		department: "開発部",
		position: "部長",
		email: "suzuki.ichiro@example.com",
		phone: "090-3456-7890",
		address: "東京都品川区品川3-3-3",
		birthDate: "1975-03-10",
		joinDate: "2015-04-01",
	},
	"004": {
		id: "004",
		name: "田中 美咲",
		nameKana: "タナカ ミサキ",
		department: "マーケティング部",
		position: "担当",
		email: "tanaka.misaki@example.com",
		phone: "090-4567-8901",
		address: "東京都目黒区目黒4-4-4",
		birthDate: "1995-07-25",
		joinDate: "2021-04-01",
	},
	"005": {
		id: "005",
		name: "伊藤 健太",
		nameKana: "イトウ ケンタ",
		department: "財務部",
		position: "主任",
		email: "ito.kenta@example.com",
		phone: "090-5678-9012",
		address: "東京都世田谷区世田谷5-5-5",
		birthDate: "1988-12-05",
		joinDate: "2020-04-01",
	},
};

export default function EmployeeDetailPage({
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
			<div className="flex items-center justify-between mb-6">
				<div className="flex items-center">
					<Button variant="outline" size="icon" className="mr-4" asChild>
						<Link href="/employees">
							<ArrowLeftIcon className="h-4 w-4" />
						</Link>
					</Button>
					<h2 className="text-3xl font-bold tracking-tight">従業員詳細</h2>
				</div>
				<Button asChild>
					<Link href={`/employees/${employee.id}/edit`}>
						<PencilIcon className="mr-2 h-4 w-4" />
						編集
					</Link>
				</Button>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>{employee.name}</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="space-y-4">
							<div>
								<h3 className="text-sm font-medium text-muted-foreground">
									社員ID
								</h3>
								<p>{employee.id}</p>
							</div>
							<div>
								<h3 className="text-sm font-medium text-muted-foreground">
									氏名
								</h3>
								<p>{employee.name}</p>
							</div>
							<div>
								<h3 className="text-sm font-medium text-muted-foreground">
									氏名（カナ）
								</h3>
								<p>{employee.nameKana}</p>
							</div>
							<div>
								<h3 className="text-sm font-medium text-muted-foreground">
									部署
								</h3>
								<p>{employee.department}</p>
							</div>
							<div>
								<h3 className="text-sm font-medium text-muted-foreground">
									役職
								</h3>
								<p>{employee.position}</p>
							</div>
						</div>
						<div className="space-y-4">
							<div>
								<h3 className="text-sm font-medium text-muted-foreground">
									メールアドレス
								</h3>
								<p>{employee.email}</p>
							</div>
							<div>
								<h3 className="text-sm font-medium text-muted-foreground">
									電話番号
								</h3>
								<p>{employee.phone}</p>
							</div>
							<div>
								<h3 className="text-sm font-medium text-muted-foreground">
									住所
								</h3>
								<p>{employee.address}</p>
							</div>
							<div>
								<h3 className="text-sm font-medium text-muted-foreground">
									生年月日
								</h3>
								<p>{employee.birthDate}</p>
							</div>
							<div>
								<h3 className="text-sm font-medium text-muted-foreground">
									入社日
								</h3>
								<p>{employee.joinDate}</p>
							</div>
						</div>
					</div>
				</CardContent>
				<CardFooter className="flex justify-end space-x-2">
					<Button variant="outline" asChild>
						<Link href="/employees">キャンセル</Link>
					</Button>
					<Button asChild>
						<Link href={`/employees/${employee.id}/edit`}>編集</Link>
					</Button>
				</CardFooter>
			</Card>
		</>
	);
}
