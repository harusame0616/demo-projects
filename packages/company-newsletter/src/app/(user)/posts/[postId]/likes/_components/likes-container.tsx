import { getLikes } from "../_data/likes";
import { LikesPresenter } from "./likes-presenter";

type Props = {
	page: number;
	postId: string;
	searchParams: Record<string, string>;
};
export async function LikesContainer({ page, postId }: Props) {
	const getLikesResult = await getLikes({ page, postId });

	return (
		<LikesPresenter
			likes={getLikesResult.data}
			pagination={{ ...getLikesResult.pagination, searchParams: {} }}
		/>
	);
}
