import React, { useEffect, useCallback, useState, useRef } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
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


export default function EmailSuccessScreen() {
  const router = useRouter();
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* ================= DETAIL CLASS ================= */}
        <AntDesign name="file-protect" size={100} color="black" />
        <Text style={styles.title}>Email Verified {"\n"}Successful</Text>
        <Text style={styles.subtitle}>Your email has been verified. Your account is ready to go!</Text>

        {/*============ OK ============*/}
        <View style={{justifyContent:'flex-end', alignItems:'flex-end', marginTop: 50}}>
        {/* <TouchableOpacity activeOpacity={0.8} onPress={() => router.replace('/(tabs)/(member)/dashboard')}> */}
        <TouchableOpacity activeOpacity={0.8}>
          <LinearGradient
              colors={["#E82528", "#9A0006"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.homeButton}
            >
            <Text style={styles.homeText}> OK </Text>
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