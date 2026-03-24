import { FieldError } from "react-hook-form";
import AppText from "../../Text/text";

export function AppInputError({ error }: { error?: FieldError }) {
  if (!error) return null;

  return (
    <AppText className="ml-2" variant="orange">
      {error.message}
    </AppText>
  );
}
