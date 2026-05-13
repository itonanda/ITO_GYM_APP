import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Alert,
  StatusBar,
  FlatList,
  Image,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { ViewToken } from 'react-native';
import DateTimePicker from "@react-native-community/datetimepicker";
import CountryPicker, { CountryCode, Country } from 'react-native-country-picker-modal';
import { Link, useRouter } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import { Background } from "@react-navigation/elements";
import { LinearGradient } from "expo-linear-gradient";


const { width } = Dimensions.get('window');


export default function GuestWorkoutOfTheDayScreen() {
  const router = useRouter();
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

  // DATE
  const [selectedDay, setSelectedDay] = useState("today");
  const hari = [
    "Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"
  ];
  const bulan = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];
  // Today
  const today = new Date();
  // Tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const formatTanggal = (date: Date) => {
    const namaHari = hari[date.getDay()];
    const tanggal = date.getDate();
    const namaBulan = bulan[date.getMonth()];
    const tahun = date.getFullYear();

    //return `${namaHari}, ${tanggal} ${namaBulan} ${tahun}`;
    return `${tanggal} ${namaBulan} ${tahun}`;
  };
  const tanggalDipilih = selectedDay === "today" ? today : tomorrow;

  const [warmUpOpen, setWarmUpOpen] = useState(false);
  const [mainMenuOpen, setMainMenuOpen] = useState(false);
  const [coolingOpen, setCoolingOpen] = useState(false);


  const TodayScreen = () => (
    <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 150 }}
   >
      <View style={styles.todayScreen}>
        {/* Date */}
        <Text style={styles.dateText}>{formatTanggal(today)}</Text>

        {/* Accordion Card */}
          <View style={styles.cardWrapper}>
            
            {/* Warm Up */}
            <View style={[styles.section, styles.warmUpSection]}>
              <TouchableOpacity
                style={styles.sectionHeader}
                onPress={() => setWarmUpOpen(!warmUpOpen)}
              >
                <View style={styles.titleRow}>
                  <MaterialCommunityIcons
                    name="thermometer"
                    size={20}
                    color="black"
                  />
                  <Text style={styles.sectionTitle}>Warm Up</Text>
                </View>
                <Ionicons
                  name={warmUpOpen ? "chevron-up" : "chevron-down"}
                  size={22}
                  color="black"
                />
              </TouchableOpacity>

              {warmUpOpen && (
                <View style={styles.sectionBody}>
                  <Text style={styles.exerciseText}>A. Running 100 meter x 5 Lap</Text>
                  <Text style={styles.exerciseText}>B. Crouch 25 x 5 Repetition</Text>
                  <Text style={styles.exerciseText}>C. Leg Crunch</Text>
                </View>
              )}
            </View>

            {/* Main Menu */}
            <View style={[styles.section, styles.mainMenuSection]}>
              <TouchableOpacity
                style={styles.sectionHeader}
                onPress={() => setMainMenuOpen(!mainMenuOpen)}
              >
                <View style={styles.titleRow}>
                  <MaterialCommunityIcons
                    name="clipboard-text-outline"
                    size={20}
                    color="black"
                  />
                  <Text style={styles.sectionTitle}>Main Menu</Text>
                </View>
                <Ionicons
                  name={mainMenuOpen ? "chevron-up" : "chevron-down"}
                  size={22}
                  color="black"
                />
              </TouchableOpacity>

              {mainMenuOpen && (
                <View style={styles.sectionBody}>
                  <Text style={styles.exerciseText}>A. Push Up 4 x 12</Text>
                  <Text style={styles.exerciseText}>B. Squat 4 x 15</Text>
                  <Text style={styles.exerciseText}>C. Plank 60 sec</Text>
                </View>
              )}
            </View>

            {/* Cooling */}
            <View style={[styles.section, styles.coolingSection]}>
              <TouchableOpacity
                style={styles.sectionHeader}
                onPress={() => setCoolingOpen(!coolingOpen)}
              >
                <View style={styles.titleRow}>
                  <MaterialCommunityIcons
                    name="snowflake"
                    size={20}
                    color="black"
                  />
                  <Text style={styles.sectionTitle}>Cooling</Text>
                </View>
                <Ionicons
                  name={coolingOpen ? "chevron-up" : "chevron-down"}
                  size={22}
                  color="black"
                />
              </TouchableOpacity>

              {coolingOpen && (
                <View style={styles.sectionBody}>
                  <Text style={styles.exerciseText}>A. Light Stretching 5 min</Text>
                  <Text style={styles.exerciseText}>B. Breathing Exercise</Text>
                </View>
              )}
            </View>
          </View>    
      </View>
    </ScrollView>  
  );

  const TomorrowScreen = () => (
    <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 150 }}
   >
      <View style={styles.tomorrowScreen}>
      {/* Date */}
      <Text style={styles.dateText}>{formatTanggal(tomorrow)}</Text>

        {/* Accordion Card */}
          <View style={styles.cardWrapper}>
            
            {/* Warm Up */}
            <View style={[styles.section, styles.warmUpSection]}>
              <TouchableOpacity
                style={styles.sectionHeader}
                onPress={() => setWarmUpOpen(!warmUpOpen)}
              >
                <View style={styles.titleRow}>
                  <MaterialCommunityIcons
                    name="thermometer"
                    size={20}
                    color="black"
                  />
                  <Text style={styles.sectionTitle}>Warm Up</Text>
                </View>
                <Ionicons
                  name={warmUpOpen ? "chevron-up" : "chevron-down"}
                  size={22}
                  color="black"
                />
              </TouchableOpacity>

              {warmUpOpen && (
                <View style={styles.sectionBody}>
                  <Text style={styles.exerciseText}>A. Running 100 meter x 5 Lap</Text>
                  <Text style={styles.exerciseText}>B. Crouch 25 x 5 Repetition</Text>
                  <Text style={styles.exerciseText}>C. Leg Crunch</Text>
                </View>
              )}
            </View>

            {/* Main Menu */}
            <View style={[styles.section, styles.mainMenuSection]}>
              <TouchableOpacity
                style={styles.sectionHeader}
                onPress={() => setMainMenuOpen(!mainMenuOpen)}
              >
                <View style={styles.titleRow}>
                  <MaterialCommunityIcons
                    name="clipboard-text-outline"
                    size={20}
                    color="black"
                  />
                  <Text style={styles.sectionTitle}>Main Menu</Text>
                </View>
                <Ionicons
                  name={mainMenuOpen ? "chevron-up" : "chevron-down"}
                  size={22}
                  color="black"
                />
              </TouchableOpacity>

              {mainMenuOpen && (
                <View style={styles.sectionBody}>
                  <Text style={styles.exerciseText}>A. Push Up 4 x 12</Text>
                  <Text style={styles.exerciseText}>B. Squat 4 x 15</Text>
                  <Text style={styles.exerciseText}>C. Plank 60 sec</Text>
                </View>
              )}
            </View>

            {/* Cooling */}
            <View style={[styles.section, styles.coolingSection]}>
              <TouchableOpacity
                style={styles.sectionHeader}
                onPress={() => setCoolingOpen(!coolingOpen)}
              >
                <View style={styles.titleRow}>
                  <MaterialCommunityIcons
                    name="snowflake"
                    size={20}
                    color="black"
                  />
                  <Text style={styles.sectionTitle}>Cooling</Text>
                </View>
                <Ionicons
                  name={coolingOpen ? "chevron-up" : "chevron-down"}
                  size={22}
                  color="black"
                />
              </TouchableOpacity>

              {coolingOpen && (
                <View style={styles.sectionBody}>
                  <Text style={styles.exerciseText}>A. Light Stretching 5 min</Text>
                  <Text style={styles.exerciseText}>B. Breathing Exercise</Text>
                </View>
              )}
            </View>
          </View>    
      </View>
    </ScrollView>
  );


  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#E82528" />

      {/* HEADER */}
      <LinearGradient
        colors={["#E82528", "#9A0006"]}
        style={styles.header}
      >
        <TouchableOpacity style={styles.backButton} onPress={() => router.replace('/dashboard')}>
            <Ionicons name="arrow-back" size={22} color="#fff"/>
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Workout Of the Day</Text>

        <View style={{ width: 40 }} />
      </LinearGradient>


        <View style={styles.classScheduleRow}>
          {/* Today Button */}
          <TouchableOpacity
            style={[
              styles.classScheduleButton,
              selectedDay === "today" && styles.classScheduleActiveButton
            ]}
            onPress={() => setSelectedDay("today")}
          >
            <Text
              style={[
                styles.classScheduleButtonText,
                selectedDay === "today" && styles.classScheduleActiveText
              ]}
            >
               Today
            </Text>
          </TouchableOpacity>

          {/* Tomorrow Button */}
          <TouchableOpacity
            style={[
              styles.classScheduleButton,
              selectedDay === "tomorrow" && styles.classScheduleActiveButton
            ]}
            onPress={() => setSelectedDay("tomorrow")}
          >
            <Text
              style={[
                styles.classScheduleButtonText,
                selectedDay === "tomorrow" && styles.classScheduleActiveText
              ]}
            >
               Tomorrow
            </Text>
          </TouchableOpacity>
        </View>

      {/* kondisi screen */}
      {selectedDay === "today" ? <TodayScreen/> : <TomorrowScreen />}

    </View>
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

  
  /* ===== CLASS Schedule ===== */
  classScheduleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: '#eee',
    backgroundColor: '#fafafa',
    margin: 20,
  },
  classScheduleButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    marginHorizontal: 2,
    backgroundColor: '#fff',
    height: 70,
    width: 150,
    borderRadius: 16,
    justifyContent: 'center',
    textAlign: 'center',
  },
  classScheduleActiveButton: {
    backgroundColor: "#e53935"
  },
  classScheduleButtonText: {
    color: "#333",
    fontWeight: "bold",
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  classScheduleActiveText: {
    color: "#fff",
    fontWeight: "bold",
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  classScheduleDateText: {
    fontSize: 18,
    marginTop: 10
  },

  /* ===== SCREEN TODAY & TOMORROW ===== */
  todayScreen: {
    width: "100%",
    //padding: 40,
    backgroundColor: "#fff",
    //alignItems: "center",
    borderRadius: 10,
    margin: 20,
  },
  tomorrowScreen: {
    width: "100%",
    //padding: 40,
    backgroundColor: "#fff",
    //alignItems: "center",
    borderRadius: 10,
    margin: 20,
  },

  //============== Workout Of the Day ==============
  dateText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: "#111",
    //marginTop: 20,
    marginBottom: 20,
  },
  cardWrapper: {
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#222",
    marginRight: 40,
  },
  section: {
    width: "100%",
  },
  warmUpSection: {
    backgroundColor: "#ff5a5a",
    //minHeight: 300,
    paddingHorizontal: 14,
    paddingTop: 14,
    paddingBottom: 20,
  },
  mainMenuSection: {
    backgroundColor: "#a8eb68",
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderTopWidth: 1.5,
    borderTopColor: "#222",
  },
  coolingSection: {
    backgroundColor: "#5edee0",
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderTopWidth: 1.5,
    borderTopColor: "#222",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 10,
    color: "#111",
  },
  sectionBody: {
    marginTop: 18,
    paddingLeft: 34,
  },
  exerciseText: {
    fontSize: 15,
    fontStyle: "italic",
    fontWeight: "600",
    color: "#111",
    marginBottom: 18,
  },

});