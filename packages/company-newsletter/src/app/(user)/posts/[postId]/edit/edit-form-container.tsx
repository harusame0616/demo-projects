import { notFound } from "next/navigation";

import { editPost } from "./_actions/edit-post";
import { getPost } from "./_data/post";
import EditFormPresenter from "./edit-form-presenter";

type Props = {
	postId: string;
};
export default async function EditFormContainer({ postId }: Props) {
	const post = await getPost(postId);

	if (!post) {
		notFound();
	}

	return <EditFormPresenter action={editPost} post={post} />;
}
