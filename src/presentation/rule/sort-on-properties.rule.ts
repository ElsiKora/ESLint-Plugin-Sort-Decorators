import { AST_NODE_TYPES } from "@typescript-eslint/utils";

import { createSortRule, sortRuleListener } from "../../application";
import { SORT_ON_PROPERTIES_NAME } from "../../domain/constant";

export const sortOnProperties = createSortRule({
	create: (context, [optionsWithDefault]) => {
		const { autoFix } = optionsWithDefault;

		return autoFix
			? {
					PropertyDefinition({ decorators }) {
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

						if (
							parent?.type !== AST_NODE_TYPES.PropertyDefinition
						) {
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
			description: "Enforces order of properties decorators"
		}
	},
	name: SORT_ON_PROPERTIES_NAME
});
