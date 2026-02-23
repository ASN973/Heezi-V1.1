import usePracticeToolConstants from "@/hooks/usePracticeToolConstants";
import { Link } from "expo-router";
import { Image, StyleSheet, View } from "react-native";

interface MissionDoorGridProps {
  style?: any;
}

export function MissionDoorGrid({ style }: MissionDoorGridProps) {
  const { practiceTool } = usePracticeToolConstants();
  return (
    <View style={[styles.container, style]}>
      <Link href={`/mission/${practiceTool}/1`} asChild>
        <Image
          source={require("@/assets/images/0bgealkc_expires_30_days.png")}
          resizeMode="stretch"
          style={styles.image}
        />
      </Link>
      <Link href={`/mission/${practiceTool}/2`} asChild>
        <Image
          source={require("@/assets/images/0bgealkc_expires_30_days.png")}
          resizeMode="stretch"
          style={styles.image}
        />
      </Link>
      <Link href={`/mission/${practiceTool}/3`} asChild>
        <Image
          source={require("@/assets/images/0bgealkc_expires_30_days.png")}
          resizeMode="stretch"
          style={styles.image}
        />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "flex-start",
    flexDirection: "row",
  },
  image: {
    width: 116,
    height: 163,
    marginRight: 8,
  },
  lastImage: {
    width: 116,
    height: 163,
  },
});
