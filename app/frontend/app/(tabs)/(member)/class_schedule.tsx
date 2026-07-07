import React, { useEffect, useState, useRef } from 'react';
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
import { Ionicons } from "@expo/vector-icons";
import { ViewToken } from 'react-native';
import DateTimePicker from "@react-native-community/datetimepicker";
import CountryPicker, { CountryCode, Country } from 'react-native-country-picker-modal';
import { Link, useRouter, useGlobalSearchParams, useLocalSearchParams } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import { Background } from "@react-navigation/elements";
import { LinearGradient } from "expo-linear-gradient";
import { Int32 } from 'react-native/Libraries/Types/CodegenTypes';
import { Timestamp } from 'react-native-reanimated/lib/typescript/commonTypes';

const { width } = Dimensions.get('window');

 // STATE API
  const apiURL = process.env.EXPO_PUBLIC_API_URL;

  // const [items, setItems] = useState<ItemData[]>([]);
  // const [loading, setLoading] = useState<boolean>(true);

interface ItemData {
  profiles : any;
  class_title: any;
  booking_class: any;
  
  id_class_schedule: Int32;
  title: string; // Replace with your actual table column schemas
  start_time: string;
  end_time: string;
  available_quota: Int32;
  quota: Int32;
  highlight: false;
}

interface UsersData {
  id_user : Int32;
  full_name : string;
  email : string;
}

// GET DATA
  // useEffect(() => {
  //   fetchData();
  // }, []);

  // const fetchData = async () => {
  //   try {
  //     const response = await fetch(`${apiURL}/class/schedule`);
  //     const data = await response.json();
  //     setItems(data);
  //   } catch (error) {
  //     console.error('Error fetching list data:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

/* ================= DATA ================= */
const classDataToday = [
  {
    id: '1',
    title: 'Morning Class',
    time: '08.00 - 09.00',
    trainer: 'Adryl Nath',
    quota: '2/15',
    highlight: false,
    image:
      'https://media.gettyimages.com/id/1059616710/photo/young-woman-exercising-on-treadmill.jpg?s=2048x2048&w=gi&k=20&c=vDIxPW48WJILe5PhY6U4UOisRvflllLe6Fd1qQfNgjY=',
  },
  {
  id: '2',
    title: 'Kids Class',
    time: '12.00 - 13.00',
    trainer: 'Kent Handi',
    quota: '10/15',
    highlight: false,
    image:
      'https://media.gettyimages.com/id/639376842/photo/exercising-as-a-class.jpg?s=2048x2048&w=gi&k=20&c=0zs1xGWPsdPIaL6ZmBgHCakuGTUBotEo33BKV_vUJRw=',
  },
  {
    id: '3',
    title: 'Afternoon Class',
    time: '13.00 - 14.00',
    trainer: 'Michael Tan',
    quota: '5/15',
    highlight: false,
    image:
      'https://media.gettyimages.com/id/1493959975/photo/young-man-working-out-with-battle-ropes-in-gym.jpg?s=2048x2048&w=gi&k=20&c=AU9pMkFlLTtqi-Cn_W5Rp7g40dd7DZJXy1lQbIdQMt0=',
  },
  {
    id: '4',
    title: 'Evening Class',
    time: '18.00 - 19.00',
    trainer: 'Sarah Lee',
    quota: '10/15',
    highlight: false,
    image:
      'https://media.gettyimages.com/id/2208288816/photo/female-kickboxer-shadowboxing-with-dumbbells.jpg?s=2048x2048&w=gi&k=20&c=v3cUTd65XgSCj0lHYQ4KYkRhsI7BEuxTMxoHbByeynI=',
  },
];

const classDataTomorrow = [
  {
    id: '1',
    title: 'Morning Class',
    time: '08.00 - 09.00',
    trainer: 'Adryl Nath',
    quota: '2/15',
    highlight: true,
    image:
      'https://media.gettyimages.com/id/1059616710/photo/young-woman-exercising-on-treadmill.jpg?s=2048x2048&w=gi&k=20&c=vDIxPW48WJILe5PhY6U4UOisRvflllLe6Fd1qQfNgjY=',
  },
  {
    id: '2',
    title: 'Afternoon Class',
    time: '13.00 - 14.00',
    trainer: 'Michael Tan',
    quota: '5/15',
    highlight: false,
    image:
      'https://media.gettyimages.com/id/1493959975/photo/young-man-working-out-with-battle-ropes-in-gym.jpg?s=2048x2048&w=gi&k=20&c=AU9pMkFlLTtqi-Cn_W5Rp7g40dd7DZJXy1lQbIdQMt0=',
  },
  {
  id: '3',
    title: 'Kids Class',
    time: '12.00 - 13.00',
    trainer: 'Kent Handi',
    quota: '10/15',
    highlight: false,
    image:
      'https://media.gettyimages.com/id/639376842/photo/exercising-as-a-class.jpg?s=2048x2048&w=gi&k=20&c=0zs1xGWPsdPIaL6ZmBgHCakuGTUBotEo33BKV_vUJRw=',
  },
];


