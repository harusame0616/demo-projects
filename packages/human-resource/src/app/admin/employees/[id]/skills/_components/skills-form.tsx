"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown, GraduationCapIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

// スキルと資格の選択肢
const SKILL_OPTIONS = [
	"HTML/CSS",
	"JavaScript",
	"TypeScript",
	"React",
	"Next.js",
	"Node.js",
	"Express",
	"SQL",
	"Python",
	"Java",
	"C#",
	"PHP",
	"Laravel",
	"Docker",
	"AWS",
	"Azure",
	"GCP",
	"Excel",
	"PowerPoint",
	"Word",
	"UI/UXデザイン",
	"Figma",
	"Adobe XD",
	"Photoshop",
	"Illustrator",
	"動画編集",
	"営業",
	"マーケティング",
	"企画",
	"プロジェクト管理",
];

const CERTIFICATION_OPTIONS = [
	"TOEIC 600点",
	"TOEIC 730点",
	"TOEIC 800点",
	"TOEIC 900点",
	"英検2級",
	"英検準1級",
	"英検1級",
	"日商簿記3級",
	"日商簿記2級",
	"日商簿記1級",
	"基本情報技術者",
	"応用情報技術者",
	"ネットワークスペシャリスト",
	"データベーススペシャリスト",
	"情報セキュリティスペシャリスト",
	"プロジェクトマネージャ",
	"AWS認定ソリューションアーキテクト",
	"Google Cloud認定プロフェッショナル",
	"Microsoft認定ソリューションアーキテクト",
	"PMP",
	"ITIL",
	"Oracle認定Java資格",
	"Cisco認定資格",
	"営業士2級",
	"マーケティング検定",
	"簿記検定",
];

interface SkillsFormProps {
	employeeId: string;
	initialSkills: string[];
	initialCertifications: string[];
}

export function SkillsForm({
	employeeId,
	initialSkills,
	initialCertifications,
}: SkillsFormProps) {
	const router = useRouter();

	// スキル・資格の状態管理
	const [skills, setSkills] = useState<string[]>(initialSkills || []);
	const [certifications, setCertifications] = useState<string[]>(
		initialCertifications || [],
	);
	const [newSkill, setNewSkill] = useState("");
	const [newCertification, setNewCertification] = useState("");

	// スキル削除
	const handleRemoveSkill = (skillToRemove: string) => {
		setSkills(skills.filter((skill) => skill !== skillToRemove));
	};

	// 資格削除
	const handleRemoveCertification = (certToRemove: string) => {
		setCertifications(certifications.filter((cert) => cert !== certToRemove));
	};

	// 保存処理
	const handleSubmit = async () => {
		try {
			// 実際のAPIが実装されていないため、仮の成功メッセージを表示
			// MEMO: 実際の実装では以下のような関数を呼び出す
			// await updateEmployeeSkills(employeeId, skills, certifications);
			console.log("従業員スキル・資格を更新:", {
				employeeId,
				skills,
				certifications,
			});

			toast.success("スキル・資格情報を更新しました");

			// スキル・資格一覧ページにリダイレクト
			router.push(`/admin/employees/${employeeId}/skills`);
		} catch (error) {
			console.error("スキル・資格情報の更新に失敗しました", error);
			toast.error("スキル・資格情報の更新に失敗しました");
		}
	};

	return (
		<div className="space-y-6">
			<Card className="shadow-sm">
				<CardHeader className="border-b bg-muted/20 pb-3">
					<CardTitle className="flex items-center gap-2 text-lg">
						<GraduationCapIcon className="h-5 w-5 text-primary" />
						スキル・資格の編集
					</CardTitle>
				</CardHeader>
				<CardContent className="pt-4">
					<div className="grid grid-cols-1 gap-6">
						{/* スキル入力 */}
						<div className="space-y-2">
							<Label>スキル</Label>
							<div className="flex gap-2">
								<Popover>
									<PopoverTrigger asChild>
										<Button
											variant="outline"
											aria-expanded={true}
											className="w-full max-w-md justify-between"
										>
											{newSkill
												? SKILL_OPTIONS.find((skill) => skill === newSkill)
												: "スキルを選択"}
											<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
										</Button>
									</PopoverTrigger>
									<PopoverContent className="w-full max-w-md p-0">
										<Command>
											<CommandInput placeholder="スキルを検索..." />
											<CommandEmpty>見つかりませんでした</CommandEmpty>
											<CommandList>
												<CommandGroup>
													{SKILL_OPTIONS.filter(
														(skill) => !skills.includes(skill),
													).map((skill) => (
														<CommandItem
															key={skill}
															value={skill}
															onSelect={() => {
																if (!skills.includes(skill)) {
																	setSkills([...skills, skill]);
																}
																setNewSkill("");
															}}
														>
															<Check
																className={cn(
																	"mr-2 h-4 w-4",
																	newSkill === skill
																		? "opacity-100"
																		: "opacity-0",
																)}
															/>
															{skill}
														</CommandItem>
													))}
												</CommandGroup>
											</CommandList>
										</Command>
									</PopoverContent>
								</Popover>
							</div>
							<div className="flex flex-wrap gap-2 mt-2">
								{skills.map((skill) => (
									<Badge key={skill} variant="secondary" className="pl-2">
										{skill}
										<Button
											type="button"
											size="sm"
											variant="ghost"
											className="h-5 w-5 p-0 ml-1"
											onClick={() => handleRemoveSkill(skill)}
										>
											<XIcon className="h-3 w-3" />
										</Button>
									</Badge>
								))}
							</div>
						</div>

						{/* 資格入力 */}
						<div className="space-y-2">
							<Label>資格</Label>
							<div className="flex gap-2">
								<Popover>
									<PopoverTrigger asChild>
										<Button
											variant="outline"
											aria-expanded={true}
											className="w-full max-w-md justify-between"
										>
											{newCertification
												? CERTIFICATION_OPTIONS.find(
														(cert) => cert === newCertification,
													)
												: "資格を選択"}
											<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
										</Button>
									</PopoverTrigger>
									<PopoverContent className="w-full max-w-md p-0">
										<Command>
											<CommandInput placeholder="資格を検索..." />
											<CommandEmpty>見つかりませんでした</CommandEmpty>
											<CommandList>
												<CommandGroup>
													{CERTIFICATION_OPTIONS.filter(
														(cert) => !certifications.includes(cert),
													).map((cert) => (
														<CommandItem
															key={cert}
															value={cert}
															onSelect={() => {
																if (!certifications.includes(cert)) {
																	setCertifications([...certifications, cert]);
																}
																setNewCertification("");
															}}
														>
															<Check
																className={cn(
																	"mr-2 h-4 w-4",
																	newCertification === cert
																		? "opacity-100"
																		: "opacity-0",
																)}
															/>
															{cert}
														</CommandItem>
													))}
												</CommandGroup>
											</CommandList>
										</Command>
									</PopoverContent>
								</Popover>
							</div>
							<div className="flex flex-wrap gap-2 mt-2">
								{certifications.map((cert) => (
									<Badge key={cert} variant="secondary" className="pl-2">
										{cert}
										<Button
											type="button"
											size="sm"
											variant="ghost"
											className="h-5 w-5 p-0 ml-1"
											onClick={() => handleRemoveCertification(cert)}
										>
											<XIcon className="h-3 w-3" />
										</Button>
									</Badge>
								))}
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
			<div className="flex gap-2">
				<Button onClick={handleSubmit}>保存</Button>
				<Button variant="outline" asChild>
					<Link href={`/admin/employees/${employeeId}/skills`}>キャンセル</Link>
				</Button>
			</div>
		</div>
	);
}
