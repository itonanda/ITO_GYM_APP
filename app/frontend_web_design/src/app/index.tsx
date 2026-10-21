import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function LoginScreen() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={require("@/assets/images/bg_logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Login Form */}
        <View style={styles.formContainer}>
          <Text style={styles.title}>Sign-in</Text>

          {/* Email */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Email</Text>

            <TextInput
              placeholder="Enter your email"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Password */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Password</Text>

            <View style={styles.passwordContainer}>
              <TextInput
                placeholder="Enter your password"
                placeholderTextColor="#999"
                value={password}
                onChangeText={setPassword}
                style={styles.passwordInput}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />

              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeButton}
                activeOpacity={0.7}
              >
                <Ionicons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={22}
                  color="#666"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Remember & Forgot Password */}
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.rememberContainer}
              onPress={() => setRemember(!remember)}
              activeOpacity={0.7}
            >
              <View
                style={[styles.checkbox, remember && styles.checkboxActive]}
              >
                {remember && (
                  <Ionicons name="checkmark" size={13} color="#FFF" />
                )}
              </View>

              <Text style={styles.rememberText}>Remember me</Text>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          {/* Login Button */}
          <TouchableOpacity
            style={styles.loginButton}
            activeOpacity={0.8}
            onPress={() => router.replace("/(tabs)/dashboard")}
          >
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
        </View>

        {/* About Us */}
        <View style={styles.aboutContainer}>
          <View style={styles.divider} />
          <View style={styles.aboutRow}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => Linking.openURL("https://help.domsbox.com/#about")}
            >
              <Text style={styles.aboutText}>About Us</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => Linking.openURL("https://help.domsbox.com/#terms")}
            >
              <Text style={styles.aboutText}>Terms & Conditions</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() =>
                Linking.openURL("https://help.domsbox.com/#privacy")
              }
            >
              <Text style={styles.aboutText}>Privacy Policy</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => Linking.openURL("https://help.domsbox.com/#help")}
            >
              <Text style={styles.aboutText}>Help Center</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.footerText}>© 2026 DOMS Box</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F3F3",
  },

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 30,
    paddingBottom: 24,
  },

  logoContainer: {
    width: "100%",
    marginBottom: 10,
  },

  logo: {
    width: 200,
    height: 80,
  },

  formContainer: {
    width: "100%",
    maxWidth: 420,
    alignSelf: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 40,
    fontWeight: "700",
    color: "#231A72",
    marginBottom: 20,
  },

  fieldContainer: {
    width: "100%",
    marginBottom: 10,
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#231A72",
  },

  input: {
    width: "100%",
    height: 56,
    borderWidth: 1.5,
    borderColor: "#231A72",
    borderRadius: 8,
    paddingHorizontal: 16,
    backgroundColor: "#FFF",
    fontSize: 15,
    color: "#222",
  },

  passwordContainer: {
    width: "100%",
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#231A72",
    borderRadius: 8,
    backgroundColor: "#FFF",
  },

  passwordInput: {
    flex: 1,
    height: "100%",
    paddingHorizontal: 16,
    fontSize: 15,
    color: "#222",
  },

  eyeButton: {
    height: "100%",
    paddingHorizontal: 14,
    justifyContent: "center",
    alignItems: "center",
  },

  row: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 2,
    marginBottom: 20,
  },

  rememberContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  checkbox: {
    width: 17,
    height: 17,
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 3,
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
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
    fontWeight: "500",
  },

  loginButton: {
    width: "100%",
    height: 58,
    backgroundColor: "#231A72",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  loginText: {
    color: "#FFF",
    fontSize: 22,
    fontWeight: "700",
  },

  aboutContainer: {
    width: "100%",
    alignItems: "center",
    paddingTop: 16,
  },

  aboutRow: {
    // width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 20,
    marginTop: 2,
    marginBottom: 20,
  },

  divider: {
    width: "100%",
    maxWidth: 500,
    height: 1,
    backgroundColor: "#DDD",
  },

  aboutText: {
    fontSize: 12,
    fontWeight: "400",
    color: "#49456d",
    // paddingVertical: 8,
  },

  footerText: {
    fontSize: 11,
    color: "#999",
  },
});

// import { useRouter } from "expo-router";
// import { useState } from "react";
// import {
//   Image,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";

