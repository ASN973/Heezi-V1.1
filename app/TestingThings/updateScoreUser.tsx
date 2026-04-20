import React, { useEffect } from 'react';
import { doc, setDoc, getDoc,arrayUnion } from 'firebase/firestore';
import { auth, db } from '@/utils/firebase';
import { Text } from 'react-native';
import { useAuth } from '@/context/useAuth';




async function saveDiagnosticResult (user, scorePercent, recommendedLevel) {
    // Logic:
    //     - We are checking if there is a user because it won't work without it
    //     - We also checks if the diagnosticResult is blank
    //     - We add the DiagnosticResult
    //     - We check in the console if it is good

        if (!user) return;

        const ref = doc(db, "users", user.uid, "diagnosticResult", "data");

        // check existence
        const snap = await getDoc(ref);
        
        //Create the attempt array
        const attempt = {
            scorePercent: scorePercent,
            recommendedLevel: recommendedLevel,
            createdAt: new Date()
        }

        if (snap.exists()) {
            console.log("Already exists");
            return;
        }
        
        //Store it
        await setDoc(ref, { diagnosticResult: arrayUnion(attempt) }, { merge: true });
        
    }

export default function DiagnosticResult(){
    const { user } = useAuth();
    
    useEffect(() => {
        saveDiagnosticResult(user, 50, 5);
    }, [user]);
    
    
    return (

        <Text>Yooooooo le diagnostic result est dans la console</Text>
    )
}