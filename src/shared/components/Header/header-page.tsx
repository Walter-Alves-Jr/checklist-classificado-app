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
      style={{ backgroundColor: brand.background.orange.backgroundColor }}
    >
      <Appbar.BackAction onPress={goBack} color={brand.text.grayLight.color} />
      <Appbar.Content title={title} titleStyle={brand.text.grayLight} />
    </Appbar.Header>
  );
}
