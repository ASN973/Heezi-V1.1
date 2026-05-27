import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";

import { db } from "@/utils/firebase";
import { useAuth } from "@/context/useAuth";

interface UserProfile {
  course?: string;  
  email?: string;
  firstName?: string;
  lastName?: string;
  level?: number;
  experience?: number;
}

export function useUserProfile() {
  const { user } = useAuth();
  
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchProfile = async () => {
      try {
        const userRef = doc(db, "users", user.uid);

        const snapshot = await getDoc(userRef);
        
        if (snapshot.exists()) setProfile(snapshot.data() as UserProfile);

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  return { profile, loading };
}