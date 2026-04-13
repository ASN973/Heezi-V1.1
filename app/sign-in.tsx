import React, { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { isMobile } from '@/utils/isMobile';
import { SafeAreaView }  from "react-native-safe-area-context"
import { useAuth } from '@/context/useAuth';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';



function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localIsLoading, setlocalIsLoading] = useState(false);
  const { signIn, user } = useAuth();
  const router = useRouter();
  
  //Check if user already loggedIn
  useEffect(() => {
    if (user) {
      router.replace('/play/spreadsheet/'); // or your protected route
    }
  }, [user]);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in both email and password.');
      alert('Error : Please fill in both email and password.');
      return;
    }
    try {
      setlocalIsLoading(true);
      await signIn(email,password);
    } 
    catch (error: any) {
      Alert.alert('Login Failed', error.message || 'Check your email and password.');
      alert("Login Failed : " + error.message);
    } 
    finally{
      setlocalIsLoading(false);
    }
};

return (
  <View style={styles.body}>
  <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
      <Image 
        source={require('../assets/images/logo.png')}  
        style={styles.image}
      />
      <Text style={styles.title}>Login</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            placeholder="email@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            placeholder="••••••••"
            secureTextEntry
            autoComplete="password"
          />
        </View>
        
        <TouchableOpacity
          style={[styles.button, localIsLoading && styles.buttonDisabled]}
          disabled={localIsLoading}
          onPress={handleLogin}
        >
          <Text style={styles.buttonText}>
            {localIsLoading ? 'Logging in...' : 'Login'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.navigate('./register')}
          style={styles.link}
        >
          <Text style={styles.linkText}>Don’t have an account? Register</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  </View>
  
);
}

const styles = StyleSheet.create({
  body:{
    backgroundColor: '#FDEFC8',
    height:'100%'
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    marginLeft: isMobile ? 15 : 250,
    marginRight:isMobile ? 15 : 250,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#72D6BA',
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
    color: '#72D6BA',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'rgb(69 188 158)',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderStyle:'solid',
  },
  button: {
    backgroundColor: 'rgb(69 188 158)',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  link: {
    alignItems: 'center',
    marginTop: 12,
  },
  linkText: {
    color: 'rgb(69 188 158)',
    fontSize: 14,
  },
  wrapper: {
    padding:50,
    borderStyle:"solid",
    borderColor:"rgb(69 188 158)",
    backgroundColor:"#1C5348",
    borderRadius:8,
    borderWidth:1,

  },
  image: {
    width: 200,
    height:55,
  }
});

export default LoginScreen;