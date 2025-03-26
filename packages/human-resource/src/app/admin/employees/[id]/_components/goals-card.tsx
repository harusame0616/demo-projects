import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TargetIcon } from "lucide-react";

type Goal = {
	id: string;
	title: string;
	description: string;
	progress: number;
	dueDate: string;
};

type GoalsCardProps = {
	goals: Goal[];
};

export function GoalsCard({ goals }: GoalsCardProps) {
	return (
		<Card className="shadow-sm">
			<CardHeader className="border-b bg-muted/20 pb-3">
				<CardTitle className="flex items-center gap-2 text-lg">
					<TargetIcon className="h-5 w-5 text-primary" />
					目標
				</CardTitle>
			</CardHeader>
			<CardContent className="pt-4">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{goals.map((goal) => (
						<div
							key={goal.id}
							className="border rounded-xl p-4 bg-card hover:bg-muted/10 transition-colors"
						>
							<div className="flex justify-between items-start gap-2">
								<h4 className="font-semibold text-lg">{goal.title}</h4>
								<span className="text-xs whitespace-nowrap font-medium bg-primary/10 text-primary px-2 py-1 rounded-full">
									期限: {goal.dueDate}
								</span>
							</div>
							<p className="text-sm mt-2 text-muted-foreground min-h-[40px]">
								{goal.description}
							</p>
							<div className="mt-4">
								<div className="flex justify-between items-center mb-1.5">
									<span className="text-xs font-medium">進捗状況</span>
									<span className="text-xs font-medium">{goal.progress}%</span>
								</div>
								<div className="w-full h-2 bg-muted rounded-full overflow-hidden">
									<div
										className={`h-full ${
											goal.progress < 30
												? "bg-red-500"
												: goal.progress < 70
													? "bg-amber-500"
													: "bg-green-500"
										}`}
										style={{ width: `${goal.progress}%` }}
									/>
								</div>
							</div>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
