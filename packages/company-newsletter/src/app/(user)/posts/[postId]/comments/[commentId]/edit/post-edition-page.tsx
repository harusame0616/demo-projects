import EditFormContainer from "./edit-form-container";

type Props = {
	commentId: string;
	postId: string;
};
export default async function PostEditionPage({ commentId, postId }: Props) {
	return <EditFormContainer postId={postId} commentId={commentId} />;
}
