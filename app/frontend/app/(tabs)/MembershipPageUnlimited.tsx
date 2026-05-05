//-------------------------
// Update 2026-05-04
//-------------------------


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
import { Link, useRouter } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get('window');



export default function MembershipPageDropInScreen() {
  const router = useRouter();
  

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          {/* ================= MEMBERSHIP ================= */}
          <TouchableOpacity onPress={() => router.replace('/(tabs)/MemberDashboard')}>
            <Ionicons name="arrow-back" size={22} color="#000"/>
          </TouchableOpacity>

          <Text style={styles.title}>Membership</Text>

          {/* Spacer biar title center */}
          <View style={{ width: 24 }} />
        </View>  
      
        {/* Line */}
        <View style={styles.divider} /> 



        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 120 }}
        >
            <View style={styles.headerTop}>
                {/* ================= HEADER TOP================= */}
                {/* ==== CARD ==== */}
                <LinearGradient
                    colors={["#E82528", "#9A0006"]}
                    style={styles.headerTopCard}
                    >
                    <View style={styles.headerTopCardContent}>
                        
                        <View>
                        <Text style={styles.headerTopName}>John Doe</Text>
                        <Text style={styles.headerTopSubText}>
                            1 Month Unlimited Plan
                        </Text>
                        </View>
            
                        <View style={styles.headerTopAvatar}>
                        <Ionicons name="person-outline" size={28} color="#000" />
                        </View>
            
                    </View>
            
                    <View style={styles.headerTopDivider} />
            
                    <Text style={styles.headerTopValid}>
                        Valid Until: 20 December, 2026
                    </Text>
                </LinearGradient>
            </View>
            
            <View style={styles.headerGrid}>
                {/* ================= Menu Grid ================= */}
                <View style={styles.menuContainer}>
                    <TouchableOpacity style={styles.menuItem} activeOpacity={0.7} onPress={() => router.replace('/(tabs)/noted')}>
                    <View style={styles.menuIcon}>
                        <Ionicons name="calendar-outline" size={24} color="#333" />
                    </View>
                    <Text style={styles.menuText}>Membership Plans</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem} activeOpacity={0.7} onPress={() => router.replace('/(tabs)/noted')}>
                    <View style={styles.menuIcon}>
                        <Ionicons name="newspaper-outline" size={24} color="#333" />
                    </View>
                    <Text style={styles.menuText}>Renew</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem} activeOpacity={0.7} onPress={() => router.replace('/(tabs)/noted')}>
                    <View style={styles.menuIcon}>
                        <Ionicons name="card-outline" size={24} color="#333" />
                    </View>
                    <Text style={styles.menuText}>Payment History</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem} activeOpacity={0.7} onPress={() => router.replace('/(tabs)/noted')}>
                    <View style={styles.menuIcon}>
                        {/*<Ionicons name="warning-outline" size={24} color="#333" />*/}
                    </View>
                    <Text style={styles.menuText}>---</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem} activeOpacity={0.7} onPress={() => router.replace('/(tabs)/noted')}>
                    <View style={styles.menuIcon}>
                        {/*<Ionicons name="warning-outline" size={24} color="#333" />*/}
                    </View>
                    <Text style={styles.menuText}>---</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem} activeOpacity={0.7} onPress={() => router.replace('/(tabs)/noted')}>
                    <View style={styles.menuIcon}>
                        {/*<Ionicons name="warning-outline" size={24} color="#333" />*/}
                    </View>
                    <Text style={styles.menuText}>---</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem} activeOpacity={0.7} onPress={() => router.replace('/(tabs)/noted')}>
                    <View style={styles.menuIcon}>
                        {/*<Ionicons name="warning-outline" size={24} color="#333" />*/}
                    </View>
                    <Text style={styles.menuText}>---</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem} activeOpacity={0.7} onPress={() => router.replace('/(tabs)/noted')}>
                    <View style={styles.menuIcon}>
                        {/*<Ionicons name="warning-outline" size={24} color="#333" />*/}
                    </View>
                    <Text style={styles.menuText}>---</Text>
                    </TouchableOpacity>
                </View>
            </View>  
        </ScrollView>
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

  
  /* ===== HEADER TOP CARD ===== */
  headerTop: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 15,
    marginBottom: -20,
  },
  headerTopCard: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 25,
  },
  headerTopCardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTopName: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },
  headerTopSubText: {
    color: "#ddd",
    fontSize: 12,
    marginTop: 5,
  },
  headerTopAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTopDivider: {
    height: 1,
    backgroundColor: "#555",
    marginVertical: 15,
  },
  headerTopValid: {
    color: "#fff",
    fontSize: 12,
  },


  //=========== Menu Grid ===========
  headerGrid: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 5,
    marginBottom: -20,
  },
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