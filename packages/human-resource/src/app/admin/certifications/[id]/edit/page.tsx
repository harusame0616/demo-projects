import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { Suspense, use } from "react";
import { getSkillCertificationById } from "../../../skills-certifications/_actions/skill-certification-actions";
import { CertificationForm } from "../../_components/certification-form";
import { CertificationFormSkeleton } from "../../_components/certification-form-skeleton";

interface CertificationEditPageProps {
	params: {
		id: string;
	};
}

// メタデータを動的に生成
export async function generateMetadata({
	params,
}: CertificationEditPageProps): Promise<Metadata> {
	const certificationId = params.id;
	const certification = await getSkillCertificationById(certificationId);

	if (!certification || certification.type !== "certification") {
		return {
			title: "資格が見つかりません | 人材管理システム",
			description: "指定された資格が見つかりませんでした。",
		};
	}

	return {
		title: "資格編集 | 人材管理システム",
		description: `${certification.name}の情報編集`,
	};
}

export default function CertificationEditPage({
	params,
}: CertificationEditPageProps) {
	const certificationId = params.id;
	// サーバーアクションを使って資格データを取得
	const certificationPromise = getSkillCertificationById(certificationId);
	const certification = use(certificationPromise);

	if (!certification || certification.type !== "certification") {
		return (
			<div className="flex flex-col items-center justify-center h-[50vh]">
				<h2 className="text-2xl font-bold mb-4">資格が見つかりません</h2>
				<p className="text-gray-500 mb-6">
					指定された資格ID: {certificationId} の資格は存在しません。
				</p>
				<Button asChild>
					<Link href="/admin/certifications">
						<ArrowLeftIcon className="mr-2 h-4 w-4" />
						資格一覧に戻る
					</Link>
				</Button>
			</div>
		);
	}

	return (
		<>
			<div className="flex items-center gap-4 mb-6">
				<h2 className="text-3xl font-bold tracking-tight">資格編集</h2>
			</div>

			<Suspense fallback={<CertificationFormSkeleton />}>
				<CertificationForm certification={certification} isNew={false} />
			</Suspense>
		</>
	);
}
