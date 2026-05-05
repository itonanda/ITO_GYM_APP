//-------------------------
// Update 2026-05-04
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

const { width } = Dimensions.get('window');


export default function MemberUpdatedViewClassDetailScreen() {
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
          {/* ================= DETAIL CLASS ================= */}
          <TouchableOpacity onPress={() => router.replace('/(tabs)/MemberDashboardAfterBooking')}>
            <Ionicons name="arrow-back" size={22} color="#000"/>
          </TouchableOpacity>

          <Text style={styles.title}>Details</Text>

          {/* Spacer biar title center */}
          <View style={{ width: 24 }} />
        </View>  

        {/* Line */}
        <View style={styles.divider} /> 
       
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 120 }}
        >
          <View style={styles.headerTop}>
            {/* ================= HEADER TOP================= */}
            <View style={styles.headerRow}>
              <View style={styles.headerRowTop}>
                <View style={styles.headerRowTopRight}>
                  <Text style={styles.headerTitle}>Morning Class</Text>
                  <Text style={styles.headerSubTitle}>08.00 - 09.00</Text> 
                </View>
              </View>
              <View style={styles.headerRowTop}>
                <View style={styles.headerRowTopLeft}>
                  <View style={styles.avatar}>
                    <Ionicons name="person-circle-outline" size={100} color="#000"/>
                  </View>
                  <Text style={styles.headerSubTitle}>John Doe</Text> 
                </View>
              </View>
            </View>

            <Text style={{fontSize:16, color:'#F02727', fontStyle:'italic', marginBottom:10}}>For Upper body, make you more energize and feel better .....</Text>
          </View>  
        
          {/* ================= DETAIL CLASS ================= */}
              <View style={styles.headerDetail}>
                {/* --------- Warm Up --------- */}
                <View>
                  <View style={styles.headerDetailRow}>
                    <View style={styles.headerRowDetail}>
                      <View style={styles.headerRowDetailRight}>
                        <View style={styles.iconTemp}>
                          <Ionicons name="thermometer-outline" size={40} color="#8A0404"/>
                        </View>
                      </View>
                    </View>
                    <View style={styles.headerRowDetail}>
                      <View style={styles.headerRowDetailLeft}>
                        <Text style={styles.headerTitle}>Warm Up</Text>
                        <Text></Text>
                        <Text style={styles.headerSubTitle}>
                          A. Jumping{"\n"}
                          B. Running{"\n"}
                          C. Squats</Text>
                      </View>
                    </View>
                  </View>
                </View>
                
                {/* --------- Exercise 1 --------- */}
                <View>
                  <View style={styles.headerDetailRow}>
                    <View style={styles.headerRowDetail}>
                      <View style={styles.headerRowDetailRight}>
                        <View style={styles.iconTemp}>
                          <Ionicons name="thermometer-outline" size={40} color="#8A0404" />
                        </View>
                      </View>
                    </View>
                    <View style={styles.headerRowDetail}>
                      <View style={styles.headerRowDetailLeft}>
                        <Text style={styles.headerTitle}>Exercise 1</Text>
                        <Text></Text>
                        <Text style={styles.headerSubTitle}>
                          A. Jumping Jacks{"\n"}
                          B. Swimming{"\n"}
                          C. Bench Press</Text>
                      </View>
                    </View>
                  </View>
                </View>

                {/* --------- Exercise 2 --------- */}
                <View>
                  <View style={styles.headerDetailRow}>
                    <View style={styles.headerRowDetail}>
                      <View style={styles.headerRowDetailRight}>
                        <View style={styles.iconTemp}>
                          <Ionicons name="thermometer-outline" size={40} color="#8A0404" />
                        </View>
                      </View>
                    </View>
                    <View style={styles.headerRowDetail}>
                      <View style={styles.headerRowDetailLeft}>
                        <Text style={styles.headerTitle}>Exercise 2</Text>
                        <Text></Text>
                        <Text style={styles.headerSubTitle}>
                          A. Running{"\n"}
                          B. Jumping Jacks{"\n"}
                          C. Jump Rope{"\n"}
                          D. Burpees{"\n"}
                          E. Mountain Climbers{"\n"}
                          F. High Knees{"\n"}
                          G. Cycling{"\n"}
                          H. Swimming</Text>
                      </View>
                    </View>
                  </View>
                </View>

                {/* --------- Exercise 3 --------- */}
                <View>
                  <View style={styles.headerDetailRow}>
                    <View style={styles.headerRowDetail}>
                      <View style={styles.headerRowDetailRight}>
                        <View style={styles.iconTemp}>
                          <Ionicons name="thermometer-outline" size={40} color="#8A0404" />
                        </View>
                      </View>
                    </View>
                    <View style={styles.headerRowDetail}>
                      <View style={styles.headerRowDetailLeft}>
                        <Text style={styles.headerTitle}>Exercise 3</Text>
                        <Text></Text>
                        <Text style={styles.headerSubTitle}>
                          A. Bench Press{"\n"}
                          B. Squat{"\n"}
                          C. Deadlift{"\n"}
                          D. Push Up{"\n"}
                          E. Pull Up{"\n"}
                          F. Shoulder Press{"\n"}
                          G. Bicep Curl{"\n"}
                          H. Tricep Dip{"\n"}
                          I. Lunges{"\n"}
                          J. Leg Press</Text>
                      </View>
                    </View>
                  </View>
                </View>

                {/* --------- Exercise 4 --------- */}
                <View>
                  <View style={styles.headerDetailRow}>
                    <View style={styles.headerRowDetail}>
                      <View style={styles.headerRowDetailRight}>
                        <View style={styles.iconTemp}>
                          <Ionicons name="thermometer-outline" size={40} color="#8A0404" />
                        </View>
                      </View>
                    </View>
                    <View style={styles.headerRowDetail}>
                      <View style={styles.headerRowDetailLeft}>
                        <Text style={styles.headerTitle}>Exercise 4</Text>
                        <Text></Text>
                        <Text style={styles.headerSubTitle}>
                          A. Single Leg Stand{"\n"}
                          B. Heel to Toe Walk{"\n"}
                          C. Balance Board{"\n"}
                          D. Tree Pose</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
        </ScrollView>


      {/* ================= HEADER BOTTOM================= */}
      <View style={styles.headerBottom}>
        <View style={styles.headerBottomRow}>
          <View style={styles.headerRowBottom}>
            <Text style={{fontSize:16, color:'#08b208', fontStyle:"italic",fontWeight:'bold'}}>
              2/15
            </Text>
          </View>
          <View style={styles.headerRowBottom}>
            <Link href={"/(tabs)/MemberDashboardAfterBooking"}>
              <Text style={{fontSize:16, color:'#000', fontStyle:"italic",fontWeight:'bold'}}>
                Cancel
              </Text>
            </Link>
          </View>
        </View>
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

  /* ===== HEADER TOP ===== */
  headerTop: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    marginBottom: -20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 2,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: '#fff',
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  headerRowTop: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 2,
    backgroundColor: '#fff',
    height: 150,
    width: 150,
    borderRadius: 5,
  },
  headerRowTopRight: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'baseline',
    backgroundColor: '#fff',
    height: 150,
    width: 150,
    borderRadius: 5,
  },
  headerRowTopLeft: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 150,
    width: 150,
    borderRadius: 5,
  },
  headerTitle: {
    fontSize: 22,
    fontStyle: 'italic',
    fontWeight: 'bold',
    color: '#000',
  },
  headerSubTitle: {
    fontSize: 16,
    fontStyle: 'italic',
    fontWeight: 'bold',
    color: '#000',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 22.5,
    backgroundColor: 'rgb(240, 235, 235)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },

  /* ===== HEADER DETAIL ===== */
  headerDetail: {
    borderColor: '#108932',
    backgroundColor: "#fff",
    borderWidth: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 20,
    borderRadius: 20,
    margin: 20,
  },
  headerDetailRow: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  headerRowDetail: {
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  headerRowDetailRight: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  headerRowDetailLeft: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginLeft: 10,
  },
  iconTemp: {
    width: 50,
    height: 50,
    borderRadius: 22.5,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },

  /* ===== HEADER BOTTOM ===== */
  headerBottom: {
    backgroundColor: "#E01F26",
    borderRadius: 15,
    padding: 30,
    marginBottom: -10,
  },
  headerBottomRow: {
   flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 2,
    marginBottom: 50,
  },
  headerRowBottom: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#000',
    backgroundColor: '#fff',
    height: 50,
    width: 100,
  },
});