"use client";

import { useRouter } from "next/navigation";
import { ComponentProps } from "react";

import { PostInputForm } from "../../_components/post-input-form";

export default function EditFormPresenter(
  props: ComponentProps<typeof PostInputForm>,
) {
  const router = useRouter();

  return <PostInputForm {...props} onSuccess={() => router.back()} />;
}
