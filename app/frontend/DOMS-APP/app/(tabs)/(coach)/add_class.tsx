import React, { useEffect, useCallback, useState, useRef, useMemo } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
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
  Button,
  Keyboard,
  Modal,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CountryPicker, { CountryCode, Country } from 'react-native-country-picker-modal';
import { Link, useRouter, useGlobalSearchParams, useLocalSearchParams } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from "expo-linear-gradient";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { ViewToken } from 'react-native';
import Octicons from '@expo/vector-icons/Octicons';


/* ================= DATA ================= */
const dataClassName = [
  {
    id: '1',
    titleClassName: 'Morning Class',
  },
  {
    id: '2',
    titleClassName: 'Afternoon Class',
  },
  {
    id: '3',
    titleClassName: 'Evening Class',
  },
  {
    id: '4',
    titleClassName: 'Night Class',
  },
];

interface ItemData {
  profiles : any;
  id : string;
  full_name : string;

  class_title: any;
  id_class_title: string;
  title: string; // Replace with your actual table column schemas
  
  class_schedule : any;
  id_class_schedule: string;
  start_time: string;
  end_time: string;
  available_quota: string;
  quota: string;
  highlight: false;

  booking_class: any;
}

interface UsersData {
  id_user : string
  full_name : string;
  email : string;
}

