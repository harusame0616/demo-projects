import { PageHeader } from "@/components/common/page-header";
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
			<PageHeader title="資格新規登録" />

			<Suspense fallback={<CertificationFormSkeleton />}>
				<CertificationForm isNew={true} />
			</Suspense>
		</>
	);
}
