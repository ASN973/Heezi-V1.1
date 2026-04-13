import { Tabs } from "expo-router";
import { HapticTab } from "@/components/haptic-tab";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AuthWrapper from '@/components/authWrapper'
import DiagnosticGuard from "@/components/DiagnosticGuard";

export default function TabLayout() {
  const colorScheme = useColorScheme  ();
  const screenWidth = Dimensions.get("window").width;
  const isMobile = screenWidth < 768; // Use bottom tab bar on screens smaller than 768px

  return (
    <AuthWrapper>
      <DiagnosticGuard>
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
            tabBarActiveBackgroundColor: !isMobile ? "#EFEFEF" : "lightgray", // Background color for selected tab
            headerShown: false,
            tabBarButton: HapticTab,
            tabBarPosition: isMobile ? "bottom" : "left",
            tabBarStyle: isMobile ? styles.tabBarStyleMobile : styles.tabBarStyle,
            tabBarItemStyle: isMobile
            ? styles.tabBarItemStyleMobile
            : styles.tabBarItemStyle,
            tabBarIconStyle: isMobile
            ? styles.tabBarIconStyleMobile
            : styles.tabBarIconStyle,
            tabBarLabelStyle: isMobile
            ? styles.tabBarLabelStyleMobile
            : styles.tabBarLabelStyle,

            tabBarBackground: () => {
              return isMobile ? null : (
                <View style={styles.tabBarBackgroundStyle}>
                  <Image
                    source={require("../../assets/images/logo.png")}
                    resizeMode="contain"
                    style={styles.logoStyle}
                    />
                </View>
              );
            },
          }}
          >
          <Tabs.Screen
            name="play"
            options={{
              title: "Jouer",
              tabBarIcon: () => (
                <Image
                source={
                    !isMobile
                    ? require("../../assets/images/play.png")
                    : require("../../assets/images/mascot-head.png")
                  }
                  resizeMode="contain"
                  style={
                    isMobile
                      ? styles.tabBarItemIconImageMobile
                      : styles.tabBarItemIconImage
                    }
                    />
                  ),
                }}
          />
          <Tabs.Screen
            name="profil"
            options={{
              title: "Profil",
              tabBarIcon: () => (
                <Image
                source={require("../../assets/images/profil.png")}
                resizeMode="contain"
                style={
                    isMobile
                    ? styles.tabBarItemIconImageMobile
                      : styles.tabBarItemIconImage
                    }
                    />
                  ),
                }}
          />
          <Tabs.Screen
            name="score"
            options={{
              title: "Score",
              tabBarIcon: () => (
                <Image
                  source={require("../../assets/images/score.png")}
                  resizeMode="contain"
                  style={
                    isMobile
                    ? styles.tabBarItemIconImageMobile
                    : styles.tabBarItemIconImage
                  }
                />
              ),
            }}
          />
          <Tabs.Screen
            name="succes"
            options={{
              title: "Succès",
              tabBarIcon: () => (
                <Image
                source={require("../../assets/images/succes.png")}
                  resizeMode="contain"
                  style={
                    isMobile
                      ? styles.tabBarItemIconImageMobile
                      : styles.tabBarItemIconImage
                  }
                  />
              ),
            }}
          />        
          <Tabs.Screen
            name="logout"
            options={{
              title: "Déconnexion",
              tabBarIcon: () => (
                <MaterialIcons 
                name="logout"
                size={30}
                color="black"
                />
              ),
            }}
          />
          <Tabs.Screen
            name="index"
            options={{
              tabBarItemStyle: { display: 'none' },
            }}
          />
        </Tabs>
      </DiagnosticGuard>
    </AuthWrapper>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: "white",
    elevation: 0,
    shadowOpacity: 0,
    paddingTop: 93,
    paddingRight: 16,
    alignItems: "center",
    minWidth: 164,
    maxWidth: 164,
    margin: 16,
  },
  tabBarBackgroundStyle: {
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 16,
    marginTop: 16,
  },
  logoStyle: {
    height: 40,
  },
  tabBarItemStyle: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    marginVertical: 16,
  },
  tabBarIconStyle: {
    marginRight: 8,
  },

  tabBarLabelStyle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  tabBarItemIconImage: {
    width: 32,
    height: 32,
  },
  tabBarItemIconImageMobile: {
    width: 42,
    height: 42,
  },
  // Mobile (bottom tab bar) styles
  tabBarStyleMobile: {
    
    backgroundColor: "white",
    elevation: 20,
    shadowOpacity: 0,
    height: 85,
    paddingBottom: 8,
    paddingTop: 7,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
  tabBarItemStyleMobile: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-around",
    paddingVertical: 4,
  },
  tabBarIconStyleMobile: {
    marginRight: 0,
    marginBottom: 4,
  },
  tabBarLabelStyleMobile: {
    fontSize: 12,
    fontWeight: "600",
    color: "black",
  },
  mobileBackgroundStyle: {
    flex: 1,
    alignSelf: "flex-end",
    height: 36,
    width: 36,
    marginRight: 16,
  },
});
