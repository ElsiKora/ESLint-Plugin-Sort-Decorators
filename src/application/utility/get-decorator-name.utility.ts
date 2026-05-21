import type { TSESTree } from "@typescript-eslint/utils";

import { AST_NODE_TYPES } from "@typescript-eslint/utils";

export function getDecoratorName(decorator: TSESTree.Decorator): string {
	const getName = (expression: TSESTree.Expression): string => {
		switch (expression.type) {
			case AST_NODE_TYPES.CallExpression: {
				return getName(expression.callee);
			}

			case AST_NODE_TYPES.Identifier: {
				return expression.name;
			}
		}

		throw new Error("Not a valid decorator.");
	};

	return getName(decorator.expression);
}
