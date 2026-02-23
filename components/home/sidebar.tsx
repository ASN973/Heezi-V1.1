import { Image, StyleSheet, Text, View } from "react-native";
import { NavigationMenuItem } from "./navigation-menu-item";

export function Sidebar() {
  const menuItems = [
    {
      imageUri: require("@/assets/images/kxrsaswj_expires_30_days.png"),
      label: "Jouer",
    },
    {
      imageUri: require("@/assets/images/u14kpgxz_expires_30_days.png"),
      label: "Profil",
    },
    {
      imageUri: require("@/assets/images/1b0ke18y_expires_30_days.png"),
      label: "Score",
    },
  ];

  return (
    <View style={styles.sidebar}>
      <Image
        source={require("@/assets/images/qih0dnn3_expires_30_days.png")}
        resizeMode="stretch"
        style={styles.logo}
      />
      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <NavigationMenuItem
            key={index}
            imageUri={item.imageUri}
            label={item.label}
          />
        ))}
        <View style={styles.lastMenuItem}>
          <Image
            source={require("@/assets/images/wfgit8hu_expires_30_days.png")}
            resizeMode="stretch"
            style={styles.menuIcon}
          />
          <Text style={styles.menuText}>{"Succès"}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    width: 193,
    alignItems: "center",
    marginTop: 32,
    marginLeft: 31,
  },
  logo: {
    width: 191,
    height: 69,
    marginBottom: 32,
  },
  menuContainer: {
    paddingVertical: 8,
  },
  menuIcon: {
    borderRadius: 8,
    width: 48,
    height: 48,
    marginRight: 16,
  },
  menuText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#292929",
  },
  lastMenuItem: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    marginLeft: 7,
  },
});
