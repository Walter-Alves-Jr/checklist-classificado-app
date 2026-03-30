// components/Button/index.ts

import { AppButtonIcon } from "./AppButtonIcon";
import { AppButtonRoot } from "./AppButtonRoot";
import { AppButtonText } from "./AppButtonText";

export const AppButton = Object.assign(AppButtonRoot, {
  Text: AppButtonText,
  Icon: AppButtonIcon,
});
