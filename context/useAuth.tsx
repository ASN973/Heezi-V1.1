// ctx/AuthContext.tsx
import { Alert } from 'react-native';
import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, User  } from 'firebase/auth';
import { auth } from '@/utils/firebase';
// A Context is variables that are used for all of the app 
// we Define the context type and the default value they are null because no user was in it
const AuthContext = createContext<{
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}>({
  user: null,
  isLoading: true,
  signIn: async () => {},
  signOut: async () => {},
}); 

// That is the wrapper we're going to use in the layout to allow the access to the pages
export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  //Change variables based on the change of the auth state
  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, (user : User | null) => {
      setUser(user);
      setIsLoading(false);
    });

    return subscriber;
  }, []);

  // We use firebase function -> change the onAuthState -> Change User
  const signIn = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
    }
    catch ( error:any ){
      console.log("Login FAILED:", error.code, error.message);
      throw error;
    }
  };
  // Same for the logout 
  const logout = async () => {
    await signOut(auth);
  };

  // -> Wraps the entire app and publishes the context
  // -> Allow the app to use these attributes (children is the app)
  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signOut: logout }}>
      {children}
    </AuthContext.Provider>
  );
}
export function useAuth() {
    // -> Reads the last value of the authContext(user..) 
    // -> send an error if the function is not used in a AuthContext
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside SessionProvider');
  }
  return context;
}
