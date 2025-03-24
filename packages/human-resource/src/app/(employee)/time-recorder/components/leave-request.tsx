"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { useForm } from "react-hook-form";

// 休暇タイプの定義
const leaveTypes = [
	{ id: "paid", label: "有給休暇" },
	{ id: "sick", label: "病気休暇" },
	{ id: "special", label: "特別休暇" },
	{ id: "other", label: "その他" },
];

// モックデータ: 利用可能な有給休暇日数
const availablePaidLeave = 15;

interface LeaveRequestFormData {
	type: string;
	reason: string;
}

export function LeaveRequest() {
	const [selectedDates, setSelectedDates] = useState<Date[] | undefined>([]);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm<LeaveRequestFormData>({
		defaultValues: {
			type: "paid",
			reason: "",
		},
	});

	const selectedLeaveType = watch("type");

	const onSubmit = (data: LeaveRequestFormData) => {
		if (!selectedDates || selectedDates.length === 0) {
			toast.error("休暇の日付を選択してください");
			return;
		}

		setIsSubmitting(true);

		// 実際にはここでAPIリクエストを行う
		setTimeout(() => {
			setIsSubmitting(false);
			setIsSuccess(true);

			// 3秒後にフォームをリセット
			setTimeout(() => {
				setIsSuccess(false);
				setSelectedDates([]);
			}, 3000);
		}, 1500);
	};

	return (
		<div className="space-y-6">
			{isSuccess ? (
				<Alert className="bg-green-50 border-green-200">
					<CheckCircle2 className="h-4 w-4 text-green-600" />
					<AlertTitle>申請完了</AlertTitle>
					<AlertDescription>
						休暇申請が送信されました。承認までしばらくお待ちください。
					</AlertDescription>
				</Alert>
			) : (
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="space-y-4">
							<div>
								<h3 className="text-lg font-medium mb-2">休暇タイプ</h3>
								<RadioGroup
									defaultValue="paid"
									className="flex flex-col space-y-2"
									{...register("type")}
								>
									{leaveTypes.map((type) => (
										<div className="flex items-center space-x-2" key={type.id}>
											<RadioGroupItem
												value={type.id}
												id={`leave-type-${type.id}`}
											/>
											<Label htmlFor={`leave-type-${type.id}`}>
												{type.label}
											</Label>
										</div>
									))}
								</RadioGroup>
							</div>

							{selectedLeaveType === "paid" && (
								<Alert>
									<AlertCircle className="h-4 w-4" />
									<AlertTitle>利用可能な有給休暇</AlertTitle>
									<AlertDescription>
										残り {availablePaidLeave} 日間の有給休暇があります。
									</AlertDescription>
								</Alert>
							)}

							<div>
								<h3 className="text-lg font-medium mb-2">休暇理由</h3>
								<Textarea
									placeholder="休暇の理由を入力してください"
									className="min-h-[120px]"
									{...register("reason", {
										required: "休暇理由は必須です",
									})}
								/>
								{errors.reason && (
									<p className="text-red-500 text-sm mt-1">
										{errors.reason.message}
									</p>
								)}
							</div>
						</div>

						<div>
							<h3 className="text-lg font-medium mb-2">休暇日</h3>
							<Card>
								<CardContent className="p-3">
									<Calendar
										mode="multiple"
										selected={selectedDates}
										onSelect={setSelectedDates}
										className="rounded-md border"
										disabled={{ before: new Date() }}
									/>
								</CardContent>
							</Card>

							<div className="mt-4">
								<h4 className="font-medium">
									選択した日数: {selectedDates?.length || 0} 日
								</h4>
								<ul className="mt-2 space-y-1">
									{selectedDates?.map((date) => (
										<li key={date.toISOString()} className="text-sm">
											{date.toLocaleDateString("ja-JP", {
												year: "numeric",
												month: "long",
												day: "numeric",
												weekday: "long",
											})}
										</li>
									))}
								</ul>
							</div>
						</div>
					</div>

					<div className="flex justify-end">
						<Button type="submit" disabled={isSubmitting}>
							{isSubmitting ? "申請中..." : "休暇を申請する"}
						</Button>
					</div>
				</form>
			)}
		</div>
	);
}
