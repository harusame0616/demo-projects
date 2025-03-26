import { createClient as createClientBase } from "@supabase/supabase-js";
import { cookies } from "next/headers";

export function createClient() {
	const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
	const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

	if (!supabaseUrl || !supabaseKey) {
		throw new Error("Supabase の環境変数が設定されていません");
	}

	return createClientBase(supabaseUrl, supabaseKey, {
		cookies: {
			get(name: string) {
				return cookies().get(name)?.value;
			},
		},
	});
}
