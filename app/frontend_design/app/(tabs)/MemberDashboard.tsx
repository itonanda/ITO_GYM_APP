//-------------------------
// Update 2026-05-12
//-------------------------


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



const { width } = Dimensions.get('window');

/* ================= DATA ================= */
const classDataToday = [
  {
    id: '1',
    title: 'Morning Class',
    time: '08.00 - 09.00',
    trainer: 'Adryl Nath',
    quota: '2/15',
    image:
      'https://media.gettyimages.com/id/1059616710/photo/young-woman-exercising-on-treadmill.jpg?s=2048x2048&w=gi&k=20&c=vDIxPW48WJILe5PhY6U4UOisRvflllLe6Fd1qQfNgjY=',
  },
  {
    id: '2',
    title: 'Afternoon Class',
    time: '13.00 - 14.00',
    trainer: 'Michael Tan',
    quota: '5/15',
    image:
      'https://media.gettyimages.com/id/1493959975/photo/young-man-working-out-with-battle-ropes-in-gym.jpg?s=2048x2048&w=gi&k=20&c=AU9pMkFlLTtqi-Cn_W5Rp7g40dd7DZJXy1lQbIdQMt0=',
  },
  {
    id: '3',
    title: 'Evening Class',
    time: '18.00 - 19.00',
    trainer: 'Sarah Lee',
    quota: '10/15',
    image:
      'https://media.gettyimages.com/id/2208288816/photo/female-kickboxer-shadowboxing-with-dumbbells.jpg?s=2048x2048&w=gi&k=20&c=v3cUTd65XgSCj0lHYQ4KYkRhsI7BEuxTMxoHbByeynI=',
  },
];

const classDataPromo = [
  {
    id: '1',
    title: 'Supplements & Fitness Nutrition',
    image:
      'https://media.istockphoto.com/id/1491299490/id/foto/foto-closeup-wanita-muda-atletis-asia-menyiapkan-protein-shake-di-rumah-diet-dan-makanan-sehat.jpg?s=1024x1024&w=is&k=20&c=x2WV9v6F-FGrTi5nnpICNn1CBaU0y7N8xyqjhYbYwQM=',
  },
  {
    id: '2',
    title: 'Meal Plans & Healthy Catering',
    image:
      'https://media.gettyimages.com/id/1347857819/photo/fish-oil-capsules-and-diet-rich-in-omega-3.jpg?s=2048x2048&w=gi&k=20&c=ab170Fu4w7RafGMeupROcwVYTAmyfv_1WpDEXUq9Fkc=',
  },
  {
    id: '3',
    title: 'Athletic Apparel & Footwear',
    image:
      'https://media.gettyimages.com/id/647331865/photo/young-sporty-man-jumping-over-a-bench.jpg?s=2048x2048&w=gi&k=20&c=qqu7JRqLTqQVzA-4FWUJu7Wgb9FA5V2eeOaB5l5Pk6g=',
  },
  {
    id: '4',
    title: 'Gym & Home Workout Equipment',
    image:
      'https://media.gettyimages.com/id/1289246932/photo/woman-exercising-with-personal-trainer-in-home-gym.jpg?s=2048x2048&w=gi&k=20&c=EAs_oQClELe2Pdu7pvxB7zGofjbejsG4uxLU3Q0qgNY=',
  },
];



