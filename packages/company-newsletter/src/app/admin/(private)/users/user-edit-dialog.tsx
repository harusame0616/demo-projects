import { type ComponentProps, useId } from "react";

import { Dialog } from "@/components/dialog";

import { editUserAction } from "./_actions";
import type { User } from "./_data/user";
import { UserInputForm } from "./user-input-form";

type Props = Omit<ComponentProps<typeof Dialog>, "children"> & {
	user: User;
};
export function UserEditDialog({ open, onOpenChange, user }: Props) {
	const formId = useId();

	return (
		<Dialog
			title="ユーザー編集"
			onOpenChange={onOpenChange}
			open={open}
			primaryButtonLabel="保存"
			formId={formId}
		>
			<UserInputForm
				formId={formId}
				onSuccess={() => onOpenChange(false)}
				action={(params) => editUserAction({ ...params, userId: user.userId })}
				user={user}
			/>
		</Dialog>
	);
}
