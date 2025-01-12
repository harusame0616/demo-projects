import * as v from "valibot";

import { Form, FormItem } from "@/components/form/form";
import { FormSelect } from "@/components/form/form-select";
import { Checkbox } from "@/components/ui/checkbox";
import { FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { emailSchema, nameSchema, passwordSchema } from "@/domains/user/schema";
import { Result } from "@/lib/result";
import { useForm } from "@/lib/use-form";

import { User } from "./_data/user";
import { Role } from "./role";

type UserInputFormProps = {
  formId: string;
  onSuccess: () => void;
  action: (params: {
    name: string;
    email: string;
    canPost: boolean;
    password: string;
    role: Role;
  }) => Promise<Result>;
  user?: User;
};
export function UserInputForm({
  onSuccess,
  action,
  formId,
  user,
}: UserInputFormProps) {
  const form = useForm({
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      canPost: user?.canPost || false,
      password: "",
      role: user?.role || Role.Viewer.value,
    },
    schema: v.object({
      name: nameSchema,
      email: emailSchema,
      password: v.union([
        passwordSchema,
        ...(user ? [v.pipe(v.string(), v.length(0))] : []),
      ]),
      canPost: v.boolean(),
      role: v.picklist(Object.values(Role).map((role) => role.value)),
    }),
    onSubmit: async (params, setErrorMessage) => {
      setErrorMessage("");

      const result = await action(params);

      if (!result.success) {
        setErrorMessage(result.message);
      } else {
        onSuccess();
      }
    },
  });

  return (
    <Form {...form} noSubmitButton formId={formId}>
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem label="名前" description="名前を入力してください" required>
            <Input
              {...field}
              autoComplete="name"
              className="max-w-32"
              disabled={form.formState.isSubmitting}
            />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem
            label="メールアドレス"
            description="メールアドレスを入力してください"
            required
          >
            <Input
              {...field}
              type="email"
              autoComplete="username"
              className="max-w-64"
              disabled={form.formState.isSubmitting}
            />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem
            label="パスワード"
            description={`パスワードを入力してください。${
              user ? "入力済みの場合のみ更新します" : ""
            }`}
            required={!user}
          >
            <Input
              {...field}
              type="password"
              autoComplete="new-password"
              className="max-w-64"
              disabled={form.formState.isSubmitting}
            />
          </FormItem>
        )}
      />
      <FormSelect
        control={form.control}
        className="w-36"
        name="role"
        label="ロール"
        options={Object.values(Role)}
      />
      <FormField
        control={form.control}
        name="canPost"
        render={({ field }) => (
          <FormItem label="">
            <Label className="flex items-center gap-1">
              <Checkbox
                onCheckedChange={field.onChange}
                defaultChecked={field.value}
              />
              投稿可能
            </Label>
          </FormItem>
        )}
      />
    </Form>
  );
}