export default function MemberClassScheduleScreen() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef(null);

  // GET DATA
  const [users, setUsers] = useState<UsersData[]>([]);
  const [itemsToday, setItemsToday] = useState<ItemData[]>([]);
  const [itemsTomorrow, setItemsTommorow] = useState<ItemData[]>([]);
  // const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { accessToken, id_user, name, email } = useGlobalSearchParams();

  useEffect(() => {
    fetchDataUser();
    fetchDataClassToday();
    fetchDataClassTomorrow();
  }, []);

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

  const fetchDataClassToday = async () => {
    try {
      // const response = await fetch(`${apiURL}/class/schedule_today`);
      const response = await fetch(`${apiURL}/class/schedule_today_list?sortBy=start_time&order=asc`);
      const data = await response.json();
      setItemsToday(data);
    } catch (error) {
      console.error('Error fetching list data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDataClassTomorrow = async () => {
    try {
      // const response = await fetch(`${apiURL}/class/schedule_tomorrow`);
      const response = await fetch(`${apiURL}/class/schedule_tomorrow_list?sortBy=start_time&order=asc`);
      const data = await response.json();
      setItemsTommorow(data);
    } catch (error) {
      console.error('Error fetching list data:', error);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   // Replace with your local Express server IP (e.g., http://192.168.1)
  //   fetch(`${apiURL}/class/schedule`)
  //     .then((response) => response.json())
  //     .then((json) => {
  //       setData(json);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       setLoading(false);
  //     });
  // }, []);

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
  // const tanggalDipilih = selectedDay === "today" ? today : tomorrow;
  
  const extractTimeHHMM = (apiISOString: string) => {
  // Extracts the "14:30" part from "14:30:00"
  return apiISOString.slice(0,5); 
};

  const TodayScreen = () => (
    <View style={styles.todayScreen}>
        <FlatList
          data={itemsToday}
          keyExtractor={(item) => item.id_class_schedule.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 350 }}
          renderItem={({ item }) => (
            <TouchableOpacity key={item.id_class_schedule} style={styles.headerCard} activeOpacity={1} 
              onPress={() =>
                // router.push(
                //   item.highlight
                //     ? '/(tabs)/(member)/class_detail_update'
                //     : '/(tabs)/(member)/class_detail/'${item.id_class_schedule}
                // )
                router.push({
                  pathname: '/(tabs)/(member)/class_detail',
                  params: { id_class_schedule: item.id_class_schedule },
                  // state: { 
                  //   token: 'super-secret-token-12345',
                  //   userId: 99
                  // }
                })
              }>       
                <View style={styles.classCard}>
                  <Image
                    // source={{ uri: item.image }}
                    source={{ uri: 'https://media.gettyimages.com/id/1059616710/photo/young-woman-exercising-on-treadmill.jpg?s=2048x2048&w=gi&k=20&c=vDIxPW48WJILe5PhY6U4UOisRvflllLe6Fd1qQfNgjY=' }}
                    style={styles.classImage}
                  />
                  
                  <View key={item.id_class_schedule} style={[styles.cardContent, item.highlight && styles.highlightCard]}>
                    <View>
                      <Text style={styles.classTitle}>{item.class_title?.title}</Text>
                      
                      {/* <Text style={styles.classTime}>{item.start_time_class}-{item.end_time_class}</Text> */}
                      <Text style={styles.classTime}>{extractTimeHHMM(item.start_time)} - {extractTimeHHMM(item.end_time)}</Text>
                      <Text style={[styles.classTrainer, item.highlight && { color: "#fff" }]}>
                        By {item.profiles?.full_name}
                      </Text>
                    </View>
                    {/* <Text style={[styles.classQuota, item.highlight && { color: "#fff" }]}>{item.quota_class}</Text> */}
                    <Text style={[styles.classQuota, item.highlight && { color: "#fff" }]}>{item.available_quota}/{item.quota}</Text>
                  </View>
                </View>
            </TouchableOpacity>
          )}
        />
    </View>
  );

  const TomorrowScreen = () => (
    <View style={styles.tomorrowScreen}>
        <FlatList
          data={itemsTomorrow}
          keyExtractor={(item) => item.id_class_schedule.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 350 }}
          renderItem={({ item }) => (
            <TouchableOpacity key={item.id_class_schedule} style={styles.headerCard} activeOpacity={1} 
              onPress={() =>
                // router.push(
                //   item.highlight
                //     ? '/(tabs)/(member)/class_detail_update'
                //     : '/(tabs)/(member)/class_detail/'${item.id_class_schedule}
                // )
                router.push({
                  pathname: '/(tabs)/(member)/class_detail',
                  params: { id_class_schedule: item.id_class_schedule },
                  // state: { 
                  //   token: 'super-secret-token-12345',
                  //   userId: 99
                  // }
                })
              }>       
                <View style={styles.classCard}>
                  <Image
                    // source={{ uri: item.image }}
                    source={{ uri: 'https://media.gettyimages.com/id/1059616710/photo/young-woman-exercising-on-treadmill.jpg?s=2048x2048&w=gi&k=20&c=vDIxPW48WJILe5PhY6U4UOisRvflllLe6Fd1qQfNgjY=' }}
                    style={styles.classImage}
                  />
                  
                  <View key={item.id_class_schedule} style={[styles.cardContent, item.highlight && styles.highlightCard]}>
                    <View>
                      <Text style={styles.classTitle}>{item.class_title?.title}</Text>
                      {/* <Text style={styles.classTime}>{item.start_time_class}-{item.end_time_class}</Text> */}
                      <Text style={styles.classTime}>{extractTimeHHMM(item.start_time)} - {extractTimeHHMM(item.end_time)}</Text>
                      <Text style={[styles.classTrainer, item.highlight && { color: "#fff" }]}>
                        By {item.profiles?.fullname}
                      </Text>
                    </View>
                    {/* <Text style={[styles.classQuota, item.highlight && { color: "#fff" }]}>{item.quota_class}</Text> */}
                    <Text style={[styles.classQuota, item.highlight && { color: "#fff" }]}>{item.available_quota}/{item.quota}</Text>
                  </View>
                </View>
            </TouchableOpacity>
          )}
        />
    </View>
  );

  //  const TomorrowScreen = () => (
  //   <View style={styles.tomorrowScreen}>
  //       <FlatList
  //         data={classDataTomorrow}
  //         keyExtractor={(item, index) => index.toString()}
  //         showsVerticalScrollIndicator={false}
  //         contentContainerStyle={{ paddingBottom: 350 }}
  //         renderItem={({ item }) => (
  //           <TouchableOpacity key={item.id} style={styles.headerCard} activeOpacity={1}
  //             onPress={() =>
  //               router.push(
  //                 item.highlight
  //                   ? '/(tabs)/(member)/class_detail_update'
  //                   : '/(tabs)/(member)/class_detail'
  //               )
  //             }>       
  //               <View style={styles.classCard}>
  //                 <Image
  //                   source={{ uri: item.image }}
  //                   style={styles.classImage}
  //                 />
                  
  //                 <View key={item.id} style={[styles.cardContent, item.highlight && styles.highlightCard]}>
  //                   <View>
  //                     <Text style={styles.classTitle}>{item.title}</Text>
  //                     <Text style={styles.classTime}>{item.time}</Text>
  //                     <Text style={[styles.classTrainer, item.highlight && { color: "#fff" }]}>
  //                       By {item.trainer}
  //                     </Text>
  //                   </View>
  //                   <Text style={[styles.classQuota, item.highlight && { color: "#fff" }]}>{item.quota}</Text>
  //                 </View>
  //               </View>
  //           </TouchableOpacity>
  //         )}
  //       />
  //   </View>
  // );

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
        
        <Text style={styles.headerTitle}>Class Schedule</Text>

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
                Today {"\n"} {formatTanggal(today)}
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
                Tomorrow {"\n"} {formatTanggal(tomorrow)}
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

  /* ===== CLASS CARD ===== */
  headerCard: {
    width: width - 40,
    //backgroundColor: '#d26868',
    //marginHorizontal: 20,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  classCard: {
    width: width - 40,
    //marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
  },
  classImage: {
    width: '100%',
    height: 120,
  },
  cardContent: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  classTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  classTime: {
    fontSize: 13,
    marginTop: 3,
  },
  classTrainer: {
    fontSize: 12,
    marginTop: 3,
    color: '#E31E24',
  },
  classQuota: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E31E24',
  },

  highlightCard: {
    backgroundColor: "#69d36e",
    borderColor: "#4caf50",
  },

  /* ===== SCREEN TODAY & TOMORROW ===== */
  todayScreen: {
    width: "100%",
    //padding: 40,
    backgroundColor: "#fff",
    alignItems: "center",
    borderRadius: 10
  },
  tomorrowScreen: {
    width: "100%",
    //padding: 40,
    backgroundColor: "#fff",
    alignItems: "center",
    borderRadius: 10
  },
});