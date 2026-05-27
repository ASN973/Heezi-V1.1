import ProgressBar from "@/components/ui/progress-bar";
import TTSButton from "@/components/ui/TTS-button";

import { View, Text, StyleSheet, TouchableOpacity} from 'react-native'
export default function Sandbox() {
  return (
  <View>
    <TTSButton text="Nigga"/>
    <ProgressBar fill={70}/>
  </View>
);
}
