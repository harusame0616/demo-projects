import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AwardIcon } from "lucide-react";

type Evaluation = {
	period: string;
	overallRating: string;
	date: string;
};

type EvaluationHistoryCardProps = {
	evaluations: Evaluation[];
};

export function EvaluationHistoryCard({
	evaluations,
}: EvaluationHistoryCardProps) {
	return (
		<Card className="shadow-sm">
			<CardHeader className="border-b bg-muted/20 pb-3">
				<CardTitle className="flex items-center gap-2 text-lg">
					<AwardIcon className="h-5 w-5 text-primary" />
					評価履歴
				</CardTitle>
			</CardHeader>
			<CardContent className="pt-4">
				<div className="overflow-x-auto">
					<table className="w-full border-collapse">
						<thead>
							<tr className="border-b">
								<th className="text-left py-3 px-4 font-medium text-muted-foreground">
									評価期間
								</th>
								<th className="text-left py-3 px-4 font-medium text-muted-foreground">
									総合評価
								</th>
								<th className="text-left py-3 px-4 font-medium text-muted-foreground">
									評価日
								</th>
							</tr>
						</thead>
						<tbody>
							{evaluations.map((evaluation) => (
								<tr
									key={`eval-${evaluation.period}-${evaluation.date}`}
									className="border-b hover:bg-muted/20 transition-colors"
								>
									<td className="py-3 px-4">{evaluation.period}</td>
									<td className="py-3 px-4">
										<span
											className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-bold
                      ${
												evaluation.overallRating === "A"
													? "bg-green-100 text-green-700"
													: evaluation.overallRating === "B"
														? "bg-blue-100 text-blue-700"
														: evaluation.overallRating === "C"
															? "bg-yellow-100 text-yellow-700"
															: evaluation.overallRating === "D"
																? "bg-orange-100 text-orange-700"
																: "bg-red-100 text-red-700"
											}`}
										>
											{evaluation.overallRating}
										</span>
									</td>
									<td className="py-3 px-4">{evaluation.date}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</CardContent>
		</Card>
	);
}
