import { createPage } from "@/lib/next-file/page";

import { postNewPostAction } from "../../_actions/post-new-post";
import { PostInputForm } from "../_components/post-input-form";

export default createPage(() => <PostInputForm action={postNewPostAction} />);
