import React, { useEffect, useState, useRef } from 'react';
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
import { Link, useRouter, useGlobalSearchParams, useLocalSearchParams } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import { Background } from "@react-navigation/elements";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get('window');

const membershipPlans = [
  {
    id: "1",
    title: "1 Month Unlimited",
    price: "300k/Month",
    benefits: ["In and out free", "Free wifi", "Towel"],
    icon: "card-outline",
  },
  {
    id: "2",
    title: "5 Month Unlimited",
    price: "900k/Month",
    benefits: ["In and out free", "Free wifi", "Locker", "Towel"],
    icon: "card-outline",
  },
  {
    id: "3",
    title: "Open Gym Day Pass",
    price: "",
    benefits: [],
    icon: "card-outline",
  },
  {
    id: "4",
    title: "Open Gym Unlimited",
    price: "",
    benefits: [],
    icon: "card-outline",
  },
  {
    id: "5",
    title: "1x Drop In",
    price: "",
    benefits: [],
    icon: "card-outline",
  },
  {
    id: "6",
    title: "5x Drop In",
    price: "",
    benefits: [],
    icon: "card-outline",
  },
];

// STATE API
const apiURL = process.env.EXPO_PUBLIC_API_URL;

interface UsersData {
  id_user : string;
  full_name : string;
  email : string;
}

interface ItemsData {
  id_user : string;
  full_name : string;
  email : string;
}

