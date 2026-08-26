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
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ViewToken } from 'react-native';
import DateTimePicker from "@react-native-community/datetimepicker";
import CountryPicker, { CountryCode, Country } from 'react-native-country-picker-modal';
import { Link, useRouter, useGlobalSearchParams } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import { Background } from "@react-navigation/elements";
import { LinearGradient } from "expo-linear-gradient";
import { Int32 } from 'react-native/Libraries/Types/CodegenTypes';

const { width } = Dimensions.get('window');

// STATE API
  const apiURL = process.env.EXPO_PUBLIC_API_URL;

  interface ItemData {
    coach : any;
    class: any;
    class_schedule: any;
    
    id_class_booking: string;
    id_user: string;
    id_class_schedule: string;
    name_class: string; // Replace with your actual table column schemas
    start_time_class: string;
    end_time_class: string;
    schedule_date_class: string;
    available_quota_class: string;
    quota_class: string;
    list_class: String;
    highlight: false;
  }
  
  interface UsersData {
    id_user : string;
    name : string;
    email : string;
  }
  
/* ================= DATA ================= */
const classDataBookingClass = [
  {
    id: '1',
    highlight: true,
    title: 'Morning Class',
    day: '25',
    month: 'May',
    time: '08.00 - 09.00',
    trainer: 'Adryl Nath',
  }
];

