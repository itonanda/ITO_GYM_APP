import React, { useEffect, useCallback, useState, useRef } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
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

interface ItemsData {
  id_membership_plan : string;
  title : string;
  price : string;
  description : string;
}

interface PaymentData {
  id_payments : string;
  id_user : string;
  
  membership_plan : any;
  id_membership_plan : string;
  title : string;
  price : string;

  payment_method : any;
  id_payment_method : string;
  // title: string;
  image_logo : string;
  image_qr : string;
  
  id_transaction : string;
  date : string;
  payment_status : any;
  // status : string;
}

// ========== DATA ==========
const paymentData = [
  {
    id: "1",
    title: "3 Month Unlimited",
    amount: "Rp 1.900.000",
    method: "GoPay",
    date: "18 May 2026",
    status: "SUCCESS",
  },
  {
    id: "2",
    title: "1 Month Unlimited",
    amount: "Rp 900.000",
    method: "BCA Transfer",
    date: "10 April 2026",
    status: "SUCCESS",
  },
  {
    id: "3",
    title: "Drop In 5x",
    amount: "Rp 400.000",
    method: "QRIS",
    date: "02 April 2026",
    status: "PENDING",
  },
];

export default function PaymentHistoryScreen() {
  const router = useRouter();
  const navigation = useNavigation();

  // GET DATA
  // Accesses both route params ([id]) and query params (?name=John)
  const [items, setItems] = useState<ItemsData | null>(null);
  const [users, setUsers] = useState<UsersData | null>(null);
  const [payment, setPayment] = useState<PaymentData[]>([]);
  const [loading, setLoading] = useState(true);
  const { accessToken, id_user, id_membership_plan, membership_date, paymentMethod, id_transaction } = useGlobalSearchParams();
  console.log(accessToken);
  console.log(id_user);
  // console.log(id_membership_plan);
  // console.log(membership_date);
  // console.log(paymentMethod);
  // console.log(id_transaction);

  useEffect(() => {
      fetchDataUser();
      fetchDataPayment();
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

  const fetchDataPayment = async () => {
    try {
      // console.log(accessToken);
      const responsPayment = await fetch(`${apiURL}/payment/history/${id_user}`, {
      method: 'GET',
      headers: {
        'authorization': `Bearer ${accessToken}`, // Pass JWT token to backend
        'Content-Type': 'application/json',
      }
    });
      const dataPayment = await responsPayment.json();
      setPayment(dataPayment);
      console.log(dataPayment);
    } catch (error) {
      console.error('Error fetching list data:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }: any) => (
    <LinearGradient
    colors={["#f7f0f0", "#f7f2f2"]}
    style={styles.cardHistory}
    >
        <TouchableOpacity activeOpacity={0.8}>
        <View style={styles.topRowHistory}>
            <View style={styles.iconContainerHistory}>
            <Ionicons
                name="card-outline"
                size={26}
                color="#9A0006"
            />
            </View>
            <View style={{ flex: 1 }}>
            <Text style={styles.titleHistory}>{item.title}</Text>

            <Text style={styles.methodHistory}>
                {item.method}
            </Text>
            </View>
            <Text
            style={[
                styles.statusHistory,
                {
                color:
                    item.status === "SUCCESS"
                    ? "#22C55E"
                    : "#FACC15",
                },
            ]}
            >
            {item.status}
            </Text>
        </View>

        <View style={styles.dividerHistory} />

        <View style={styles.bottomRowHistory}>
            <View>
            <Text style={styles.labelHistory}>Date</Text>
            <Text style={styles.dateHistory}>{item.date}</Text>
            </View>
            <Text style={styles.amountHistory}>
            {item.amount}
            </Text>
        </View>
        </TouchableOpacity>
    </LinearGradient>
    
  );

  return (
    <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#E82528" />

        {/* HEADER */}
        <LinearGradient
            colors={["#E82528", "#9A0006"]}
            style={styles.header}
        >
            {/* <TouchableOpacity style={styles.backButton} onPress={() => router.replace('/(tabs)/(member)/membership')}> */}
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={22} color="#fff"/>
            </TouchableOpacity>
            
            <Text style={styles.headerTitle}>Payment History</Text>
    
            <View style={{ width: 40 }} />
        </LinearGradient>    

        {/* List */}
        
        <FlatList
          data={payment}
          scrollEnabled={false}
          keyExtractor={(item) => item.id_payments}
          // renderItem={renderItem}
          // showsVerticalScrollIndicator={false}
          contentContainerStyle={{
              padding: 30,
          }}
          renderItem={({ item }) => {

            return (
              <LinearGradient
              colors={["#f7f0f0", "#f7f2f2"]}
              style={styles.cardHistory}
              >
                  <TouchableOpacity activeOpacity={0.8}>
                  <View style={styles.topRowHistory}>
                      <View style={styles.iconContainerHistory}>
                      <Ionicons
                          name="card-outline"
                          size={26}
                          color="#9A0006"
                      />
                      </View>
                      <View style={{ flex: 1 }}>
                      <Text style={styles.titleHistory}>{item.membership_plan.title}</Text>

                      <Text style={styles.methodHistory}>
                          {item.payment_method.title}
                      </Text>
                      </View>
                      <Text
                      style={[
                          styles.statusHistory,
                          {
                          color:
                              item.payment_status.title === "SUCCESS"
                              ? "#22C55E"
                              : "#FACC15",
                          },
                      ]}
                      >
                      {item.payment_status.title}
                      </Text>
                  </View>

                  <View style={styles.dividerHistory} />

                  <View style={styles.bottomRowHistory}>
                      <View>
                      <Text style={styles.labelHistory}>Date</Text>
                      <Text style={styles.dateHistory}>{item.date}</Text>
                      </View>
                      <Text style={styles.amountHistory}>
                        Rp. {item.membership_plan.price}
                      </Text>
                  </View>
                  </TouchableOpacity>
              </LinearGradient>
            );
          }}
        />
        
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


// ======== Payment History ========
  cardHistory: {
    backgroundColor: "#fff",
    borderRadius: 26,
    padding: 20,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
  },
  topRowHistory: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainerHistory: {
    width: 55,
    height: 55,
    borderRadius: 18,
    backgroundColor: "rgba(197, 34, 34, 0.12)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },

  titleHistory: {
    color: "#9A0006",
    fontSize: 17,
    fontWeight: 'bold',
  },

  methodHistory: {
    color: "#413f3f",
    marginTop: 5,
    fontSize: 14,
    fontWeight: 'bold',
  },

  statusHistory: {
    fontWeight: "700",
    fontSize: 13,
  },

   dividerHistory: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.82)",
    marginVertical: 18,
  },

  bottomRowHistory: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  labelHistory: {
    color: "#000",
    fontSize: 13,
    fontWeight: 'bold',
  },

  dateHistory: {
    color: "#4b4c4c",
    marginTop: 4,
    fontSize: 14,
    fontWeight: 'bold',
  },

  amountHistory: {
    color: "#05c049",
    fontSize: 20,
    fontWeight: "bold",
  },

});