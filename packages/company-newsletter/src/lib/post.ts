import * as v from "valibot";

export const postTitleSchema = v.pipe(
	v.string(),
	v.minLength(1, "タイトルは1文字以上で入力してください"),
	v.maxLength(64, "タイトルは64文字以内で入力してください"),
);

export const postTextSchema = v.pipe(
	v.string(),
	v.minLength(1, "本文は1文字以上で入力してください"),
	v.maxLength(4096, "本文は4096文字以内で入力してください"),
);

export const attachmentSchema = v.pipe(
	v.string(),
	v.minLength(1, "添付ファイルパスは必須です"),
	v.maxLength(1024, "添付ファイルパスは255文字以内で入力してください"),
);

export const attachmentsSchema = v.array(attachmentSchema);
