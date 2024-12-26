import { Dialog } from "@/components/dialog";
import { ComponentProps, useId } from "react";
import { UserInputForm } from "./user-input-form";
import { editUserAction } from "./_actions";

type Props = Omit<ComponentProps<typeof Dialog>, "children"> & {
  userId: string;
  name: string;
  email: string;
};
export function UserEditDialog({
  open,
  onOpenChange,
  name,
  email,
  userId,
}: Props) {
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
        action={(params) => editUserAction({ ...params, userId })}
        user={{ email, name }}
      />
    </Dialog>
  );
}
