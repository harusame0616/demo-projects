import { fileURLToPath } from "node:url";

import react from "@vitejs/plugin-react";
import { defineWorkspace } from "vitest/config";

export default defineWorkspace([
	{
		test: {
			include: ["src/**/*.server.test.ts"],
			name: "server test",
			environment: "node",
			alias: {
				"@": fileURLToPath(new URL("src", import.meta.url)),
			},
		},
	},
	{
		plugins: [react()],

		test: {
			setupFiles: ["./vitest.setup.browser.ts"],
			include: ["src/**/*.browser.test.{ts,tsx}"],
			name: "browser test",
			environment: "happy-dom",
			alias: {
				"@": fileURLToPath(new URL("src", import.meta.url)),
			},
		},
	},
]);
