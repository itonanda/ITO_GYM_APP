import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import CountryPicker, { CountryCode, Country } from 'react-native-country-picker-modal';
import { Link, useRouter } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from "expo-linear-gradient";

export default function SignUpScreen() {
  const router = useRouter();

  // STATE FORM
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [secure, setSecure] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [secureConfirm, setSecureConfirm] = useState(true);
  const [emergencyContactNo, setEmergencyContactNo] = useState('');
  const [emergencyContactName, setEmergencyContactName] = useState('');
  const [gender, setGender] = useState('');

  // DATE
  const [birthDate, setBirthDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);

  // COUNTRY
  const [countryCode, setCountryCode] = useState<CountryCode>('ID');
  const [countryCodes, setCountryCodes] = useState<CountryCode[]>(['ID']);

  // ERRORS
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // FORMAT DATE
  const formatDate = (date: Date) =>
    `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}/${date.getFullYear()}`;

  // VALIDASI
  const validate = () => {
    let tempErrors: { [key: string]: string } = {};

    if (!fullName.trim()) tempErrors.fullName = 'Full Name is required.';
    if (!email.trim()) tempErrors.email = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(email)) tempErrors.email = 'Oops! That email looks wrong.. "xxx@doms.com"';
    if (!phone.trim()) tempErrors.phone = 'Phone Number is required.';
    if (!birthDate) tempErrors.birthDate = 'Birth Date is required.';
    if (!gender) tempErrors.gender = 'Gender is required.'; 
    if (!emergencyContactName.trim()) tempErrors.emergencyContactName = 'Emergency Contact Name is required.';
    if (!emergencyContactNo.trim()) tempErrors.emergencyContactNo = 'Emergency Contact Number is required.';
    if (!password) tempErrors.password = 'Password is required.';
    if (!confirmPassword) tempErrors.confirmPassword = 'Confirm Password is required.';
    if (password && confirmPassword && password !== confirmPassword)
      tempErrors.confirmPassword = 'Oops! Your passwords don\'t match.';

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
    if (!validate()) return;

    {/*Alert.alert('Success', 'Registrasi berhasil!');*/}
    router.replace('/(auth)/signin');
  };

  const onChangeDate = (event: any, selectedDate?: Date) => {
    setShowDate(Platform.OS === 'ios');
    if (selectedDate) setBirthDate(selectedDate);
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
                Already have an account? <Text style={styles.linkSignUp} onPress={() => router.replace('/(auth)/signin')}>Login</Text>
              </Text>

              {/* Full Name */}
              <Text style={styles.labelSignUp}>Full Name*</Text>
              <TextInput
                style={[styles.inputSignUp, errors.fullName && { borderColor: 'red' }]}
                placeholder="Full Name"
                value={fullName}
                //onChangeText={setFullName}
                onChangeText={(text) => {
                  setFullName(text);
                  clearError("fullName");
                }}
              />
              {errors.fullName && <Text style={styles.errorTextSignUp}>{errors.fullName}</Text>}
              {/* Email */}
              <Text style={styles.labelSignUp}>Email*</Text>
              <TextInput
                style={[styles.inputSignUp, errors.email && { borderColor: 'red' }]}
                placeholder="Email"
                keyboardType="email-address"
                value={email}
                //onChangeText={setEmail}
                onChangeText={(text) => {
                  setEmail(text);
                  clearError("email");
                }}
              />
              {errors.email && <Text style={styles.errorTextSignUp}>{errors.email}</Text>}

              {/* Birth Date */}
              <Text style={styles.labelSignUp}>Birth of date*</Text>
              <TouchableOpacity
                style={[styles.inputSignUp, errors.birthDate && { borderColor: 'red' }]}
                onPress={() => setShowDate(true)}
              >
                <Text>{formatDate(birthDate)}</Text>
              </TouchableOpacity>
              {errors.birthDate && <Text style={styles.errorTextSignUp}>{errors.birthDate}</Text>}
              {showDate && (
                <DateTimePicker
                  value={birthDate}
                  mode="date"
                  display="default"
                  onChange={onChangeDate}
                  maximumDate={new Date()}
                />
              )}

              {/* Gender */}
              <Text style={styles.labelSignUp}>Gender*</Text>
              {/*<View style={[styles.genderRow, errors.gender && { borderColor: 'red' }]}>
                {['Male', 'Female'].map((g) => (
                  <TouchableOpacity
                    key={g}
                    style={[
                      styles.genderOption,
                      gender === g && styles.genderSelected
                    ]}
                    onPress={() => setGender(g)}
                  >
                    <Text style={{ color: gender === g ? '#fff' : '#000' }}>{g}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              {errors.gender && <Text style={styles.errorText}>{errors.gender}</Text>}*/}

              <View style={[styles.pickerContainerSignUp, errors.gender && { borderColor: 'red' }]}>
                <Picker
                  selectedValue={gender}
                  onValueChange={(itemValue) => {
                    setGender(itemValue);
                    clearError("gender");
                  }}
                  //onValueChange={(itemValue) => setGender(itemValue)}
                  mode="dropdown"
                >
                  <Picker.Item label="--Select Gender--" value="" />
                  <Picker.Item label="Male" value="Male" />
                  <Picker.Item label="Female" value="Female" />
                </Picker>
              </View>
              {errors.gender && <Text style={styles.errorTextSignUp}>{errors.gender}</Text>}

              {/* Phone Number */}
              <Text style={styles.labelSignUp}>Phone Number*</Text>
              <View style={[styles.phoneRowSignUp, errors.phone && { borderColor: 'red' }]}>
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
                  style={styles.phoneInputSignUp}
                  placeholder="Phone Number"
                  keyboardType="phone-pad"
                  value={phone}
                  //onChangeText={setPhone}
                  onChangeText={(text) => {
                    setPhone(text);
                    clearError("phone");
                  }}
                />
              </View>
              {errors.phone && <Text style={styles.errorTextSignUp}>{errors.phone}</Text>}

              {/* Emergency Contact Name */}
              <Text style={styles.labelSignUp}>Emergency Contact Name*</Text>
              <TextInput
                style={[styles.inputSignUp, errors.emergencyContactName && { borderColor: 'red' }]}
                placeholder="Emergency Contact Name"
                value={emergencyContactName}
                //onChangeText={setEmergencyContactName}
                onChangeText={(text) => {
                    setEmergencyContactName(text);
                    clearError("emergencyContactName");
                }}
              />
              {errors.emergencyContactName && <Text style={styles.errorTextSignUp}>{errors.emergencyContactName}</Text>}

              {/* Emergency Contact No */}
              <Text style={styles.labelSignUp}>Emergency Contact Number*</Text>
              <View style={[styles.phoneRowSignUp, errors.emergencyContactNo && { borderColor: 'red' }]}>
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
                  style={styles.phoneInputSignUp}
                  placeholder="Emergency Contact Number"
                  keyboardType="phone-pad"
                  value={emergencyContactNo}
                  //onChangeText={setEmergencyContactNo}
                  onChangeText={(text) => {
                    setEmergencyContactNo(text);
                    clearError("emergencyContactNo");
                  }}
                />
              </View>
              {errors.emergencyContactNo && <Text style={styles.errorTextSignUp}>{errors.emergencyContactNo}</Text>}

              {/* Password */}
              <Text style={styles.labelSignUp}>Set Password*</Text>
              <View style={[styles.passwordRowSignUp, errors.password && { borderColor: 'red' }]}>
                <TextInput
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
                  <Ionicons name={secure ? 'eye-off' : 'eye'} size={20} />
                </TouchableOpacity>
              </View>
              {errors.password && <Text style={styles.errorTextSignUp}>{errors.password}</Text>}

              {/* Confirm Password */}
              <Text style={styles.labelSignUp}>Confirm Password*</Text>
              <View style={[styles.passwordRowSignUp, errors.confirmPassword && { borderColor: 'red' }]}>
                <TextInput
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
                <TouchableOpacity onPress={() => setSecureConfirm(!secureConfirm)}>
                  <Ionicons name={secureConfirm ? 'eye-off' : 'eye'} size={20} />
                </TouchableOpacity>
              </View>
              {errors.confirmPassword && <Text style={styles.errorTextSignUp}>{errors.confirmPassword}</Text>}

              {/* Button */}
              <TouchableOpacity style={styles.buttonSignUp} onPress={handleRegister}>
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
    fontWeight: '700',
  },
  subtitleSignUp: {
    color: '#888',
    marginBottom: 24,
  },
  linkSignUp: {
    color: '#e53935',
    fontWeight: '600',
  },
  labelSignUp: {
    marginBottom: 6,
    marginTop: 12,
    fontWeight: '500',
  },
  inputSignUp: {
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 12,
    padding: 14,
    backgroundColor: '#fafafa',
  },
  phoneRowSignUp: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 12,
    paddingHorizontal: 10,
    backgroundColor: '#fafafa',
  },
  phoneInputSignUp: {
    flex: 1,
    padding: 14,
  },
  passwordRowSignUp: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 12,
    paddingHorizontal: 14,
    backgroundColor: '#fafafa',
  },
  buttonSignUp: {
    backgroundColor: '#e53935',
    padding: 16,
    borderRadius: 14,
    marginTop: 50,
    marginBottom: 30,
    alignItems: 'center',
  },
  buttonTextSignUp: {
    color: '#fff',
    fontWeight: '700',
  },
  errorTextSignUp: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
  genderRowSignUp: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: '#eee',
    backgroundColor: '#fafafa',
  },
  genderOptionSignUp: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 12,
    marginHorizontal: 4,
    backgroundColor: '#fff',
  },
  genderSelectedSignUp: {
    backgroundColor: '#e53935',
  },
  pickerContainerSignUp: {
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 12,
    backgroundColor: '#fafafa',
  },
});