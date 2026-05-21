import { createConfig } from "@elsikora/eslint-config";

export default [
	{
		ignores: [
			"**/node_modules/",
			"**/.git/",
			"**/dist/",
			"**/build/",
			"**/coverage/",
			"**/.vscode/",
			"**/.idea/",
			"**/*.min.js",
			"**/*.bundle.js",
			"package-lock.json"
		]
	},
	...(await createConfig({
		withCheckFile: true,
		withJavascript: true,
		withJson: true,
		withNode: true,
		withPackageJson: true,
		withPerfectionist: true,
		withPrettier: true,
		withSonar: true,
		withStylistic: true,
		withTypescript: true,
		withUnicorn: true,
		withYaml: true
	})),
	{
		files: ["src/**/*.ts", "test/**/*.ts"],
		rules: {
			"@elsikora/check-file/folder-naming-convention": "off",
			"@elsikora/javascript/no-undef": "off",
			"@elsikora/node/no-extraneous-import": "off",
			"@elsikora/sonar/deprecation": "off",
			"@elsikora/sonar/function-return-type": "off",
			"@elsikora/sonar/no-duplicate-string": "off",
			"@elsikora/sonar/prefer-single-boolean-return": "off",
			"@elsikora/typescript/explicit-function-return-type": "off",
			"@elsikora/typescript/explicit-module-boundary-types": "off",
			"@elsikora/typescript/naming-convention": "off",
			"@elsikora/typescript/no-magic-numbers": "off",
			"@elsikora/typescript/no-non-null-assertion": "off",
			"@elsikora/typescript/no-unsafe-argument": "off",
			"@elsikora/typescript/no-unsafe-assignment": "off",
			"@elsikora/typescript/no-unsafe-call": "off",
			"@elsikora/typescript/no-unsafe-member-access": "off",
			"@elsikora/typescript/no-unsafe-return": "off",
			"@elsikora/typescript/switch-exhaustiveness-check": "off",
			"@elsikora/typescript/typedef": "off",
			"@elsikora/typescript/unbound-method": "off",
			"@elsikora/unicorn/consistent-function-scoping": "off",
			"@elsikora/unicorn/no-empty-file": "off",
			"@elsikora/unicorn/prevent-abbreviations": "off",
			"@typescript-eslint/ban-ts-comment": "off",
			"@typescript-eslint/no-explicit-any": "off",
			"@typescript-eslint/no-unused-vars": "off",
			"@typescript-eslint/unbound-method": "off",
			"unicorn/prevent-abbreviations": "off"
		}
	}
];
