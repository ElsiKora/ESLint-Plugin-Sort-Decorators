import { AST_NODE_TYPES } from "@typescript-eslint/utils";

import { createSortRule, sortRuleListener } from "../../application";
import { SORT_ON_METHODS_NAME } from "../../domain/constant";

export const sortOnMethods = createSortRule({
	create: (context, [optionsWithDefault]) => {
		const { autoFix } = optionsWithDefault;

		return autoFix
			? {
					MethodDefinition({ decorators, kind }) {
						if (kind !== "method") {
							return;
						}

						sortRuleListener(
							context,
							decorators ?? [],
							optionsWithDefault
						);
					}
				}
			: {
					Decorator(node) {
						const { parent } = node;

						if (parent?.type !== AST_NODE_TYPES.MethodDefinition) {
							return;
						}

						const decorators = parent.decorators ?? [];
						const nodeIndex = decorators.indexOf(node);

						sortRuleListener(
							context,
							decorators.slice(nodeIndex),
							optionsWithDefault
						);
					}
				};
	},
	meta: {
		docs: {
			description: "Enforces order of methods decorators"
		}
	},
	name: SORT_ON_METHODS_NAME
});
