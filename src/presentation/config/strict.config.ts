import { createConfiguration } from "./common.config";

export const strict = createConfiguration(["error", { autoFix: true }]);
