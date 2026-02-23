import IconButton from "@/components/practice-tools/ribbons/RibbonButtons";
import styles from "@/components/practice-tools/ribbons/RibbonStyles";
import SectionTitle from "@/components/practice-tools/ribbons/SectionTitle";
import { ImageSourcePropType, View } from "react-native";

export default function SectionGrid({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionGrid}>{children}</View>
      <SectionTitle title={title} />
    </View>
  );
}

export function ButtonsStack({
  iconSources,
}: {
  iconSources: ImageSourcePropType[];
}) {
  return iconSources.map((iconSource, index) => (
    <IconButton key={index} iconSource={iconSource} />
  ));
}
