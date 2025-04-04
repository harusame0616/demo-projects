import { valibotResolver } from "@hookform/resolvers/valibot";
import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";
import { type DefaultValues, useForm } from "react-hook-form";
import type * as v from "valibot";

export function useSearchForm<
	// biome-ignore lint/suspicious/noExplicitAny:
	Schema extends v.ObjectSchema<v.ObjectEntries, any>,
>(
	schema: Schema,
	defaultValues: DefaultValues<v.InferOutput<Schema>>,
	clearValues: DefaultValues<v.InferOutput<Schema>>,
) {
	const pathname = usePathname();
	const router = useRouter();

	const form = useForm<v.InferOutput<typeof schema>>({
		resolver: valibotResolver(schema),
		defaultValues,
	});

	const search = form.handleSubmit((data: v.InferOutput<Schema>) => {
		const params = new URLSearchParams();

		for (const [key, value] of Object.entries(data)) {
			if (value) {
				params.set(key, String(value));
			}
		}

		params.set("page", "1");

		const url = `${pathname}?${params.toString()}`;
		router.push(url);
	});

	const clear = useCallback(() => {
		console.log("clear", clearValues);
		form.reset(clearValues);
	}, [form, clearValues]);

	return { form, search, clear };
}
