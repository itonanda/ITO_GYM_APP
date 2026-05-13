import React, { useState } from "react";
import {
  Alert,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from 'expo-router';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const apiURL = process.env.EXPO_PUBLIC_API_URL;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secure, setSecure] = useState(true);

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
      fetch(`${apiURL}/auth/signin`, {
        method: 'POST',
        headers: {
          // authorization: "Bearer YOUR_KEY",
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })
        .then(response => response.json())
        .then(data => {
          router.replace({
            pathname: '../(tabs)/',
            params: { accessToken: data.session.access_token, email: data.session.email, user: data.user }
          });
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Title */}
        <Text style={styles.title}>
          Log in to your{"\n"}Account
        </Text>
        <Text style={styles.subtitle}>
          Enter your email and password to log in
        </Text>

        {/* Email */}
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none" value={email} onChangeText={setEmail} 
        />

        {/* Password */}
        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordWrapper}>
          <TextInput
            style={styles.passwordInput}
            value={password}
            onChangeText={setPassword}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Password"
            secureTextEntry={secure}
          />
          <TouchableOpacity onPress={() => setSecure(!secure)}>
            <Ionicons
              name={secure ? "eye-off-outline" : "eye-outline"}
              size={22}
              color="#999"
            />
          </TouchableOpacity>
        </View>

        {/* Forgot */}
        <TouchableOpacity>
          <Text style={styles.forgot} onPress={() => router.replace('/(auth)/forgot_password')}>Forgot Password ?</Text>
        </TouchableOpacity>

        {/* Login Button */}
        <TouchableOpacity style={styles.loginButton} onPress={handleSignIn}>
          <Text style={styles.loginText}>Log In</Text>
        </TouchableOpacity>

        {/* Or
        <Text style={styles.or}>Or</Text> */}

        {/* Google */}
        {/* <TouchableOpacity style={styles.socialButton} onPress={() => router.replace('/(tabs)/noted')}>
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/2991/2991148.png",
            }}
            style={styles.icon}
          />
          <Text style={styles.socialText}>Continue with Google</Text>
        </TouchableOpacity> */}

        {/* Facebook */}
        {/* <TouchableOpacity style={styles.socialButton} onPress={() => router.replace('/(tabs)/noted')}>
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/733/733547.png",
            }}
            style={styles.icon}
          />
          <Text style={styles.socialText}>Continue with Facebook</Text>
        </TouchableOpacity> */}

        {/* Signup */}
        <Text style={styles.signup}>
          Don't have an account?{" "}
          <Text style={styles.signupRed} onPress={() => router.replace('/(auth)/signup')}>Sign Up</Text>
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: "#fff",
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111",
    marginTop: 40,
  },
  subtitle: {
    fontSize: 14,
    color: "#888",
    marginVertical: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginTop: 16,
    marginBottom: 6,
    color: "#333",
  },
  input: {
    height: 52,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#eee",
    paddingHorizontal: 16,
    backgroundColor: "#fafafa",
  },
  passwordWrapper: {
    flexDirection: "row",
    alignItems: "center",
    height: 52,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#eee",
    paddingHorizontal: 16,
    backgroundColor: "#fafafa",
    justifyContent: "space-between",
  },
  passwordInput: {
    flex: 1,
  },
  forgot: {
    color: "red",
    textAlign: "right",
    marginTop: 10,
    fontSize: 13,
  },
  loginButton: {
    height: 56,
    borderRadius: 16,
    backgroundColor: "#e53935",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
  },
  loginText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  or: {
    textAlign: "center",
    color: "#999",
    marginVertical: 20,
  },
  socialButton: {
    height: 54,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#eee",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
    gap: 10,
  },
  icon: {
    width: 22,
    height: 22,
  },
  socialText: {
    fontSize: 15,
    fontWeight: "500",
  },
  signup: {
    textAlign: "center",
    marginTop: 30,
    color: "#666",
  },
  signupRed: {
    color: "red",
    fontWeight: "600",
  },
});