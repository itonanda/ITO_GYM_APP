//-------------------------
// Update 2026-05-19
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
import DateTimePicker from "@react-native-community/datetimepicker";
import CountryPicker, { CountryCode, Country } from 'react-native-country-picker-modal';
import { Link, useRouter } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import { Background } from "@react-navigation/elements";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get('window');

// ========== DATA ==========
const paymentData = [
  {
    id: "1",
    title: "3 Month Unlimited",
    amount: "Rp 1.900.000",
    method: "GoPay",
    date: "18 May 2026",
    status: "SUCCESS",
  },
  {
    id: "2",
    title: "1 Month Unlimited",
    amount: "Rp 900.000",
    method: "BCA Transfer",
    date: "10 April 2026",
    status: "SUCCESS",
  },
  {
    id: "3",
    title: "Drop In 5x",
    amount: "Rp 400.000",
    method: "QRIS",
    date: "02 April 2026",
    status: "PENDING",
  },
];

export default function PaymentHistoryScreen() {
  const router = useRouter();

  const renderItem = ({ item }: any) => (
    <LinearGradient
    colors={["#f7f0f0", "#f7f2f2"]}
    style={styles.cardHistory}
    >
        <TouchableOpacity activeOpacity={0.8}>
        <View style={styles.topRowHistory}>
            <View style={styles.iconContainerHistory}>
            <Ionicons
                name="card-outline"
                size={26}
                color="#9A0006"
            />
            </View>
            <View style={{ flex: 1 }}>
            <Text style={styles.titleHistory}>{item.title}</Text>

            <Text style={styles.methodHistory}>
                {item.method}
            </Text>
            </View>
            <Text
            style={[
                styles.statusHistory,
                {
                color:
                    item.status === "SUCCESS"
                    ? "#22C55E"
                    : "#FACC15",
                },
            ]}
            >
            {item.status}
            </Text>
        </View>

        <View style={styles.dividerHistory} />

        <View style={styles.bottomRowHistory}>
            <View>
            <Text style={styles.labelHistory}>Date</Text>
            <Text style={styles.dateHistory}>{item.date}</Text>
            </View>
            <Text style={styles.amountHistory}>
            {item.amount}
            </Text>
        </View>
        </TouchableOpacity>
    </LinearGradient>
    
  );

  return (
    <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#E82528" />

        {/* HEADER */}
        <LinearGradient
            colors={["#E82528", "#9A0006"]}
            style={styles.header}
        >
            <TouchableOpacity style={styles.backButton} onPress={() => router.replace('/(tabs)/MembershipPage')}>
                <Ionicons name="arrow-back" size={22} color="#fff"/>
            </TouchableOpacity>
            
            <Text style={styles.headerTitle}>Payment History</Text>
    
            <View style={{ width: 40 }} />
        </LinearGradient>    

        {/* List */}
        <FlatList
        data={paymentData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
            padding: 30,
        }}
        />
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


// ======== Payment History ========
  cardHistory: {
    backgroundColor: "#fff",
    borderRadius: 26,
    padding: 20,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
  },
  topRowHistory: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainerHistory: {
    width: 55,
    height: 55,
    borderRadius: 18,
    backgroundColor: "rgba(197, 34, 34, 0.12)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },

  titleHistory: {
    color: "#9A0006",
    fontSize: 17,
    fontWeight: "700",
  },

  methodHistory: {
    color: "#413f3f",
    marginTop: 5,
    fontSize: 14,
  },

  statusHistory: {
    fontWeight: "700",
    fontSize: 13,
  },

   dividerHistory: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.82)",
    marginVertical: 18,
  },

  bottomRowHistory: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  labelHistory: {
    color: "#000",
    fontSize: 13,
  },

  dateHistory: {
    color: "#4b4c4c",
    marginTop: 4,
    fontSize: 14,
  },

  amountHistory: {
    color: "#9A0006",
    fontSize: 20,
    fontWeight: "700",
  },

});