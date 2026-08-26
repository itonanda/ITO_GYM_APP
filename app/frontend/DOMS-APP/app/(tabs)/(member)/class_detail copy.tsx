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
import { Link, useRouter } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import { Background } from "@react-navigation/elements";
import { LinearGradient } from "expo-linear-gradient";

import { Int32 } from 'react-native/Libraries/Types/CodegenTypes';
import { Timestamp } from 'react-native-reanimated/lib/typescript/commonTypes';

import { useLocalSearchParams } from 'expo-router';
import symbolicateStackTrace from 'react-native/Libraries/Core/Devtools/symbolicateStackTrace';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

// STATE API
  const apiURL = process.env.EXPO_PUBLIC_API_URL;

interface ItemData {
  trainer : any;
  class: any;
  booking_class: any;
  
  id_class_schedule: Int32;
  name_class: string; // Replace with your actual table column schemas
  start_time_class: Timestamp;
  end_time_class: Timestamp;
  available_quota_class: Int32;
  quota_class: Int32;
  list_class: String;
  highlight: false;
}

export default function MemberClassDetailScreen() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef(null);
  // Accesses both route params ([id]) and query params (?name=John)
  const { id_class_schedule } = useLocalSearchParams();
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
    const [items, setItems] = useState<ItemData[]>([]);
    // const [loading, setLoading] = useState<boolean>(true);
    // const [data, setData] = useState([]);
    const [data, setData] = useState<ItemData | null>(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      fetchData();
    }, [id_class_schedule]);
  
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiURL}/class/schedule/${id_class_schedule}`);
        // const response = await fetch(`${apiURL}/class/schedule_today`);
        const data = await response.json();
        setItems(data);
        setData(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching list data:', error);
      } finally {
        setLoading(false);
      }
    };

  return (
    
    <View style={styles.container}>
      {/* <StatusBar barStyle="light-content" backgroundColor="#E82528" /> */}

      {/* HEADER */}
      {data && (
        <View style={{width: '100%' }}>
          <Text>{data.id_class_schedule}</Text>
          <Text>{data.class.name_class}</Text>
          <Text>{data.start_time_class}</Text>
          <Text>{data.end_time_class}</Text>
        </View>
      )}
       <View style={{ height: 500, width: '100%' }}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id_class_schedule.toString()}
        // horizontal={true}
        //  showsHorizontalScrollIndicator={false} // Hides the bottom scrollbar
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 350 }}
        renderItem={({ item }) => (
          <View key={item.id_class_schedule}>
            <Text>{item.class?.name_class}</Text>
          </View>
  )}
      />
           </View>     

                {/* BOTTOM BAR */}
                <LinearGradient
                  colors={["#FFFFFF", "#FFFFFF"]}
                  start={{ x: 0, y: 1 }}
                  end={{ x: 0, y: 0 }}
                  style={styles.headerBottomBar}
                >
                  {/* PAGE */}
                  <LinearGradient
                      colors={["#f4afafa4", "#f4afaf"]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 0, y: 1 }}
                      style={styles.bottomBarPageBox}
                  >
                    <Text style={{fontSize:16, color:'#E01F26', fontStyle:"italic",fontWeight:'bold'}}>
                        2/15
                    </Text>
                  </LinearGradient>

                  {/* BUTTON */}
                  <TouchableOpacity activeOpacity={0.8} onPress={() => router.replace('/booking_success')}>
                    <LinearGradient
                      colors={["#E82528", "#9A0006"]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.bottomBarBookButton}
                    >
                      <Text style={{fontSize:16, color:'#000', fontStyle:"italic",fontWeight:'bold'}}>
                          Book
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </LinearGradient>

             {/* </ScrollView> */}
          
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
    width: "100%",
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