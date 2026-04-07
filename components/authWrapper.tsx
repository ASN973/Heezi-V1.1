import { View, ActivityIndicator } from "react-native";
import { useAuth } from "@/context/useAuth";
import { useRouter } from "expo-router";
import { JSX, useEffect, useState } from "react";

export default function AuthWrapper({children}: { children: JSX.Element }) {
  const router = useRouter()
  const { user, isLoading } = useAuth();
  const [ready, setReady] = useState(false);
  
  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.replace("/sign-in"); 
      }
      setReady(true); // allow Stack to render if user is authenticated
    }
  }, [user, isLoading]);
  
  if (isLoading || !ready) {
    // show loading until auth state is resolved
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return children;

}