// export default function LoginScreen() {
//   const router = useRouter();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [remember, setRemember] = useState(false);

//   return (
//     <View style={styles.container}>
//       {/* Logo */}
//       <View style={styles.logoContainer}>
//         <Image
//           source={require("@/assets/images/bg_logo.png")}
//           style={styles.logo}
//           resizeMode="contain"
//         />
//       </View>

//       {/* Form */}
//       <View style={styles.formContainer}>
//         <Text style={styles.title}>Sign-in</Text>

//         <Text style={styles.label}>Email</Text>

//         <TextInput
//           placeholder=""
//           value={email}
//           onChangeText={setEmail}
//           style={styles.input}
//         />

//         <Text style={[styles.label, { marginTop: 18 }]}>Password</Text>

//         <View style={styles.passwordContainer}>
//           <TextInput
//             value={password}
//             onChangeText={setPassword}
//             style={styles.passwordInput}
//             secureTextEntry={!showPassword}
//           />

//           <TouchableOpacity
//             onPress={() =>
//               setShowPassword(!showPassword)
//             }
//             style={styles.eyeButton}
//           >
//             <Ionicons
//               name={
//                 showPassword
//                   ? "eye-off-outline"
//                   : "eye-outline"
//               }
//               size={22}
//               color="#666"
//             />
//           </TouchableOpacity>
//         </View>

//         <View style={styles.row}>
//           <TouchableOpacity
//             style={styles.rememberContainer}
//             onPress={() => setRemember(!remember)}
//           >
//             <View
//               style={[styles.checkbox, remember && styles.checkboxActive]}
//             />
//             <Text style={styles.rememberText}>Remember me</Text>
//           </TouchableOpacity>

//           <TouchableOpacity>
//             <Text style={styles.forgotText}>Forgot Password?</Text>
//           </TouchableOpacity>
//         </View>

//         <TouchableOpacity
//           style={styles.loginButton}
//           onPress={() => router.replace("/(tabs)/dashboard")}
//         >
//           <Text style={styles.loginText}>Login</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Form */}
//       <View style={styles.formContainer}>
//         <TouchableOpacity>
//           <Text style={styles.forgotText}>About Us</Text>
//         </TouchableOpacity>
//       </View>

//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#F3F3F3",
//   },

//   logoContainer: {
//     // position: "absolute",
//     top: 30,
//     left: 30,
//   },

//   logo: {
//     width: 200,
//     height: 80,
//   },

//   formContainer: {
//     // flex: 1,
//     marginTop: 20,
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   title: {
//     fontSize: 40,
//     fontWeight: "700",
//     color: "#231A72",
//     marginBottom: 40,
//   },

//   label: {
//     width: 380,
//     textAlign: "center",
//     fontSize: 18,
//     fontWeight: "600",
//     color: "#231A72",
//     marginBottom: 10,
//   },

//   input: {
//     width: 380,
//     height: 58,
//     borderWidth: 2,
//     borderColor: "#231A72",
//     borderRadius: 6,
//     paddingHorizontal: 16,
//     backgroundColor: "#FFF",
//   },

//   row: {
//     width: 380,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginTop: 18,
//     marginBottom: 35,
//   },

//   rememberContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//   },

//   checkbox: {
//     width: 16,
//     height: 16,
//     borderWidth: 1,
//     borderColor: "#999",
//     marginRight: 8,
//   },

//   checkboxActive: {
//     backgroundColor: "#231A72",
//     borderColor: "#231A72",
//   },

//   rememberText: {
//     fontSize: 12,
//     color: "#7A7A7A",
//   },

//   forgotText: {
//     fontSize: 12,
//     color: "#231A72",
//   },

//   loginButton: {
//     width: 380,
//     height: 60,
//     backgroundColor: "#231A72",
//     borderRadius: 16,
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   loginText: {
//     color: "#FFF",
//     fontSize: 28,
//     fontWeight: "700",
//   },

//   passwordContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     width: 380,
//     borderWidth: 2,
//     borderColor: "#231A72",
//     borderRadius: 6,
//     backgroundColor: "#FFF",
//   },

//   passwordInput: {
//     flex: 1,
//     height: 58,
//     paddingHorizontal: 16,
//     fontSize: 15,
//   },

//   eyeButton: {
//     paddingHorizontal: 12,
//   },
// });
