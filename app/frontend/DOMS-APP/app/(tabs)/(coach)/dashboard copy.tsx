import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  FlatList,
  Image,
} from 'react-native';
import { ViewToken } from 'react-native';
import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams } from 'expo-router';

const { width } = Dimensions.get('window');


/* ================= DATA ================= */
const classDataTodaySchedule = [
  {
    id: '1',
    title: 'Morning Class',
    time: '08.00 - 09.00',
    memberCount: '10 Members Joined',
  },
  {
    id: '2',
    title: 'Afternoon Class',
    time: '13.00 - 14.00',
    memberCount: '18 Members Joined',
  },
  {
    id: '3',
    title: 'Kids Class',
    time: '10.00 - 11.00',
    memberCount: '15 Members Joined',
  },
  {
    id: '4',
    title: 'Kids Class',
    time: '16.00 - 17.00',
    memberCount: '13 Members Joined',
  },
];


export default function CoachDashboardScreen() {
  const router = useRouter();

   const [activeIndexTodaySchedule, setActiveIndexTodaySchedule] = useState(0);
   const flatListRefTodaySchedule = useRef(null);
 
   const onViewableItemsChangedTodaySchedule = useRef(
     ({ viewableItems }: { viewableItems: ViewToken[] }) => {
       if (viewableItems.length > 0 && viewableItems[0].index !== null) {
         setActiveIndexTodaySchedule(viewableItems[0].index);
       }
     }
   ).current;
 
   const viewConfigTodaySchedule = {
     viewAreaCoveragePercentThreshold: 50,
   }; 


  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#E31E24" />

      {/* HEADER */}
      <LinearGradient
        colors={["#E82528", "#9A0006"]}
        style={styles.header}
      >
        <View style={styles.headerLeft}>
          <TouchableOpacity>
            <Image
              source={require('../../../assets/images/user/user.png')}
              style={styles.profileImage}
            />
          </TouchableOpacity>
          
          <View style={{marginLeft:10}}>
            <Text style={styles.headerTitle}>Coach Bahlil</Text>
          </View>
        </View>
        <Ionicons name="notifications-outline" size={24} color="#fff"/>
      </LinearGradient>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >

          {/* Hero Card */}
          <LinearGradient
            colors={['#AEAEB2', '#000000']}
            style={styles.heroCard}
          >
            <Text style={styles.heroTitle}>
              Active Members
            </Text>
            <Text style={styles.heroNumber}>
              248
            </Text>
            <Text style={styles.heroSub}>
              +12 New Members This Week
            </Text>
          </LinearGradient>

          {/* Stats */}
          <View style={styles.statsRow}>
            <LinearGradient
              colors={[ "#000000", "#000000"]}
              style={styles.statCard}
            >
              <Ionicons
                name="barbell"
                size={24}
                color="#FF7B00"
              />
              <Text style={styles.statValue}>12</Text>
              <Text style={styles.statLabel}>Classes</Text>
            </LinearGradient>

            <LinearGradient
              colors={[ "#000000", "#000000"]}
              style={styles.statCard}
            >
              <Ionicons
                name="checkmark-circle"
                size={24}
                color="#00D26A"
              />
              <Text style={styles.statValue}>92%</Text>
              <Text style={styles.statLabel}>Attendance</Text>
            </LinearGradient>

            <LinearGradient
              colors={[ "#000000", "#000000"]}
              style={styles.statCard}
            >
              <Ionicons
                name="trophy"
                size={24}
                color="#FFD700"
              />
              <Text style={styles.statValue}>15</Text>
              <Text style={styles.statLabel}>Programs</Text>
            </LinearGradient>
          </View>

         
          {/* ================= Today's Classes ================= */}
          <Text style={styles.sectionTitle}>
            Today's Classes
          </Text>
          <FlatList
              ref={flatListRefTodaySchedule}
              data={classDataTodaySchedule}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              onViewableItemsChanged={onViewableItemsChangedTodaySchedule}
              viewabilityConfig={viewConfigTodaySchedule}
              renderItem={({ item }) => (

                <TouchableOpacity activeOpacity={1}>       
                    <LinearGradient
                      colors={[ "#024205", "#25f40a"]}
                      style={styles.classCard}
                    >
                      <Text style={styles.className}>{item.title}</Text>
                      <Text style={styles.classTime}>{item.time}</Text>
                      <Text style={styles.classMembers}>{item.memberCount}</Text>
                    </LinearGradient>
                </TouchableOpacity>
            )}
          />

          

          {/* Quick Actions */}
          <Text style={styles.sectionTitle}>
            Quick Actions
          </Text>

          {/* ================= Menu Grid ================= */}
          <View style={styles.menuContainer}>
            <TouchableOpacity style={styles.menuItem} activeOpacity={0.7} onPress={() => router.replace('/+not-found')}>
              <View style={styles.menuIcon}>
                <Ionicons name="add-circle" size={24} color="#fff" />
              </View>
              <Text style={styles.menuText}>Add Class</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} activeOpacity={0.7} onPress={() => router.replace('/+not-found')}>
              <View style={styles.menuIcon}>
                <Ionicons name="people" size={24} color="#fff" />
              </View>
              <Text style={styles.menuText}>Members</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} activeOpacity={0.7} onPress={() => router.replace('/+not-found')}>
              <View style={styles.menuIcon}>
                <Ionicons name="clipboard" size={24} color="#fff" />
              </View>
              <Text style={styles.menuText}>Attendance</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} activeOpacity={0.7} onPress={() => router.replace('/+not-found')}>
              <View style={styles.menuIcon}>
                <Ionicons name="analytics" size={24} color="#fff" />
              </View>
              <Text style={styles.menuText}>Reports</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
    </View>
  );
}


/* ================= STYLES ================= */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: '#E31E24',
    paddingTop: 50,
    paddingBottom: 40,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    //marginTop: 30,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 50,
    borderWidth:1,
  },


  //=========== Coach Screen ===========
  heroCard: {
    margin: 20,
    borderRadius: 28,
    padding: 25,
  },
  heroTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  heroNumber: {
    color: '#fff',
    fontSize: 42,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  heroSub: {
    color: '#FFE2D2',
  },

  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  statCard: {
    width: '31%',
    backgroundColor: '#000000',
    borderRadius: 20,
    alignItems: 'center',
    paddingVertical: 20,
  },
  statValue: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
    marginTop: 10,
  },
  statLabel: {
    color: '#999',
    marginTop: 5,
  },

  sectionTitle: {
    color: '#000',
    fontSize: 18,
    fontWeight: '700',
    marginTop: 30,
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  classCard: {
    width: 150,
    backgroundColor: '#fff',
    marginLeft: 20,
    borderRadius: 20,
    padding: 18,
  },
  className: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  classTime: {
    color: '#363534',
    marginTop: 10,
    fontWeight: '700',
  },
  classMembers: {
    color: '#5a5a5a',
    marginTop: 5,
  },
  
  //=========== Menu Grid ===========
  menuContainer: {
    //marginTop: 20,
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
    backgroundColor: '#E31E24',
  },
  menuText: {
    fontSize: 11,
    textAlign: 'center',
  },
});