export default function MemberDashboardScreen() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef(null);
  const [activeIndexPromo, setActiveIndexPromo] = useState(0);
  const flatListRefPromo = useRef(null);

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index !== null) {
        setActiveIndex(viewableItems[0].index);
      }
    }
  ).current;

  const onViewableItemsChangedPromo = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index !== null) {
        setActiveIndexPromo(viewableItems[0].index);
      }
    }
  ).current;


  const viewConfig = {
    viewAreaCoveragePercentThreshold: 50,
  };

  const viewConfigPromo = {
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
          <View style={styles.avatar}>
            <Ionicons name="person-outline" size={24} color="#000" onPress={() => router.replace('/(tabs)/MemberProfile')}/>
          </View>
          <View>
            <Text style={styles.headerTitle} onPress={() => router.replace('/(tabs)/MemberProfile')}>John Doe</Text>
            <Text style={{fontSize:12,color:'#fff',fontWeight:'bold'}}>Valid until 20/12/2026</Text>
          </View>
        </View>
        <Ionicons name="notifications-outline" size={24} color="#fff" onPress={() => router.replace('/(tabs)/NotificationPage')}/>
      </LinearGradient>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
                
        {/* ================= AVAILABLE CLASS ================= */}
        <Text style={styles.sectionTitle}>Available Classes</Text>

        <FlatList
          ref={flatListRef}
          data={classDataToday}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewConfig}
          renderItem={({ item }) => (
            <TouchableOpacity key={item.id} style={styles.headerCard} activeOpacity={1} onPress={() => router.replace('/(tabs)/MemberViewClassDetail')}>       
                <View style={styles.classCard}>
                  <Image
                    source={{ uri: item.image }}
                    style={styles.classImage}
                  />
                  
                  <View style={styles.cardContent}>
                    <View>
                      <Text style={styles.classTitle}>{item.title}</Text>
                      <Text style={styles.classTime}>{item.time}</Text>
                      <Text style={styles.classTrainer}>
                        By {item.trainer}
                      </Text>
                    </View>
                    <Text style={styles.classQuota}>{item.quota}</Text>
                  </View>
                </View>
            </TouchableOpacity>
          )}
        />

        {/* ================= DOT INDICATOR CLASS================= */}
        <View style={styles.dotContainer}>
          {classDataToday.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                activeIndex === index && styles.activeDot,
              ]}
            />
          ))}
        </View>


        {/* ================= Menu Grid ================= */}
        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuItem} activeOpacity={0.7} onPress={() => router.replace('/(tabs)/noted')}>
            <View style={styles.menuIcon}>
              <Ionicons name="information-outline" size={24} color="#333" />
            </View>
            <Text style={styles.menuText}>About Us</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} activeOpacity={0.7} onPress={() => router.replace('/(tabs)/MemberClassSchedule')}>
            <View style={styles.menuIcon}>
              <Ionicons name="calendar-outline" size={24} color="#333" />
            </View>
            <Text style={styles.menuText}>Class Schedule</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} activeOpacity={0.7} onPress={() => router.replace('/(tabs)/MembershipPage')}>
            <View style={styles.menuIcon}>
              <Ionicons name="card-outline" size={24} color="#333" />
            </View>
            <Text style={styles.menuText}>Membership</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} activeOpacity={0.7} onPress={() => router.replace('/(tabs)/noted')}>
            <View style={styles.menuIcon}>
              <Ionicons name="trophy-outline" size={24} color="#333" />
            </View>
            <Text style={styles.menuText}>Leaderboard</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} activeOpacity={0.7} onPress={() => router.replace('/(tabs)/noted')}>
            <View style={styles.menuIcon}>
              <Ionicons name="chatbubble-outline" size={24} color="#333" />
            </View>
            <Text style={styles.menuText}>Chat</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} activeOpacity={0.7} onPress={() => router.replace('/(tabs)/noted')}>
            <View style={styles.menuIcon}>
              <Ionicons name="gift-outline" size={24} color="#333" />
            </View>
            <Text style={styles.menuText}>Promo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} activeOpacity={0.7} onPress={() => router.replace('/(tabs)/noted')}>
            <View style={styles.menuIcon}>
              <Ionicons name="newspaper-outline" size={24} color="#333" />
            </View>
            <Text style={styles.menuText}>News</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} activeOpacity={0.7} onPress={() => router.replace('/(tabs)/noted')}>
            <View style={styles.menuIcon}>
              <Ionicons name="settings-outline" size={24} color="#333" />
            </View>
            <Text style={styles.menuText}>Settings</Text>
          </TouchableOpacity>
        </View>


        {/* ================= Iklan Banner / Event Banner ================= */}
        <FlatList
          ref={flatListRefPromo}
          data={classDataPromo}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          onViewableItemsChanged={onViewableItemsChangedPromo}
          viewabilityConfig={viewConfigPromo}
          renderItem={({ item }) => (
            <TouchableOpacity key={item.id} style={styles.headerCard} activeOpacity={1} onPress={() => router.replace('/(tabs)/noted')}>       
                <View style={styles.classCard}>
                  <View style={styles.cardContent}>
                    <View>
                      <Text style={styles.classTitle}>{item.title}</Text>
                    </View>
                  </View>

                  <Image
                    source={{ uri: item.image }}
                    style={styles.classImage}
                  />
                </View>
            </TouchableOpacity>
          )}
        />

        {/* ================= DOT INDICATOR  PROMO================= */}
        <View style={styles.dotContainer}>
          {classDataPromo.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                activeIndexPromo === index && styles.activeDot,
              ]}
            />
          ))}
        </View>
      </ScrollView>


      {/* ================= BOTTOM TAB ================= */}
      <View style={styles.bottomTab}>
        <View style={styles.bottomTabTitle}>
          <Link href={"/(tabs)/MemberDashboard"}>
            <View style={styles.bottomTabTitle}>
              <Ionicons name="home" size={24} color="#E11F27" />
              <Text style={styles.bottomTabTitle}>Home</Text>
            </View>
          </Link>
        </View>
        <View style={styles.bottomTabTitle}>
          <Link href={"/(tabs)/noted"}>
            <View style={styles.bottomTabTitle}>
              <Ionicons name="calendar" size={24} color="#E11F27" />
              <Text style={styles.bottomTabTitle}>Activity</Text>
            </View>
          </Link>
        </View>


        <View style={styles.bottomTabBarbel}>
          <Link href={"/(tabs)/MemberWorkoutOfTheDay"}>
            <Ionicons name="barbell" size={35} color="#fff"/>
          </Link>
        </View>


        <View style={styles.bottomTabTitle}>
          <Link href={"/(tabs)/noted"}>
            <View style={styles.bottomTabTitle}>
              <AntDesign name="rise" size={24} color="#E11F27" />
              <Text style={styles.bottomTabTitle}>Progress</Text>
            </View>
          </Link>
        </View>
        <View style={styles.bottomTabTitle}>
          <Link href={"/(tabs)/noted"}>
            <View style={styles.bottomTabTitle}>
              <Ionicons name="body" size={24} color="#E11F27" />
              <Text style={styles.bottomTabTitle}>You</Text>
            </View>
          </Link>
        </View>
      </View>
    </View>
  );
}



