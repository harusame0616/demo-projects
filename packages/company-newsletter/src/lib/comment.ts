import * as v from "valibot";

export const commentTextSchema = v.pipe(
  v.string(),
  v.minLength(1, "本文は1文字以上で入力してください"),
  v.maxLength(4096, "本文は4096文字以内で入力してください"),
);
