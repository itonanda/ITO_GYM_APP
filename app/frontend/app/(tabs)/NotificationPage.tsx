//-------------------------
// Update 2026-05-04 
//-------------------------


import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from 'expo-router';

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

// ================== Notification Screen ==================
export default function NotificationPageScreen() {
  const router = useRouter();

  // Item Notif
  const renderItem = ({ item }: { item: NotificationType }) => (
    <TouchableOpacity
          activeOpacity={0.7}
          onPress={() =>
            router.push({
              pathname: "/(tabs)/noted",
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
      <View style={styles.header}>
        {/* ================= NOTIFICATION ================= */}
        <TouchableOpacity onPress={() => router.replace('/(tabs)/MemberDashboard')}>
          <Ionicons name="arrow-back" size={22} color="#000"/>
        </TouchableOpacity>

        <Text style={styles.title}>Notification</Text>

        {/* Spacer biar title center */}
        <View style={{ width: 24 }} />
      </View>  
    
      {/* Line */}
      <View style={styles.divider} /> 

      {/* ================= LIST NOTIF ================= */}
      <FlatList
        data={DataNotifications}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />

    </View>
  );
}


{/* ================= STYLES ================= */}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flex: 1,
    backgroundColor: "#fff",
    marginBottom: -20,
  },
  header: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    marginTop: 20,
    marginBottom: -20,
    
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
  },
  divider: {
    marginTop: 15,
    height: 2,
    backgroundColor: "#ddd",
  },
    
  title: {
    fontSize: 28,
    fontWeight: '700',
  },

  
  // ===== ITEM NOTIF =====
  itemWrapperNotif: {
    paddingHorizontal: 20,
    paddingTop: 10,
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