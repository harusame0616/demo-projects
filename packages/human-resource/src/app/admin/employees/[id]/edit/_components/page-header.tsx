import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";

type PageHeaderProps = {
	employeeId: string;
};

export function PageHeader({ employeeId }: PageHeaderProps) {
	return (
		<div className="mb-6 flex items-center justify-between">
			<div>
				<h1 className="text-2xl font-bold">従業員情報編集</h1>
				<p className="text-muted-foreground">従業員情報を編集します</p>
			</div>
			<div className="flex space-x-2">
				<Button variant="outline" asChild>
					<Link href={`/employees/${employeeId}`}>
						<ArrowLeftIcon className="mr-2 h-4 w-4" />
						詳細に戻る
					</Link>
				</Button>
			</div>
		</div>
	);
}
