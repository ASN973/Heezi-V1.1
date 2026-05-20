import * as Speech from 'expo-speech';
import { View, StyleSheet, TouchableOpacity} from 'react-native'
import Entypo from '@expo/vector-icons/Entypo';

type Answer = {
    text: string;
};

type TTSButtonProps = {
  question: string;
  answer: Answer[];
};

export default function TTSButton( { question, answer }: TTSButtonProps) {
    const handleSpeak = async () => {
        const isSpeaking = await Speech.isSpeakingAsync();
        console.log(Speech.getAvailableVoicesAsync())
        if (isSpeaking){
            Speech.stop(); // On coupe
            return
        }

        Speech.speak(question, { 
            language: 'fr-FR', 
            rate: 0.95,
            pitch: 1.0,
        });

        for (let i = 0; i < answer.length ; i++){
            Speech.speak(answer[i].text, { 
            language: 'fr-FR', 
            rate: 0.95,
        });
        }
          
    };
    return(
        <View style={css.container}>
            <TouchableOpacity style={css.icon} onPress={handleSpeak}>
                <Entypo name="sound" size={24} color="#fdefc8" />
            </TouchableOpacity>
        </View>
    )
}

const css = StyleSheet.create({
    container: {
        backgroundColor: "#1c5348",
        borderRadius: 50,
        height: 70,
        width: 70,
        top:750,
        right:'2%',
        position: "absolute"
    },

    icon: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        width: "100%",
    },
});