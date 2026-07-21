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
  
interface ItemData {
  profiles : any;
  full_name : string;

  class_title: any;
  booking_class: any;
  
  id_class_schedule: Int32;
  title: string; // Replace with your actual table column schemas
  start_time: string;
  end_time: string;
  descriptions : string;
  available_quota: Int32;
  quota: Int32;
  list: String;
  highlight: false;
}

interface UsersData {
  id_user : Int32;
  full_name : string;
  email : string;
}

export default function MemberClassDetailUpdateScreen() {
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

  // GET DATA
  // Accesses both route params ([id]) and query params (?name=John)
  const { id_class_schedule } = useLocalSearchParams();
  // const [items, setItems] = useState<ItemData[]>([]);
  // const [loading, setLoading] = useState<boolean>(true);
  const [items, setData] = useState<ItemData | null>(null);
  const [users, setUsers] = useState<UsersData | null>(null);
  const [loading, setLoading] = useState(true);
  const { accessToken } = useGlobalSearchParams();
  
  useEffect(() => {
    fetchDataUser();
    fetchDataClassDetail();
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
  
  const fetchDataClassDetail = async () => {
    try {
      const response = await fetch(`${apiURL}/class/schedule/${id_class_schedule}`);
      // const response = await fetch(`${apiURL}/class/schedule_today`);
      const data = await response.json();
      // setItems(data);
      setData(data);
      // console.log(data);
    } catch (error) {
      console.error('Error fetching list data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookingClass = () => {
    // 1. Combine the two flat lists
  const combinedData = [users, items];
  // console.log(combinedData);

  // 2. Prepare the payload (wrap in an object for good API practice)
  const payload = {
    data: combinedData
  };
  // console.log(payload);
  // if(email.length === 0) {
  //     Alert.alert('Attention','Please enter both email');
  //     return;
  // }
  // else {
      // 2. Convert to JSON string
    const jsonPayload = JSON.stringify(combinedData);
    
    // 2. Memasukkan state ke dalam objek dan mengubahnya ke JSON String
    const dataObject = { users, items };

    fetch(`${apiURL}/class/booking_class`, {
      method: 'POST',
      headers: {
        // authorization: "Bearer YOUR_KEY",
        'Content-Type': 'application/json',
      },
      // body: JSON.stringify({ 
      //     users, items 
      // }),
      // body: jsonPayload,
      body: JSON.stringify(combinedData),
      // body: JSON.stringify(payload), // Convert the data to a JSON string
      // body: JSON.stringify(dataObject), // Convert the data to a JSON string
    })
      .then(response => response.json())
      .then(data => {
        // fetch(`${apiURL}/class/update_qouta_class`, {
        //   method: 'POST',
        //   headers: {
        //     // authorization: "Bearer YOUR_KEY",
        //     'Content-Type': 'application/json',
        //   },
        //   // body: JSON.stringify({ 
        //   //     users, items 
        //   // }),
        //   // body: jsonPayload,
        //   body: JSON.stringify(combinedData),
        //   // body: JSON.stringify(payload), // Convert the data to a JSON string
        //   // body: JSON.stringify(dataObject), // Convert the data to a JSON string
        // })
        router.replace({
          pathname: '/booking_success',
          // params: { accessToken: data.session.access_token, email: data.session.email, user: data.user }
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  // }
  };

  const extractTimeHHMM = (apiISOString: string) => {
    // Extracts the "14:30" part from "2026-06-23T14:30:00.000Z"
    return apiISOString.slice(0,5); 
  };

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
        
        <Text style={styles.headerTitle}>Details</Text>

        <View style={{ width: 40 }} />
      </LinearGradient>


      <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 120 }}
            >
                {items && (
                  <View style={styles.content}>
                      {/* CARD TOP */}
                      <View style={styles.cardTop}>
                          <View style={styles.headerTop}>
                              {/* ================= HEADER TOP================= */}
                              <View style={styles.headerRow}>
                                  <View style={styles.headerRowTop}>
                                  <View style={styles.headerRowTopRight}>
                                      <Text style={styles.headerTitleDetail}>{items.class_title.title}</Text>
                                      {/* <Text style={styles.headerSubTitleDetail}>{items.start_time_class}-{items.end_time_class}</Text>  */}
                                      <Text style={styles.headerSubTitleDetail}>{extractTimeHHMM(items.start_time)} - {extractTimeHHMM(items.end_time)}</Text> 
                                  </View>
                                  </View>
                                  <View style={styles.headerRowTop}>
                                  <View style={styles.headerRowTopLeft}>
                                      <View style={styles.avatar}>
                                      <Ionicons name="person-circle-outline" size={100} color="#000"/>
                                      </View>
                                      <Text style={styles.headerSubTitleDetail}>{items.profiles.full_name}</Text> 
                                  </View>
                                  </View>
                              </View>
                  
                              <Text style={{fontSize:16, color:'#F02727', fontStyle:'italic', marginBottom:10}}>{items.descriptions} .....</Text>
                          </View> 
                      </View>
  
                      {/* CARD CENTER */}
                      <View style={styles.CardCenter}>
                          {/* ================= DETAIL CLASS ================= */}
                              <View style={styles.headerDetail}>
                              {/* --------- Warm Up --------- */}
                              <View>
                                  <View style={styles.headerDetailRow}>
                                  <View style={styles.headerRowDetail}>
                                      <View style={styles.headerRowDetailRight}>
                                      <View style={styles.iconTemp}>
                                          <Ionicons name="thermometer-outline" size={40} color="#8A0404"/>
                                      </View>
                                      </View>
                                  </View>
                                  <View style={styles.headerRowDetail}>
                                      <View style={styles.headerRowDetailLeft}>
                                      <Text style={styles.headerTitleDetail}>Workout Of The Day</Text>
                                      {/* <Text></Text> */}
                                      <Text style={styles.headerSubTitleDetail}>
                                          {items.list}
                                      </Text>
                                      </View>
                                  </View>
                                  </View>
                              </View>
                          </View>
                      </View>
                  </View>
  
                )}

                {/* BOTTOM BAR */}
                <LinearGradient
                  colors={["#FFFFFF", "#FFFFFF"]}
                  start={{ x: 0, y: 1 }}
                  end={{ x: 0, y: 0 }}
                  style={styles.headerBottomBar}
                >
                  {/* PAGE */}
                  <LinearGradient
                      colors={["#98eb98", "#78fa78"]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 0, y: 1 }}
                      style={styles.bottomBarPageBox}
                  >
                    <Text style={{fontSize:16, color:'#08b208', fontStyle:"italic",fontWeight:'bold'}}>
                      2/15
                    </Text>
                  </LinearGradient>

                  {/* BUTTON */}
                  <TouchableOpacity activeOpacity={0.8} onPress={() => router.replace('/booking_cancel')}>
                    <LinearGradient
                      colors={["#E82528", "#9A0006"]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.bottomBarBookButton}
                    >
                      <Text style={{fontSize:16, color:'#000', fontStyle:"italic",fontWeight:'bold'}}>
                        Cancel
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </LinearGradient>
            </ScrollView>
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


/* ===== HEADER CENTER ===== */
  cardTop: {
    backgroundColor: "#FFF",
    borderRadius: 24,
    padding: 20,
  },

  CardCenter: {
    backgroundColor: "#FFF",
    borderRadius: 24,
    padding: 20,
    marginTop: 20,
  },


/* ===== HEADER TOP ===== */
  headerTop: {
    backgroundColor: "#fff",
    borderRadius: 20,
    //padding: 20,
    marginBottom: -20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 2,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: '#fff',
    backgroundColor: '#fff',
    //marginBottom: 20,
  },
  headerRowTop: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 2,
    backgroundColor: '#fff',
    height: 150,
    width: 150,
    borderRadius: 5,
  },
  headerRowTopRight: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'baseline',
    backgroundColor: '#fff',
    height: 150,
    width: 150,
    borderRadius: 5,
  },
  headerRowTopLeft: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 150,
    width: 150,
    borderRadius: 5,
  },
  headerTitleDetail: {
    fontSize: 22,
    fontStyle: 'italic',
    fontWeight: 'bold',
    color: '#000',
  },
  headerSubTitleDetail: {
    fontSize: 16,
    fontStyle: 'italic',
    fontWeight: 'bold',
    color: '#000',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 22.5,
    backgroundColor: 'rgb(240, 235, 235)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },

  
/* ===== HEADER DETAIL ===== */
  headerDetail: {
    borderColor: '#108932',
    backgroundColor: "#fff",
    borderWidth: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 20,
    borderRadius: 20,
    //margin: 20,
  },
  headerDetailRow: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  headerRowDetail: {
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  headerRowDetailRight: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  headerRowDetailLeft: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginLeft: 10,
  },
  iconTemp: {
    width: 50,
    height: 50,
    borderRadius: 22.5,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },


/* ===== HEADER BOTTOM ===== */
  headerBottomBar: {
    height: 80,
    backgroundColor: "#fffS",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    gap: 50,
    //borderTopLeftRadius: 20,
    //borderTopRightRadius: 20,
  },
  bottomBarPageBox: {
    width: 110,
    height: 50,
    backgroundColor: "#FFF",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomBarBookButton: {
    width: 150,
    height: 50,
    backgroundColor: "#E82528",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});