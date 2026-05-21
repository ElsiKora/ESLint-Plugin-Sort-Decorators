import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [tsconfigPaths()],
	publicDir: false,
	test: {
		coverage: {
			include: ["src/**/*"],
			provider: "v8",
			reporter: ["text", "json", "html"]
		},
		environment: "node",
		exclude: ["node_modules/**/*", "dist/**/*"],
		globals: true,
		include: [
			"src/**/*.spec.ts",
			"src/**/*.test.ts",
			"test/**/*.spec.ts",
			"test/**/*.test.ts"
		],
		root: ".",
		testTimeout: 10_000,
		watch: false
	}
});
