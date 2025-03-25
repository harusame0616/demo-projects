import type { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CertificationForm } from "../_components/certification-form";
import { ArrowLeftIcon } from "lucide-react";
import { Suspense } from "react";

export const metadata: Metadata = {
	title: "資格登録 | 人材管理システム",
	description: "新しい資格を登録します。",
};

// ローディング状態を表示するスケルトンコンポーネント
function CertificationFormSkeleton() {
	return (
		<div className="space-y-6">
			<div className="space-y-4">
				<div className="h-8 w-1/3 bg-gray-200 animate-pulse rounded-md" />
				<div className="h-10 w-full bg-gray-200 animate-pulse rounded-md" />
			</div>
			<div className="space-y-4">
				<div className="h-8 w-1/3 bg-gray-200 animate-pulse rounded-md" />
				<div className="h-10 w-full bg-gray-200 animate-pulse rounded-md" />
			</div>
			<div className="h-10 w-48 bg-gray-200 animate-pulse rounded-md" />
		</div>
	);
}

export default function NewCertificationPage() {
	return (
		<>
			<div className="flex items-center gap-4 mb-6">
				<Button variant="outline" size="sm" asChild>
					<Link href="/admin/certifications">
						<ArrowLeftIcon className="mr-2 h-4 w-4" />
						戻る
					</Link>
				</Button>
				<h2 className="text-3xl font-bold tracking-tight">資格の新規登録</h2>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>資格情報</CardTitle>
				</CardHeader>
				<CardContent>
					<Suspense fallback={<CertificationFormSkeleton />}>
						<CertificationForm />
					</Suspense>
				</CardContent>
			</Card>
		</>
	);
}
