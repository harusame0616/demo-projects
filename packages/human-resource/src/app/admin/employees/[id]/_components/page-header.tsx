import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, ClockIcon, PencilIcon } from "lucide-react";
import Link from "next/link";

export function PageHeader() {
	return (
		<div className="flex items-center justify-between mb-6">
			<div className="flex items-center">
				<h2 className="text-3xl font-bold tracking-tight">従業員詳細</h2>
			</div>
		</div>
	);
}
