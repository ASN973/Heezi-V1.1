import CustomTouchableOpacity, {
  StyleSwitchTouchableOpacity,
} from "@/components/home/section-card/CustomTouchableOpacity";
import practiceToolsConstants from "@/constants/practiceToolsConstants";
import { isMobile } from "@/utils/isMobile";
import { router, useGlobalSearchParams } from "expo-router";
import { Image, StyleSheet, Text } from "react-native";

interface CategoryCardProps {
  toolName: keyof typeof practiceToolsConstants;
  style?: any;
}

export function PracticeToolCard({ toolName, style }: CategoryCardProps) {
  const { practiceTool } = useGlobalSearchParams();

  const cardToolConstants = practiceToolsConstants[toolName];

  const selectedTool = Array.isArray(practiceTool)
    ? practiceTool[0]
    : practiceTool;
  const fallbackTool = Object.keys(practiceToolsConstants)[0];

  const isCurrentTool = (selectedTool ?? fallbackTool) === toolName;

  const backgroundColor = isCurrentTool
    ? cardToolConstants.backgroundColor
    : "#FFFFFF";

  const Wrapper = isCurrentTool
    ? CustomTouchableOpacity
    : StyleSwitchTouchableOpacity;

  return (
    <CustomTouchableOpacity
      onPress={() => {
        router.push(`/(tabs)/play/${toolName}`);
      }}
      style={[
        styles.container,
        {
          borderColor: cardToolConstants.backgroundColor,
          borderWidth: isCurrentTool ? 0 : 1,
          backgroundColor,
        },
        style,
      ]}
      containerStyle={isMobile ? { height: "100%" } : undefined}
    >
      <Image
        source={cardToolConstants.icon}
        resizeMode={"contain"}
        style={styles.icon}
      />
      <Text style={[styles.text, { color: cardToolConstants.textColor }]}>
        {cardToolConstants.title}
      </Text>
    </CustomTouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    paddingVertical: !isMobile ? 32 : 8,
    paddingLeft: 8,
    paddingRight: isMobile ? 8 : 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
  icon: {
    width: 32,
    height: 32,
  },
  buttonContainerHovered: {
    backgroundColor: "rgba(255, 255, 255, 0.87)",
  },
});
