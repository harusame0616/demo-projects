import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, PencilIcon, ClockIcon } from "lucide-react";
import Link from "next/link";

type PageHeaderProps = {
	employeeId: string;
};

export function PageHeader({ employeeId }: PageHeaderProps) {
	return (
		<div className="flex items-center justify-between mb-6">
			<div className="flex items-center">
				<h2 className="text-3xl font-bold tracking-tight">従業員詳細</h2>
			</div>
		</div>
	);
}
