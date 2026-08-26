import React, { useMemo, useEffect, useState, useRef } from 'react';
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
import { Link, useRouter, useGlobalSearchParams, useLocalSearchParams } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
import { LinearGradient } from "expo-linear-gradient";
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

  // Accesses both route params
    const apiURL = process.env.EXPO_PUBLIC_API_URL;
    // const { accessToken, email } = useLocalSearchParams();
    const { accessToken } = useGlobalSearchParams();
    // console.log(accessToken);
  
    // GET DATA
      const [items, setItems] = useState<ItemData[]>([]);
      const [users, setUsers] = useState<UsersData | null>(null);
      // const [loading, setLoading] = useState<boolean>(true);
      const [loading, setLoading] = useState(true);
    
      useEffect(() => {
        fetchDataClassToday();
        fetchDataUser();
      }, []);
  
      const fetchDataClassToday = async () => {
        try {
          // const response = await fetch(`${apiURL}/class/schedule_today`);
          const response = await fetch(`${apiURL}/class/schedule_today_list?sortBy=start_time&order=asc`);
          const data = await response.json();
          const datalimit = data.slice(0,3);
          setItems(datalimit);
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
            {users && (
              <Text style={styles.headerTitle}>{users.full_name}</Text>
            )}
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
            <TouchableOpacity style={styles.menuItem} activeOpacity={0.7} onPress={() => router.replace('/about_us')}>
              <View style={styles.menuIcon}>
                <Ionicons name="information-outline" size={24} color="#fff" />
              </View>
              <Text style={styles.menuText}>About Us</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} activeOpacity={0.7} onPress={() => router.replace('/setting')}>
              <View style={styles.menuIcon}>
                <Ionicons name="settings-outline" size={24} color="#fff" />
              </View>
              <Text style={styles.menuText}>Settings</Text>
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
    // justifyContent: 'space-between',
    justifyContent: 'flex-start',
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