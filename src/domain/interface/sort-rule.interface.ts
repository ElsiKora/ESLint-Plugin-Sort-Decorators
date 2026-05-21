import type { ESLintUtils, TSESLint } from "@typescript-eslint/utils";

import type { TSortRuleMessageId } from "../type/sort-rule-message-id.type";

import type { ISortRuleOptions } from "./sort-rule-options.interface";

export interface ISortRuleMeta extends Omit<
	TSortRule["meta"],
	"docs" | "fixable" | "messages" | "schema" | "type"
> {
	docs: {
		description: string;
	};
}

export interface ISortRuleWithMetaAndName extends Omit<
	TSortRule,
	"defaultOptions" | "meta"
> {
	meta: ISortRuleMeta;
}

export type TSortRule = ESLintUtils.RuleWithMetaAndName<
	[ISortRuleOptions],
	TSortRuleMessageId,
	TSESLint.RuleListener
>;
