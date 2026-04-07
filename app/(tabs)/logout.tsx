import React from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/useAuth';
import { Alert, View, StyleSheet } from 'react-native';

export default function LogoutScreen() {
    const handleLogout = async () => {
        const router = useRouter();
        const auth = useAuth();
        try {
            await auth.signOut();
            console.log('User signed out successfully');
            router.replace('/sign-in');
    
        }
        catch (error: any){
          Alert.alert('Logout Failed', error.message || 'Check your email and password.');
        }
    }
    handleLogout();
    return (
        <View style={styles.body}>

        </View>
    )
    
}
const styles = StyleSheet.create({ 
  body:{
    backgroundColor: '#FDEFC8',
    height:'100%'
  },
}
)