import type { TSESTree } from "@typescript-eslint/utils";

import { AST_NODE_TYPES } from "@typescript-eslint/utils";

import { createSortRule, sortRuleListener } from "../../application";
import { SORT_ON_ACCESSORS_NAME } from "../../domain/constant";

export const sortOnAccessors = createSortRule({
	create: (context, [optionsWithDefault]) => {
		const { autoFix } = optionsWithDefault;

		const getDecorated = (node: TSESTree.Decorator) => {
			const { parent } = node;

			if (
				parent?.type === AST_NODE_TYPES.MethodDefinition &&
				parent.kind === "get"
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
			description: "Enforces order of accessors decorators"
		}
	},
	name: SORT_ON_ACCESSORS_NAME
});
