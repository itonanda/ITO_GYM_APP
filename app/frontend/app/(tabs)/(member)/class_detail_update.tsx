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


export default function MemberClassDetailUpdatedScreen() {
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
        <TouchableOpacity style={styles.backButton} onPress={() => router.replace('/after_booking')}>
            <Ionicons name="arrow-back" size={22} color="#fff"/>
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Details</Text>

        <View style={{ width: 40 }} />
      </LinearGradient>


      <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 120 }}
            >
                <View style={styles.content}>
                    {/* CARD TOP */}
                    <View style={styles.cardTop}>
                        <View style={styles.headerTop}>
                            {/* ================= HEADER TOP================= */}
                            <View style={styles.headerRow}>
                                <View style={styles.headerRowTop}>
                                <View style={styles.headerRowTopRight}>
                                    <Text style={styles.headerTitleDetail}>Morning Class</Text>
                                    <Text style={styles.headerSubTitleDetail}>08.00 - 09.00</Text> 
                                </View>
                                </View>
                                <View style={styles.headerRowTop}>
                                <View style={styles.headerRowTopLeft}>
                                    <View style={styles.avatar}>
                                    <Ionicons name="person-circle-outline" size={100} color="#000"/>
                                    </View>
                                    <Text style={styles.headerSubTitleDetail}>Adryl Nath</Text> 
                                </View>
                                </View>
                            </View>
                
                            <Text style={{fontSize:16, color:'#F02727', fontStyle:'italic', marginBottom:10}}>For Upper body, make you more energize and feel better .....</Text>
                        </View> 
                    </View>

                    {/* CARD CENTER */}
                    <View style={styles.CardCenter}>
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
                                    <Text style={styles.headerTitleDetail}>Warm Up</Text>
                                    <Text></Text>
                                    <Text style={styles.headerSubTitleDetail}>
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
                                    <Text style={styles.headerTitleDetail}>Exercise 1</Text>
                                    <Text></Text>
                                    <Text style={styles.headerSubTitleDetail}>
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
                                    <Text style={styles.headerTitleDetail}>Exercise 2</Text>
                                    <Text></Text>
                                    <Text style={styles.headerSubTitleDetail}>
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
                                    <Text style={styles.headerTitleDetail}>Exercise 3</Text>
                                    <Text></Text>
                                    <Text style={styles.headerSubTitleDetail}>
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
                                    <Text style={styles.headerTitleDetail}>Exercise 4</Text>
                                    <Text></Text>
                                    <Text style={styles.headerSubTitleDetail}>
                                        A. Single Leg Stand{"\n"}
                                        B. Heel to Toe Walk{"\n"}
                                        C. Balance Board{"\n"}
                                        D. Tree Pose</Text>
                                    </View>
                                </View>
                                </View>
                            </View>
                        </View>
                    </View>
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
            <Text style={{fontSize:16, color:'#08b208', fontStyle:"italic",fontWeight:'bold'}}>
              2/15
            </Text>
        </View>

        {/* BUTTON */}
        <TouchableOpacity activeOpacity={0.8} onPress={() => router.replace('/after_booking')}>
          <LinearGradient
            colors={["#FFFFFF", "#cbc9c9"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.bottomBarBookButton}
          >
            <Text style={{fontSize:16, color:'#000', fontStyle:"italic",fontWeight:'bold'}}>
              Cancel
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
  cardTop: {
    backgroundColor: "#FFF",
    borderRadius: 24,
    padding: 20,
  },

  CardCenter: {
    backgroundColor: "#FFF",
    borderRadius: 24,
    padding: 20,
    marginTop: 20,
  },


/* ===== HEADER TOP ===== */
  headerTop: {
    backgroundColor: "#fff",
    borderRadius: 20,
    //padding: 20,
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
    //marginBottom: 20,
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
  headerTitleDetail: {
    fontSize: 22,
    fontStyle: 'italic',
    fontWeight: 'bold',
    color: '#000',
  },
  headerSubTitleDetail: {
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
    //margin: 20,
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