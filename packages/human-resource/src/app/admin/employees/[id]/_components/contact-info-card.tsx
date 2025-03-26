import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserIcon, PencilIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type ContactInfo = {
	email: string;
	phone: string;
	address: string;
	birthDate: string;
};

type ContactInfoCardProps = {
	contactInfo: ContactInfo;
	employeeId?: string;
};

export function ContactInfoCard({
	contactInfo,
	employeeId,
}: ContactInfoCardProps) {
	return (
		<Card className="shadow-sm">
			<CardHeader className="border-b bg-muted/20 pb-3 flex flex-row items-center justify-between">
				<CardTitle className="flex items-center gap-2 text-lg">
					<UserIcon className="h-5 w-5 text-primary" />
					基本情報
				</CardTitle>
				{employeeId && (
					<Button variant="outline" size="sm" asChild>
						<Link href={`/admin/employees/${employeeId}/edit`}>
							<PencilIcon className="h-4 w-4 mr-1" />
							編集
						</Link>
					</Button>
				)}
			</CardHeader>
			<CardContent className="pt-4">
				<div className="divide-y">
					<div className="py-3 grid grid-cols-[100px_1fr] items-center">
						<span className="text-sm font-medium text-muted-foreground">
							メール
						</span>
						<p className="text-base break-all">{contactInfo.email}</p>
					</div>
					<div className="py-3 grid grid-cols-[100px_1fr] items-center">
						<span className="text-sm font-medium text-muted-foreground">
							電話
						</span>
						<p className="text-base font-medium">{contactInfo.phone}</p>
					</div>
					<div className="py-3 grid grid-cols-[100px_1fr] items-center">
						<span className="text-sm font-medium text-muted-foreground">
							住所
						</span>
						<p className="text-base">{contactInfo.address}</p>
					</div>
					<div className="py-3 grid grid-cols-[100px_1fr] items-center">
						<span className="text-sm font-medium text-muted-foreground">
							生年月日
						</span>
						<p className="text-base">{contactInfo.birthDate}</p>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
