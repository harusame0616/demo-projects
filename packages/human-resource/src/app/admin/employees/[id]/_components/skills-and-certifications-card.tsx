import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCapIcon } from "lucide-react";

type SkillsAndCertificationsProps = {
	skills: string[];
	certifications: string[];
};

export function SkillsAndCertificationsCard({
	skills,
	certifications,
}: SkillsAndCertificationsProps) {
	return (
		<Card className="shadow-sm hover:shadow transition-shadow">
			<CardHeader className="border-b bg-muted/20 pb-3">
				<CardTitle className="flex items-center gap-2 text-lg">
					<GraduationCapIcon className="h-5 w-5 text-primary" />
					スキル・資格
				</CardTitle>
			</CardHeader>
			<CardContent className="pt-4">
				<div className="space-y-4">
					<div>
						<h4 className="text-sm font-medium text-muted-foreground mb-2">
							保有スキル
						</h4>
						<div className="flex flex-wrap gap-2">
							{skills && skills.length > 0 ? (
								skills.map((skill) => (
									<span
										key={`skill-${skill}`}
										className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium"
									>
										{skill}
									</span>
								))
							) : (
								<span className="text-sm text-muted-foreground">なし</span>
							)}
						</div>
					</div>
					<div className="pt-2 border-t">
						<h4 className="text-sm font-medium text-muted-foreground mb-2">
							保有資格
						</h4>
						<div className="flex flex-wrap gap-2">
							{certifications && certifications.length > 0 ? (
								certifications.map((cert) => (
									<span
										key={`cert-${cert}`}
										className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium"
									>
										{cert}
									</span>
								))
							) : (
								<span className="text-sm text-muted-foreground">なし</span>
							)}
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
