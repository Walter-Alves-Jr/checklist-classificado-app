// components/Button/index.ts

import { AppButtonIcon } from "./app-button-icon";
import { AppButtonRoot } from "./app-button-root";
import { AppButtonText } from "./app-button-text";

export const AppButton = Object.assign(AppButtonRoot, {
  Text: AppButtonText,
  Icon: AppButtonIcon,
});
