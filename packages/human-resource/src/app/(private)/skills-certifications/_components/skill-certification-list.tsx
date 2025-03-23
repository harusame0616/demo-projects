import Link from "next/link";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	skillCertificationData,
	type SkillCertification,
} from "../_data/skills-certifications-data";

const TYPE_LABELS = {
	skill: "スキル",
	certification: "資格",
};

export function SkillCertificationList() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>スキル・資格一覧</CardTitle>
				<CardDescription>
					社内で登録されているスキルと資格の一覧です。詳細を確認するには項目をクリックしてください。
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>名称</TableHead>
							<TableHead>種類</TableHead>
							<TableHead>レベル/認定機関</TableHead>
							<TableHead className="text-center">取得者数</TableHead>
							<TableHead>登録日</TableHead>
							<TableHead className="text-right">操作</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{skillCertificationData.map((item) => (
							<TableRow key={item.id}>
								<TableCell className="font-medium">
									<Link
										href={`/skills-certifications/${item.id}`}
										className="hover:underline text-blue-600"
									>
										{item.name}
									</Link>
								</TableCell>
								<TableCell>
									<Badge
										variant={item.type === "skill" ? "default" : "secondary"}
									>
										{TYPE_LABELS[item.type]}
									</Badge>
								</TableCell>
								<TableCell>{item.levelOrAuthority}</TableCell>
								<TableCell className="text-center">
									{item.holdersCount}名
								</TableCell>
								<TableCell>
									{format(new Date(item.createdAt), "yyyy年MM月dd日", {
										locale: ja,
									})}
								</TableCell>
								<TableCell className="text-right">
									<Button
										variant="outline"
										size="sm"
										asChild
										className="ml-auto"
									>
										<Link href={`/skills-certifications/${item.id}/edit`}>
											編集
										</Link>
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
}
