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
import { Link, useRouter } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get('window');


export default function MemberBookingScreen() {
  const router = useRouter();
  
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* ================= DETAIL CLASS ================= */}
        <AntDesign name="like" size={100} color="black" />
        <Text style={styles.title}>Booking {"\n"}Successful</Text>
        <Text style={styles.subtitle}>Your booking is confirmed and saved</Text>

        {/*============ Member Dashboard ============*/}
        <View style={{justifyContent:'flex-end', alignItems:'flex-end', marginTop: 50}}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => router.replace('/after_booking')}>
          <LinearGradient
              colors={["#E82528", "#9A0006"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.homeButton}
            >
            <Text style={styles.homeText}>Back to Home</Text>
          </LinearGradient>
        </TouchableOpacity>
        </View> 
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
  header: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
    paddingBottom: 40,
    paddingHorizontal: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    //fontWeight: 'bold',
    textAlign: 'center',
  },

  homeButton: {
    height: 50,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 30,
    color:'#eee',
  },
  homeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color:'#000',
  },
});