import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, User, CalendarDays } from "lucide-react";
import Link from "next/link";
import {
	ContactInfoCard,
	EvaluationHistoryCard,
	GoalsCard,
	SkillsAndCertificationsCard,
} from "./_components";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Suspense } from "react";
import { getEmployeeAttendanceSummary } from "./attendances/_actions/employee-attendance-actions";
import { EmployeeAttendanceSummary } from "./attendances/_components/employee-attendance-summary";

export const metadata = {
	title: "従業員詳細 | 人材管理システム",
	description: "従業員の詳細情報",
};

// 従業員の型定義
type Employee = {
	id: string;
	name: string;
	nameKana: string;
	department: string;
	position: string;
	grade?: string;
	email: string;
	phone: string;
	address: string;
	birthDate: string;
	joinDate: string;
	skills?: string[];
	certifications?: string[];
	evaluations?: Array<{
		period: string;
		overallRating: string;
		date: string;
	}>;
	goals?: Array<{
		id: string;
		title: string;
		description: string;
		progress: number;
		dueDate: string;
	}>;
};

// モックデータ（実際にはIDに基づいてデータを取得する）
const employees: Record<string, Employee> = {
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
		evaluations: [
			{ period: "2023年上期", overallRating: "A", date: "2023-06-30" },
			{ period: "2022年下期", overallRating: "B", date: "2023-01-31" },
		],
		goals: [
			{
				id: "goal001",
				title: "新規顧客開拓",
				description: "今期中に新規顧客10社との契約を目指す",
				progress: 60,
				dueDate: "2023-12-31",
			},
			{
				id: "goal002",
				title: "チームビルディング",
				description: "メンバーのスキル向上施策を実施する",
				progress: 40,
				dueDate: "2023-12-31",
			},
		],
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

// 従業員情報タブの内容を表示するコンポーネント
function EmployeeInfoTab({ employee }: { employee: Employee }) {
	return (
		<div className="space-y-6">
			<div className="grid grid-cols-1 md:grid-cols-1 gap-6 mb-8">
				<ContactInfoCard
					contactInfo={{
						email: employee.email,
						phone: employee.phone,
						address: employee.address,
						birthDate: employee.birthDate,
					}}
				/>

				{employee.skills && employee.certifications && (
					<SkillsAndCertificationsCard
						skills={employee.skills}
						certifications={employee.certifications}
					/>
				)}
			</div>

			<div className="space-y-6">
				{employee.evaluations && employee.evaluations.length > 0 && (
					<EvaluationHistoryCard evaluations={employee.evaluations} />
				)}

				{employee.goals && employee.goals.length > 0 && (
					<GoalsCard goals={employee.goals} />
				)}
			</div>
		</div>
	);
}

// 勤怠情報タブの内容を表示するコンポーネント
async function AttendanceInfoTab({ employee }: { employee: Employee }) {
	// 勤怠データを取得
	const attendanceSummary = await getEmployeeAttendanceSummary(employee.id);

	return (
		<div className="space-y-6">
			<Suspense fallback={<div>読み込み中...</div>}>
				<EmployeeAttendanceSummary
					data={attendanceSummary}
					employee={employee}
				/>
			</Suspense>
		</div>
	);
}

export default function EmployeeInfoPage({
	params,
}: { params: { id: string } }) {
	const employee = employees[params.id as keyof typeof employees];

	if (!employee) {
		return null; // レイアウトで処理するので、ここではnullを返す
	}

	return (
		<div className="space-y-6">
			<div className="grid grid-cols-1 md:grid-cols-1 gap-6 mb-8">
				<ContactInfoCard
					contactInfo={{
						email: employee.email,
						phone: employee.phone,
						address: employee.address,
						birthDate: employee.birthDate,
					}}
				/>

				{employee.skills && employee.certifications && (
					<SkillsAndCertificationsCard
						skills={employee.skills}
						certifications={employee.certifications}
					/>
				)}
			</div>

			<div className="space-y-6">
				{employee.evaluations && employee.evaluations.length > 0 && (
					<EvaluationHistoryCard evaluations={employee.evaluations} />
				)}

				{employee.goals && employee.goals.length > 0 && (
					<GoalsCard goals={employee.goals} />
				)}
			</div>
		</div>
	);
}
