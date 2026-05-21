import type { TSESTree } from "@typescript-eslint/utils";

import { AST_NODE_TYPES } from "@typescript-eslint/utils";

import { createSortRule, sortRuleListener } from "../../application";
import { SORT_ON_PARAMETERS_NAME } from "../../domain/constant";

export const sortOnParameters = createSortRule({
	create: (context, [optionsWithDefault]) => {
		const { autoFix } = optionsWithDefault;

		const getDecorated = (node: TSESTree.Decorator) => {
			const { parent } = node;

			if (
				parent?.type === AST_NODE_TYPES.TSParameterProperty ||
				(parent?.type === AST_NODE_TYPES.Identifier &&
					parent.parent?.type === AST_NODE_TYPES.FunctionExpression)
			) {
				return parent;
			}

			return false;
		};

		return autoFix
			? {
					Decorator(node) {
						const parent = getDecorated(node);

						if (!parent) {
							return;
						}

						const decorators = parent.decorators ?? [];

						if (decorators[0] === node) {
							sortRuleListener(
								context,
								decorators,
								optionsWithDefault
							);
						}
					}
				}
			: {
					Decorator(node) {
						const parent = getDecorated(node);

						if (!parent) {
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
			description: "Enforces order of parameters decorators"
		}
	},
	name: SORT_ON_PARAMETERS_NAME
});
