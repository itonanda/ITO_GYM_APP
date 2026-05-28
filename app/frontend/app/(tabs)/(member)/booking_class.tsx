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
import { Ionicons } from "@expo/vector-icons";
import { ViewToken } from 'react-native';
import DateTimePicker from "@react-native-community/datetimepicker";
import CountryPicker, { CountryCode, Country } from 'react-native-country-picker-modal';
import { Link, useRouter } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import { Background } from "@react-navigation/elements";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get('window');


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
  },
  {
    id: '2',
    highlight: false,
    title: 'Afternoon Class',
    day: '25',
    month: 'May',
    time: '13.00 - 14.00',
    trainer: 'Adryl Nath',
  },
  {
    id: '3',
    highlight: true,
    title: 'Morning Class',
    day: '26',
    month: 'May',
    time: '08.00 - 09.00',
    trainer: 'Adryl Nath',
  },
  {
    id: '4',
    highlight: true,
    title: 'Afternoon Class',
    day: '26',
    month: 'May',
    time: '13.00 - 14.00',
    trainer: 'Adryl Nath',
  },
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


      <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 120 }}
            >
                
                {/* ================= BOOKING CLASS ================= */}
        
                {classDataBookingClass.some(item => item.highlight) && (
                    <>
                    <Text style={styles.sectionTitle}></Text>
        
                        <FlatList
                            data={classDataBookingClass}
                            scrollEnabled={false}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => {
                            if (!item.highlight) return null;
            
                            return (
                                <TouchableOpacity key={item.id} style={styles.headerCard} activeOpacity={1} onPress={() => router.replace('/class_detail_update')}>       
                                    <View style={styles.cardBookingClass}>
                                        {/* Date Box */}
                                        <View style={styles.dateContainer}>
                                        <View style={styles.monthBox}>
                                            <Text style={styles.monthText}>{item.month}</Text>
                                        </View>
                                        <View style={styles.dayBox}>
                                            <Text style={styles.dayText}>{item.day}</Text>
                                        </View>
                                        </View>
                                
                                        {/* Divider */}
                                        <View style={styles.dividerBooking} />
                                
                                        {/* Content */}
                                        <View style={styles.contentBooking}>
                                        <Text style={styles.classTitleTime}>{item.title}</Text>
                                        <Text style={styles.time}>{item.time}</Text>
                                        <Text style={styles.author}>By {item.trainer}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            );
                            }}
                        />
                    </>
                )}
        
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