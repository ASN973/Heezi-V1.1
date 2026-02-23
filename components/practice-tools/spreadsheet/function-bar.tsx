import { isMobile } from "@/utils/isMobile";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function FunctionBar() {
  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity style={styles.cellDropdown} onPress={() => {}} disabled>
        <Text style={styles.cellIndexText}>{"A20"}</Text>
        <Image
          source={require("@/assets/images/w85265az_expires_30_days.png")}
          resizeMode={"stretch"}
          style={styles.triangleIcon}
        />
      </TouchableOpacity>
      <View style={styles.fxRow}>
        <Image
          source={require("@/assets/images/cmx9ciy9_expires_30_days.png")}
          resizeMode={"stretch"}
          style={styles.xIcon}
        />
        <Image
          source={require("@/assets/images/2cz9arwn_expires_30_days.png")}
          resizeMode={"stretch"}
          style={styles.tickIcon}
        />
        <View style={styles.fxDropdown}>
          <Text style={styles.fxText}>{"fx"}</Text>
          <Image
            source={require("@/assets/images/fp37iklk_expires_30_days.png")}
            resizeMode={"stretch"}
            style={styles.triangleIcon}
          />
        </View>
      </View>
      <TextInput style={styles.input} />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: isMobile ? 16 : 32,
    gap: 8,
  },
  cellDropdown: {
    width: 88,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#EFEFEF",
    borderRadius: 8,
    padding: 8,
  },
  cellIndexText: {
    fontSize: 10,
    color: "#292929",
  },
  triangleIcon: {
    borderRadius: 8,
    width: 9,
    height: 6,
  },
  fxRow: {
    width: 96,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EFEFEF",
    borderRadius: 8,
    paddingVertical: 8,
  },
  xIcon: {
    borderRadius: 8,
    width: 12,
    height: 12,
    marginLeft: 8,
    marginRight: 10,
  },
  tickIcon: {
    borderRadius: 8,
    width: 19,
    height: 14,
    marginRight: 10,
  },
  fxDropdown: {
    width: 29,
    flexDirection: "row",
    alignItems: "center",
    marginRight: 8,
  },
  fxText: {
    fontSize: 12,
    color: "#292929",
    marginRight: 6,
  },

  input: {
    flex: 1,
    borderRadius: 8,
    marginVertical: 2,

    backgroundColor: "#EFEFEF",
  },
});
