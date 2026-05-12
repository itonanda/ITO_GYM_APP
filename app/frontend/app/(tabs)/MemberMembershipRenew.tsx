//-------------------------
// Update 2026-05-08
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


/* ================= DATA ================= */
const classDataMembership = [
  {
    id: '1',
    highlight: false,
    titlenumber: '1',
    titleunit: 'Month Unlimited',
    price: '800K !!',
    desc1: 'Up to 100+ Class To Join',
    desc2: 'Free Open Gym',
    desc3: 'WOD App Access',
    desc4: 'Exercise Review History',
    desc5: '',
     image:
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: '2',
    highlight: false,
    titlenumber: '2',
    titleunit: 'Month Unlimited',
    price: '1.000K !!',
    desc1: 'Up to 100+ Class To Join',
    desc2: 'Free Open Gym',
    desc3: 'WOD App Access',
    desc4: 'Exercise Review History',
    desc5: '',
     image:
      'https://plus.unsplash.com/premium_photo-1670505062582-fdaa83c23c9e?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: '3',
    highlight: false,
    titlenumber: '3',
    titleunit: 'Month Unlimited',
    price: '1.200K !!',
    desc1: 'Up to 100+ Class To Join',
    desc2: 'Free Open Gym',
    desc3: 'WOD App Access',
    desc4: 'Exercise Review History',
    desc5: '',
     image:
      'https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: '4',
    highlight: false,
    titlenumber: '4',
    titleunit: 'Month Unlimited',
    price: '1.400K !!',
    desc1: 'Up to 100+ Class To Join',
    desc2: 'Free Open Gym',
    desc3: 'WOD App Access',
    desc4: 'Exercise Review History',
    desc5: '',
     image:
      'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];



export default function MemberMembershipRenewScreen() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef(null);
  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
        if (viewableItems.length > 0 && viewableItems[0].index !== null) {
        setActiveIndex(viewableItems[0].index);
        }
    }
    ).current;

    const viewConfig = {
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
        <TouchableOpacity style={styles.backButton} onPress={() => router.replace('/(tabs)/MemberViewClassDetail')}>
            <Ionicons name="arrow-back" size={22} color="#fff"/>
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Membership Renew</Text>

        <View style={{ width: 40 }} />
      </LinearGradient>


      <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 120 }}
            >
                <FlatList
                  ref={flatListRef}
                  data={classDataMembership}
                  horizontal
                  pagingEnabled
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item) => item.id}
                  onViewableItemsChanged={onViewableItemsChanged}
                  viewabilityConfig={viewConfig}
                  renderItem={({ item }) => (
                    <TouchableOpacity key={item.id} style={styles.headerCard} activeOpacity={1}>       
                        <View style={styles.classCard}>
                          <Image
                            source={{ uri: item.image }}
                            style={styles.classImage}
                          />
                          
                          <View key={item.id} style={[styles.cardContent, item.highlight && styles.highlightCard]}>
                            <View>
                              <Text style={styles.classTitleNumber}>{item.titlenumber}</Text>
                              <Text style={styles.classTitle}>{item.titleunit}</Text>
                              <Text style={styles.classPrice}>{item.price}</Text>
                              <View style={styles.lineRed}/>
                              <Text style={styles.classDesc}>
                                <Ionicons name={"star"} size={22} color="#737070"/>
                                {"  "}{item.desc1}
                              </Text>
                              <Text style={styles.classDesc}>
                                <Ionicons name={"star"} size={22} color="#737070"/>
                                {"  "}{item.desc2}
                              </Text>
                              <Text style={styles.classDesc}>
                                <Ionicons name={"star"} size={22} color="#737070"/>
                                {"  "}{item.desc3}
                              </Text>
                              <Text style={styles.classDesc}>
                                <Ionicons name={"star"} size={22} color="#737070"/>
                                {"  "}{item.desc4}
                              </Text>
                            </View>
      
                              {/* Button */}
                              <TouchableOpacity key={item.id} style={{ display: item.highlight ? 'none' : 'flex' }}>
                                <TouchableOpacity key={item.id} style={styles.buttonMembership} onPress={() => router.replace('/(tabs)/noted')}>
                                  <Text style={styles.buttonTextMembership}>Renew</Text>
                                </TouchableOpacity>
                              </TouchableOpacity>
                              
                          </View>
                        </View>
                    </TouchableOpacity>
                  )}
                />
      
                {/* ================= DOT INDICATOR ================= */}
                <View style={styles.dotContainer}>
                  {classDataMembership.map((_, index) => (
                    <View
                      key={index}
                      style={[
                        styles.dot,
                        activeIndex === index && styles.activeDot,
                      ]}
                    />
                  ))}
                </View>
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


  /* ===== CLASS CARD ===== */
  headerCard: {
    width: width - 40,
    //backgroundColor: '#d26868',
    marginHorizontal: 20,
    borderRadius: 15,
    //justifyContent: 'center',
    //alignItems: 'center',
  },
  classCard: {
    width: width - 40,
    //marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    borderWidth:1,
  },
  classImage: {
    width: '100%',
    height: 80,
  },
  cardContent: {
    padding: 5,
    //flexDirection: 'row',
   // justifyContent: 'space-between',
   // alignItems: 'center',
  },
  classTitleNumber: {
    fontSize: 60,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignContent: 'center',
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  classTitle: {
    fontSize: 50,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignContent: 'center',
    textAlign: 'center',
  },
  classPrice: {
    fontSize: 50,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignContent: 'center',
    textAlign: 'center',
    color: '#E31E24',
  },
  classDesc: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 20,
    marginTop: 10,
  },
  lineRed: {
    width: "80%",
    height: 5,
    backgroundColor: "#E31E24",
    alignSelf:'center',
    marginBottom: 20,
  },


  highlightCard: {
    backgroundColor: "#FFBABA",
    borderColor: "#fbafaf",
  },


 /* DOT */
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 12,
    marginTop:30,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#000',
  },

  // Button
  buttonMembership: {
    backgroundColor: '#e53935',
    padding: 16,
    borderRadius: 14,
    marginTop: 50,
    marginBottom: 30,
    alignItems: 'center',
  },
  buttonTextMembership: {
    color: '#fff',
    fontWeight: '700',
  },
});