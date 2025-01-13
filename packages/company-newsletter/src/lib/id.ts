import * as v from "valibot";

export const idSchema = v.pipe(v.string(), v.uuid("ID の形式が不正です"));
