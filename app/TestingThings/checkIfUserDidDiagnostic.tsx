import { Text, View } from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { useAuth } from "@/context/useAuth";

export default function DiagnosticQuiz() {
  const { user } = useAuth();
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  
  // Checks if user already did the diagnosticQuiz
  useEffect(() => {
    if (!user){
      router.replace("/sign-in");
      return;
    };

    async function check() {
      // Asks the db if the user exists 
      const snap = await getDoc(doc(db, "users", user.uid));

      if (!snap.exists()) return;
      
      // Gets all the data
      const data = snap.data();

      console.log("snap exists:", snap.exists());
      
      // Parse data to find the diagnostic result 
      if (!data?.diagnosticResult) {
        console.log("data:", data.firstName);
        console.log("blank data:", data.diagnosticResult);
        // router.replace("/diagnostic-quiz");
      } else {
        setData(data.diagnosticResult);
        console.log("Blud already did it.")
      }
    }

    check();
  }, [user]);

  return (
    <View>
      <Text>
        {data ? JSON.stringify(data) : "Loading..."} Je suis Texte
      </Text>
    </View>
  );
}