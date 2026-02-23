import SuivantBtnModal from "@/components/ui/suivantBtnModal";
import { useEffect } from "react";
import {
  Image,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";

interface MascotModalProps {
  open: boolean;
  onClose: () => void;
  modalText?: string;
}

export default function MascotModal({
  open,
  onClose,
  modalText,
}: MascotModalProps) {
  // Blur any focused elements when modal opens to prevent aria-hidden accessibility issues
  useEffect(() => {
    if (open && Platform.OS === "web") {
      const activeElement = document.activeElement as HTMLElement;
      if (activeElement && activeElement.blur) {
        activeElement.blur();
      }
    }
  }, [open]);

  return (
    <Modal
      visible={open}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose} accessible={false}>
        <View style={styles.mainContainer}>
          <View style={styles.modalContent}>
            <Image
              source={require("@/assets/images/paauqhmf_expires_30_days.png")}
              resizeMode={"contain"}
              style={styles.mascotImage}
            />

            <View style={styles.modalTextBox}>
              <Text style={styles.modalText}>{modalText || "..."}</Text>
            </View>
            <SuivantBtnModal text="Continuer" onPress={onClose} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    padding: 16,
  },
  modalContent: {
    gap: 8,
    borderWidth: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#1E6759",
    shadowOpacity: 1.0,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    maxWidth: 600,
    width: "90%",
  },
  mascotImage: {
    borderRadius: 8,
    width: "100%",
    height: 300,
    marginBottom: 8,
  },
  arrowDownImage: {
    borderRadius: 8,
    width: 32,
    height: 21,
  },
  modalText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#292929",
  },
  modalTextBox: {
    padding: 16,
    backgroundColor: "#EFEFEF",
    borderRadius: 8,
    width: "100%",
    maxWidth: 500,
  },
});
