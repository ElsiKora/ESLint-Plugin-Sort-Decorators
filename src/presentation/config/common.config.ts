import type { TSESLint } from "@typescript-eslint/utils";

import {
	SORT_ON_ACCESSORS_NAME,
	SORT_ON_CLASSES_NAME,
	SORT_ON_METHODS_NAME,
	SORT_ON_PARAMETERS_NAME,
	SORT_ON_PROPERTIES_NAME
} from "../rule";

export const PLUGIN_NAME = "@elsikora/sort-decorators";

export function createConfiguration(
	ruleEntry: TSESLint.Linter.RuleEntry
): TSESLint.Linter.Config {
	return {
		parser: "@typescript-eslint/parser",
		plugins: [PLUGIN_NAME],
		rules: {
			[`${PLUGIN_NAME}/${SORT_ON_ACCESSORS_NAME}`]: ruleEntry,
			[`${PLUGIN_NAME}/${SORT_ON_CLASSES_NAME}`]: ruleEntry,
			[`${PLUGIN_NAME}/${SORT_ON_METHODS_NAME}`]: ruleEntry,
			[`${PLUGIN_NAME}/${SORT_ON_PARAMETERS_NAME}`]: ruleEntry,
			[`${PLUGIN_NAME}/${SORT_ON_PROPERTIES_NAME}`]: ruleEntry
		}
	};
}
