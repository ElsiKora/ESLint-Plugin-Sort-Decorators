import type { TSESTree } from "@typescript-eslint/utils";

export type TSortableDecorator = {
	name: string;
	node: TSESTree.Decorator;
};
