import { ReactNode } from "react";
import * as v from "valibot";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Schema = v.BaseSchema<any, any, any>;

export function createPage<
  SearchParamsSchema extends Schema,
  ParamsSchema extends Schema,
>(
  Page: (props: {
    searchParams: v.InferOutput<SearchParamsSchema>;
    params: v.InferOutput<ParamsSchema>;
    searchParamsRaw: Record<string, string | string[] | undefined>;
    paramsRaw: Record<string, string>;
  }) => ReactNode,
  option?: {
    searchParamsSchema?: SearchParamsSchema;
    paramsSchema?: ParamsSchema;
  },
) {
  return async function PageValidator({
    searchParams,
    params,
  }: {
    searchParams: Promise<Record<string, string | string[] | undefined>>;
    params: Promise<Record<string, string>>;
  }) {
    const [searchParamsAwaited, paramsAwaited] = await Promise.all([
      searchParams,
      params,
    ]);

    const parsedSearchParams = option?.searchParamsSchema
      ? v.parse(option.searchParamsSchema, await searchParams)
      : undefined;
    const parsedParams = option?.paramsSchema
      ? v.parse(option.paramsSchema, await params)
      : undefined;

    return Page({
      searchParams: parsedSearchParams,
      params: parsedParams,
      searchParamsRaw: searchParamsAwaited,
      paramsRaw: paramsAwaited,
    });
  };
}