/* ================= STYLES ================= */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#E31E24',
    paddingTop: 40,
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

  //=========== Available Class and Promo ===========
  sectionTitle: {
    marginTop: 10,
    marginHorizontal: 20,
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
  },

  // === CLASS CARD ===
  headerCard: {
    width: width - 40,
    //backgroundColor: '#d26868',
    marginHorizontal: 20,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    //marginBottom: 20,
  },
  classCard: {
    width: width - 40,
    marginHorizontal: 20,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
  },
  classImage: {
    width: '100%',
    height: 120,
  },
  cardContent: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  classTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  classTime: {
    fontSize: 13,
    marginTop: 3,
  },
  classTrainer: {
    fontSize: 12,
    marginTop: 3,
    color: '#E31E24',
  },
  classQuota: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E31E24',
  },

  //=== DOT ===
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 12,
    marginBottom: 10,
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
 
  //=========== BOTTOM TAB ===========
  bottomTab: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 85,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 15,
    borderTopColor:'#000',
    borderTopWidth: 1,
  },
  bottomTabBarbel: {
    bottom: 0,
    backgroundColor: '#E11F27',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    top:-35,
    borderRadius:20,
    padding: 10,
    borderColor: '#000',
    borderWidth: 1,
  },
  bottomTabTitle: {
    fontSize: 12,
    fontWeight: 500,
    alignItems: 'center',
  },

  //================= BOOKING CLASS =================
  cardBookingClass: {
    width: width - 40,
    flexDirection: "row",
    backgroundColor: "#6ED36E",
    borderRadius: 15,
    padding: 12,
    alignItems: "center",
    marginHorizontal: 20,
    borderWidth: 2,
  },

  // DATE
  dateContainer: {
    borderRadius: 5,
    overflow: "hidden",
  },
  monthBox: {
    backgroundColor: "#E57373",
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignItems: "center",
  },
  monthText: {
    color: "#000",
    fontWeight: "bold",
  },
  dayBox: {
    backgroundColor: "#fff",
    paddingVertical: 6,
    alignItems: "center",
  },
  dayText: {
    fontWeight: "bold",
    fontSize: 16,
  },

  // Divider
  divider: {
    width: 1,
    height: "80%",
    backgroundColor: "#000",
    marginHorizontal: 10,
  },

  // Content
  content: {
    flex: 1,
  },
  classTitleTime: {
    fontSize: 18,
    fontWeight: "bold",
    fontStyle: "italic",
  },
  time: {
    fontSize: 14,
    marginVertical: 2,
  },
  author: {
    color: "red",
    fontStyle: "italic",
  },
});