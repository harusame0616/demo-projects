"use client";

import { DeleteIcon } from "lucide-react";
import { useRef, useState } from "react";
import { uuidv7 } from "uuidv7";
import * as v from "valibot";

import { Form, FormItem } from "@/components/form/form";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Result } from "@/lib/result";
import { createClient } from "@/lib/supabase/browser";
import { useForm } from "@/lib/use-form";

type UserInputFormProps = {
  formId: string;
  onSuccess?: () => void;
  action: (params: {
    title: string;
    text: string;
    attachments: string[];
  }) => Promise<Result>;
};
export function PostInputForm({
  onSuccess,
  action,
  formId,
}: UserInputFormProps) {
  const [attachments, setAttachments] = useState<File[]>([]);
  const [fileKey, setFileKey] = useState(uuidv7());

  const fileInputRef = useRef<HTMLInputElement>(null);
  const form = useForm({
    defaultValues: {},
    schema: v.object({
      title: v.pipe(v.string(), v.minLength(1), v.maxLength(255)),
      text: v.pipe(v.string(), v.minLength(1), v.maxLength(255)),
    }),

    onSubmit: async (params, setErrorMessage) => {
      setErrorMessage("");

      const client = createClient();

      const uploadResults = await Promise.all(
        attachments.map(async (attachment) =>
          client.storage.from("attachments").upload(uuidv7(), attachment),
        ),
      );
      console.log({ uploadResults });

      const actionResult = await action({
        ...params,
        attachments: uploadResults.map((r) => r.data?.path!),
      });

      if (!actionResult.success) {
        setErrorMessage(actionResult.message);
      } else {
        onSuccess?.();
      }
    },
  });

  async function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) {
      throw new Error("error");
    }
    setAttachments((current) => [...current, file]);
    setFileKey(uuidv7());
  }

  return (
    <Form {...form} noSubmitButton formId={formId}>
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem label="タイトル" required>
            <Input
              {...field}
              autoComplete="name"
              className="w-full"
              disabled={form.formState.isSubmitting}
            />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="text"
        render={({ field }) => (
          <FormItem label="本文" required>
            <Textarea
              {...field}
              rows={5}
              className="w-full "
              disabled={form.formState.isSubmitting}
            />
          </FormItem>
        )}
      />

      <div>
        <label>添付</label>
        <div className="flex flex-col gap-1">
          {attachments.map((attachment, i) => {
            return (
              <div
                key={attachment.name}
                className="grid grid-cols-[1fr,auto] gap-2"
              >
                <Input
                  className="text-sm text-muted-foreground"
                  readOnly
                  defaultValue={attachment.name}
                />
                <Button
                  size="icon"
                  variant="destructive"
                  type="button"
                  onClick={() => {
                    setAttachments((current) => {
                      const currentCopy = [...current];
                      currentCopy.splice(i, 1);
                      return currentCopy;
                    });
                  }}
                >
                  <DeleteIcon />
                </Button>
              </div>
            );
          })}
        </div>
        <div className="mt-1">
          <Input
            type="file"
            onChange={onChange}
            ref={fileInputRef}
            key={fileKey}
          />
        </div>
      </div>
    </Form>
  );
}
