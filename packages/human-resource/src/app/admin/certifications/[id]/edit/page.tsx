import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { getSkillCertificationById } from "../../../skills-certifications/_actions/skill-certification-actions";
import { CertificationForm } from "../../_components/certification-form";
import { CertificationFormSkeleton } from "../../_components/certification-form-skeleton";

interface CertificationEditPageProps {
	params: Promise<{ id: string }>;
}

// メタデータを動的に生成
export async function generateMetadata({
	params,
}: CertificationEditPageProps): Promise<Metadata> {
	const { id } = await params;
	const certification = await getSkillCertificationById(id);

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

export default async function CertificationEditPage({
	params,
}: CertificationEditPageProps) {
	const { id } = await params;
	// サーバーアクションを使って資格データを取得
	const certificationPromise = getSkillCertificationById(id);
	const certification = await certificationPromise;

	if (!certification || certification.type !== "certification") {
		return (
			<div className="flex flex-col items-center justify-center h-[50vh]">
				<h2 className="text-2xl font-bold mb-4">資格が見つかりません</h2>
				<p className="text-gray-500 mb-6">
					指定された資格ID: {id} の資格は存在しません。
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
			<PageHeader title="資格編集" />

			<Suspense fallback={<CertificationFormSkeleton />}>
				<CertificationForm certification={certification} isNew={false} />
			</Suspense>
		</>
	);
}
