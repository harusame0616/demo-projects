import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, PencilIcon } from "lucide-react";

type PageHeaderProps = {
	employeeId: string;
};

export function PageHeader({ employeeId }: PageHeaderProps) {
	return (
		<div className="flex items-center justify-between mb-6">
			<div className="flex items-center">
				<Button variant="outline" size="icon" className="mr-4" asChild>
					<Link href="/admin/employees">
						<ArrowLeftIcon className="h-4 w-4" />
					</Link>
				</Button>
				<h2 className="text-3xl font-bold tracking-tight">従業員詳細</h2>
			</div>
			<Button asChild>
				<Link href={`/admin/employees/${employeeId}/edit`}>
					<PencilIcon className="mr-2 h-4 w-4" />
					編集
				</Link>
			</Button>
		</div>
	);
}
