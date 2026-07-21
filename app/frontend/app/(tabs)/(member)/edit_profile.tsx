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
  StatusBar,
  Keyboard,
  Modal,
  Button,
  ActivityIndicator,
} from "react-native";
import CountryPicker, {
  Country,
  CountryCode,
} from "react-native-country-picker-modal";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter, useGlobalSearchParams, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from "expo-linear-gradient";

import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { decode } from 'base64-arraybuffer';
import { supabase } from '../../../lib/supabase';

interface UsersData {
  id_user : string;
  full_name : string;
  email : string;
}

// interface AvatarProps {
//   filePath: string | null; // e.g., 'public/user-123.jpg'
//   onUploadSuccess: (newFilePath: string) => void;
// }

interface AvatarProps {
  url: string | null;
  onUploadSuccess: (filePath: string) => void;
}

export default function EditProfileScreen({ url, onUploadSuccess }: AvatarProps) {
// export default function EditProfileScreen() {
  const router = useRouter();

  // STATE FORM
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [emergencyContactNo, setEmergencyContactNo] = useState("");
  const [emergencyContactName, setEmergencyContactName] = useState("");
  const [gender, setGender] = useState("");
  const [showGenderModal, setShowGenderModal] = useState(false);

  // DATE
  const [birthDate, setBirthDate] = useState(new Date());
  const [birthDateFetch, setbirthDateFetch] = useState("");
  const [showDate, setShowDate] = useState(false);

// FORMAT DATE
  const formatDate = (date: Date) =>
    `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
  const birthDateJSON = birthDate.toISOString().split("T")[0];

// COUNTRY
  const [countryCode, setCountryCode] = useState<CountryCode>("ID");
  const [callingCode, setCallingCode] = useState("62");
  //const [countryCode, setCountryCode] = useState<CountryCode>("ID");
  //const [countryCodes, setCountryCodes] = useState<CountryCode[]>(["ID"]);
  const [countryCodes, setCountryCodes] = useState<CountryCode>("ID");
  const [callingCodes, setCallingCodes] = useState("62");

 // ERRORS
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  
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

  const handleEditProfile = () => {
    if (!validate()) {
      return;
    }else {
      // fetch(`${apiURL}/auth/signin`, {
      fetch(`${apiURL}/auth/edit_profile`, {
        method: 'POST',
        headers: {
          // authorization: "Bearer YOUR_KEY",
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email,
          fullName,
          birthDateJSON,
          gender,
          phone,
          emergencyContactNo,
          emergencyContactName,
         }),
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
    }
  };

  // Accesses both route params
    const apiURL = process.env.EXPO_PUBLIC_API_URL;
    const { accessToken } = useGlobalSearchParams();
  // GET DATA
    // Accesses both route params ([id]) and query params (?name=John)
    const [users, setUsers] = useState<UsersData | null>(null);
    const [profiles, setProfiles] = useState<UsersData | null>(null);
    const [loading, setLoading] = useState(true);
    const { id_user } = useGlobalSearchParams();
    const [error, setError] = useState(null);
  
    const fetchDataUser = async () => {
      try {
        setLoading(true);
        // console.log(accessToken);
        const responseUser = await fetch(`${apiURL}/profile`, {
        method: 'GET',
        headers: {
          'authorization': `Bearer ${accessToken}`, // Pass JWT token to backend
          'Content-Type': 'application/json',
        }
      });
        const dataUser = await responseUser.json();
        setUsers(dataUser);
        setFullName(dataUser.full_name)
        setEmail(dataUser.email);
        setPhone(dataUser.phone);
        // setBirthDate(dataUser.date_of_birth);
        // setGender(dataUser.gender);
        // setEmergencyContactName(dataUser.emergency_contact_name);
        // setEmergencyContactNo(dataUser.emergency_contact_phone);

        // userId(dataUser.userId);
        console.log(dataUser);
      } catch (error) {
        console.error('Error fetching list data:', error);
        //setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchDataProfiles = async () => {
      try {
        setLoading(true);
        // console.log(accessToken);
        const responseUser = await fetch(`${apiURL}/users/${id_user}`, {
        method: 'GET',
        headers: {
          'authorization': `Bearer ${accessToken}`, // Pass JWT token to backend
          'Content-Type': 'application/json',
        }
      });
        const dataProfiles = await responseUser.json();
        setUsers(dataProfiles);
        setbirthDateFetch(dataProfiles.date_of_birth);
        setGender(dataProfiles.gender);
        setEmergencyContactName(dataProfiles.emergency_contact_name);
        setEmergencyContactNo(dataProfiles.emergency_contact_phone);

        // userId(dataUser.userId);
        console.log(dataProfiles);
      } catch (error) {
        console.error('Error fetching list data:', error);
        //setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
        fetchDataUser();
        fetchDataProfiles();
      }, []);

      //
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);

  // Download and cache the image URL whenever filePath updates
//   useEffect(() => {
//     if (filePath) downloadAvatar(filePath);
//   }, [filePath]);
    
//     // 1. DOWNLOAD AVATAR FROM SUPABASE
//   async function downloadAvatar(path: string) {
//     try {
//       setLoading(true);
//       // Retrieve a short-lived signed URL for secure image loading
//       const { data, error } = await supabase.storage
//         .from('avatars')
//         .createSignedUrl(path, 60 * 60); // 1 hour expiry

//       if (error) throw error;
//       if (data) setAvatarUrl(data.signedUrl);
//     } catch (error: any) {
//       Alert.alert('Download Error', error.message);
//     } finally {
//       setLoading(false);
//     }
//   }

  // 2. PICK AND UPLOAD AVATAR TO SUPABASE
//   async function pickAndUploadAvatar() {
//     try {
//       // Request device gallery permissions
//       const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
//       if (!permissionResult.granted) {
//         Alert.alert('Permission Denied', 'App needs camera roll access.');
//         return;
//       }

//       // Open local system file picker
//       const pickerResult = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.Images,
//         allowsEditing: true,
//         aspect: [1, 1],
//         quality: 0.5,
//       });

//       if (pickerResult.canceled || !pickerResult.assets?.[0]) return;
//       setLoading(true);

//       const selectedImage = pickerResult.assets[0];
//     //   const [selectedImage] = pickerResult.assets;
//       const fileExt = selectedImage.uri.split('.').pop()?.toLowerCase() || 'jpeg';
//       const fileName = `${Date.now()}.${fileExt}`;
//       const uploadPath = `uploads/${fileName}`;

//       // Read image file as Base64 string
//     //   const base64 = await FileSystem.readAsStringAsync(selectedImage.uri, {
//     //     encoding: FileSystem.EncodingType.Base64,
//     //   });
//      // Read image file as Base64 string directly using a literal string flag
//         const base64 = await FileSystem.readAsStringAsync(selectedImage.uri, {
//         encoding: 'base64', // <--- Changed from FileSystem.EncodingType.Base64
//         });

//         // // Initialize the modern local file instance object
//         // const localFile = new File(selectedImage.uri);

//         // // Read file directly to string via modern base64 mapping options
//         // const base64 = await localFile.text({ encoding: 'base64' });

//       // Convert Base64 into ArrayBuffer for Supabase Storage
//       const arrayBuffer = decode(base64);

//       // Perform upload operation to the bucket
//       const { data, error } = await supabase.storage
//         .from('avatars')
//         .upload(uploadPath, arrayBuffer, {
//           contentType: `image/${fileExt}`,
//           upsert: true,
//         });

//       if (error) throw error;

//       // Pass the uploaded file path back to parent component
//       if (data) onUploadSuccess(data.path);

//     } catch (error: any) {
//       Alert.alert('Upload Error', error.message);
//     } finally {
//       setLoading(false);
//     }
//   }

    const [uploading, setUploading] = useState(false);
    const [permissionStatus, setPermissionStatus] = useState<string | null>(null);
    // Pick an image from the device gallery
  const pickImage = async () => {
    try {
      setUploading(true);

      // Request media library permissions
    //   const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    //   if (!permissionResult.granted) {
    //     Alert.alert('Permission Denied', 'You need to allow gallery access to upload an avatar.');
    //     return;
    //   }

    console.log("Checking current permission level...");
    
    // 1. Check current permission level
    const permissionResult = await ImagePicker.getMediaLibraryPermissionsAsync();
    console.log("Current status response:", permissionResult);

    //   // 2. If it is already granted, proceed directly
    //   if (permissionResult.granted) {
    //     setPermissionStatus('granted');
    //     return true;
    //   }

    //   // 3. If it hasn't been requested or was denied, request it
    //   if (!permissionResult.granted && permissionResult.canAskAgain) {
    //     console.log("Requesting permission from user...");
    //     const request = await ImagePicker.requestMediaLibraryPermissionsAsync();
        
    //     if (request.granted) {
    //       setPermissionStatus('granted');
    //       return true;
    //     }
    //   }

    //   // 4. Handle permanent denial
    //   Alert.alert(
    //     "Permissions Needed", 
    //     "Gallery access is disabled. Please enable it in your device system settings."
    //   );
    //   return false;

    // 2. Request if not granted or undetermined
    if (!permissionResult.granted) {
      const requestResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!requestResult.granted) {
        Alert.alert("Permission Required", "Please allow gallery permissions in your device settings.");
        return;
      }
    }

      // Open camera roll with base64 data enabled
      const result = await ImagePicker.launchImageLibraryAsync({
        // mediaTypes: ImagePicker.MediaTypeOptions.Images,
        mediaTypes: ['images'], 
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
        base64: true, // Crucial for React Native Supabase uploads
      });

      if (result.canceled || !result.assets || result.assets.length === 0) {
        return;
      }

      const asset = result.assets[0];
      if (!asset.base64) {
        throw new Error('No base64 data found in selected image.');
      }

      // Generate a unique file path name
      const fileExt = asset.uri.split('.').pop()?.toLowerCase() || 'jpg';
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `public/${fileName}`;

      // Convert base64 data to ArrayBuffer
      const arrayBuffer = decode(asset.base64);

      // Upload the file to the "avatars" bucket
      const { data, error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, arrayBuffer, {
          contentType: `image/${fileExt}`,
          upsert: true,
        });

      if (uploadError) {
        throw uploadError;
      }

      // Return the storage key path up to parent component
      if (data) {
        onUploadSuccess(data.path);
      }
    } catch (error: any) {
      Alert.alert('Upload Error', error.message || 'An error occurred during upload.');
    } finally {
      setUploading(false);
    }
  };

// Construct the public link if url exists
  const avatarUri = url 
    ? supabase.storage.from('avatars').getPublicUrl(url).data.publicUrl 
    : 'https://placeholder.com';
// const avatarUri = avatarUrl;

  
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
            
            <Text style={styles.headerTitle}>Edit Profile</Text>
    
            <View style={{ width: 40 }} />
          </LinearGradient>
{/* {users && ( */}
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
        
        {/* <View style={styles.avatarFrame}>
            {avatarUrl ? (
            <Image source={{ uri: avatarUrl }} style={styles.image} />
            ) : (
            <View style={[styles.image, styles.placeholder]} />
            )}
            {loading && (
            <View style={styles.loadingOverlay}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
            )}
        </View>
        <Button 
            title={loading ? "Processing..." : "Change Avatar"} 
            onPress={pickAndUploadAvatar} 
            disabled={loading}
        /> */}
        <Image source={{ uri: avatarUri }} style={styles.avatar} />
        {/* Using a fallback placeholder image */}
        {/* <Image source={avatarUri ? { uri: avatarUri } : require('../../../assets/images/user/guest.png')} /> */}
        <TouchableOpacity style={styles.button} onPress={pickImage} disabled={uploading}>
            {uploading ? (
            <ActivityIndicator color="#fff" />
            ) : (
            <Text style={styles.buttonText}>Change Avatar</Text>
            )}
        </TouchableOpacity>

        {/* Full Name */}
            <Text style={styles.label}>Full Name*</Text>
            <TextInput
              returnKeyType="done"
              onSubmitEditing={() => Keyboard.dismiss()}
              style={[
                styles.input,
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
              <Text style={styles.errorText}>{errors.fullName}</Text>
            )}
            {/* Email */}
            <Text style={styles.label}>Email*</Text>
            <TextInput
              returnKeyType="done"
              onSubmitEditing={() => Keyboard.dismiss()}
              style={[
                styles.input,
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
              <Text style={styles.errorText}>{errors.email}</Text>
            )}

            {/* Birth Date */}
            <Text style={styles.label}>Birth of date*</Text>
            <TouchableOpacity
              style={[
                styles.input,
                errors.birthDate && { borderColor: "red" },
              ]}
              onPress={() => setShowDate(true)}
            >
              {/* <Text>{formatDate(birthDate)}</Text> */}
              <Text>{birthDateFetch}</Text>
            </TouchableOpacity>

            {errors.birthDate && (
              <Text style={styles.errorText}>{errors.birthDate}</Text>
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
            <Text style={styles.label}>Gender*</Text>
            <TouchableOpacity
              style={[
                styles.genderRow,
                errors.gender && { borderColor: "red" },
              ]}
              onPress={() => setShowGenderModal(true)}
            >
              <Text
                style={[
                  styles.genderSelectText,
                  !gender && { color: "#999" },
                ]}
              >
                {gender || "-- Select Gender --"}
              </Text>

              <Text style={styles.genderArrow}>▼</Text>
            </TouchableOpacity>

            {errors.gender && (
              <Text style={styles.errorText}>{errors.gender}</Text>
            )}

            <Modal visible={showGenderModal} transparent animationType="fade">
              <TouchableOpacity
                style={styles.genderModalOverlay}
                activeOpacity={1}
                onPress={() => setShowGenderModal(false)}
              >
                <View style={styles.genderModalContainer}>
                  <TouchableOpacity
                    style={styles.genderOption}
                    onPress={() => {
                      setGender("Male");
                      clearError("gender");
                      setShowGenderModal(false);
                    }}
                  >
                    <Text style={styles.genderOptionText}>Male</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.genderOption}
                    onPress={() => {
                      setGender("Female");
                      clearError("gender");
                      setShowGenderModal(false);
                    }}
                  >
                    <Text style={styles.genderOptionText}>Female</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            </Modal>

            {/* Phone Number */}
            <Text style={styles.label}>Phone Number*</Text>
            <View
              style={[
                styles.phoneRow,
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
                style={styles.phoneInput}
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
              <Text style={styles.errorText}>{errors.phone}</Text>
            )}

            {/* Emergency Contact Name */}
            <Text style={styles.label}>Emergency Contact Name*</Text>
            <TextInput
              returnKeyType="done"
              onSubmitEditing={() => Keyboard.dismiss()}
              style={[
                styles.input,
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
              <Text style={styles.errorText}>
                {errors.emergencyContactName}
              </Text>
            )}

            {/* Emergency Contact No */}
            <Text style={styles.label}>Emergency Contact Number*</Text>
            <View
              style={[
                styles.phoneRow,
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
                style={styles.phoneInput}
                placeholder="Emergency Contact Number"
                keyboardType="phone-pad"
                value={`${callingCodes}${emergencyContactNo}`}
                onChangeText={handleEmergencyContactNoChange}
              />

              {/* {emergencyContactNo.length > 0 && ( */}
                <TouchableOpacity onPress={() => setEmergencyContactNo("")}>
                  <Ionicons name="close-circle" size={22} color="#999" />
                </TouchableOpacity>
              {/* )} */}
            </View>
            {errors.emergencyContactNo && (
              <Text style={styles.errorText}>
                {errors.emergencyContactNo}
              </Text>
            )}
        
        {/* Change Password Button */}
        <TouchableOpacity style={styles.buttonSave} onPress={handleEditProfile}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </ScrollView>
        {/* )} */}
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

//   avatarFrame: {
//     position: 'relative',
//     width: 150,
//     height: 150,
//     borderRadius: 75,
//     overflow: 'hidden',
//     marginBottom: 10,
//   },
//   image: {
//     width: '100%',
//     height: '100%',
//   },
//   placeholder: {
//     backgroundColor: '#e1e1e1',
//   },
//   loadingOverlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: 'rgba(255, 255, 255, 0.7)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },

  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#ccc',
  },
  button: {
    marginTop: 12,
    backgroundColor: '#007AFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
//   buttonText: {
//     color: '#fff',
//     fontWeight: '600',
//   },

  label: {
    marginBottom: 6,
    marginTop: 12,
    fontWeight: "500",
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 12,
    padding: 14,
    backgroundColor: "#fafafa",
  },
  phoneRow: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 12,
    paddingHorizontal: 10,
    backgroundColor: "#fafafa",
  },
  phoneInput: {
    flex: 1,
    padding: 14,
  },
  passwordRow: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 12,
    paddingHorizontal: 14,
    backgroundColor: "#fafafa",
  },
  buttonSave: {
    backgroundColor: "#e53935",
    padding: 16,
    borderRadius: 14,
    marginTop: 50,
    marginBottom: 30,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
  },

  genderRow: {
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
  genderSelectText: {
    fontSize: 16,
    color: "#000",
  },
  genderArrow: {
    fontSize: 16,
    color: "#777",
  },
  genderModalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  genderModalContainer: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 10,
  },
  genderOption: {
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  genderOptionText: {
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