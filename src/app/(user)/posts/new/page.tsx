import { postNewPostAction } from "../../_actions/post-new-post";
import { PostInputForm } from "../_components/post-input-form";

export default function NextPage() {
  return <PostInputForm action={postNewPostAction} />;
}
