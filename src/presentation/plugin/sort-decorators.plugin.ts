import type { TSESLint } from "@typescript-eslint/utils";

import * as configs from "../config";
import {
	SORT_ON_ACCESSORS_NAME,
	SORT_ON_CLASSES_NAME,
	SORT_ON_METHODS_NAME,
	SORT_ON_PARAMETERS_NAME,
	SORT_ON_PROPERTIES_NAME,
	sortOnAccessors,
	sortOnClasses,
	sortOnMethods,
	sortOnParameters,
	sortOnProperties
} from "../rule";

export const sortDecoratorsPlugin = {
	configs: {
		recommended: configs.recommended,
		strict: configs.strict
	},
	rules: {
		[SORT_ON_ACCESSORS_NAME]: sortOnAccessors,
		[SORT_ON_CLASSES_NAME]: sortOnClasses,
		[SORT_ON_METHODS_NAME]: sortOnMethods,
		[SORT_ON_PARAMETERS_NAME]: sortOnParameters,
		[SORT_ON_PROPERTIES_NAME]: sortOnProperties
	} as unknown as TSESLint.Linter.Plugin["rules"]
} satisfies TSESLint.Linter.Plugin;
