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



export default function GuestDashboardScreen() {
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
          <TouchableOpacity>
            <Image
              source={require('../../../assets/images/user/guest.png')}
              style={styles.profileImage}
            />
          </TouchableOpacity>
          <View  style={{marginLeft:10}}>
            <Text style={styles.headerTitle}>Guest</Text>
          </View>
        </View>
        <Ionicons name="notifications-outline" size={24} color="#fff" onPress={() => router.replace('/(tabs)/(member)/dashboard')}/>
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
            <TouchableOpacity key={item.id} style={styles.headerCard} activeOpacity={1} onPress={() => router.replace('/class_detail')}>       
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
            <TouchableOpacity key={item.id} style={styles.headerCard} activeOpacity={1} onPress={() => router.replace('/+not-found')}>       
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
});