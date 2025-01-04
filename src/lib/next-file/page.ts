import { ReactNode } from "react";
import * as v from "valibot";

type Schema = v.ObjectEntries;

type Page<
  SearchParamsSchema extends Schema | undefined,
  ParamsSchema extends Schema | undefined,
> = (props: {
  searchParams: SearchParamsSchema extends undefined
    ? undefined
    : v.InferOutput<
        v.ObjectSchema<Exclude<SearchParamsSchema, undefined>, undefined>
      >;
  params: ParamsSchema extends undefined
    ? undefined
    : v.InferOutput<
        v.ObjectSchema<Exclude<ParamsSchema, undefined>, undefined>
      >;
  searchParamsRaw: Record<string, string | string[] | undefined>;
  paramsRaw: Record<string, string>;
}) => ReactNode;

type NextPage = (props: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
  params: Promise<Record<string, string>>;
}) => Promise<ReactNode>;

export function createPage(page: Page<undefined, undefined>): NextPage;
export function createPage<
  SearchParamsSchema extends Schema,
  ParamsSchema extends Schema,
>(
  page: Page<SearchParamsSchema, ParamsSchema>,
  option: {
    searchParamsSchema: SearchParamsSchema;
    paramsSchema: ParamsSchema;
  },
): NextPage;
export function createPage<SearchParamsSchema extends Schema>(
  page: Page<SearchParamsSchema, undefined>,
  option: { searchParamsSchema: SearchParamsSchema },
): NextPage;
export function createPage<ParamsSchema extends Schema>(
  page: Page<undefined, ParamsSchema>,
  option: { paramsSchema: ParamsSchema },
): NextPage;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createPage(page: any, option?: any) {
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
      ? v.parse(v.object(option.searchParamsSchema), await searchParams)
      : undefined;
    const parsedParams = option?.paramsSchema
      ? v.parse(v.object(option.paramsSchema), await params)
      : undefined;

    return page({
      searchParams: parsedSearchParams,
      params: parsedParams,
      searchParamsRaw: searchParamsAwaited,
      paramsRaw: paramsAwaited,
    });
  };
}
