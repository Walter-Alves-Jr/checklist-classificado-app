import { useBrand } from "@/src/theme/useBrand";
import { Appbar } from "react-native-paper";

type HeaderPageProps = {
  goBack: () => void;
  title: string;
};

export default function HeaderPage({ goBack, title }: HeaderPageProps) {
  const brand = useBrand();

  return (
    <Appbar.Header style={{ backgroundColor: brand.bgPrimary.backgroundColor }}>
      <Appbar.BackAction onPress={goBack} color={brand.textPrimary.color} />
      <Appbar.Content
        title={title}
        titleStyle={{ color: brand.textPrimary.color }}
      />
    </Appbar.Header>
  );
}
