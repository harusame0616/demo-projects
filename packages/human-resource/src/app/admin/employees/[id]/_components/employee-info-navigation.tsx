"use client";

import { Button } from "@/components/ui/button";
import {
	UserIcon,
	GraduationCapIcon,
	AwardIcon,
	TargetIcon,
	CalendarDaysIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavigationType =
	| "basic"
	| "skills"
	| "evaluations"
	| "goals"
	| "attendance";

type EmployeeInfoNavigationProps = {
	employeeId: string;
};

export function EmployeeInfoNavigation({
	employeeId,
}: EmployeeInfoNavigationProps) {
	const pathname = usePathname();

	// 現在のアクティブなページを判断
	const getActiveType = (): NavigationType => {
		if (pathname.includes("/skills")) return "skills";
		if (pathname.includes("/evaluations")) return "evaluations";
		if (pathname.includes("/goals")) return "goals";
		if (pathname.includes("/attendances")) return "attendance";
		return "basic";
	};

	const activeType = getActiveType();

	return (
		<div className="flex overflow-x-auto pb-2 mb-6 gap-2">
			<Button
				variant={activeType === "basic" ? "secondary" : "outline"}
				className="flex items-center gap-2"
				asChild
			>
				<Link href={`/admin/employees/${employeeId}`}>
					<UserIcon className="h-4 w-4" />
					基本情報
				</Link>
			</Button>
			<Button
				variant={activeType === "skills" ? "secondary" : "outline"}
				className="flex items-center gap-2"
				asChild
			>
				<Link href={`/admin/employees/${employeeId}/skills`}>
					<GraduationCapIcon className="h-4 w-4" />
					スキル・資格
				</Link>
			</Button>
			<Button
				variant={activeType === "evaluations" ? "secondary" : "outline"}
				className="flex items-center gap-2"
				asChild
			>
				<Link href={`/admin/employees/${employeeId}/evaluations`}>
					<AwardIcon className="h-4 w-4" />
					評価履歴
				</Link>
			</Button>
			<Button
				variant={activeType === "goals" ? "secondary" : "outline"}
				className="flex items-center gap-2"
				asChild
			>
				<Link href={`/admin/employees/${employeeId}/goals`}>
					<TargetIcon className="h-4 w-4" />
					目標
				</Link>
			</Button>
			<Button
				variant={activeType === "attendance" ? "secondary" : "outline"}
				className="flex items-center gap-2"
				asChild
			>
				<Link href={`/admin/employees/${employeeId}/attendances`}>
					<CalendarDaysIcon className="h-4 w-4" />
					勤怠情報
				</Link>
			</Button>
		</div>
	);
}
