import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
	const cookieStore = await cookies();

	// biome-ignore lint/style/noNonNullAssertion: 環境変数は必ず設定されている前提
	const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
	// biome-ignore lint/style/noNonNullAssertion: 環境変数は必ず設定されている前提
	const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

	return createServerClient(supabaseUrl, supabaseServiceKey, {
		cookies: {
			getAll() {
				return cookieStore.getAll();
			},
			setAll(cookiesToSet) {
				try {
					// biome-ignore lint/complexity/noForEach: ライブラリコードの一部
					cookiesToSet.forEach(({ name, value, options }) =>
						cookieStore.set(name, value, options),
					);
				} catch {
					// The `setAll` method was called from a Server Component.
					// This can be ignored if you have middleware refreshing
					// user sessions.
				}
			},
		},
	});
}
