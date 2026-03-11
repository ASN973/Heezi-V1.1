import { collectionGroup, query, where, getDocs } from "firebase/firestore";  
import { auth, db } from '@/utils/firebase';
import React from 'react';
import { View,Text } from "react-native";

export default function HomePage(){
    getUsers();
    <View>
        <Text>Hiiiii</Text>
    </View>
}
async function getUsers() {
    const users = query(
        collectionGroup(db, 'users'), 
        // where('type', '==', 'museum')
    );
    const querySnapshot = await getDocs(users);
    querySnapshot.forEach((doc) => {
        console.log(doc.id, ' => ', doc.data());
    });
}

// rules_version = '2';
// service cloud.firestore {
//   match /databases/{database}/documents {
//     // ✅ ALLOWS EVERYTHING (read + write anywhere)
//     match /{document=**} {
//       allow read, write: if true;
//     }
//   }
// }

// rules_version = '2';
// service cloud.firestore {
//   match /databases/{database}/documents {
//     // Users can read/write their own profile
//     match /users/{userId} {
//       allow read, write: if request.auth != null && request.auth.uid == userId;
//     }
//   }
// }