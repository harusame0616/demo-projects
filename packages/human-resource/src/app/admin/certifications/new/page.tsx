import { PageHeader } from "@/components/common/page-header";
import type { Metadata } from "next";
import { Suspense } from "react";
import { CertificationForm } from "../_form/certification-form";
import { CertificationFormSkeleton } from "../_form/certification-form-skeleton";

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
