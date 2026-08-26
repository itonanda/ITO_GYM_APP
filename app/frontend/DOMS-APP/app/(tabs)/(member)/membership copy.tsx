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

// STATE API
const apiURL = process.env.EXPO_PUBLIC_API_URL;
interface UsersData {
  id_user : string;
  full_name : string;
  email : string;
}

export default function MembershipPageScreen() {
  const router = useRouter();
  const { accessToken, userId, name, email } = useGlobalSearchParams();

  // GET DATA
  // Accesses both route params ([id]) and query params (?name=John)
  const [users, setUsers] = useState<UsersData | null>(null);
  const [loading, setLoading] = useState(true);

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
    const handleBookingClass = () => {
      {users &&(
        router.push({
          pathname: '/booking_class',
          params: { id_user: users.id_user }
        })
      )}
    };
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#E82528" />

      {/* HEADER */}
      <LinearGradient
        colors={["#E82528", "#9A0006"]}
        style={styles.header}
      >
        <TouchableOpacity style={styles.backButton} onPress={() => router.replace('/dashboard')}>
            <Ionicons name="arrow-back" size={22} color="#fff"/>
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Membership</Text>

        <View style={{ width: 40 }} />
      </LinearGradient>


      <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 120 }}
            >
                <View style={styles.headerTop}>
                    {/* ================= HEADER TOP================= */}
                    {/* ==== CARD ==== */}
                    <LinearGradient
                        colors={["#E82528", "#9A0006"]}
                        style={styles.headerTopCard}
                        >
                        {users && (
                        <View style={styles.headerTopCardContent}>
                            <View>
                            {/* <Text style={styles.headerTopName}>John Doe</Text> */}
                            <Text style={styles.headerTopName}>{users.full_name}</Text>
                            <Text style={styles.headerTopSubText}>
                                1 Month Unlimited Plan
                            </Text>
                            </View>
                
                            <View style={styles.headerTopAvatar}>
                            <Ionicons name="person-outline" size={28} color="#000" onPress={() => router.replace('/profile')} />
                            </View>
                          
                        </View>
                        )}

                        <View style={styles.headerTopDivider} />
                
                        <Text style={styles.headerTopValid}>
                            Valid Until: 20 December, 2027
                        </Text>
                    </LinearGradient>
                </View>
                
                <View style={styles.headerGrid}>
                    {/* ================= Menu Grid ================= */}
                    <View style={styles.menuContainer}>
                        <TouchableOpacity style={styles.menuItem} activeOpacity={0.7} onPress={() => router.replace('/membership_plan')}>
                        <View style={styles.menuIcon}>
                            <Ionicons name="calendar-outline" size={24} color="#333" />
                        </View>
                        <Text style={styles.menuText}>Membership Plans</Text>
                        </TouchableOpacity>
                        
                        {/* <TouchableOpacity style={styles.menuItem} activeOpacity={0.7} onPress={() => router.replace('/booking_class')}> */}
                        <TouchableOpacity style={styles.menuItem} activeOpacity={0.7} onPress={handleBookingClass}>
                        <View style={styles.menuIcon}>
                            <Ionicons name="newspaper-outline" size={24} color="#333" />
                        </View>
                        <Text style={styles.menuText}>Booking Class</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuItem} activeOpacity={0.7} onPress={() => router.replace('/check_out')}>
                        <View style={styles.menuIcon}>
                            <Ionicons name="bag-handle-outline" size={24} color="#333" />
                        </View>
                        <Text style={styles.menuText}>Billing</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuItem} activeOpacity={0.7} onPress={() => router.replace('/payment_history')}>
                        <View style={styles.menuIcon}>
                            <Ionicons name="card-outline" size={24} color="#333" />
                        </View>
                        <Text style={styles.menuText}>Payment History</Text>
                        </TouchableOpacity>
                    </View>
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

  
  /* ===== HEADER TOP CARD ===== */
  headerTop: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 15,
    marginBottom: -20,
  },
  headerTopCard: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 25,
  },
  headerTopCardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTopName: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },
  headerTopSubText: {
    color: "#ddd",
    fontSize: 12,
    marginTop: 5,
  },
  headerTopAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTopDivider: {
    height: 1,
    backgroundColor: "#555",
    marginVertical: 15,
  },
  headerTopValid: {
    color: "#fff",
    fontSize: 12,
  },


  //=========== Menu Grid ===========
  headerGrid: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 5,
    marginBottom: -20,
  },
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


});