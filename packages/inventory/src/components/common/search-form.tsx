import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import type { UseFormReturn } from "react-hook-form";

export function SearchForm({
	form,
	children,
	search,
	clear,
}: {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	form: UseFormReturn<any>;
	children: React.ReactNode;
	search: (e?: React.BaseSyntheticEvent) => Promise<void>;
	clear: () => void;
}) {
	return (
		<Card>
			<CardContent>
				<Form {...form}>
					<form onSubmit={search} className="grid grid-cols-4 gap-4">
						{children}
						<div className="col-span-4 flex gap-2 flex-wrap">
							<Button
								type="submit"
								className="h-10 sm:max-w-32 w-full"
								disabled={form.formState.isSubmitting}
							>
								検索
							</Button>
							<Button
								type="button"
								variant="outline"
								onClick={clear}
								className="h-10 sm:max-w-32 w-full"
								disabled={form.formState.isSubmitting}
							>
								クリア
							</Button>
						</div>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
