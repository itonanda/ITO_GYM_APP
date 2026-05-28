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

// ================== TYPE ==================
type NotificationType = {
  id: string;
  title: string;
  date: string;
};

// ================== DATA ==================
const DataNotifications: NotificationType[] = [
  { id: "1", title: "Class Booking Success", date: "Friday | 10 February | 08.00 AM" },
  { id: "2", title: "Payment Successful", date: "Saturday | 11 February | 10.00 AM" },
  { id: "3", title: "New Class Available", date: "Sunday | 13 February | 09.00 AM" },
  { id: "4", title: "New Class Available", date: "Sunday | 14 February | 09.00 AM" },
  { id: "5", title: "New Class Available", date: "Sunday | 15 February | 09.00 AM" },
  { id: "6", title: "New Class Available", date: "Sunday | 16 February | 09.00 AM" },
  { id: "7", title: "New Class Available", date: "Sunday | 20 February | 09.00 AM" },
  { id: "8", title: "New Class Available", date: "Sunday | 21 February | 09.00 AM" },
  { id: "9", title: "New Class Available", date: "Sunday | 24 February | 09.00 AM" },
];


export default function NotificationScreen() {
  const router = useRouter();

  // Item Notif
  const renderItem = ({ item }: { item: NotificationType }) => (
    <TouchableOpacity
          activeOpacity={0.7}
          onPress={() =>
            router.push({
              pathname: "/+not-found",
              params: {
                id: item.id,
                title: item.title,
                date: item.date,
              },
            })
          }
        >
          <View style={styles.itemWrapperNotif}>
            <View style={styles.itemContainerNotif}>
              
              <View style={styles.rowNotif}>
                <View style={styles.iconWrapperNotif}>
                  <Ionicons name="calendar" size={18} color="#fff" />
                </View>

                <View style={styles.textContainerNotif}>
                  <Text style={styles.itemTitleNotif}>{item.title}</Text>
                  <Text style={styles.itemDateNotif}>{item.date}</Text>
                </View>
              </View>

            </View>

            <View style={styles.divider} />
          </View>
    </TouchableOpacity>
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
        
        <Text style={styles.headerTitle}>Notification</Text>

        <View style={{ width: 40 }} />
      </LinearGradient>
      
      <View style={styles.card}>
        {/* ================= LIST NOTIF ================= */}
        <FlatList
          data={DataNotifications}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      </View>
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
  card: {
    backgroundColor: "#FFF",
    borderRadius: 24,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },



  // ===== ITEM NOTIF =====
  itemWrapperNotif: {
    paddingHorizontal: 20,
    //paddingTop: 10,
  },
  itemContainerNotif: {
    paddingVertical: 10,
  },
  rowNotif: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconWrapperNotif: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#d32323",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  textContainerNotif: {
    flex: 1,
  },
  itemTitleNotif: {
    fontSize: 14,
    fontWeight: "600",
  },
  itemDateNotif: {
    fontSize: 12,
    color: "#777",
    marginTop: 2,
  },
  listContent: {
    paddingBottom: 100,
  },
});