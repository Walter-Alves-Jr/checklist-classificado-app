import { useBrand } from "@/src/theme/useBrand";
import { Appbar } from "react-native-paper";

type HeaderPageProps = {
  goBack: () => void;
  title: string;
};

export default function HeaderPage({ goBack, title }: HeaderPageProps) {
  const brand = useBrand();

  return (
    <Appbar.Header
      style={{
        backgroundColor: "transparent",
        marginTop: -20,
        marginBottom: -20,
      }}
    >
      <Appbar.BackAction
        onPress={goBack}
        color={brand.text.secondary.color}
        style={{
          margin: 0,
          marginRight: -10,
          padding: 0,
        }}
      />
      <Appbar.Content title={title} titleStyle={brand.text.secondary} />
    </Appbar.Header>
  );
}
