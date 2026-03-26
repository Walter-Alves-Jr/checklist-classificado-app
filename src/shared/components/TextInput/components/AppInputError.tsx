import { FieldError } from "react-hook-form";
import AppText from "../../Text/AppText";

export function AppInputError({ error }: { error?: FieldError }) {
  if (!error) return null;

  return (
    <AppText className="ml-[0.80rem]" variant="orange">
      {error.message}
    </AppText>
  );
}
