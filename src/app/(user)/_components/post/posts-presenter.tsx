import { Pagination } from "@/components/pagination";

import { PostDto } from "../../_data/posts";
import { Post } from "./post";

type Props =
  | {
      skeleton?: false;
      posts: PostDto[];
      pagination: {
        totalPage: number;
        page: number;
        searchParams: Record<string, string>;
      };
    }
  | { skeleton: true; page: number };
export async function PostsPresenter(props: Props) {
  return (
    <div>
      <ul className="mb-4">
        {props.skeleton
          ? Array.from({ length: 5 }).map((_, index) => (
              <Post key={index} skeleton />
            ))
          : props.posts.map((post) => <Post post={post} key={post.postId} />)}
      </ul>
      {props.skeleton ? (
        <Pagination
          page={props.page}
          totalPage={props.page}
          searchParams={{}}
        />
      ) : (
        <Pagination {...props.pagination} />
      )}
    </div>
  );
}
