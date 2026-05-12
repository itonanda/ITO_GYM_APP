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
import DateTimePicker from "@react-native-community/datetimepicker";
import CountryPicker, { CountryCode, Country } from 'react-native-country-picker-modal';
import { Link, useRouter } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import { Background } from "@react-navigation/elements";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get('window');


export default function NotedScreen() {
  const router = useRouter();
 

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#E82528" />

      {/* HEADER */}
      <LinearGradient
        colors={["#E82528", "#9A0006"]}
        style={styles.header}
      >
        <TouchableOpacity style={styles.backButton} onPress={() => router.replace('/(tabs)/Index')}>
            <Ionicons name="arrow-back" size={22} color="#fff"/>
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>On Progress 🚀</Text>

        <View style={{ width: 40 }} />
      </LinearGradient>


      <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 120 }}
            >
                <View style={styles.content}>
                    {/* CARD */}
                    <View style={styles.card}>
                      <View style={styles.headerTest}>
                        <Text style={{fontSize:12, color:'#123368', fontWeight: 'bold',  marginBottom:10}}>------- ------- ------- ------- -------</Text>
                        <Text style={{fontSize:12, color:'#123368', fontWeight: 'bold',  marginBottom:10}}>Lagi di-oprek biar makin kece 😎</Text>
                        <Text style={{fontSize:12, color:'#123368', fontWeight: 'bold',  marginBottom:10}}>------- ------- ------- ------- -------</Text>
                      </View>
                    
                    </View>

                    {/* INSTRUCTION */}
                    {/*<View style={styles.instructionCard}>
                    
                    </View>*/}
                </View>
            </ScrollView>

      {/* BOTTOM BAR */}
      <LinearGradient
         colors={["#E82528", "#9A0006"]}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
        style={styles.headerBottomBar}
      >
        {/* PAGE */}
        <View style={styles.bottomBarPageBox}>
            <Text style={{fontSize:16, color:'#E01F26', fontStyle:"italic",fontWeight:'bold'}}>
                😎
            </Text>
        </View>

        {/* BUTTON */}
        <TouchableOpacity activeOpacity={0.8} onPress={() => router.replace('/(tabs)/Index')}>
          <LinearGradient
            colors={["#FFFFFF", "#cbc9c9"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.bottomBarBookButton}
          >
            <Text style={{fontSize:16, color:'#000', fontStyle:"italic",fontWeight:'bold'}}>
                BACK
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </LinearGradient>

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

  instructionCard: {
    backgroundColor: "#FFF",
    borderRadius: 24,
    padding: 20,
    marginTop: 20,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },

  instructionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111",
    marginBottom: 14,
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













/* ===== HEADER BOTTOM ===== */
  headerBottomBar: {
    height: 80,
    backgroundColor: "#ED1C24",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    gap: 50,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  bottomBarPageBox: {
    width: 90,
    height: 38,
    backgroundColor: "#FFF",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomBarBookButton: {
    width: 110,
    height: 38,
    backgroundColor: "#FFF",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});