import React from "react";
import { StyleSheet, View } from "react-native";
import { isMobile } from "@/utils/isMobile";
type ProgressBarProps = {
  fill: number;
};

export default function ProgressBar({ fill }: ProgressBarProps) {
  return (
    <View style={css.container}>
      <View
        style={[
          css.progress,
          {
            width: `${fill}%`,
          },
        ]}
      />
    </View>
  );
}
const css = StyleSheet.create({
  container: {
    width: "97%",
    height: 20,
    backgroundColor: "#ddd",
    borderRadius: 10,
    overflow: "hidden",
    marginLeft: isMobile ? 3 : 12
  },

  progress: {
    height: "100%",
    backgroundColor: "#249079",
  },
});