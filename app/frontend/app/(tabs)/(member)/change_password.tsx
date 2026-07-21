import React, { useEffect, useState, useRef } from "react";
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
  StatusBar
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter, useGlobalSearchParams, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from "expo-linear-gradient";

interface UsersData {
  id_user : string;
  full_name : string;
  email : string;
}

export default function ChangePasswordScreen() {
  const router = useRouter();
  const apiURL = process.env.EXPO_PUBLIC_API_URL;
  const [oldPassword, setOldPassword] = useState("");
  const [secureOldPassword, setSecureOldPassword] = useState(true);
  const [password, setPassword] = useState('');
  const [secure, setSecure] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [secureConfirm, setSecureConfirm] = useState(true);
  const { accessToken, id_user } = useGlobalSearchParams();
  const [users, setUsers] = useState<UsersData | null>(null);
  const [loading, setLoading] = useState(true);
//   const { id_user } = useGlobalSearchParams();
  const [error, setError] = useState(null);

 // ERRORS
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  
  // VALIDASI
  const validate = () => {
    let tempErrors: { [key: string]: string } = {};

    // if (!oldPassword) tempErrors.password = "Old Password is required.";
    if (!password) tempErrors.password = "Password is required.";
    if (!confirmPassword)
      tempErrors.confirmPassword = "Confirm Password is required.";
    if (password && confirmPassword && password !== confirmPassword)
      tempErrors.confirmPassword = "Oops! Your passwords don't match.";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // CLEAR ERROR INPUT
  const clearError = (field: string) => {
    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };
  const handleChangePassword = () => {
    // if(oldPassword.length === 0) {
    //     Alert.alert('Attention','Please enter both old password');
    //     return;
    // }
    // else if
    if(password.length === 0) {
        Alert.alert('Attention','Please enter both password');
        return;
    }
    if(password.length < 8) {
        Alert.alert('Attention','Please enter both password must be at least 8 characters long.');
        return;
    }
    if(confirmPassword.length === 0) {
        Alert.alert('Attention','Please enter both confirm password');
        return;
    }
    if(confirmPassword.length < 8) {
        Alert.alert('Attention','Please enter both confirm password must be at least 8 characters long.');
        return;
    }
    // else {
      // fetch(`${apiURL}/auth/signin`, {
      fetch(`${apiURL}/auth/change_password`, {
        method: 'POST',
        headers: {
          // authorization: "Bearer YOUR_KEY",
          'authorization': `Bearer ${accessToken}`, // Pass JWT token to backend
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_user, password }),
      })
        .then(response => response.json())
        .then(data => {
          router.replace({
            pathname: '/(tabs)/(member)/setting',
            // // params: { accessToken: data.session.access_token, email: data.session.email, user: data.user }
            // params: { accessToken: data.session.access_token }
          });
        })
        .catch(error => {
          console.error('Error:', error);
        });
    // }
  };

//   const fetchDataUser = async () => {
//     try {
//       setLoading(true);
//       // console.log(accessToken);
//       const responseUser = await fetch(`${apiURL}/profile`, {
//       method: 'GET',
//       headers: {
//         'authorization': `Bearer ${accessToken}`, // Pass JWT token to backend
//         'Content-Type': 'application/json',
//       }
//     });
//       const dataUser = await responseUser.json();
//       setUsers(dataUser);
//       // userId(dataUser.userId);
//       // console.log(dataUser);
//       id_user(dataUser.id_user);
//     } catch (error) {
//       console.error('Error fetching list data:', error);
//       //setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//       fetchDataUser();
//     }, []);

//   console.log(accessToken);
//   console.log(apiURL);
//   console.log(id_user);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
     <View style={styles.container}>
          <StatusBar barStyle="light-content" backgroundColor="#E82528" />
    
          {/* HEADER */}
          <LinearGradient
            colors={["#E82528", "#9A0006"]}
            style={styles.header}
          >
            <TouchableOpacity style={styles.backButton} onPress={() => router.replace('/(tabs)/(member)/setting')}>
                <Ionicons name="arrow-back" size={22} color="#fff"/>
            </TouchableOpacity>
            
            <Text style={styles.headerTitle}>Change Password</Text>
    
            <View style={{ width: 40 }} />
          </LinearGradient>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Title */}
        {/* <Text style={styles.title}>
          Change Password
        </Text>
        <Text style={styles.subtitle}>
          Enter your change password
        </Text> */}

        {/* Old Password */}
        {/* <Text style={styles.label}>Old Password</Text>
        <View style={styles.passwordWrapper}>
          <TextInput
            style={styles.passwordInput}
            value={oldPassword}
            onChangeText={setOldPassword}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Old Password"
            secureTextEntry={secure}
          />
          <TouchableOpacity onPress={() => setSecure(!secureOldPassword)}>
            <Ionicons
              name={secure ? "eye-off-outline" : "eye-outline"}
              size={22}
              color="#999"
            />
          </TouchableOpacity>
        </View> */}

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

        {/* Confirm Password */}
        <Text style={styles.label}>Confirm Password</Text>
        <View style={styles.passwordWrapper}>
          <TextInput
            style={styles.passwordInput}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Confirm Password"
            secureTextEntry={secure}
          />
          <TouchableOpacity onPress={() => setSecure(!secureConfirm)}>
            <Ionicons
              name={secure ? "eye-off-outline" : "eye-outline"}
              size={22}
              color="#999"
            />
          </TouchableOpacity>
        </View>
        
        {/* Change Password Button */}
        <TouchableOpacity style={styles.Button} onPress={handleChangePassword}>
          <Text style={styles.buttonText}>Change Password</Text>
        </TouchableOpacity>
      </ScrollView>

      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
/* ===== HEADER TOP ===== */
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    height: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "700",
  },

  divider: {
    height: 1,
    backgroundColor: "#EAEAEA",
    marginVertical: 20,
  }, 
  
  content: {
    flex: 1,
    padding: 20,
  },

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
  Button: {
    height: 56,
    borderRadius: 16,
    backgroundColor: "#e53935",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});