export default function MembershipPlanScreen() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef(null);
  const [selected, setSelected] = useState("");
  //const [selected, setSelected] = useState<number | null>(null);
  
  // const handleNext = () => {
  //   const selectedMethod = membershipPlans.find(
  //     (item) => item.id === selected
  //   );

  //   Alert.alert(
  //     "Membership Plan Selected",
  //     `You selected ${selectedMethod?.title}`,
  //     [
  //       {
  //         text: "OK",
  //         onPress: () => {
  //             router.push("/(tabs)/(member)/check_out");
  //           }
  //       },
  //     ]
  //   );
  // };

  // GET DATA
  // Accesses both route params ([id]) and query params (?name=John)
  const [items, setItems] = useState<ItemsData | null>(null);
  const [users, setUsers] = useState<UsersData | null>(null);
  const [loading, setLoading] = useState(true);
  const { accessToken, userId, name, email } = useGlobalSearchParams();
  
  useEffect(() => {
      fetchDataUser();
    }, []);
    
  const fetchDataUser = async () => {
    try {
      // console.log(accessToken);
      const responseUser = await fetch(`${apiURL}/profile`, {
      method: 'GET',
      headers: {
        'authorization': `Bearer ${accessToken}`, // Pass JWT token to backend
        'Content-Type': 'application/json',
      }
    });
      const dataUser = await responseUser.json();
      setUsers(dataUser);
      // console.log(dataUser);
    } catch (error) {
      console.error('Error fetching list data:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleNext = () => {
    const selectedMethod = membershipPlans.find(
      (item) => item.id === selected
    );

    // Belum memilih membership
    if (!selectedMethod) {
      Alert.alert(
        "Warning",
        "Please select a membership plan."
      );
      return; // Tetap di halaman ini
    }

    // Sudah memilih membership
    Alert.alert(
      "Membership Plan Selected",
      `You selected ${selectedMethod.title}`,
      [
        {
          text: "OK",
          onPress: () => {
            router.push("/(tabs)/(member)/check_out");
          },
        },
      ]
    );
  };

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
      <LinearGradient colors={["#E82528", "#9A0006"]} style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.replace("/membership")}
        >
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Membership Plan</Text>

        <View style={{ width: 40 }} />
      </LinearGradient>



      <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 120 }}
            >
                                            
                {/* ================= Membership Plan ================= */}
                <View style={styles.headerMembershipPlans}>
                    <View style={styles.cardMembershipPlans}>
                          {membershipPlans.map((item) => {
                          const active = selected === item.id;
              
                          return (
                              <TouchableOpacity
                                key={item.id}
                                activeOpacity={0.8}
                                style={[
                                    styles.membershipItemMembershipPlans,
                                    active && styles.membershipItemActiveMembershipPlans,
                                ]}
                                onPress={() => setSelected(item.id)}
                                //onPress={() => router.replace('/(tabs)/CheckOutQR')}
                              >
                                  <View style={styles.leftContentMembershipPlans}>
                                    <View style={styles.leftContentMembershipPlansTitle}>
                                      <View
                                      style={[
                                          styles.iconContainerMembershipPlans,
                                          active && styles.iconContainerActiveMembershipPlans,
                                      ]}
                                      >
                                        <Ionicons
                                            name={item.icon as any}
                                            size={22}
                                            color={active ? "#FFFFFF" : "#E31E24"}
                                        />
                                      </View>

                                      <View>
                                          <Text
                                            style={[
                                                styles.membershipTextMembershipPlans,
                                                active && styles.membershipTextActiveMembershipPlans,
                                            ]}
                                          >
                                            {item.title}
                                          </Text>

                                          {item.price !== "" && (
                                            <Text style={styles.planPrice}>{item.price}</Text>
                                          )}
                                      </View>                                                   
                                    </View>
                                    
                                    {active && 
                                      <View>
                                        <View style={styles.divider} />
                                        {item.benefits.map((benefit, index) => (
                                          <Text key={index} style={styles.benefit}>
                                            • {benefit}
                                          </Text>
                                        ))}
                                      </View>
                                    }
                                  </View>
                                  
                                  <View>
                                    <View
                                        style={[
                                        styles.radioOuterMembershipPlans,
                                        active && styles.radioOuterActiveMembershipPlans,
                                        ]}
                                    >
                                        {active && <View style={styles.radioInnerMembershipPlans} />}                                      
                                    </View>
                                  </View>  
                              </TouchableOpacity>
                          );
                          })}
                    </View>                        
                </View>
            </ScrollView>


      {/* ================= HEADER BOTTOM================= */}
      <LinearGradient
        colors={["#ffffff", "#E4E9E4"]}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
        style={styles.headerBottomCheckOut}
      >
        
        <View style={styles.headerBottomRowCheckOutNext}>
          {/* BUTTON */}
          <TouchableOpacity activeOpacity={0.8} disabled={selected === null} onPress={handleNext}>
            <LinearGradient
              colors={["#E82528", "#9A0006"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.headerRowBottomCheckOut}
            >
              <Text style={{fontSize:16, color:'#ffff',fontWeight:'bold'}}>
                  Next
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
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
    backgroundColor: "#C7C7C7",
    marginVertical: 20,
  }, 
  
  content: {
    flex: 1,
    padding: 20,
  },

  


  /* ===== Membership Plans ===== */
  headerMembershipPlans: {
    borderColor: '#fff',
    backgroundColor: "#fff",
    borderWidth: 1,
    borderRadius: 20,
    marginRight: 15,
    marginLeft: 15,
    marginBottom: 100,
  },
  cardMembershipPlans: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 12,
    //shadowColor: "#000",
    //shadowOffset: {
    //  width: 0,
    //  height: 4,
    //},
    //shadowOpacity: 0.08,
    //shadowRadius: 8,
    //elevation: 5,
  },
  membershipItemMembershipPlans: {
    //height: 75,
    borderRadius: 20,
    backgroundColor: "#F7F7F7",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#E8E8E8",
  },
  membershipItemActiveMembershipPlans: {
    backgroundColor: "#FFF1F1",
    borderColor: "#E31E24",
  },
  leftContentMembershipPlans: {
    borderRadius: 12,
    paddingVertical: 14,
  },

  leftContentMembershipPlansTitle: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconContainerMembershipPlans: {
    width: 45,
    height: 45,
    borderRadius: 14,
    backgroundColor: "#FFE5E5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  iconContainerActiveMembershipPlans: {
    backgroundColor: "#E31E24",
  },
  membershipTextMembershipPlans: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
  },
  membershipTextActiveMembershipPlans: {
    color: "#E31E24",
  },
  radioOuterMembershipPlans: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 2,
    borderColor: "#C7C7C7",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  radioOuterActiveMembershipPlans: {
    borderColor: "#E31E24",
  },
  radioInnerMembershipPlans: {
    width: 13,
    height: 13,
    borderRadius: 7,
    backgroundColor: "#E31E24",
  },
  
  planTitle: {
    fontSize: 18,
    color: "#111",
    fontWeight: "500",
  },

  planPrice: {
    marginTop: 3,
    fontSize: 16,
    color: "#90080c",
    fontWeight: "700",
  },

  benefit: {
    fontSize: 16,
    marginBottom: 8,
  },
 
  
/* ===== HEADER BOTTOM ===== */
  headerBottomCheckOut: {
    backgroundColor: "#E4E9E4",
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 20,
    borderTopRightRadius:20,
    borderColor: '#000',
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
  },
  headerBottomRowCheckOutNext: {
    alignItems: 'center',
    padding: 2,
    marginTop: 20,
    marginBottom: 40,
  },
  headerRowBottomCheckOut: {
    backgroundColor: '#E01F26',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#000',
    height: 50,
    width: 250,
  },
});