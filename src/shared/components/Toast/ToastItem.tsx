import { useEffect } from "react";
import { View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";
import { app_colors } from "../../consts";
import { AppButton } from "../Button";
import AppText from "../Text/AppText";
import { ToastProps } from "./types/ToastProps";
import { ToastVariantsColors } from "./types/ToastVariantsColors";

export function ToastItem({
  id,
  description,
  title,
  action,
  type = "success",
  onRemove,
}: ToastProps) {
  const translateY = useSharedValue(-50);
  const opacity = useSharedValue(0);
  const translateX = useSharedValue(0);
  const timeout = setTimeout(() => {
    dismiss();
  }, 4000);

  function dismiss() {
    opacity.value = withTiming(0);
    translateY.value = withTiming(-50, {}, () => {
      scheduleOnRN(onRemove, id);
    });
  }

  useEffect(() => {
    translateY.value = withSpring(0);
    opacity.value = withTiming(1);

    return () => clearTimeout(timeout);
  }, [opacity, translateY, timeout]);

  const gesture = Gesture.Pan()
    .onUpdate((e) => {
      translateX.value = e.translationX;
    })
    .onEnd(() => {
      if (Math.abs(translateX.value) > 100) {
        opacity.value = withTiming(0);
        translateX.value = withTiming(
          translateX.value > 0 ? 300 : -300,
          {},
          () => scheduleOnRN(onRemove, id),
        );
      } else {
        translateX.value = withSpring(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: translateY.value },
      { translateX: translateX.value },
    ],
    backgroundColor: ToastVariantsColors[type],
    padding: 20,
    borderRadius: 8,
    marginBottom: 8,
    opacity: opacity.value,
    boxShadow: "0px 0px 20px 10px #00000015",
  }));

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={animatedStyle}>
        <AppText className="font-bold">{title}</AppText>
        {description && <AppText>{description}</AppText>}

        {action && (
          <View className="mt-2 flex flex-row justify-end">
            <AppButton
              onPress={action.onPress}
              style={{
                backgroundColor: app_colors.background.secondary,
                boxShadow: "0px 0px 15px 0px #00000040",
              }}
              className="p-2"
            >
              <AppButton.Text>{action.label}</AppButton.Text>
            </AppButton>
          </View>
        )}
      </Animated.View>
    </GestureDetector>
  );
}
