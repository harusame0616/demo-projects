import { createBrowserClient } from "@supabase/ssr";

let client: ReturnType<typeof createBrowserClient>;
export function createClient() {
	if (!client) {
		// biome-ignore lint/style/noNonNullAssertion: 環境変数は必ず設定されている前提
		const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
		// biome-ignore lint/style/noNonNullAssertion: 環境変数は必ず設定されている前提
		const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

		client = createBrowserClient(supabaseUrl, supabaseAnonKey);
	}

	return client;
}
