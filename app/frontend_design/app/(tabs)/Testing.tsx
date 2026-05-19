//-------------------------
// Testing Screen
//-------------------------


import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  StatusBar,
  Dimensions,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from 'expo-router';


const { width } = Dimensions.get('window');

// ================== Testing Screen ==================
export default function TestingPageScreen() {
  const router = useRouter();

 
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* ================= NOTIFICATION ================= */}
        <TouchableOpacity onPress={() => router.replace('/(tabs)/Index')}>
          <Ionicons name="arrow-back" size={22} color="#000"/>
        </TouchableOpacity>

        <Text style={styles.title}>Testing Screen</Text>

        {/* Spacer biar title center */}
        <View style={{ width: 24 }} />
      </View>  
    
      {/* Line */}
      <View style={styles.divider} /> 




       {/* ================= Menu Grid ================= */}
        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuItem} activeOpacity={0.7} onPress={() => router.replace('/(tabs)/MemberDashboard')}>
            <View style={styles.menuIcon}>
              <Ionicons name="water-outline" size={24} color="#1a0dd1" />
            </View>
            <Text style={styles.menuText}>Member Dashboard</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem} activeOpacity={0.7} onPress={() => router.replace('/(tabs)/MemberMembershipRenew')}>
            <View style={styles.menuIcon}>
              <Ionicons name="water-outline" size={24} color="#1a0dd1" />
            </View>
            <Text style={styles.menuText}>Membership Renew</Text>
          </TouchableOpacity>
          






          <TouchableOpacity style={styles.menuItem} activeOpacity={0.7} onPress={() => router.replace('/(tabs)/TestingTest')}>
            <View style={styles.menuIcon}>
              <Ionicons name="water-outline" size={24} color="#640404" />
            </View>
            <Text style={styles.menuText}> </Text>
          </TouchableOpacity>
          
        </View>




      
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





   //=========== Menu Grid ===========
  menuContainer: {
    marginTop: 20,
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
    backgroundColor: '#fff',
  },
  menuText: {
    fontSize: 11,
    textAlign: 'center',
  },
});