export default function AddClassScreen() {
  const router = useRouter();
  const navigation = useNavigation();

  // STATE API
  const apiURL = process.env.EXPO_PUBLIC_API_URL;

  // STATE FORM
  const [IdClassName, setIdClassName] = useState('');
  const [className, setClassName] = useState('');
  const [showClassName, setShowClassName] = useState(false);
  const [descriptions, setDescriptions] = useState('For Upper body, make you more energize and feel better .....');
  const [list, setList] = useState('');
  const [quota, setQuota] = useState(''); 

  // DATE
  const [classDate, setclassDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);

  // TIME
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  // ERRORS
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // FORMAT DATE
  const formatDate = (date: Date) =>
    `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
  const classDateJSON = classDate.toISOString().split('T')[0];

  // VALIDASI
  const validate = () => {
    let tempErrors: { [key: string]: string } = {};

    if (!className) tempErrors.className = 'Class Name is required.';
    if (!classDate) tempErrors.classDate = 'Class Date is required.';
    if (!descriptions.trim()) tempErrors.descriptions = 'Description is required.';
    if (!list.trim()) tempErrors.list = 'List is required.';
    if (!quota.trim()) tempErrors.quota = 'Quota is required.';
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

  // Accesses both route params
  // const { accessToken, email } = useLocalSearchParams();
  const { accessToken } = useGlobalSearchParams();
  // console.log(accessToken);

  // GET DATA
    const [itemsTitleName, setItemsTitleName] = useState<ItemData[]>([]);
    const [users, setUsers] = useState<UsersData | null>(null);
    const [id_user, setIdUser] = useState('');
    // const [loading, setLoading] = useState<boolean>(true);
    const [loading, setLoading] = useState(true);
    // console.log(id_user);
    useEffect(() => {
      fetchDataClassName();
      fetchDataUser();
    }, []);

    const fetchDataClassName = async () => {
      try {
        // const response = await fetch(`${apiURL}/class/schedule_today`);
        const response = await fetch(`${apiURL}/class/title_class`);
        const data = await response.json();
        setItemsTitleName(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching list data:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchDataUser = async () => {
      try {
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
        setIdUser(dataUser.id_user);
        // console.log(dataUser);
      } catch (error) {
        console.error('Error fetching list data:', error);
      } finally {
        setLoading(false);
      }
    };

  const extractTimeHHMM = (apiISOString: string) => {
  // Extracts the "14:30" part from "14:30:00"
  return apiISOString.slice(0,5);
  };

  const extractTimeHHMMSS = (apiISOString: string) => {
  // Extract only the time portion from the clean string
  apiISOString.split('T')[1];
  console.log(apiISOString); // Output: "11:16:00.000"
  // Extracts the "14:30" part from "14:30:00"
  apiISOString.slice(0,8);
  console.log(apiISOString); // Output: "11:16:00"
  };
  
  const timeJSONISO = startTime.toISOString();
  // const startTimeJSON = startTime.toISOString().split('T')[1].slice(0,8);
  // const endTimeJSON = endTime.toISOString().split('T')[1].slice(0,8);
  // const timeJSON = startTime.toString();
  const startTimeJSON = startTime.toLocaleTimeString('en-US', { hour12: false });
  const endTimeJSON = endTime.toLocaleTimeString('en-US', { hour12: false });

  // console.log(timeJSONISO);
  // console.log(startTimeJSON);
  // console.log(endTimeJSON);

  // SUBMIT
  const handleSubmit = () => {
    if (!validate()) {
      return;
    } else {
      fetch(`${apiURL}/class/add_class`, {
        method: 'POST',
        headers: {
          // 'Authorization': `Bearer YOUR_KEY`,
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_user, IdClassName, classDateJSON, startTimeJSON, endTimeJSON, descriptions, list, quota, }),
      })
        .then(response => response.json())
        .then(data => {
           Alert.alert('Success', 'Add Class berhasil!');
           router.replace('/(tabs)/(coach)/dashboard');
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  };

  const onChangeDate = (event: any, selectedDate?: Date) => {
    setShowDate(Platform.OS === 'ios');
    if (selectedDate) setclassDate(selectedDate);
  };

  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef(null);
  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
        if (viewableItems.length > 0 && viewableItems[0].index !== null) {
        setActiveIndex(viewableItems[0].index);
        }
    }
    ).current;

    const viewConfig = {
    viewAreaCoveragePercentThreshold: 50,
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
        style={styles.headerClassSchedule}
      >
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.container}
          >
            <View style={styles.cardClassSchedule}>
              <View style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                marginBottom: 20,
                }}
              >
                {/* <TouchableOpacity style={styles.backButton} onPress={() => router.replace('/(tabs)/(coach)/dashboard')}> */}
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={22} color="#7e1212"/>
                </TouchableOpacity>
                <Text style={styles.title}>Add Class</Text>
              </View>       

              {/* Class Name */}
              <Text style={styles.labelClassSchedule}>Class Name*</Text>
              <TouchableOpacity
                style={[
                  styles.classNameRow,
                  errors.className && { borderColor: "red" },
                ]}
                onPress={() => setShowClassName(true)}
              >
                <Text
                  style={[
                    styles.classNameSelectText,
                    !className && { color: "#999" },
                  ]}
                >
                  {className || "-- Select Class Name --"}
                </Text>
  
                <Text style={styles.classNameArrow}>▼</Text>
              </TouchableOpacity>
  
              {errors.className && (
                <Text style={styles.errorTextClassSchedule}>{errors.className}</Text>
              )}

              <Modal visible={showClassName} transparent animationType="fade">
                <TouchableOpacity
                  style={styles.classNameModalOverlay}
                  activeOpacity={1}
                  onPress={() => setShowClassName(false)}
                >
                  <View style={styles.classNameModalContainer}>
                    <FlatList
                      ref={flatListRef}
                      // data={dataClassName}
                      data={itemsTitleName}
                      pagingEnabled
                      showsHorizontalScrollIndicator={false}
                      keyExtractor={(item) => item.id_class_title}
                      onViewableItemsChanged={onViewableItemsChanged}
                      viewabilityConfig={viewConfig}
                      renderItem={({ item }) => (
                        <TouchableOpacity
                          key={item.id_class_title}
                          style={styles.classNameOption}
                          activeOpacity={1}
                          onPress={() => {
                            setIdClassName(item.id_class_title);
                            setClassName(item.title);
                            clearError("className");
                            setShowClassName(false);
                          }}
                        >
                          <Text style={styles.classNameOptionText}>{item.title}</Text>
                        </TouchableOpacity>
                      )}
                    />
                  </View>
                </TouchableOpacity>
              </Modal>
 
              {/* Class Date */}
              <Text style={styles.labelClassSchedule}>Class Date*</Text>
              <TouchableOpacity
                style={[styles.inputClassSchedule, errors.classDateDate && { borderColor: 'red' }]}
                onPress={() => setShowDate(true)}
              >
                <Text>{formatDate(classDate)}</Text>
              </TouchableOpacity>
              {errors.classDate && <Text style={styles.errorTextClassSchedule}>{errors.classDate}</Text>}
              {showDate && (
                <DateTimePicker
                  value={classDate}
                  mode="date"
                  display="default"
                  minimumDate={new Date()}
                  onChange={onChangeDate}
                />
              )}
              
              {/* Start Time and End Time */}
              <Text style={styles.labelClassSchedule}>Start Time and End Time*</Text>
              <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                  <TouchableOpacity
                    style={styles.bottonTime}
                    onPress={() => setShowStartPicker(true)}
                  >
                    <Text style={styles.textBottonTime}>
                      {startTime.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </Text>
                  </TouchableOpacity>

                  {showStartPicker && (
                    <DateTimePicker
                      value={startTime}
                      mode="time"
                      is24Hour={true}
                      onChange={(event, selectedTime) => {
                        setShowStartPicker(false);

                        if (selectedTime) {
                          setStartTime(selectedTime);
                        }
                      }}
                    />
                    
                  )}

                  <View style={{padding: 16, alignContent: "center"}}>
                    <Octicons name="dash" size={24} color="#4E0708" />
                  </View>

                  <TouchableOpacity
                    style={styles.bottonTime}
                    onPress={() => setShowEndPicker(true)}
                  >
                    <Text style={styles.textBottonTime}>
                      {endTime.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </Text>
                  </TouchableOpacity>

                  {showEndPicker && (
                    <DateTimePicker
                      value={endTime}
                      mode="time"
                      is24Hour={true}
                      onChange={(event, selectedTime) => {
                        setShowEndPicker(false);

                        if (selectedTime) {
                          setEndTime(selectedTime);
                        }
                      }}
                    />
                  )}
              </View>        
              
              {/* Description */}
              <Text style={styles.labelClassSchedule}>Description*</Text>
              <TextInput
                style={[{ 
                  borderWidth: 1,
                  borderColor: "#D9D9DD",
                  borderRadius: 10,
                  padding: 12,
                  minHeight: 80,
                  backgroundColor: "#F7F7F7",
                  textAlignVertical: "top"}, errors.description && { borderColor: 'red' }]}
                  placeholder="Enter Description"
                  value={descriptions}
                  onChangeText={setDescriptions}
                  multiline
                  numberOfLines={5}
                  textAlignVertical="top"
              />
              {errors.description && <Text style={styles.errorTextClassSchedule}>{errors.description}</Text>}

              {/* List Class or Activity Plan */}
              <Text style={styles.labelClassSchedule}>Activity Plan*</Text>
              <TextInput
                style={[{
                  borderWidth: 1,
                  borderColor: "#D9D9DD",
                  borderRadius: 10,
                  padding: 12,
                  minHeight: 180,
                  backgroundColor: "#F7F7F7",
                  textAlignVertical: "top"}, errors.list && { borderColor: 'red' }]}
                  placeholder="Enter Activity Plan..."
                  value={list}
                  onChangeText={setList}
                  multiline
                  numberOfLines={10}
                  textAlignVertical="top"
              />
              {errors.list && <Text style={styles.errorTextClassSchedule}>{errors.list}</Text>}

              {/* Quota */}
              <Text style={styles.labelClassSchedule}>Quota*</Text>
              <TextInput
                style={[styles.inputClassSchedule, errors.quota && { borderColor: 'red' }]}
                placeholder="Quota"
                value={quota}
                onChangeText={setQuota}
                keyboardType="number-pad"
                maxLength={3}
              />
              {errors.quota && <Text style={styles.errorTextClassSchedule}>{errors.quota}</Text>}


              {/* Button */}
              <TouchableOpacity style={styles.buttonClassSchedule} onPress={handleSubmit}>
                <Text style={styles.buttonTextClassSchedule}>Submit</Text>
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
  
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(189, 15, 15, 0.42)",
    alignItems: "center",
    justifyContent: "center",
  },
  
  headerClassSchedule: {
    paddingHorizontal: 5,
  },
  cardClassSchedule: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
  },
  subtitleClassSchedule: {
    color: '#888',
    marginBottom: 24,
  },
  linkClassSchedule: {
    color: '#e53935',
    fontWeight: '600',
  },
  labelClassSchedule: {
    marginBottom: 6,
    marginTop: 12,
    fontWeight: '500',
  },
  inputClassSchedule: {
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 12,
    padding: 14,
    backgroundColor: '#fafafa',
  },
  
  buttonClassSchedule: {
    backgroundColor: '#e53935',
    padding: 16,
    borderRadius: 14,
    marginTop: 50,
    marginBottom: 30,
    alignItems: 'center',
  },
  buttonTextClassSchedule: {
    color: '#fff',
    fontWeight: '700',
  },
  errorTextClassSchedule: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
  
  pickerContainerClassSchedule: {
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 12,
    backgroundColor: '#fafafa',
  },

  classNameRow: {
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
  classNameSelectText: {
    fontSize: 16,
    color: "#000",
  },
  classNameArrow: {
    fontSize: 16,
    color: "#777",
  },
  classNameModalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  classNameModalContainer: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 10,
    marginTop: 100,
    marginBottom: 100,
  },
  classNameOption: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  classNameOptionText: {
    fontSize: 16,
  },

  bottonTime: {
    backgroundColor: '#4E0708', 
    padding: 16, 
    borderRadius: 14, 
    marginBottom: 10,
    alignItems: 'center',
    width: 120
  },
  textBottonTime: {
    fontSize: 14, 
    fontWeight: "bold", 
    color: "#fff"
  },
});