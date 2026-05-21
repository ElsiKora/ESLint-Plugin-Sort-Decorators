import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

import type { ISortRuleOptions } from "../../domain/interface";
import type { TSortableDecorator, TSortRuleMessageId } from "../../domain/type";

import { getDecoratorName } from "../utility";

export function sortRuleListener(
	context: TSESLint.RuleContext<TSortRuleMessageId, [ISortRuleOptions]>,
	decorators: Array<TSESTree.Decorator>,
	options: ISortRuleOptions
): void {
	const { autoFix, caseSensitive, direction } = options;

	const getName = (decorator: TSESTree.Decorator): string => {
		const name = getDecoratorName(decorator);

		return caseSensitive ? name : name.toLowerCase();
	};

	const compare = (leftName: string, rightName: string): number => {
		const [left, right] =
			direction === "desc"
				? [rightName, leftName]
				: [leftName, rightName];

		if (left === right) {
			return 0;
		}

		return left < right ? -1 : 1;
	};

	const decoratorsWithName = decorators.map(decorator => ({
		name: getName(decorator),
		node: decorator
	}));

	const createFix = (
		fixer: TSESLint.RuleFixer,
		decoratorsWithNames: Array<TSortableDecorator>
	): TSESLint.RuleFix => {
		const { sourceCode } = context;
		const sourceText = sourceCode.getText();

		const sorted = [...decoratorsWithNames]
			.sort(({ name: leftName }, { name: rightName }) =>
				compare(leftName, rightName)
			)
			.map(({ node }) => node);

		const newText = sorted.map((child, index) => {
			const textAfter =
				index === sorted.length - 1
					? ""
					: sourceText.slice(
							decoratorsWithNames[index]!.node.range[1],
							decoratorsWithNames[index + 1]!.node.range[0]
						);

			return sourceCode.getText(child) + textAfter;
		});

		return fixer.replaceTextRange(
			[
				decoratorsWithNames[0]!.node.range[0],
				decoratorsWithNames.at(-1)!.node.range[1]
			],
			newText.join("")
		);
	};

	const sortRule = (decoratorsWithNames: Array<TSortableDecorator>): void => {
		if (decoratorsWithNames.length <= 1) {
			return;
		}

		const [{ name: currentName }, ...remaining] = decoratorsWithNames as [
			TSortableDecorator,
			...Array<TSortableDecorator>
		];

		for (const { name, node } of remaining) {
			if (compare(currentName, name) > 0) {
				context.report({
					data: {
						after: name,
						previous: currentName
					},
					fix: autoFix
						? fixer => createFix(fixer, decoratorsWithNames)
						: undefined,
					messageId: "incorrect-order",
					node
				});

				return;
			}
		}

		if (autoFix) {
			sortRule(decoratorsWithNames.slice(1));
		}
	};

	sortRule(decoratorsWithName);
}
