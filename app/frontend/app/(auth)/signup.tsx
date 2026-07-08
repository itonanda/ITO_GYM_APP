import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import CountryPicker, {
  Country,
  CountryCode,
} from "react-native-country-picker-modal";

export default function SignUpScreen() {
  const router = useRouter();

  // STATE API
  const apiURL = process.env.EXPO_PUBLIC_API_URL;

  // STATE FORM
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [secure, setSecure] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [secureConfirm, setSecureConfirm] = useState(true);
  const [emergencyContactNo, setEmergencyContactNo] = useState("");
  const [emergencyContactName, setEmergencyContactName] = useState("");
  const [gender, setGender] = useState("");
  const [showGenderModal, setShowGenderModal] = useState(false);

  // DATE
  const [birthDate, setBirthDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);

  // COUNTRY
  const [countryCode, setCountryCode] = useState<CountryCode>("ID");
  const [callingCode, setCallingCode] = useState("62");
  //const [countryCode, setCountryCode] = useState<CountryCode>("ID");
  //const [countryCodes, setCountryCodes] = useState<CountryCode[]>(["ID"]);
  const [countryCodes, setCountryCodes] = useState<CountryCode>("ID");
  const [callingCodes, setCallingCodes] = useState("62");

  // ERRORS
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // FORMAT DATE
  /*const formatDate = (date: Date) =>
    `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}/${date.getFullYear()}`;*/
  const formatDate = (date: Date) =>
    `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
  const birthDateJSON = birthDate.toISOString().split("T")[0];

  // 1. Convert the Date state directly to a JSON-safe string
  // const birthDateJSON = birthDate.toISOString().split('T')[0];
  // const getYYYYMMDD = (dateObj = new Date()) => {
  //   return dateObj.toISOString().split('T')[0].replace(/-/g, '');
  // };
  //     const convertDate = (birthDate) => {
  //   if (!birthDate) return '';
  //   const date = new Date(birthDate);
  //   return date.toISOString().split('T')[0];
  // };

  // ROLE_USER
  const role = "member";

  // VALIDASI
  const validate = () => {
    let tempErrors: { [key: string]: string } = {};

    if (!fullName.trim()) tempErrors.fullName = "Full Name is required.";
    if (!email.trim()) tempErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(email))
      tempErrors.email = "Oops! That email looks wrong.";
    if (!phone.trim()) tempErrors.phone = "Phone Number is required.";
    if (!birthDate) tempErrors.birthDate = "Birth Date is required.";
    if (!gender) tempErrors.gender = "Gender is required.";
    if (!emergencyContactName.trim())
      tempErrors.emergencyContactName = "Emergency Contact Name is required.";
    if (!emergencyContactNo.trim())
      tempErrors.emergencyContactNo = "Emergency Contact Number is required.";
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

  // REGISTER
  const handleRegister = () => {
    if (!validate()) {
      return;
    } else {
      fetch(`${apiURL}/auth/signup`, {
        method: "POST",
        headers: {
          // 'Authorization': `Bearer YOUR_KEY`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          fullName,
          role,
          birthDateJSON,
          gender,
          phone,
          emergencyContactNo,
          emergencyContactName,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          // console.log('BOD :', birthDateJSON);
          // Alert.alert('Success', 'Registrasi berhasil!');
          router.replace("/(auth)/signup_success");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  const onChangeDate = (event: any, selectedDate?: Date) => {
    setShowDate(Platform.OS === "ios");
    if (selectedDate) setBirthDate(selectedDate);
  };

  // Phone Number
  const handlePhoneChange = (text: string) => {
    let value = text.replace(/\D/g, "");

    // Hapus kode negara jika user mengetik sendiri
    if (value.startsWith(callingCode)) {
      value = value.substring(callingCode.length);
    }

    // Hapus angka 0 di depan
    if (value.startsWith("0")) {
      value = value.substring(1);
    }

    setPhone(value);
  };

  // Emergency Contact No
  const handleEmergencyContactNoChange = (text: string) => {
    let value = text.replace(/\D/g, "");

    // Hapus kode negara jika user mengetik sendiri
    if (value.startsWith(callingCodes)) {
      value = value.substring(callingCodes.length);
    }

    // Hapus angka 0 di depan
    if (value.startsWith("0")) {
      value = value.substring(1);
    }

    setEmergencyContactNo(value);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#e53935" }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <StatusBar barStyle="light-content" backgroundColor="#E82528" />

      {/* HEADER */}
      <LinearGradient
        colors={["#E82528", "#9A0006"]}
        style={styles.headerSignUp}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}
        >
          <View style={styles.cardSignUp}>
            {/* <TouchableOpacity onPress={() => router.replace('../')}>
                <Ionicons name="arrow-back" size={22} color="#000" />
              </TouchableOpacity> */}

            <Text style={styles.title}>Sign up</Text>
            <Text style={styles.subtitleSignUp}>
              Already have an account?{" "}
              <Text
                style={styles.linkSignUp}
                onPress={() => router.replace("/(auth)/signin")}
              >
                Login
              </Text>
            </Text>

            {/* Full Name */}
            <Text style={styles.labelSignUp}>Full Name*</Text>
            <TextInput
              returnKeyType="done"
              onSubmitEditing={() => Keyboard.dismiss()}
              style={[
                styles.inputSignUp,
                errors.fullName && { borderColor: "red" },
              ]}
              placeholder="Full Name"
              value={fullName}
              //onChangeText={setFullName}
              onChangeText={(text) => {
                setFullName(text);
                clearError("fullName");
              }}
            />
            {errors.fullName && (
              <Text style={styles.errorTextSignUp}>{errors.fullName}</Text>
            )}
            {/* Email */}
            <Text style={styles.labelSignUp}>Email*</Text>
            <TextInput
              returnKeyType="done"
              onSubmitEditing={() => Keyboard.dismiss()}
              style={[
                styles.inputSignUp,
                errors.email && { borderColor: "red" },
              ]}
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect={false}
              textContentType="emailAddress"
              // Cursor/Caret styling
              cursorColor="#007AFF" // Sets cursor color (Android)
              selectionColor="#007AFF" // Sets cursor/selection color (iOS)
              caretHidden={false}
              value={email}
              //onChangeText={setEmail}
              onChangeText={(text) => {
                setEmail(text);
                clearError("email");
              }}
            />
            {errors.email && (
              <Text style={styles.errorTextSignUp}>{errors.email}</Text>
            )}

            {/* Birth Date */}
            <Text style={styles.labelSignUp}>Birth of date*</Text>
            {/*<TouchableOpacity
              style={[
                styles.inputSignUp,
                errors.birthDate && { borderColor: "red" },
              ]}
              onPress={() => setShowDate(true)}
            >
              <Text>{formatDate(birthDate)}</Text>
            </TouchableOpacity>
            {errors.birthDate && (
              <Text style={styles.errorTextSignUp}>{errors.birthDate}</Text>
            )}
            {showDate && (
              <DateTimePicker
                value={birthDate}
                mode="date"
                display="default"
                onChange={onChangeDate}
                maximumDate={new Date()}
              />
            )}*/}

            <TouchableOpacity
              style={[
                styles.inputSignUp,
                errors.birthDate && { borderColor: "red" },
              ]}
              onPress={() => setShowDate(true)}
            >
              <Text>{formatDate(birthDate)}</Text>
            </TouchableOpacity>

            {errors.birthDate && (
              <Text style={styles.errorTextSignUp}>{errors.birthDate}</Text>
            )}

            {/* Android */}
            {Platform.OS === "android" && showDate && (
              <DateTimePicker
                value={birthDate}
                mode="date"
                display="default"
                maximumDate={new Date()}
                onChange={onChangeDate}
              />
            )}

            {/* iOS */}
            {Platform.OS === "ios" && (
              <Modal visible={showDate} transparent animationType="slide">
                <View style={styles.modalOverlayDate}>
                  <View style={styles.dateModalDate}>
                    <View style={styles.modalHeaderDate}>
                      <TouchableOpacity onPress={() => setShowDate(false)}>
                        <Text style={styles.cancelDate}>Cancel</Text>
                      </TouchableOpacity>

                      <TouchableOpacity onPress={() => setShowDate(false)}>
                        <Text style={styles.doneDate}>Done</Text>
                      </TouchableOpacity>
                    </View>

                    <DateTimePicker
                      value={birthDate}
                      mode="date"
                      display="spinner"
                      maximumDate={new Date()}
                      onChange={(event, date) => {
                        if (date) {
                          setBirthDate(date);
                          clearError("birthDate");
                        }
                      }}
                    />
                  </View>
                </View>
              </Modal>
            )}

            {/* Gender */}
            <Text style={styles.labelSignUp}>Gender*</Text>
            <TouchableOpacity
              style={[
                styles.genderRowSignUp,
                errors.gender && { borderColor: "red" },
              ]}
              onPress={() => setShowGenderModal(true)}
            >
              <Text
                style={[
                  styles.genderSelectTextSignUp,
                  !gender && { color: "#999" },
                ]}
              >
                {gender || "-- Select Gender --"}
              </Text>

              <Text style={styles.genderArrowSignUp}>▼</Text>
            </TouchableOpacity>

            {errors.gender && (
              <Text style={styles.errorTextSignUp}>{errors.gender}</Text>
            )}

            <Modal visible={showGenderModal} transparent animationType="fade">
              <TouchableOpacity
                style={styles.genderModalOverlaySignUp}
                activeOpacity={1}
                onPress={() => setShowGenderModal(false)}
              >
                <View style={styles.genderModalContainerSignUp}>
                  <TouchableOpacity
                    style={styles.genderOptionSignUp}
                    onPress={() => {
                      setGender("Male");
                      clearError("gender");
                      setShowGenderModal(false);
                    }}
                  >
                    <Text style={styles.genderOptionTextSignUp}>Male</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.genderOptionSignUp}
                    onPress={() => {
                      setGender("Female");
                      clearError("gender");
                      setShowGenderModal(false);
                    }}
                  >
                    <Text style={styles.genderOptionTextSignUp}>Female</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            </Modal>

            {/* Phone Number */}
            <Text style={styles.labelSignUp}>Phone Number*</Text>
            <View
              style={[
                styles.phoneRowSignUp,
                errors.phone && { borderColor: "red" },
              ]}
            >
              <CountryPicker
                countryCode={countryCode}
                withFlag
                withFilter
                withEmoji
                onSelect={(country: Country) => {
                  setCountryCode(country.cca2);
                  setCallingCode(country.callingCode[0]);
                }}
              />

              <TextInput
                style={styles.phoneInputSignUp}
                placeholder="Phone Number"
                keyboardType="phone-pad"
                value={`${callingCode}${phone}`}
                onChangeText={handlePhoneChange}
              />

              {phone.length > 0 && (
                <TouchableOpacity onPress={() => setPhone("")}>
                  <Ionicons name="close-circle" size={22} color="#999" />
                </TouchableOpacity>
              )}
            </View>
            {errors.phone && (
              <Text style={styles.errorTextSignUp}>{errors.phone}</Text>
            )}

            {/* Emergency Contact Name */}
            <Text style={styles.labelSignUp}>Emergency Contact Name*</Text>
            <TextInput
              returnKeyType="done"
              onSubmitEditing={() => Keyboard.dismiss()}
              style={[
                styles.inputSignUp,
                errors.emergencyContactName && { borderColor: "red" },
              ]}
              placeholder="Emergency Contact Name"
              value={emergencyContactName}
              //onChangeText={setEmergencyContactName}
              onChangeText={(text) => {
                setEmergencyContactName(text);
                clearError("emergencyContactName");
              }}
            />
            {errors.emergencyContactName && (
              <Text style={styles.errorTextSignUp}>
                {errors.emergencyContactName}
              </Text>
            )}

            {/* Emergency Contact No */}
            <Text style={styles.labelSignUp}>Emergency Contact Number*</Text>
            {/*<View
              style={[
                styles.phoneRowSignUp,
                errors.emergencyContactNo && { borderColor: "red" },
              ]}
            >
              <CountryPicker
                countryCode={countryCode}
                countryCodes={countryCodes}
                withFlag
                withCallingCode
                withFilter
                onSelect={(country: Country) => {
                  setCountryCode(country.cca2);
                  setCountryCodes([country.cca2]);
                }}
              />
              <TextInput
                returnKeyType="done"
                onSubmitEditing={() => Keyboard.dismiss()}
                style={styles.phoneInputSignUp}
                placeholder="Emergency Contact Number"
                keyboardType="phone-pad"
                value={emergencyContactNo}
                onChangeText={(text) => {
                  // Hanya angka
                  let value = text.replace(/\D/g, "");

                  // Hapus 0 di depan
                  if (value.startsWith("0")) {
                    value = "62" + value.substring(1);
                  } else if (!value.startsWith("62") && value.length > 0) {
                    value = "62" + value;
                  }

                  setEmergencyContactNo(value);
                  clearError("emergencyContactNo");
                }}
              />

              {emergencyContactNo.length > 0 && (
                <TouchableOpacity
                  onPress={() => setEmergencyContactNo("")}
                  style={{
                    paddingHorizontal: 8,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Ionicons name="close-circle" size={22} color="#999" />
                </TouchableOpacity>
              )}
            </View>
            {errors.emergencyContactNo && (
              <Text style={styles.errorTextSignUp}>
                {errors.emergencyContactNo}
              </Text>
            )}*/}

            <View
              style={[
                styles.phoneRowSignUp,
                errors.emergencyContactNo && { borderColor: "red" },
              ]}
            >
              <CountryPicker
                countryCode={countryCodes}
                withFlag
                withFilter
                withEmoji
                onSelect={(country: Country) => {
                  setCountryCodes(country.cca2);
                  setCallingCodes(country.callingCode[0]);
                }}
              />

              <TextInput
                style={styles.phoneInputSignUp}
                placeholder="Emergency Contact Number"
                keyboardType="phone-pad"
                value={`${callingCodes}${emergencyContactNo}`}
                onChangeText={handleEmergencyContactNoChange}
              />

              {emergencyContactNo.length > 0 && (
                <TouchableOpacity onPress={() => setEmergencyContactNo("")}>
                  <Ionicons name="close-circle" size={22} color="#999" />
                </TouchableOpacity>
              )}
            </View>
            {errors.emergencyContactNo && (
              <Text style={styles.errorTextSignUp}>
                {errors.emergencyContactNo}
              </Text>
            )}

            {/* Password */}
            <Text style={styles.labelSignUp}>Set Password*</Text>
            <View
              style={[
                styles.passwordRowSignUp,
                errors.password && { borderColor: "red" },
              ]}
            >
              <TextInput
                returnKeyType="done"
                onSubmitEditing={() => Keyboard.dismiss()}
                style={{ flex: 1 }}
                placeholder="Password"
                secureTextEntry={secure}
                value={password}
                //onChangeText={setPassword}
                onChangeText={(text) => {
                  setPassword(text);
                  clearError("password");
                }}
              />
              <TouchableOpacity onPress={() => setSecure(!secure)}>
                <Ionicons name={secure ? "eye-off" : "eye"} size={20} />
              </TouchableOpacity>
            </View>
            {errors.password && (
              <Text style={styles.errorTextSignUp}>{errors.password}</Text>
            )}

            {/* Confirm Password */}
            <Text style={styles.labelSignUp}>Confirm Password*</Text>
            <View
              style={[
                styles.passwordRowSignUp,
                errors.confirmPassword && { borderColor: "red" },
              ]}
            >
              <TextInput
                returnKeyType="done"
                onSubmitEditing={() => Keyboard.dismiss()}
                style={{ flex: 1 }}
                placeholder="Confirm Password"
                secureTextEntry={secureConfirm}
                value={confirmPassword}
                //onChangeText={setConfirmPassword}
                onChangeText={(text) => {
                  setConfirmPassword(text);
                  clearError("confirmPassword");
                }}
              />
              <TouchableOpacity
                onPress={() => setSecureConfirm(!secureConfirm)}
              >
                <Ionicons name={secureConfirm ? "eye-off" : "eye"} size={20} />
              </TouchableOpacity>
            </View>
            {errors.confirmPassword && (
              <Text style={styles.errorTextSignUp}>
                {errors.confirmPassword}
              </Text>
            )}

            {/* Button */}
            <TouchableOpacity
              style={styles.buttonSignUp}
              onPress={handleRegister}
            >
              <Text style={styles.buttonTextSignUp}>Register</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    paddingTop: 60,
  },
  headerSignUp: {
    paddingHorizontal: 5,
  },
  cardSignUp: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
  },
  subtitleSignUp: {
    color: "#888",
    marginBottom: 24,
  },
  linkSignUp: {
    color: "#e53935",
    fontWeight: "600",
  },
  labelSignUp: {
    marginBottom: 6,
    marginTop: 12,
    fontWeight: "500",
  },
  inputSignUp: {
    height: 50,
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 12,
    padding: 14,
    backgroundColor: "#fafafa",
  },
  phoneRowSignUp: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 12,
    paddingHorizontal: 10,
    backgroundColor: "#fafafa",
  },
  phoneInputSignUp: {
    flex: 1,
    padding: 14,
  },
  passwordRowSignUp: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 12,
    paddingHorizontal: 14,
    backgroundColor: "#fafafa",
  },
  buttonSignUp: {
    backgroundColor: "#e53935",
    padding: 16,
    borderRadius: 14,
    marginTop: 50,
    marginBottom: 30,
    alignItems: "center",
  },
  buttonTextSignUp: {
    color: "#fff",
    fontWeight: "700",
  },
  errorTextSignUp: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
  },

  genderRowSignUp: {
    height: 50,
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 12,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fafafa",
  },
  genderSelectTextSignUp: {
    fontSize: 16,
    color: "#000",
  },
  genderArrowSignUp: {
    fontSize: 16,
    color: "#777",
  },
  genderModalOverlaySignUp: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  genderModalContainerSignUp: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 10,
  },
  genderOptionSignUp: {
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  genderOptionTextSignUp: {
    fontSize: 16,
  },

  //-----------------------

  modalOverlayDate: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  dateModalDate: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 20,
  },
  modalHeaderDate: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  cancelDate: {
    color: "#666",
    fontSize: 16,
  },
  doneDate: {
    color: "#007AFF",
    fontWeight: "600",
    fontSize: 16,
  },
});
