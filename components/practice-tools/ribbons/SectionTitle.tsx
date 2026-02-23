import { Text, View } from "react-native";
import styles from "./RibbonStyles";

export default function SectionTitle({ title }: { title: string }) {
  return (
    <View style={styles.sectionTitleContainer}>
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  );
}
