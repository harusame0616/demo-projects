import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

type PageHeaderProps = {
	employeeId: string;
};

export function PageHeader({ employeeId }: PageHeaderProps) {
	return (
		<div className="mb-6 flex items-center justify-between">
			<div>
				<h1 className="text-2xl font-bold">従業員情報編集</h1>
			</div>
		</div>
	);
}
