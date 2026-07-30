import React, { useState, useRef } from 'react';
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
import { Link, useRouter } from 'expo-router';
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


export default function AddClassScreen() {
  const router = useRouter();

  // STATE API
  const apiURL = process.env.EXPO_PUBLIC_API_URL;

  // STATE FORM
  const [className, setClassName] = useState('');
  const [showClassName, setShowClassName] = useState(false);
  const [description, setDescription] = useState('For Upper body, make you more energize and feel better .....');
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

  // ROLE_USER
  const role = 'member';

  // VALIDASI
  const validate = () => {
    let tempErrors: { [key: string]: string } = {};

    if (!className) tempErrors.className = 'Class Name is required.';
    if (!classDate) tempErrors.classDate = 'Class Date is required.';
    if (!description.trim()) tempErrors.descriptions = 'Description is required.';
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

  // SUBMIT
  const handleSubmit = () => {
    if (!validate()) {
      return;
    } else {
      // fetch(`${apiURL}/auth/signup`, {
      //   method: 'POST',
      //   headers: {
      //     // 'Authorization': `Bearer YOUR_KEY`,
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ className, classDateJSON, description, list, quota, role, }),
      // })
      //   .then(response => response.json())
      //   .then(data => {
           Alert.alert('Success', 'Add Class berhasil!');
           router.replace('/dashboard');
        // })
        // .catch(error => {
        //   console.error('Error:', error);
        // });
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
                <TouchableOpacity style={styles.backButton} onPress={() => router.replace('/dashboard')}>
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
                      data={dataClassName}
                      pagingEnabled
                      showsHorizontalScrollIndicator={false}
                      keyExtractor={(item) => item.id}
                      onViewableItemsChanged={onViewableItemsChanged}
                      viewabilityConfig={viewConfig}
                      renderItem={({ item }) => (
                        <TouchableOpacity
                          key={item.id}
                          style={styles.classNameOption}
                          activeOpacity={1}
                          onPress={() => {
                            setClassName(item.titleClassName);
                            clearError("className");
                            setShowClassName(false);
                          }}
                        >
                          <Text style={styles.classNameOptionText}>{item.titleClassName}</Text>
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
                //placeholder="Enter Description"
                value={description}
                onChangeText={setDescription}
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