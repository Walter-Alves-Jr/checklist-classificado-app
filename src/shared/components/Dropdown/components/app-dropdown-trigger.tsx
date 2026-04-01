import { app_colors } from "../../../consts";
import { AppButton } from "../../Button";
import { useSelect } from "./app-dropdown-context";

export default function AppDropdownTrigger({
  placeholder,
}: {
  placeholder?: string;
}) {
  const { open, setOpen, value } = useSelect();

  return (
    <AppButton
      onPress={() => setOpen(!open)}
      style={{
        borderWidth: 1,
        borderColor: open ? app_colors.background.primary : "#ccc",
        padding: 14,
        borderRadius: 10,
        backgroundColor: "transparent",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <AppButton.Text style={{ color: value?.value ? "#111827" : "#9ca3af" }}>
        {value?.value ? value.label : placeholder}
      </AppButton.Text>

      <AppButton.Text style={{ color: "#6b7280" }}>
        {open ? "▲" : "▼"}
      </AppButton.Text>
    </AppButton>
  );
}
