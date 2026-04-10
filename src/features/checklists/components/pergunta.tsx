import AppText from "@/src/shared/components/Text/AppText";
import { AppInputError } from "@/src/shared/components/TextInput/components/AppInputError";
import { memo } from "react";
import { Controller } from "react-hook-form";
import { TouchableOpacity, View } from "react-native";
import { RadioButton } from "react-native-paper";

type PerguntaType = {
  item: any;
  control: any;
  colors: any;
  brandColor: string;
};

const Pergunta = ({ item, control, colors, brandColor }: PerguntaType) => {
  return (
    <View className="mb-5 rounded-lg border border-[#ccc] p-3">
      <AppText
        className="mb-2 font-semibold"
        style={{ color: colors.text.secondary }}
      >
        {item.pergunta}
      </AppText>

      <Controller
        control={control}
        name={`respostas.${item.id}`}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <View>
            <RadioButton.Group
              onValueChange={onChange}
              value={value !== undefined ? String(value) : ""}
            >
              <View
                style={{
                  flexDirection: "row",
                  gap: 20,
                }}
              >
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => onChange("true")}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <RadioButton value="true" color={brandColor} />
                  <AppText style={{ color: colors.text.secondary }}>
                    Sim
                  </AppText>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => onChange("false")}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <RadioButton value="false" color={brandColor} />
                  <AppText style={{ color: colors.text.secondary }}>
                    Não
                  </AppText>
                </TouchableOpacity>
              </View>
            </RadioButton.Group>

            {error && <AppInputError error={error} />}
          </View>
        )}
      />
    </View>
  );
};

export default memo(Pergunta);
