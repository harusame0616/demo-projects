import { getSkills } from "../_action/skill-actions";
import { SkillsPresenter } from "./skills-presenter";

type Props = Parameters<typeof getSkills>[0];

export async function SkillsContainer(props: Props) {
	const { items, pagination } = await getSkills(props);

	return (
		<SkillsPresenter
			skills={items}
			pagination={pagination}
			order={props.order}
		/>
	);
}
