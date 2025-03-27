import { getSkillCertifications } from "../../skills-certifications/_actions/skill-certification-actions";
import { SkillsPresenter } from "./skills-presenter";
import type { SkillCertificationSearchParams } from "../../skills-certifications/_actions/skill-certification-actions";
import type { SkillCertificationType } from "../../skills-certifications/_data/skills-certifications-data";

interface SkillsContainerProps {
	searchParams: SkillCertificationSearchParams;
}

export async function SkillsContainer({ searchParams }: SkillsContainerProps) {
	// 検索条件を基にデータを取得（常にスキルのみ）
	const paramsForFetch: SkillCertificationSearchParams = {
		...searchParams,
		type: "skill" as SkillCertificationType,
	};

	// データ取得
	const { items, pagination } = await getSkillCertifications(paramsForFetch);

	return <SkillsPresenter skills={items} pagination={pagination} />;
}
