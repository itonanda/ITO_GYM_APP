import React, { useMemo, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  FlatList,
  Image,
} from 'react-native';
import { ViewToken } from 'react-native';
import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams } from 'expo-router';
import { Calendar } from "react-native-calendars";

const { width } = Dimensions.get('window');


/* ================= DATA ================= */
//Calendar
const workoutSchedule: Record<string, any[]> = {
  "2026-07-05": [
    {
      id: "1",
      title: "Morning Cardio",
      time: "08.00 - 09.00",
      booked: 2,
      total: 15,
    },
  ],
  "2026-07-10": [
    {
      id: "1",
      title: "Morning Cardio",
      time: "08.00 - 09.00",
      booked: 2,
      total: 15,
    },
    {
      id: "2",
      title: "Morning Cardio",
      time: "08.00 - 09.00",
      booked: 2,
      total: 15,
    },
    {
      id: "3",
      title: "Morning Cardio",
      time: "08.00 - 09.00",
      booked: 2,
      total: 15,
    },
  ],
  "2026-07-18": [
    {
      id: "1",
      title: "Morning Cardio",
      time: "08.00 - 09.00",
      booked: 2,
      total: 15,
    },
    {
      id: "2",
      title: "Morning Cardio",
      time: "08.00 - 09.00",
      booked: 2,
      total: 15,
    },
  ],
  "2026-08-01": [
    {
      id: "1",
      title: "Morning Cardio",
      time: "08.00 - 09.00",
      booked: 2,
      total: 15,
    },
    {
      id: "2",
      title: "Morning Cardio",
      time: "08.00 - 09.00",
      booked: 2,
      total: 15,
    },
    {
      id: "3",
      title: "Morning Cardio",
      time: "08.00 - 09.00",
      booked: 2,
      total: 15,
    },
  ],
};


export default function CoachDashboardScreen() {
  const router = useRouter();
  
  const today = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(today);
  const selectedWorkouts = workoutSchedule[selectedDate] || [];
  
  const markedDates = Object.keys(workoutSchedule).reduce(
    (acc, date) => {
      acc[date] = {
        marked: true,
        dotColor: "#E82528", // warna titik
      };

      return acc;
    },
    {} as Record<string, any>
  );

  // Tandai tanggal yang sedang dipilih
  markedDates[selectedDate] = {
    ...markedDates[selectedDate],
    selected: true,
    selectedColor: "#E82528",
  };


  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#E31E24" />

      {/* HEADER */}
      <LinearGradient
        colors={["#E82528", "#9A0006"]}
        style={styles.header}
      >
        <View style={styles.headerLeft}>
          <TouchableOpacity>
            <Image
              source={require('../../../assets/images/user/user.png')}
              style={styles.profileImage}
            />
          </TouchableOpacity>
          
          <View style={{marginLeft:10}}>
            <Text style={styles.headerTitle}>Coach Bahlil</Text>
          </View>
        </View>
        <Ionicons name="notifications-outline" size={24} color="#fff"/>
      </LinearGradient>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
          
          {/* Class Schedule */}
          <View style={styles.classDateScreen}>
            
            {/* Calendar */}
            <View style={styles.calendarCard}>

              {/* <Calendar
                onDayPress={(day) => {
                  setSelectedDate(day.dateString);
                }}
                markedDates={{
                  [selectedDate]: {
                    selected: true,
                    selectedColor: "#E82528",
                  },
                }}
              /> */}

              <Calendar
                onDayPress={(day) => {
                  setSelectedDate(day.dateString);
                }}
                markedDates={markedDates}
              />

              <Text
                style={{
                  marginTop: 20,
                  marginBottom: 10,
                  fontSize: 18,
                  fontWeight: "bold",
                  color: '#000',
                }}
              >
                Schedule - {selectedDate}
              </Text>

              {selectedWorkouts.length === 0 ? (
                <Text
                  style={{
                    textAlign: "center",
                    marginTop: 30,
                    color: "#999",
                  }}
                >
                  No Schedule Available
                </Text>
              ) : (
                selectedWorkouts.map((item) => (
                  <TouchableOpacity key={item.id} style={styles.cardClassDate}>
                    <View>
                      <Text style={styles.titleClassDate}>{item.title}</Text>
                      <Text style={styles.timeClassDate}>{item.time}</Text>
                    </View>

                    <Text style={styles.slotClassDate
                    }>
                      {item.booked}/{item.total}
                    </Text>
                  </TouchableOpacity>

                ))
              )}
            </View>
          </View>

          
          {/* Quick Actions */}
          <Text style={styles.sectionTitle}>
            Quick Actions
          </Text>

          {/* ================= Menu Grid ================= */}
          <View style={styles.menuContainer}>
            <TouchableOpacity style={styles.menuItem} activeOpacity={0.7} onPress={() => router.replace('/+not-found')}>
              <View style={styles.menuIcon}>
                <Ionicons name="add-circle" size={24} color="#fff" />
              </View>
              <Text style={styles.menuText}>Add Class</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} activeOpacity={0.7} onPress={() => router.replace('/+not-found')}>
              <View style={styles.menuIcon}>
                <Ionicons name="people" size={24} color="#fff" />
              </View>
              <Text style={styles.menuText}>Members</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} activeOpacity={0.7} onPress={() => router.replace('/+not-found')}>
              <View style={styles.menuIcon}>
                <Ionicons name="clipboard" size={24} color="#fff" />
              </View>
              <Text style={styles.menuText}>Attendance</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} activeOpacity={0.7} onPress={() => router.replace('/+not-found')}>
              <View style={styles.menuIcon}>
                <Ionicons name="analytics" size={24} color="#fff" />
              </View>
              <Text style={styles.menuText}>Reports</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
    </View>
  );
}


/* ================= STYLES ================= */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: '#E31E24',
    paddingTop: 50,
    paddingBottom: 40,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    //marginTop: 30,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 50,
    borderWidth:1,
  },


  //=========== Coach Screen ===========
  sectionTitle: {
    color: '#000',
    fontSize: 18,
    fontWeight: '700',
    marginTop: 30,
    marginBottom: 15,
    paddingHorizontal: 20,
  },

  classDateScreen: {
    flex: 1,
    backgroundColor: "#fff",
  },

  calendarCard: {
    //height: 550,
    backgroundColor: "#fff",
    //borderRadius: 20,
    padding: 20,
    //elevation: 4,
    //marginBottom: 10,
    //marginTop: 10,
  },

  cardClassDate: {
    borderWidth: 1,
    borderColor: "#555",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#eee",
  },

  titleClassDate: {
    fontSize: 18,
    fontWeight: "bold",
    fontStyle: "italic",
  },

  timeClassDate: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: "bold",
    color: "#666",
  },

  slotClassDate: {
    color: "red",
    fontSize: 18,
    fontWeight: "bold",
  },

  
  //=========== Menu Grid ===========
  menuContainer: {
    //marginTop: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  menuItem: {
    width: width / 4.5,
    alignItems: 'center',
    marginBottom: 25,
  },
  menuIcon: {
    width: 55,
    height: 55,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#CFCFCF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
    backgroundColor: '#E31E24',
  },
  menuText: {
    fontSize: 11,
    textAlign: 'center',
  },
});