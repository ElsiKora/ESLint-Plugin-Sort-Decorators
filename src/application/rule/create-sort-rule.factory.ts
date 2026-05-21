import type { JSONSchema4 } from "@typescript-eslint/utils/json-schema";

import type {
	ISortRuleWithMetaAndName,
	TSortRule
} from "../../domain/interface";

import { ESLintUtils } from "@typescript-eslint/utils";

import { sortRuleOptionsSchema } from "../../infrastructure/schema";

const sortRuleCreator = ESLintUtils.RuleCreator(name => name);

export function createSortRule(rule: ISortRuleWithMetaAndName): TSortRule {
	return sortRuleCreator({
		...rule,
		defaultOptions: [
			{ autoFix: false, caseSensitive: true, direction: "asc" }
		],
		meta: {
			schema: [sortRuleOptionsSchema as JSONSchema4],

			...rule.meta,
			docs: {
				...rule.meta.docs
			},
			fixable: "code",
			messages: {
				"incorrect-order":
					"Expected decorators to be in sorted order. `@{{ after }}` should be before `@{{ previous }}`."
			},
			type: "layout"
		}
	}) as unknown as TSortRule;
}
