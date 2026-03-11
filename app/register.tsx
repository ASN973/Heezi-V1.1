import { useRouter } from 'expo-router';
import { useState } from 'react';
import { SafeAreaView }  from "react-native-safe-area-context"
import { auth, db } from '@/utils/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { isMobile } from '@/utils/isMobile';
import { Image } from 'react-native';
import { doc, setDoc } from 'firebase/firestore';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';

async function saveUserProfile(userInfo: object) {
  const user = auth.currentUser;
  console.log(user)
  if (!user) return;
  try {
    await setDoc(
      doc(db, 'users', user.uid), 
      {
      uid: user.uid,
      email: user.email,
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      updatedAt: new Date(),
      }
    );
    console.log("User created : ",user.uid);
  } catch (error: any){
    console.log('Failed to save user', error);
    throw error;
  }
}

export default function RegisterScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleRegister = async () => {
    //Check logic
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in both email and password.');
      alert('Error : Please fill in both email and password.');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters.');
      alert('Error : Password must be at least 6 characters.');
      return;
    }
    if (password != confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      alert('Error : Passwords do not match.');
      console.log('Error', 'Passwords do not match.');

      return;
    }
    
    setLoading(true);
    
    try {
      const userInfo = { firstName: firstName, lastName: lastName,email: email,}
      const userCredential = await createUserWithEmailAndPassword(auth,email,password);
      saveUserProfile(userInfo);
      const user = userCredential.user;
      Alert.alert('Success', `Account created: ${user.email}`);
      router.replace('/(tabs)/play/');
    } catch (error:any ) {
      alert("Registration failed" + error.message);
      Alert.alert('Registration failed', error.message ?? 'Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.body}>
      <SafeAreaView style={styles.container}>
        <View style={styles.wrapper}>
          <Image source={require('../assets/images/logo.png')}  />
          <Text style={styles.title}>Créer un compte</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Nom</Text>
              <TextInput
                value={lastName}
                onChangeText={setLastName}
                style={styles.input}
                placeholder="Nom de famille"
                keyboardType="default"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Prénom</Text>
              <TextInput
                value={firstName}
                onChangeText={setFirstName}
                style={styles.input}
                placeholder="Prénom"
                keyboardType="default"
                autoCapitalize="none"
              />
            </View>
            
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                placeholder="Ex : mail@example.com"
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
                placeholder="Mot de passe de 6 caractères minimum"
                secureTextEntry
                autoComplete="password"
              />
            </View>
            
            
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Confirm Password</Text>
              <TextInput
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                style={styles.input}
                placeholder="Confirmez le mot de passe"
                secureTextEntry
                autoComplete="password"
                />
            </View>

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            disabled={loading}
            onPress={handleRegister}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Creating account...' : 'Register'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.navigate('/sign-in')}
            style={styles.link}
          >
            <Text style={styles.linkText}>Already have an account? Login</Text>
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
    // backgroundColor: '#f8f9fa',
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
    borderColor: 'rgb(69 188 158)',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
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
    color: '#007bff',
    fontSize: 14,
  },
  wrapper: {
    padding:50,
    borderStyle:"solid",
    borderColor:"rgb(69 188 158)",
    backgroundColor:"#1C5348",
    borderWidth:1,
    borderRadius:8,

  }
});
