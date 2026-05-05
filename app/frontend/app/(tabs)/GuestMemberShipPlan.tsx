//-------------------------
// Update 2026-04-15 
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

const { width } = Dimensions.get('window');

/* ================= DATA ================= */
const classDataMembership = [
  {
    id: '1',
    titlenumber: '1',
    titleunit: 'Month Unlimited',
    price: '900K !!',
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
    titlenumber: '2',
    titleunit: 'Month Unlimited',
    price: '900K !!',
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
    titlenumber: '3',
    titleunit: 'Month Unlimited',
    price: '900K !!',
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
    titlenumber: '4',
    titleunit: 'Month Unlimited',
    price: '900K !!',
    desc1: 'Up to 100+ Class To Join',
    desc2: 'Free Open Gym',
    desc3: 'WOD App Access',
    desc4: 'Exercise Review History',
    desc5: '',
     image:
      'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];


export default function GuestMembershipPlanScreen() {
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
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          {/* ================= MEMBERSHIP PLAN ================= */}
          <TouchableOpacity onPress={() => router.replace('/(tabs)/GuestViewClassDetail')}>
            <Ionicons name="arrow-back" size={22} color="#000"/>
          </TouchableOpacity>

          <Text style={styles.title}>Membership Plan</Text>

          {/* Spacer biar title center */}
          <View style={{ width: 24 }} />
        </View>  
      
        {/* Line */}
        <View style={styles.divider} /> 



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
              <TouchableOpacity key={item.id} style={styles.headerCard} activeOpacity={1} onPress={() => router.replace('/(tabs)/MemberSignUp')}>       
                  <View style={styles.classCard}>
                    <Image
                      source={{ uri: item.image }}
                      style={styles.classImage}
                    />
                    
                    <View style={styles.cardContent}>
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

  /* ===== CLASS CARD ===== */
  headerCard: {
    width: width - 40,
    //backgroundColor: '#d26868',
    marginHorizontal: 20,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
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
});