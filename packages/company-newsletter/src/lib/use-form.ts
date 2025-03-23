/* eslint-disable @typescript-eslint/no-explicit-any */
import { valibotResolver } from "@hookform/resolvers/valibot";
import { type Dispatch, type SetStateAction, useState } from "react";
import { type DefaultValues, useForm as useFormRhf } from "react-hook-form";
import type * as v from "valibot";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function useForm<Schema extends v.ObjectSchema<any, any>>({
	schema,
	defaultValues,
	onSubmit,
}: {
	schema: Schema;
	defaultValues: DefaultValues<v.InferInput<Schema>>;
	onSubmit: (
		values: v.InferOutput<Schema>,
		setErrorMessage: Dispatch<SetStateAction<string>>,
	) => Promise<void>;
}) {
	const [errorMessage, setErrorMessage] = useState("");
	const form = useFormRhf<v.InferInput<Schema>>({
		defaultValues,
		resolver: valibotResolver(schema),
	});

	return {
		...form,
		onSubmit: form.handleSubmit(async (params) => {
			await onSubmit(params, setErrorMessage);
		}),
		errorMessage,
	};
}
