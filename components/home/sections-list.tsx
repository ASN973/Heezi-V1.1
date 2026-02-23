import usePracticeToolConstants from "@/hooks/usePracticeToolConstants";
import { router } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
export default function SectionsList() {
  const { practiceTool } = usePracticeToolConstants();
  return (
    <View style={styles.container}>
      <View style={styles.column}>
        <View style={styles.column2}>
          <Text style={styles.text}>{"Section 1"}</Text>
          <TouchableOpacity style={styles.button} onPress={() => {}} disabled>
            <View style={styles.view}>
              <View style={styles.box}></View>
            </View>
          </TouchableOpacity>
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.buttonRow}
              onPress={() =>
                router.push(`/(tabs)/play/${practiceTool}/section-screen`)
              }
            >
              <Text style={styles.text2}>{"Continuer"}</Text>
              <Image
                source={require("@/assets/images/continue-icon.png")}
                resizeMode={"contain"}
                style={styles.image}
              />
            </TouchableOpacity>
            <Image
              source={require("@/assets/images/9uv8qf21_expires_30_days.png")}
              resizeMode={"contain"}
              style={styles.image2}
            />
            <Image
              source={require("@/assets/images/qzp5ge44_expires_30_days.png")}
              resizeMode={"contain"}
              style={styles.image3}
            />
            <Image
              source={require("@/assets/images/2eub5oiv_expires_30_days.png")}
              resizeMode={"contain"}
              style={styles.image4}
            />
            <Image
              source={require("@/assets/images/muewt0o1_expires_30_days.png")}
              resizeMode={"contain"}
              style={styles.image5}
            />
            <Image
              source={require("@/assets/images/h88sgh3z_expires_30_days.png")}
              resizeMode={"contain"}
              style={styles.image6}
            />
            <Image
              source={require("@/assets/images/x3xlnrws_expires_30_days.png")}
              resizeMode={"contain"}
              style={styles.absoluteImage}
            />
            <Image
              source={require("@/assets/images/k8yljswe_expires_30_days.png")}
              resizeMode={"contain"}
              style={styles.absoluteImage2}
            />
            <Image
              source={require("@/assets/images/k87xra1i_expires_30_days.png")}
              resizeMode={"contain"}
              style={styles.absoluteImage3}
            />
            <Image
              source={require("@/assets/images/x2n5y6hw_expires_30_days.png")}
              resizeMode={"contain"}
              style={styles.absoluteImage4}
            />
            <Image
              source={require("@/assets/images/zyj8nexa_expires_30_days.png")}
              resizeMode={"contain"}
              style={styles.absoluteImage5}
            />
          </View>
        </View>
        <Image
          source={require("@/assets/images/aik0c764_expires_30_days.png")}
          resizeMode={"contain"}
          style={styles.absoluteImage6}
        />
      </View>
      <View style={styles.row2}>
        <View style={styles.column3}>
          <View style={styles.column}>
            <Text style={styles.text3}>{"Section 2"}</Text>
            <View style={styles.view2}>
              <View style={styles.view3}>
                <View style={styles.box}></View>
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={styles.buttonRow2}
            onPress={() => {}}
            disabled
          >
            <Text style={styles.text4}>{"Continuer"}</Text>
            <Image
              source={require("@/assets/images/sy8w1ahc_expires_30_days.png")}
              resizeMode={"contain"}
              style={styles.image}
            />
          </TouchableOpacity>
        </View>
        <Image
          source={require("@/assets/images/kvf6wzrn_expires_30_days.png")}
          resizeMode={"contain"}
          style={styles.image7}
        />
      </View>
      <View style={styles.row3}>
        <View style={styles.column3}>
          <View style={styles.column}>
            <Text style={styles.text3}>{"Section 3"}</Text>
            <View style={styles.view2}>
              <View style={styles.view3}>
                <View style={styles.box}></View>
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={styles.buttonRow3}
            onPress={() => {}}
            disabled
          >
            <Text style={styles.text4}>{"Continuer"}</Text>
            <Image
              source={require("@/assets/images/l29fup9x_expires_30_days.png")}
              resizeMode={"contain"}
              style={styles.image}
            />
          </TouchableOpacity>
        </View>
        <Image
          source={require("@/assets/images/xdcz0s8c_expires_30_days.png")}
          resizeMode={"contain"}
          style={styles.image8}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
  },
  absoluteImage: {
    position: "absolute",
    top: 28,
    right: 67,
    width: 141,
    height: 28,
  },
  absoluteImage2: {
    position: "absolute",
    top: 29,
    right: 67,
    width: 141,
    height: 36,
  },
  absoluteImage3: {
    position: "absolute",
    top: 0,
    right: 116,
    width: 57,
    height: 47,
  },
  absoluteImage4: {
    position: "absolute",
    bottom: 24,
    right: 0,
    width: 57,
    height: 6,
  },
  absoluteImage5: {
    position: "absolute",
    bottom: 9,
    right: 25,
    width: 6,
    height: 28,
  },
  absoluteImage6: {
    position: "absolute",
    top: 32,
    right: -4,
    width: 169,
    height: 169,
  },
  box: {
    width: 63,
    height: 8,
    backgroundColor: "#33C6FD",
  },
  button: {
    alignSelf: "flex-start",
    backgroundColor: "#EFEFEF",
    borderRadius: 8,
    padding: 8,
    marginBottom: 7,
    marginLeft: 32,
  },
  buttonRow: {
    flexDirection: "row",
    backgroundColor: "#72D6BA",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginTop: 24,
    marginRight: 25,
  },
  buttonRow2: {
    alignSelf: "flex-start",
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 33,
  },
  buttonRow3: {
    alignSelf: "flex-start",
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 57,
  },
  column: {
    marginBottom: 32,
  },
  column2: {
    backgroundColor: "#D3F4E9",
    borderRadius: 8,
    paddingVertical: 32,
  },
  column3: {
    flex: 1,
    marginRight: 33,
  },
  image: {
    borderRadius: 8,
    width: 16,
    height: 24,
  },
  image2: {
    width: 10,
    height: 86,
    marginTop: 60,
    marginRight: 65,
  },
  image3: {
    width: 7,
    height: 78,
    marginTop: 32,
    marginRight: 23,
  },
  image4: {
    width: 10,
    height: 86,
    marginTop: 60,
    marginRight: 18,
  },
  image5: {
    width: 7,
    height: 78,
    marginTop: 32,
    marginRight: 34,
  },
  image6: {
    width: 8,
    height: 45,
    marginTop: 74,
    marginRight: 25,
  },
  image7: {
    borderRadius: 8,
    height: 171,
    flex: 1,
  },
  image8: {
    borderRadius: 8,
    height: 195,
    flex: 1,
  },
  row: {
    alignSelf: "flex-start",
    flexDirection: "row",
    marginLeft: 32,
  },
  row2: {
    flexDirection: "row",
    backgroundColor: "#EFEFEF",
    borderRadius: 8,
    padding: 32,
    marginBottom: 32,
  },
  row3: {
    flexDirection: "row",
    backgroundColor: "#EFEFEF",
    borderRadius: 8,
    padding: 32,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 16,
    marginLeft: 32,
  },
  text2: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0A2924",
    marginRight: 11,
  },
  text3: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 15,
  },
  text4: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#292929",
    marginRight: 11,
  },
  view: {
    alignSelf: "flex-start",
    backgroundColor: "#989898",
    borderRadius: 4,
    paddingRight: 120,
  },
  view2: {
    backgroundColor: "#EFEFEF",
    borderRadius: 8,
    padding: 8,
  },
  view3: {
    backgroundColor: "#989898",
    borderRadius: 4,
  },
});
