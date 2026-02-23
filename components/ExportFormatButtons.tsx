import useLevelData from "@/hooks/use-level-data";
import useExportSpreadsheetValues from "@/hooks/useExportSpreadsheetValues";
import useExportTextEditorValues from "@/hooks/useExportTextEditorValues";
import { exportTextEditorDocx } from "@/utils/exportDocx";
import { exportSpreadsheetPdf, exportTextEditorPdf } from "@/utils/exportPdf";
import { useLocalSearchParams } from "expo-router";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { exportXlsx } from "../utils/exportXlsx";

const ExportXlsxButton = () => {
  const { contents } = useExportSpreadsheetValues();
  const { title } = useLevelData();
  const { width } = useWindowDimensions();
  const handleExportXlsx = () => {
    if (!contents.length) {
      Alert.alert(
        "Nothing to export",
        "We couldn't find any data to include in the spreadsheet."
      );
      return;
    }

    try {
      exportXlsx(title, contents);
    } catch (error) {
      console.error("Failed to export XLSX", error);
      Alert.alert(
        "Export failed",
        "Something went wrong while preparing your spreadsheet. Please try again."
      );
    }
  };

  const responsiveStyles = {
    button: {
      ...styles.buttonRow,
      width: Math.max(70, Math.min(110, width * 0.25)),
      paddingVertical: Math.max(4, Math.min(8, width * 0.015)),
      paddingHorizontal: Math.max(8, Math.min(16, width * 0.035)),
      marginHorizontal: Math.max(4, Math.min(8, width * 0.015)),
    },
    image: {
      ...styles.image,
      width: Math.max(14, Math.min(30, width * 0.07)),
      height: Math.max(17, Math.min(36, width * 0.085)),
      marginRight: Math.max(4, Math.min(10, width * 0.02)),
    },
    text: {
      ...styles.text,
      fontSize: Math.max(12, Math.min(18, width * 0.04)),
    },
  };

  return (
    <TouchableOpacity
      style={responsiveStyles.button}
      onPress={handleExportXlsx}
    >
      <Image
        source={require("@/assets/images/ceguc7fq_expires_30_days.png")}
        resizeMode={"stretch"}
        style={responsiveStyles.image}
      />
      <Text style={responsiveStyles.text}>{".xls"}</Text>
    </TouchableOpacity>
  );
};

const ExportPdfButton = () => {
  const { practiceTool } = useLocalSearchParams();
  const { title } = useLevelData();
  const { width } = useWindowDimensions();
  const getValuesHook =
    practiceTool === "spreadsheet"
      ? useExportSpreadsheetValues
      : useExportTextEditorValues;
  const { contents } = getValuesHook();

  const handleExportPdf = async () => {
    if (!contents.length) {
      Alert.alert(
        "Nothing to export",
        "We couldn't find any data to include in the PDF."
      );
      return;
    }

    try {
      if (practiceTool === "spreadsheet") {
        await exportSpreadsheetPdf(
          title,
          contents as ReturnType<typeof useExportSpreadsheetValues>["contents"]
        );
      } else {
        await exportTextEditorPdf(
          title,
          contents as ReturnType<typeof useExportTextEditorValues>["contents"]
        );
      }
    } catch (error) {
      console.error("Failed to export PDF", error);
      Alert.alert(
        "Export failed",
        "Something went wrong while preparing your PDF. Please try again."
      );
    }
  };

  const responsiveStyles = {
    button: {
      ...styles.buttonRow2,
      width: Math.max(70, Math.min(119, width * 0.23)),
      paddingVertical: Math.max(4, Math.min(8, width * 0.015)),
      paddingHorizontal: Math.max(8, Math.min(16, width * 0.035)),
      marginRight: Math.max(4, Math.min(8, width * 0.015)),
    },
    image: {
      ...styles.image,
      width: Math.max(14, Math.min(30, width * 0.07)),
      height: Math.max(17, Math.min(36, width * 0.085)),
      marginRight: Math.max(4, Math.min(10, width * 0.02)),
    },
    text: {
      ...styles.text,
      fontSize: Math.max(12, Math.min(18, width * 0.04)),
    },
  };

  return (
    <TouchableOpacity
      style={responsiveStyles.button}
      onPress={() => {
        void handleExportPdf();
      }}
    >
      <Image
        source={require("@/assets/images/0a6n5ovw_expires_30_days.png")}
        resizeMode={"stretch"}
        style={responsiveStyles.image}
      />
      <Text style={responsiveStyles.text}>{".pdf"}</Text>
    </TouchableOpacity>
  );
};

const ExportDocxButton = () => {
  const { contents } = useExportTextEditorValues();
  const { title } = useLevelData();
  const { width } = useWindowDimensions();
  const handleExportDocx = async () => {
    if (!contents.length) {
      Alert.alert(
        "Nothing to export",
        "We couldn't find any data to include in the document."
      );
      return;
    }

    try {
      await exportTextEditorDocx(title, contents);
    } catch (error) {
      console.error("Failed to export DOCX", error);
      Alert.alert(
        "Export failed",
        "Something went wrong while preparing your document. Please try again."
      );
    }
  };

  const responsiveStyles = {
    button: {
      ...styles.buttonRow3,
      width: Math.max(75, Math.min(132, width * 0.23)),
      paddingVertical: Math.max(4, Math.min(8, width * 0.015)),
      paddingHorizontal: Math.max(8, Math.min(16, width * 0.01)),
      marginRight: Math.max(4, Math.min(8, width * 0.015)),
    },
    image: {
      ...styles.image,
      width: Math.max(14, Math.min(30, width * 0.07)),
      height: Math.max(17, Math.min(36, width * 0.085)),
      marginRight: Math.max(4, Math.min(10, width * 0.02)),
    },
    text: {
      ...styles.text,
      fontSize: Math.max(12, Math.min(18, width * 0.04)),
    },
  };

  return (
    <TouchableOpacity
      style={responsiveStyles.button}
      onPress={() => {
        void handleExportDocx();
      }}
    >
      <Image
        source={require("@/assets/images/xhzm8bjz_expires_30_days.png")}
        resizeMode={"stretch"}
        style={responsiveStyles.image}
      />
      <Text style={responsiveStyles.text}>{".docx"}</Text>
    </TouchableOpacity>
  );
};

export default function ExportFormatButtons() {
  const { practiceTool } = useLocalSearchParams();
  const { width } = useWindowDimensions();
  const responsiveRowStyle = {
    ...styles.row,
    paddingVertical: Math.max(4, Math.min(8, width * 0.015)),
    marginBottom: Math.max(8, Math.min(16, width * 0.035)),
  };
  return (
    <View style={responsiveRowStyle}>
      <ExportPdfButton />
      {practiceTool === "spreadsheet" && <ExportXlsxButton />}
      {practiceTool === "textEditor" && <ExportDocxButton />}
    </View>
  );
}

const styles = StyleSheet.create({
  buttonRow: {
    width: 110,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: 8,
  },
  buttonRow2: {
    width: 119,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
  },
  buttonRow3: {
    width: 132,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
  },
  buttonRow4: {
    width: 119,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 56,
  },
  image: {
    borderRadius: 8,
    width: 30,
    height: 36,
    marginRight: 10,
  },
  row: {
    flexDirection: "row",
    backgroundColor: "#EFEFEF",
    borderRadius: 8,
    paddingVertical: 8,
    marginBottom: 16,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#292929",
  },
});
