import { useBrand } from "@/src/theme/useBrand";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

interface TouchableContainerProps extends TouchableOpacityProps {
  children: React.ReactNode;
}

export default function TouchableContainer(props: TouchableContainerProps) {
  const brand = useBrand();
  const { style, className, children, ...rest } = props;

  return (
    <TouchableOpacity
      {...rest}
      style={[brand.bgPrimary, style]}
      className={`mb-4 flex items-center rounded-lg bg-orange-500 p-3 transition-colors duration-200 hover:brightness-105 disabled:bg-orange-200 ${className}`}
    >
      {children}
    </TouchableOpacity>
  );
}
