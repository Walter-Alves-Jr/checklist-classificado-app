import { useBrand } from "@/src/theme/useBrand";
import { useEffect } from "react";
import { TextInputProps } from "react-native";

import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useInput } from "../useInput";

interface AppInputLabelProps extends TextInputProps {
  hasIconLeft?: boolean;
}

export default function AppInputLabel({
  children,
  hasIconLeft,
}: AppInputLabelProps) {
  const progress = useSharedValue(0);
  const { text } = useBrand();
  const { isFocused, value } = useInput();
  const hasValue = !!value;

  const validateValueOrFocus = isFocused || hasValue;

  useEffect(() => {
    progress.value = withTiming(validateValueOrFocus ? 1 : 0, {
      duration: 200,
    });
  }, [validateValueOrFocus, progress]);

  const animatedStyle = useAnimatedStyle(() => ({
    position: "absolute",
    left: hasIconLeft
      ? interpolate(progress.value, [0, 1], [0, -24])
      : validateValueOrFocus
        ? -2
        : 2,
    top: progress.value ? interpolate(progress.value, [0, 1], [4, -27]) : 12.5,
    transform: [
      {
        scale: interpolate(progress.value, [0, 1], [1, 0.85]),
      },
    ],
    fontWeight: validateValueOrFocus ? "600" : "400",
    color: interpolateColor(
      progress.value,
      [0, 1],
      ["#9ca3af", text.grayDark.color],
    ),
  }));

  return (
    <Animated.Text style={animatedStyle} className="text-sm">
      {children}
    </Animated.Text>
  );
}
