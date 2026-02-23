import usePracticeToolConstants from "@/hooks/usePracticeToolConstants";
import { isMobile } from "@/utils/isMobile";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

const TARGET_HEIGHT = 26;

function IconImage({
  source,
  style,
}: {
  source: ImageSourcePropType;
  style?: any;
}) {
  const [width, setWidth] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (typeof source === "object" && "uri" in source) {
      Image.getSize(
        source.uri as string,
        (imageWidth, imageHeight) => {
          const aspectRatio = imageWidth / imageHeight;
          const calculatedWidth = TARGET_HEIGHT * aspectRatio;
          setWidth(calculatedWidth);
        },
        () => {}
      );
    } else if (
      typeof source === "number" ||
      (typeof source === "object" && !("uri" in source))
    ) {
      // For require() images, we need to use onLoad
      // Width will be set via onLoad handler
    }
  }, [source]);

  const handleLoad = (event: any) => {
    const { width: imageWidth, height: imageHeight } =
      event.nativeEvent.source || {};
    if (imageWidth && imageHeight && !width) {
      const aspectRatio = imageWidth / imageHeight;
      const calculatedWidth = TARGET_HEIGHT * aspectRatio;
      setWidth(calculatedWidth);
    }
  };

  return (
    <Image
      source={source}
      resizeMode={"contain"}
      onLoad={handleLoad}
      style={[style, width !== undefined && { width }]}
    />
  );
}

export default function TitleBar() {
  const { practiceTool, toolConstants } = usePracticeToolConstants();
  return (
    <View style={styles.mainContainer}>
      <View style={styles.leftRow}>
        <IconImage source={toolConstants.icon} style={styles.icon} />
        <IconImage
          source={require("@/assets/images/save.png")}
          style={styles.icon}
        />
        <IconImage
          source={require("@/assets/images/undo.png")}
          style={styles.icon}
        />
        <IconImage
          source={require("@/assets/images/redo.png")}
          style={styles.icon}
        />
      </View>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() =>
          router.replace(`/(tabs)/play/${practiceTool}/section-screen`)
        }
      >
        <Image
          source={require("@/assets/images/escape.png")}
          resizeMode={"contain"}
          style={styles.backButtonIcon}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    paddingHorizontal: isMobile ? 8 : 32,
    zIndex: 1002,
    paddingTop: 4,
  },
  leftRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 8,
  },
  icon: {
    height: TARGET_HEIGHT,
  },

  backButton: {
    width: 28,
    height: 28,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FDC1AB",
    borderRadius: 8,
  },
  backButtonIcon: {
    width: 20,
    height: 20,
  },
});
