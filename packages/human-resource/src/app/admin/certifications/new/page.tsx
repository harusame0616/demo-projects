import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeftIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { CertificationForm } from "../_components/certification-form";
import { CertificationFormSkeleton } from "../_components/certification-form-skeleton";

export const metadata: Metadata = {
	title: "資格登録 | 人材管理システム",
	description: "新しい資格を登録します。",
};

export default function NewCertificationPage() {
	return (
		<>
			<div className="flex items-center gap-4 mb-6">
				<h2 className="text-3xl font-bold tracking-tight">資格新規登録</h2>
			</div>

			<Suspense fallback={<CertificationFormSkeleton />}>
				<CertificationForm isNew={true} />
			</Suspense>
		</>
	);
}