export default function BookingClassScreen() {
  const router = useRouter();
  const [activeIndexBookingClass, setActiveIndexBookingClass] = useState(0);
  const flatListRefBookingClass = useRef(null);

  const onViewableItemsChangedBookingClass = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index !== null) {
        setActiveIndexBookingClass(viewableItems[0].index);
      }
    }
  ).current;

  const viewConfigBookingClass = {
    viewAreaCoveragePercentThreshold: 50,
  };

  // GET DATA
    // Accesses both route params ([id]) and query params (?name=John)
      // const { id_class_schedule } = useLocalSearchParams();
      // const [items, setItems] = useState<ItemData[]>([]);
      // const [loading, setLoading] = useState<boolean>(true);
      const [itemsBooking, setData] = useState<ItemData[]>([]);
      const [items, setDataItem] = useState<ItemData| null>(null);
      const [users, setUsers] = useState<UsersData| null>(null);
      const [loading, setLoading] = useState(true);
      const { accessToken } = useGlobalSearchParams();
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
        // userId(dataUser.userId);
        // console.log(dataUser);
      } catch (error) {
        console.error('Error fetching list data:', error);
        //setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    
      const fetchDataBookingClass = async () => {
        try {
          const response = await fetch(`${apiURL}/class/booking/${id_user}`);
          // const response = await fetch(`${apiURL}/class/schedule_today`);
          const data = await response.json();
          // setItems(data);
          setData(data);
          setDataItem(data);
          console.log(data);
        } catch (error) {
          console.error('Error fetching list data:', error);
        } finally {
          setLoading(false);
        }
      };

      useEffect(() => {
        fetchDataUser();
        fetchDataBookingClass();
        // console.log(id_user);
        // console.log(itemsBooking);
        // console.log(items);
      }, []);

// 2. Function to handle item press
  const handleItemPress = (item : any) => {
    alert(`You tapped: ${item.name}`);
  };

  // 3. Render item function
  const renderItem = ({ item }: { item: any }) => (
    //  <Pressable key={item.id_class_booking} style={styles.headerCard} onPress={() => router.replace('/class_detail_update')}>       
                                    
    //                              </Pressable>
    <TouchableOpacity 
      key={item.id_class_booking}
      style={styles.headerCard} 
      onPress={() => handleItemPress(item)}
      activeOpacity={0.7}
    >
      <View style={styles.cardBookingClass}>
          {/* Date Box */}
          <View style={styles.dateContainer}>
          {/* <View style={styles.monthBox}>
              <Text style={styles.monthText}>{item.month}</Text>
          </View> */}
          <View style={styles.dayBox}>
              <Text style={styles.dayText}>{item.class_schedule.schedule_date_class}</Text>
          </View>
          </View>

          {/* Divider */}
          <View style={styles.dividerBooking} />

          {/* Content */}
          <View style={styles.contentBooking}>
          <Text style={styles.classTitleTime}>{item.class_schedule.class.name_class}</Text>
          <Text style={styles.time}>{item.class_schedule.start_time_class}-{item.end_time_class}</Text>
          <Text style={styles.author}>By {item.class_schedule.coach.fullname}</Text>
          </View>
      </View>
    </TouchableOpacity>
  );

  const TodayScreen = () => (
      
          <FlatList
            data={itemsBooking}
            keyExtractor={(item) => item.id_class_booking.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 350 }}
            renderItem={({ item }) => (
              <TouchableOpacity 
      key={item.id_class_booking}
      style={styles.headerCard} 
      onPress={() => handleItemPress(item)}
      activeOpacity={0.7}
    >
      <View style={styles.cardBookingClass}>
          {/* Date Box */}
          <View style={styles.dateContainer}>
          {/* <View style={styles.monthBox}>
              <Text style={styles.monthText}>{item.month}</Text>
          </View> */}
          <View style={styles.dayBox}>
              <Text style={styles.dayText}>{item.class_schedule.schedule_date_class}</Text>
          </View>
          </View>

          {/* Divider */}
          <View style={styles.dividerBooking} />

          {/* Content */}
          <View style={styles.contentBooking}>
          <Text style={styles.classTitleTime}>{item.class_schedule.class.name_class}</Text>
          <Text style={styles.time}>{item.class_schedule.start_time_class}-{item.end_time_class}</Text>
          <Text style={styles.author}>By {item.class_schedule.coach.fullname}</Text>
          </View>
      </View>
              </TouchableOpacity>
            )}
          />
      
    );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#E82528" />

      {/* HEADER */}
      <LinearGradient
        colors={["#E82528", "#9A0006"]}
        style={styles.header}
      >
        <TouchableOpacity style={styles.backButton} onPress={() => router.replace('/membership')}>
            <Ionicons name="arrow-back" size={22} color="#fff"/>
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Booking Class</Text>

        <View style={{ width: 40 }} />
      </LinearGradient>


      
                
                {/* ================= BOOKING CLASS ================= */}
        
                {/*{classDataBookingClass.some(item => item.highlight) && (*/}
                    
                   <Text style={styles.sectionTitle}>Tes</Text>
                        {items &&(
                          <View>
                            <Text >{items.id_class_booking}</Text>
                                <Text >{items.id_user}</Text>
                              </View>
                        )}
                        <FlatList
                        style={{ flex: 1 , backgroundColor: 'red'}} // Forces the list to grow and fill empty space
                            data={itemsBooking || []}
                            keyExtractor={(item) => (item.id_class_booking?? Math.random()).toString()}
                            showsVerticalScrollIndicator={false}
                            ListEmptyComponent={
                              <View style={{ padding: 20, alignItems: 'center' }}>
                                <Text>No booking data found or loading...</Text>
                              </View>
                            }
                            // Optimization: Prevents full list re-renders when data updates
                            initialNumToRender={10}
                            maxToRenderPerBatch={10}
                            windowSize={5}
                            //contentContainerStyle={{ paddingBottom: 350 }}
                            renderItem={({ item }) => (
                              <View>
                                <Text >{item.id_user}</Text>
                                <Text>Test</Text>
                                <Text>Test</Text>
                                <Text>Test</Text>
                                <Text>Test</Text>
                                <Text>Test</Text>
                                <Text>Test</Text>

                              </View>
                               
                             )}
                         />
                      
                         {/*<Text style={styles.sectionTitle}>Testing</Text>

                        <FlatList
                            data={classDataBookingClass}
                            keyExtractor={(item) => item.id.toString()}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ paddingBottom: 350 }}
                            renderItem={({ item }) => (
                              <TouchableOpacity key={item.id} style={styles.headerCard} activeOpacity={1}>
                                <Text style={styles.monthText}>{item.trainer}</Text>
                              </TouchableOpacity>
                             )}
                         />*/}
                     
                {/*)}*/}
        <TodayScreen/>
           

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


  //================= BOOKING CLASS =================
  sectionTitle: {
    marginTop: 10,
    marginHorizontal: 20,
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
  },
   headerCard: {
    width: width - 40,
    //backgroundColor: '#d26868',
    marginHorizontal: 20,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
 
  cardBookingClass: {
    width: width - 40,
    flexDirection: "row",
    backgroundColor: "#6ED36E",
    borderRadius: 15,
    padding: 12,
    alignItems: "center",
    marginHorizontal: 20,
    borderWidth: 2,
  },

  // DATE
  dateContainer: {
    borderRadius: 5,
    overflow: "hidden",
  },
  monthBox: {
    backgroundColor: "#E57373",
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignItems: "center",
  },
  monthText: {
    color: "#000",
    fontWeight: "bold",
  },
  dayBox: {
    backgroundColor: "#fff",
    paddingVertical: 6,
    alignItems: "center",
  },
  dayText: {
    fontWeight: "bold",
    fontSize: 16,
  },

  // Divider
  dividerBooking: {
    width: 1,
    height: "80%",
    backgroundColor: "#000",
    marginHorizontal: 10,
  },

  // Content
  contentBooking: {
    flex: 1,
  },
  classTitleTime: {
    fontSize: 18,
    fontWeight: "bold",
    fontStyle: "italic",
  },
  time: {
    fontSize: 14,
    marginVertical: 2,
  },
  author: {
    color: "red",
    fontStyle: "italic",
  },

  highlightCard: {
    backgroundColor: "#69d36e",
    borderColor: "#4caf50",
  },
});