import type { ApplicationSearchParams } from "../_actions/application-actions";
import { SearchFormPresenter } from "./search-form-presenter";

interface SearchFormContainerProps {
	defaultQuery?: ApplicationSearchParams;
}

export function SearchFormContainer({
	defaultQuery,
}: SearchFormContainerProps) {
	return <SearchFormPresenter defaultQuery={defaultQuery} />;
}
