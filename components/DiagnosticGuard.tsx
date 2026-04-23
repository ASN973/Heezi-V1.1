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

    async function checkDiagnostic() {
      // Asks the db if the user exists 
      const snap = await getDoc(doc(db, "users", user.uid,"diagnosticResult","result"));
      
      // Check if the subcollection exists 
      // Redirect to the diagnostic if not found else return the children
      if (!snap.exists()) {
        router.replace("/mission/diagnostic/1/diagnostic-quiz");
      }
      
    }

    checkDiagnostic();
  }, [user]);

  return children;
}