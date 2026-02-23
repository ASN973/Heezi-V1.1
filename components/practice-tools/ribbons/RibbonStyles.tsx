import { StyleSheet } from "react-native";
// Base styles for consolidation
const buttonBase = {
  alignItems: "center" as const,
  backgroundColor: "#EFEFEF",
  borderRadius: 8,
  padding: 4,
};

const buttonBaseWhite = {
  alignItems: "center" as const,
  backgroundColor: "#FFFFFF",
  borderRadius: 8,
};

export default StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingBottom: 8,
    paddingTop: 12,
  },
  sectionTitleContainer: {
    paddingHorizontal: 16,
  },
  section: { paddingHorizontal: 16, justifyContent: "space-between" },
  sectionContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  sectionGrid: { gap: 8 },
  sectionTitle: {
    fontSize: 10,
    textAlign: "center",
  },
  buttonBase: {
    alignItems: "center" as const,
    backgroundColor: "#EFEFEF",
    borderRadius: 8,
    padding: 4,
  },
  buttonSmall: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EFEFEF",
    borderRadius: 8,
    padding: 8,
  },
  buttonMd: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EFEFEF",
    borderRadius: 8,
  },
  buttonIcon: {
    height: 10,
  },
  buttonIconMd: { height: 16, width: 16 },
  buttonIconWide: { height: 20 },
  button28: {
    ...buttonBaseWhite,
    width: 113,
    paddingVertical: 20,
  },
  button29: {
    ...buttonBaseWhite,
    width: 113,
    paddingVertical: 17,
  },
  button30: {
    ...buttonBaseWhite,
    width: 43,
    borderColor: "#000000",
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    borderWidth: 1,
    paddingVertical: 27,
  },
  verticalButton: {
    ...buttonBase,
    width: 54,
    padding: 8,
    gap: 2,
  },
  buttonColumn2: {
    ...buttonBase,
    padding: 8,
  },
  buttonDropdown: {
    ...buttonBase,
    paddingVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonColumn: { gap: 4 },
  iconMd: {
    width: 18,
    height: 18,
  },

  downArrow: {
    width: 9,
    height: 6,
  },
  image28: {
    width: 27,
    height: 15,
  },
  image29: {
    width: 31,
    height: 31,
  },
  iconBig: {
    width: 26,
    height: 20,
  },

  row10: {
    flexDirection: "row",
  },
  row11: {
    borderWidth: 1,
    borderRightWidth: 0,
    width: 242,
    flexDirection: "row",
    backgroundColor: "#EFEFEF",
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    paddingVertical: 8,
  },

  buttonsRow: {
    flexDirection: "row",
    gap: 8,
  },
  row9: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
  },
  text10: {
    fontSize: 6,
    color: "#000000",
  },
  text: {
    fontSize: 10,
  },
  text7: {
    fontSize: 10,
    color: "#000000",
  },
  text8: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#000000",
  },
  text9: {
    fontSize: 14,
    color: "#000000",
  },
});
