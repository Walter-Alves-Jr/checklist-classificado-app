import Entypo from "@expo/vector-icons/Entypo";
import { app_colors } from "../../../consts";
import { AppButton } from "../../Button";
import { useSelect } from "./app-dropdown-context";

type AppDropdownTriggerProps = {
  loading: boolean;
  placeholder: string;
};

export default function AppDropdownTrigger({
  loading,
  placeholder,
}: AppDropdownTriggerProps) {
  const { open, setOpen, value } = useSelect();

  return (
    <AppButton
      onPress={() => setOpen(!open)}
      style={{
        borderWidth: 1,
        borderColor: open ? app_colors.background.primary : "#ccc",
        paddingTop: 14,
        paddingBottom: 14,
        borderRadius: 8,
        backgroundColor: "transparent",
        flexDirection: "row",
        justifyContent: loading ? "center" : "space-between",
        alignItems: "center",
      }}
      disabled={loading}
      loading={loading}
    >
      <AppButton.Text
        style={{ color: value?.value ? app_colors.color.secondary : "#9ca3af" }}
      >
        {value?.value ? value.label : placeholder}
      </AppButton.Text>

      <AppButton.Icon>
        {open ? (
          <Entypo
            name="triangle-down"
            size={24}
            color={app_colors.background.secondary}
          />
        ) : (
          <Entypo
            name="triangle-left"
            size={24}
            color={app_colors.background.secondary}
          />
        )}
      </AppButton.Icon>
    </AppButton>
  );
}
