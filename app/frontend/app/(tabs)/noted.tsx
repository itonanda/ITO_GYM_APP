//-------------------------
// Screen On Progress
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
import { Colors } from '@/constants/theme';

const { width } = Dimensions.get('window');



export default function NotedScreen() {
  const router = useRouter();
  

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          {/* ================= On Progress ================= */}
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={22} color="#000"/>
          </TouchableOpacity>

          <Text style={styles.title}>On Progress 🚀</Text>

          {/* Spacer biar title center */}
          <View style={{ width: 24 }} />
        </View>  
      
        {/* Line */}
        <View style={styles.divider} /> 



        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 120 }}
        >




          <View style={styles.headerTest}>
            <Text style={{fontSize:12, color:'#123368', fontWeight: 'bold',  marginBottom:10}}>------- ------- ------- ------- ------- ------- -------</Text>
            <Text style={{fontSize:12, color:'#123368', fontWeight: 'bold',  marginBottom:10}}>------- Lagi di-oprek biar makin kece 😎 -------</Text>
            <Text style={{fontSize:12, color:'#123368', fontWeight: 'bold',  marginBottom:10}}>------- ------- ------- ------- ------- ------- -------</Text>
          
            <View style={styles.headerTesting}>
              {/*============ Continue Testing Screen ============*/}
              <View style={{justifyContent:'flex-end', alignItems:'flex-end', marginTop: 50}}>
                <TouchableOpacity style={styles.socialButton} onPress={() => router.replace('/(tabs)/Index')}>
                  <Image
                    source={{
                      uri: "https://www.pngitem.com/pimgs/m/563-5639777_tanda-panah-keren-png-transparent-png.png",
                    }}
                    style={styles.icon}
                  />
                  <Text style={styles.socialText}>BACK</Text>
                </TouchableOpacity>
              </View>  
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

  






  //============ Continue Testing Screen ============
  headerTest: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    marginTop: 20,
    marginBottom: -20,
    
    //flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
  },
  headerTesting: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    marginTop: 20,
    marginBottom: -20,
    marginRight: 20,
    marginLeft: 20,
    
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    gap: 10,
  },

  socialButton: {
    height: 54,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#3426ae",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
    gap: 10,
  },
  icon: {
    width: 30,
    height: 30,
  },
  socialText: {
    fontSize: 20,
    fontWeight: "500",
    color:'#4108b4',
  },
});