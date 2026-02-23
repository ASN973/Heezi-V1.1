import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

interface NavigationMenuItemProps {
  imageUri: string;
  label: string;
}

export function NavigationMenuItem({
  imageUri,
  label,
}: NavigationMenuItemProps) {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: imageUri }}
        resizeMode="stretch"
        style={styles.image}
      />
      <Text style={styles.text}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 24,
    marginLeft: 7,
  },
  image: {
    borderRadius: 8,
    width: 48,
    height: 48,
    marginRight: 16,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#292929",
  },
});
