import { JSX, useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { useAuth } from "@/context/useAuth";

export default function DiagnosticGuard({children}: {children: JSX.Element}) {
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
        // Redirect to the diagnostic if not found else return the children
      if (!data?.diagnosticResult) {
        router.replace("/diagnosticQuiz");
      }
    }

    check();
  }, [user]);

  return children;
}