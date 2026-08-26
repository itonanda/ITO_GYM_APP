import React, { useEffect, useCallback, useState, useRef, useMemo } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
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
  Alert,
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
// const workoutSchedule: Record<string, any[]> = {
//   "2026-07-05": [
//     {
//       id: "1",
//       title: "Morning Cardio",
//       time: "08.00 - 09.00",
//       booked: 2,
//       total: 15,
//     },
//   ],
//   "2026-07-10": [
//     {
//       id: "1",
//       title: "Morning Cardio",
//       time: "08.00 - 09.00",
//       booked: 2,
//       total: 15,
//     },
//     {
//       id: "2",
//       title: "Morning Cardio",
//       time: "08.00 - 09.00",
//       booked: 2,
//       total: 15,
//     },
//     {
//       id: "3",
//       title: "Morning Cardio",
//       time: "08.00 - 09.00",
//       booked: 2,
//       total: 15,
//     },
//   ],
//   "2026-07-18": [
//     {
//       id: "1",
//       title: "Morning Cardio",
//       time: "08.00 - 09.00",
//       booked: 2,
//       total: 15,
//     },
//     {
//       id: "2",
//       title: "Morning Cardio",
//       time: "08.00 - 09.00",
//       booked: 2,
//       total: 15,
//     },
//   ],
//   "2026-08-01": [
//     {
//       id: "1",
//       title: "Morning Cardio",
//       time: "08.00 - 09.00",
//       booked: 2,
//       total: 15,
//     },
//     {
//       id: "2",
//       title: "Morning Cardio",
//       time: "08.00 - 09.00",
//       booked: 2,
//       total: 15,
//     },
//     {
//       id: "3",
//       title: "Morning Cardio",
//       time: "08.00 - 09.00",
//       booked: 2,
//       total: 15,
//     },
//   ],
// };

interface ItemData {
  profiles : any;
  id : string;
  full_name : string;

  class_title: any;
  id_class_title: string;
  title: string; // Replace with your actual table column schemas
  
