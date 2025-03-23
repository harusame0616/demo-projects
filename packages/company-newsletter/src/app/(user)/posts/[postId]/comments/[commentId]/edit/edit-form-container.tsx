import { editComment } from "./_actions/edit-post";
import { getComment } from "./_data/comment";
import EditFormPresenter from "./edit-form-presenter";

type Props = {
	commentId: string;
	postId: string;
};
export default async function EditFormContainer({ postId, commentId }: Props) {
	const post = await getComment(commentId);

	return (
		<EditFormPresenter
			action={editComment}
			comment={post.data}
			postId={postId}
		/>
	);
}
