import { getPositionLevels } from "../_actions/position-actions";
import { SearchFormPresenter } from "./search-form-presenter";

interface SearchFormContainerProps {
	defaultQuery: string;
	defaultLevel: string;
}

export async function SearchFormContainer({
	defaultQuery,
	defaultLevel,
}: SearchFormContainerProps) {
	const levelOptions = await getPositionLevels();

	return (
		<SearchFormPresenter
			defaultQuery={defaultQuery}
			defaultLevel={defaultLevel}
			levelOptions={levelOptions}
		/>
	);
}