  class_schedule : any;
  id_class_schedule: string;
  date:string;
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

// const data: Record<string, ItemData[]> = {
//   date : [
//     {
//       id_class_schedule
//     }
//   ]
// };

// type workoutSchedule = Record<string, ItemData[]>;

export default function CoachDashboardScreen() {
  const router = useRouter();
  const navigation = useNavigation();

  // const [items, setItems] = useState<workoutSchedule>({});
  const [items, setItems] = useState<ItemData[]>([]);
  // const workoutSchedule: Record<string, ItemData[]> = {items};
  // const [markedDates, setMarkedDates] = useState({});
  const today = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(today);
  const [markedDates, setMarkedDates] = useState({});
  // const selectedWorkouts = workoutSchedule[selectedDate] || [];
  // const selectedWorkouts = items[selectedDate] || [];

  // const [markedDates, setMarkedDates] = useState<Record<string, ItemData[]>>({});
  // const selectedWorkouts = markedDates[selectedDate] || [];
  // console.log(markedDates);

  // Tandai tanggal yang sedang dipilih
  // const markedDates = Object.keys(workoutSchedule).reduce(
  // const markedDates = Object.keys(items).reduce(
  //   (acc, date) => {
  //     acc[date] = {
  //       marked: true,
  //       dotColor: "#E82528", // warna titik
  //     };

  //     return acc;
  //   },
  //   {} as Record<string, any>
  // );
  
  // markedDates[selectedDate] = {
  //   ...markedDates[selectedDate],
  //   selected: true,
  //   selectedColor: "#E82528",
  // };

  // Accesses both route params
    const apiURL = process.env.EXPO_PUBLIC_API_URL;
    // const { accessToken, email } = useLocalSearchParams();
    const { accessToken } = useGlobalSearchParams();
    // console.log(accessToken);
  
    // GET DATA
    // const [items, setItems] = useState<ItemData[]>([]);
    const [users, setUsers] = useState<UsersData | null>(null);
    const [id_user, setIdUser] = useState('');
    // const [loading, setLoading] = useState<boolean>(true);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      fetchDataUser();
      console.log(users?.id_user);
      // fetchDataClass(); //Masih error
    }, []);

    useEffect(() => {
       if (!id_user) return; // Jangan jalankan jika ID masih null
       console.log(id_user);
      fetchDataClass();
    }, [id_user]);

     // 2. Perbarui penanda kalender setiap kali tanggal yang dipilih berubah
    useEffect(() => {
      generateMarkedDates(items, selectedDate);
    }, [items, selectedDate]);
    
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
        setIdUser(dataUser.id_user);
        // setIdUser(dataUser.id);
      } catch (error) {
        console.error('Error fetching list data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    const fetchDataClass = async () => {
      try {
        console.log(id_user);
        // const response = await fetch(`${apiURL}/class/schedule_today`);
        // const response = await fetch(`${apiURL}/class/schedule_coach/${id_user}`);
        const response = await fetch(`${apiURL}/class/schedule_coach/${id_user}`, {
        method: 'GET',
        headers: {
          'authorization': `Bearer ${accessToken}`, // Pass JWT token to backend
          'Content-Type': 'application/json',
        }
      });
        const data = await response.json();
        // const datalimit = data.slice(0,3);
        //  const data: ItemData = await response.json();
        setItems(data);
        generateMarkedDates(data, selectedDate);
        console.log(data);
        // Expecting data to be an array: [{ date: '2026-08-10', color: 'red' }, ...]

      // const formattedMarks = data.reduce((acc : any , item : any) => {
    //   const formattedMarks = data.foreach((acc : any , item : any) => {
    //     acc[item.date] = {
    //       marked: true,
    //       dotColor: "#E82528", // warna titik
    //       selected: true,
    //       selectedColor: "#E82528",
    //     };
    //     return acc;
    // }, {});

    //   // 3. Save the formatted dictionary object to state
    //   // setMarkedDates(formattedMarks);
    //   console.log(formattedMarks);
      } catch (error) {
        console.error('Error fetching list data:', error);
      } finally {
        setLoading(false);
      }
    };

    // Fungsi untuk membuat objek markedDates
  const generateMarkedDates = (schedules:ItemData[], selected:string) => {
    // const marks = {};
     // Tambahkan : Record<string, any> di sini agar bisa diindeks dengan string tanggal
    const marks: Record<string, any> = {};
    
    // Tandai tanggal yang memiliki jadwal dari API dengan titik (dot)
    schedules.forEach((item) => {
      marks[item.date] = { marked: true, dotColor: '#7e1212' };
    });

    // Berikan sorotan visual (highlight) pada tanggal yang sedang dipilih pengguna
    marks[selected] = {
      ...marks[selected], // Pertahankan titik jika ada
      selected: true,
      selectedColor: '#7e1212',
      selectedTextColor: '#ffffff',
    };

    setMarkedDates(marks);
  };

   // 3. Saring jadwal hanya untuk tanggal yang sedang dipilih
  const selectedWorkouts = items.filter((item) => item.date === selectedDate);

  const extractTimeHHMM = (apiISOString: string) => {
    // Extracts the "14:30" part from "14:30:00"
    return apiISOString.slice(0,5);
  };
  
  const handleListClass = () => {
    {users &&(
      router.push({
        pathname: '/(tabs)/(coach)/list_class',
        params: { accessToken, id_user: users.id_user }
      })
    )}
  };

  const handleScheduleClassCancel = (id_class_schedule:string) => {
    console.log(id_class_schedule);;

    return Alert.alert(
      "Confirmation", // Judul Pop-up
      // "Apakah Anda yakin ingin menghapus data ini?", // Pesan Pop-up
      // "Are you sure you want to cancel this booking? This action cannot be undone.?", // Pesan Pop-up
      "Are you sure you want to cancel this schedule?", // Pesan Pop-up
      [
        // Tombol No
        {
          text: "Cancel",
          style: "cancel",
        },
        // Tombol Yes
        {
          text: "Yes",
          style: "destructive", // Opsional: Tampilan merah untuk peringatan
          onPress: () => {
            console.log("Data dihapus!");
            // Masukkan fungsi 'Yes' Anda di sini
            fetch(`${apiURL}/class/schedule_class/cancel`, {
              method: 'PUT',
              headers: {
                // authorization: "Bearer YOUR_KEY",
                'authorization': `Bearer ${accessToken}`, // Pass JWT token to backend
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ 
                  id_class_schedule, id_user
              }),
            })
              .then(response => response.json())
              .then(data => {
                router.replace({
                  pathname: '/(tabs)/(coach)/class_cancel',
                  // params: { accessToken: data.session.access_token, email: data.session.email, user: data.user }
                });
              })
              .catch(error => {
                console.error('Error:', error);
              });
          },
        },
      ]
    );
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


              <Text
                style={{
                  // marginTop: 20,
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
                  // <TouchableOpacity key={item.id_class_schedule} style={styles.cardClassDate} onPress={() => router.replace('/edit_class')}>
                  // <TouchableOpacity key={item.id_class_schedule} style={styles.cardClassDate} onPress={() => router.push({
                  <TouchableOpacity key={item.id_class_schedule} style={styles.cardClassDate} onPress={() => router.navigate({
                        pathname: '/(tabs)/(coach)/edit_class',
                        params: { id_class_schedule: item.id_class_schedule },
                      })
                    }
                  >
                    <View>
                      <Text style={styles.titleClassDate}>{item.class_title.title}</Text>
                      <Text style={styles.timeClassDate}>{item.date}</Text>
                      <View style={{marginTop: 10}}>
                        <Text style={styles.slotClassDate}>{item.available_quota}/{item.quota}</Text>
                      </View>
                    </View>
                    <View style={{flexDirection: "row", gap:5}}>
                      {/* <TouchableOpacity style={styles.actionButton} onPress={() => router.replace('/participants')}> */}
                      {/* <TouchableOpacity key={item.id_class_schedule} style={styles.actionButton} onPress={() => router.push({ */}
                      <TouchableOpacity key={item.id_class_schedule} style={styles.actionButton} onPress={() => router.navigate({
                            pathname: '/(tabs)/(coach)/participants',
                            params: { id_class_schedule: item.id_class_schedule },
                          })
                        }
                      >
                          <Ionicons name="eye" size={22} color="#7e1212"/>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.actionButton} onPress={() => handleScheduleClassCancel(item.id_class_schedule)}>
                          <Ionicons name="trash" size={22} color="#7e1212"/>
                      </TouchableOpacity>
                    </View>                    
                  </TouchableOpacity>

                ))
              )}

              <Calendar
                onDayPress={(day) => {
                  setSelectedDate(day.dateString);
                }}
                markedDates={markedDates}
              />
              
            </View>
          </View>

          
          {/* Quick Actions */}
          <Text style={styles.sectionTitle}>
            Quick Actions
          </Text>

          {/* ================= Menu Grid ================= */}
          <View style={styles.menuContainer}>
            {/* <TouchableOpacity style={styles.menuItem} activeOpacity={0.7} onPress={() => router.replace('/add_class')}> */}
            <TouchableOpacity style={styles.menuItem} activeOpacity={0.7} onPress={() => router.navigate('/(tabs)/(coach)/add_class')}>
              <View style={styles.menuIcon}>
                <Ionicons name="add-circle" size={24} color="#fff" />
              </View>
              <Text style={styles.menuText}>Add Class</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.menuItem} activeOpacity={0.7} onPress={() => router.replace('/list_class')}> */}
            {/* <TouchableOpacity style={styles.menuItem} activeOpacity={0.7} onPress={handleListClass}>
              <View style={styles.menuIcon}>
                <Ionicons name="analytics" size={24} color="#fff" />
              </View>
              <Text style={styles.menuText}>List Class</Text>
            </TouchableOpacity> */}
            {/* <TouchableOpacity style={styles.menuItem} activeOpacity={0.7} onPress={() => router.replace('/+not-found')}> */}
            {/* <TouchableOpacity style={styles.menuItem} activeOpacity={0.7} onPress={() => router.navigate('/+not-found')}>
              <View style={styles.menuIcon}>
                <Ionicons name="analytics" size={24} color="#fff" />
              </View>
              <Text style={styles.menuText}>Reports</Text>
            </TouchableOpacity> */}
            {/* <TouchableOpacity style={styles.menuItem} activeOpacity={0.7} onPress={() => router.replace('/about_us')}> */}
            <TouchableOpacity style={styles.menuItem} activeOpacity={0.7} onPress={() => router.navigate('/(tabs)/(coach)/about_us')}>
              <View style={styles.menuIcon}>
                <Ionicons name="information-outline" size={24} color="#fff" />
              </View>
              <Text style={styles.menuText}>About Us</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.menuItem} activeOpacity={0.7} onPress={() => router.replace('/setting')}> */}
            <TouchableOpacity style={styles.menuItem} activeOpacity={0.7} onPress={() => router.navigate('/(tabs)/(coach)/setting')}>
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
  actionButton: {
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: "rgba(189, 15, 15, 0.42)",
    alignItems: "center",
    justifyContent: "center",
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