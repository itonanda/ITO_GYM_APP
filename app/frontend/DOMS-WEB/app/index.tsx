import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function LoginScreen() {
  const router = useRouter();
  const apiURL = process.env.EXPO_PUBLIC_API_URL;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

   const handleSignIn = () => {
    if(email.length === 0) {
        Alert.alert('Attention','Please enter both email');
        return;
    }
    else if(password.length === 0) {
        Alert.alert('Attention','Please enter both password');
        return;
    }
    else {
      // fetch(`${apiURL}/auth/signin`, {
      fetch(`${apiURL}/auth/sign-in`, {
        method: 'POST',
        headers: {
          // authorization: "Bearer YOUR_KEY",
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          if(data.user.user_metadata.role === "admin"){
            router.replace({
            pathname: '/(tabs)/dashboard',
            params: { accessToken: data.session.access_token }
            });
          } else {
            router.replace({
            pathname: '/'
            });
            alert('Please enter admin user');
            return;
          }
        })
        .catch(error => {
          alert('Please enter both email and password coorrect');
          console.error('Error:', error);
        });
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/images/bg_logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Form */}
      <View style={styles.formContainer}>
        <Text style={styles.title}>Sign-in</Text>

        <Text style={styles.label}>Email</Text>

        <TextInput
          placeholder=""
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />

        <Text style={[styles.label, { marginTop: 18 }]}>Password</Text>

        <TextInput
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />

        <View style={styles.row}>
          <TouchableOpacity
            style={styles.rememberContainer}
            onPress={() => setRemember(!remember)}
          >
            <View
              style={[styles.checkbox, remember && styles.checkboxActive]}
            />
            <Text style={styles.rememberText}>Remember me</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.loginButton}
          // onPress={() => router.replace("/(tabs)/dashboard")}
          // onPress={() => handleSignIn}
          onPress={handleSignIn}
        >
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F3F3",
  },

  logoContainer: {
    position: "absolute",
    top: 30,
    left: 30,
  },

  logo: {
    width: 300,
    height: 100,
  },

  formContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 40,
    fontWeight: "700",
    color: "#231A72",
    marginBottom: 40,
  },

  label: {
    width: 380,
    textAlign: "left",
    fontSize: 18,
    fontWeight: "600",
    color: "#231A72",
    marginBottom: 10,
  },

  input: {
    width: 380,
    height: 58,
    borderWidth: 2,
    borderColor: "#231A72",
    borderRadius: 6,
    paddingHorizontal: 16,
    backgroundColor: "#FFF",
  },

  row: {
    width: 380,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 18,
    marginBottom: 35,
  },

  rememberContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  checkbox: {
    width: 16,
    height: 16,
    borderWidth: 1,
    borderColor: "#999",
    marginRight: 8,
  },

  checkboxActive: {
    backgroundColor: "#231A72",
    borderColor: "#231A72",
  },

  rememberText: {
    fontSize: 12,
    color: "#7A7A7A",
  },

  forgotText: {
    fontSize: 12,
    color: "#231A72",
  },

  loginButton: {
    width: 380,
    height: 60,
    backgroundColor: "#231A72",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },

  loginText: {
    color: "#FFF",
    fontSize: 28,
    fontWeight: "700",
  },
});
