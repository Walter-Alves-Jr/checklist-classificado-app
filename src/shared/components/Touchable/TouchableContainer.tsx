import { useTwTheme } from "@/src/theme/useTwTheme";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

interface TouchableContainerProps extends TouchableOpacityProps {
  children: React.ReactNode;
}

export default function TouchableContainer(props: TouchableContainerProps) {
  const tw = useTwTheme();
  const { style, className, children, ...rest } = props;

  return (
    <TouchableOpacity
      {...rest}
      style={[tw.bgPrimary, style]}
      className={`
        flex 
        items-center 
        bg-orange-500
        disabled:bg-orange-200 
        p-3 
        mb-4 
        rounded-lg 
        transition-colors 
        duration-200 
        hover:brightness-105
         ${className}`}
    >
      {children}
    </TouchableOpacity>
  );
}
