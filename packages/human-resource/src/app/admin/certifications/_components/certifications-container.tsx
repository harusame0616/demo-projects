import { getSkillCertifications } from "../../skills-certifications/_actions/skill-certification-actions";
import type { SkillCertificationSearchParams } from "../../skills-certifications/_actions/skill-certification-actions";
import type { SkillCertificationType } from "../../skills-certifications/_data/skills-certifications-data";
import { CertificationsPresenter } from "./certifications-presenter";

interface CertificationsContainerProps {
	searchParams: SkillCertificationSearchParams;
}

export async function CertificationsContainer({
	searchParams,
}: CertificationsContainerProps) {
	// 検索条件を基にデータを取得（常に資格のみ）
	const paramsForFetch: SkillCertificationSearchParams = {
		...searchParams,
		type: "certification" as SkillCertificationType,
	};

	// データ取得
	const { items, pagination } = await getSkillCertifications(paramsForFetch);

	return (
		<CertificationsPresenter certifications={items} pagination={pagination} />
	);
}
