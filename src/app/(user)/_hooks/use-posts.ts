import useSWRInfinite from "swr/infinite";

import { getPosts } from "../posts";

export function usePosts() {
  const { data, size, isLoading, isValidating, setSize, mutate } =
    useSWRInfinite(
      (page, previousPageData) => {
        console.log({ page, previousPageData });
        if (previousPageData && !previousPageData.length) {
          return null;
        }

        return { page };
      },
      (params) => (params === null ? [] : getPosts(params)),
    );

  return { data: data || [], isLoading, isValidating, setSize, size, mutate };
}
