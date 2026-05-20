import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Image } from "react-native";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/utils/firebase"; 
import { router, Stack } from "expo-router";

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleReset = async () => {
    if (!email.trim()) {
      setError("Veuillez saisir votre adresse email.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await sendPasswordResetEmail(auth, email.trim());
      setSent(true);
    } catch (e: any) {
      setError(getFirebaseError(e.code));
    } finally {
      setLoading(false);
    }
  };

  // Traduction des codes d'erreur Firebase en français lisible
  const getFirebaseError = (code: string): string => {
    switch (code) {
      case "auth/user-not-found":
        return "Aucun compte associé à cet email.";
      case "auth/invalid-email":
        return "L'adresse email n'est pas valide.";
      case "auth/too-many-requests":
        return "Trop de tentatives. Réessaie plus tard.";
      default:
        return "Une erreur est survenue. Réessaie.";
    }
  };

  if (sent) {
    return (
      <View style={styles.container}>
        <View style={styles.wrapper}>
            <Text style={styles.title}>Email envoyé !</Text>
            <Text style={styles.subtitle}>
            Vérifie dans tes spams ou dans ta boîte de réception et clique sur le lien pour changer ton mot de passe.
            </Text>
            <TouchableOpacity style={styles.button} onPress={() => router.back()}>
            <Text style={styles.buttonText}>Retour à la connexion</Text>
            </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>

        <View style={styles.wrapper}>

        <Image 
            source={require('../assets/images/logo.png')}  
            style={styles.image}
            />
        <Text style={styles.title}>Mot de passe oublié ?</Text>
        <Text style={styles.subtitle}>
            Saisis ton adresse email, on t'envoie un lien pour le réinitialiser.
        </Text>

        <TextInput
            style={styles.input}
            placeholder="ton@email.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            onSubmitEditing={handleReset}
            returnKeyType="send" 
        />

        {error && <Text style={styles.error}>{error}</Text>}

        <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleReset}
            disabled={loading}
        >
            {loading
            ? <ActivityIndicator color="#fff" />
            : <Text style={styles.buttonText}>Envoyer le lien</Text>
            }
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.back()} style={styles.backLink}>
            <Text style={styles.backText}>← Retour à la connexion</Text>
        </TouchableOpacity>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: '#FDEFC8'
  },
  wrapper: {
    padding:50,
    borderStyle:"solid",
    borderColor:"rgb(69 188 158)",
    backgroundColor:"#1C5348",
    borderRadius:8,
    borderWidth:1,
},
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 8,
    color: "rgb(69 188 158)",
  },
  subtitle: {
    fontSize: 14,
    color: "#ffffff",
    marginBottom: 24,
    lineHeight: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
    marginBottom: 12,
    color:"#000",
    backgroundColor:"#FFF"
  },
  error: {
    color: "#e53e3e",
    fontSize: 13,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "rgb(69 188 158)",
    borderRadius: 10,
    padding: 14,
    alignItems: "center",
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
  },
  backLink: {
    marginTop: 16,
    alignItems: "center",
  },
  backText: {
    color: "rgb(69 188 158)",
    fontSize: 13,
  },
  image: {
    width: 200,
    height:55,
    marginBottom:22
  }
});