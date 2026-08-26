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
import QRCode from "react-native-qrcode-svg";
import ViewShot from "react-native-view-shot";
import * as MediaLibrary from "expo-media-library";
import * as Clipboard from "expo-clipboard";

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
  id_payment_method : string;
  title : string;
  image_logo : string;
  image_qr : string;
}

export default function CheckOutBCATransferScreen() {
  const router = useRouter();
  const navigation = useNavigation();

  const vaNumber = "88081234567890";

  const copyVA = async () => {
    await Clipboard.setStringAsync(vaNumber);

    Alert.alert("Copied", "Virtual Account copied successfully");



      //------------------------------------------------------
      //Sementara biar bisa keliatan Screen Payment sukses
      // router.replace('/(tabs)/(member)/check_out_payment_success')
      //------------------------------------------------------
  };

  // GET DATA
  // Accesses both route params ([id]) and query params (?name=John)
  const [items, setItems] = useState<ItemsData | null>(null);
  const [users, setUsers] = useState<UsersData | null>(null);
  const [paymentMethodItems, setPaymentMethodItems] = useState<PaymentData | null>(null);
  const [loading, setLoading] = useState(true);
  const { accessToken, id_user, id_membership_plan, membership_date, paymentMethod, id_transaction } = useGlobalSearchParams();
  console.log(id_user);
  console.log(id_membership_plan);
  console.log(membership_date);
  console.log(paymentMethod);
  console.log(id_transaction);

  useEffect(() => {
      fetchDataUser();
      fetchDataMembershipPlans();
      fetchDataPaymentMethod();
      // fetchDataPaymentStatus();
      // CheckOutPayment();
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

  const fetchDataMembershipPlans = async () => {
    try {
      // console.log(accessToken);
      const responseUser = await fetch(`${apiURL}/membership/plans/${id_membership_plan}`, {
      method: 'GET',
      headers: {
        'authorization': `Bearer ${accessToken}`, // Pass JWT token to backend
        'Content-Type': 'application/json',
      }
    });
      const dataMembershipPlans = await responseUser.json();
      setItems(dataMembershipPlans);
      console.log(dataMembershipPlans);
    } catch (error) {
      console.error('Error fetching list data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDataPaymentMethod = async () => {
    try {
      // console.log(accessToken);
      const responsPayment = await fetch(`${apiURL}/payment/method/${paymentMethod}`, {
      method: 'GET',
      headers: {
        'authorization': `Bearer ${accessToken}`, // Pass JWT token to backend
        'Content-Type': 'application/json',
      }
    });
      const dataPaymentMethod = await responsPayment.json();
      setPaymentMethodItems(dataPaymentMethod);
      console.log(dataPaymentMethod);
    } catch (error) {
      console.error('Error fetching list data:', error);
    } finally {
      setLoading(false);
    }
  };

  // const fetchDataPaymentStatus = async () => {
  //   try {
  //     // console.log(accessToken);
  //     const responsPayment = await fetch(`${apiURL}/payment/status/${paymentMethod}`, {
  //     method: 'GET',
  //     headers: {
  //       'authorization': `Bearer ${accessToken}`, // Pass JWT token to backend
  //       'Content-Type': 'application/json',
  //     }
  //   });
  //     const dataPaymentMethod = await responsPayment.json();
  //     setPaymentStatusItems(dataPaymentMethod);
  //     console.log(dataPaymentMethod);
  //   } catch (error) {
  //     console.error('Error fetching list data:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  
  const CheckOutPayment = () => {
      fetch(`${apiURL}/payment/checkout`, {
        method: 'POST',
        headers: {
          // authorization: "Bearer YOUR_KEY",
          'authorization': `Bearer ${accessToken}`, // Pass JWT token to backend
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_user, id_membership_plan, id_payment_method:paymentMethodItems?.id_payment_method, id_transaction, id_payment_status :1, date: membership_date }),
      })
        .then(response => response.json())
        .then(data => {
          router.replace({
            pathname: '/(tabs)/(member)/check_out_payment_success',
            params: { paymentMethod, id_transaction, price: items?.price, membership_date }
            // params: { accessToken: data.session.access_token }
          });
        })
        .catch(error => {
          console.error('Error:', error);
        });
  };
  
  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(JSON.stringify(id_transaction));
    Alert.alert("Sukses", "ID Transaksi berhasil disalin!");
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#E82528" />

      {/* HEADER */}
      <LinearGradient
        colors={["#E82528", "#9A0006"]}
        style={styles.header}
      >
        {/* <TouchableOpacity style={styles.backButton} onPress={() => router.replace('/(tabs)/(member)/check_out_payment_method')}> */}
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={22} color="#fff"/>
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Check Out</Text>

        <View style={{ width: 40 }} />
      </LinearGradient>


      <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 120 }}
            >
                <View style={styles.content}>
                    {/* CARD */}
                    <View style={styles.card}>
                      <View style={styles.logoContainer}>
                        <Image
                          source={require('../../../assets/payment/logo_BCA.png')}
                          style={styles.logo}
                        />
                      </View>
                    
                      <Text style={styles.titleTransfer}>
                        Complete Your Payment
                      </Text>
                      {items && (
                      <Text style={styles.amountTransfer}>
                        Rp. {items.price}
                      </Text>
                      )}
                      <View style={styles.divider} />
            
                      {/* DETAIL */}
                      <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Payment Method</Text>
                        <Text style={styles.detailValue}>{paymentMethod}</Text>
                      </View>

                      <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>ID Transaction</Text>
                        {/* <Text style={styles.detailValue}>{id_transaction}</Text> */}
                        <TouchableOpacity onPress={copyToClipboard} style={styles.touchable}>
                          <Text style={styles.detailValue} numberOfLines={1} ellipsizeMode="tail"> {id_transaction}</Text>
                        </TouchableOpacity>
                      </View>

                      <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Status</Text>
                        <View style={styles.statusBadge}>
                          <Text style={styles.statusText}>Pending</Text>
                        </View>
                      </View>
                      <View style={styles.divider} />

                      {/* VA NUMBER */}
                      <Text style={styles.labelTransfer}>
                        Virtual Account Number
                      </Text>
            
                      <View style={styles.vaContainerTransfer}>
                        <Text style={styles.vaNumberTransfer}>
                          {vaNumber}
                        </Text>
            
                        <TouchableOpacity
                          style={styles.copyButtonTransfer}
                          onPress={copyVA}
                        >
                          <Ionicons
                            name="copy-outline"
                            size={18}
                            color="#005BAC"
                          />
            
                          <Text style={styles.copyTextTransfer}>
                            Copy
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>

                    {/* INSTRUCTION */}
                    <View style={styles.instructionCard}>
                      <Text style={styles.instructionTitle}>
                        Payment Instructions
                      </Text>
            
                      <Text style={styles.instructionstep}>
                        1. Open BCA Mobile / ATM BCA
                      </Text>
            
                      <Text style={styles.instructionstep}>
                        2. Choose Transfer → Virtual Account
                      </Text>
            
                      <Text style={styles.instructionstep}>
                        3. Input Virtual Account Number
                      </Text>
            
                      <Text style={styles.instructionstep}>
                        4. Confirm payment details
                      </Text>
            
                      <Text style={styles.instructionstep}>
                        5. Complete payment
                      </Text>
                    </View>

                    <TouchableOpacity activeOpacity={0.8} onPress={CheckOutPayment}>
                      <LinearGradient
                          colors={["#E82528", "#9A0006"]}
                          start={{ x: 0, y: 0 }}
                          end={{ x: 0, y: 1 }}
                          style={styles.buttonSaveQR}
                        >
                        <Text style={styles.buttonTextSaveQR}>Confirmation Payment</Text>
                      </LinearGradient>
                    </TouchableOpacity>
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

  
/* ===== HEADER CENTER ===== */
  card: {
    backgroundColor: "#FFF",
    borderRadius: 24,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },

  instructionCard: {
    backgroundColor: "#FFF",
    borderRadius: 24,
    padding: 20,
    marginTop: 20,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },

  instructionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111",
    marginBottom: 14,
  },
  instructionstep: {
    fontSize: 14,
    color: "#555",
    marginBottom: 12,
    lineHeight: 22,
  },

  
// ======== PAYMENT ========
  logoContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  logo: {
    width: 150,
    height: 50,
  },
  titleTransfer: {
    textAlign: "center",
    fontSize: 16,
    color: "#555",
    marginTop: 16,
  },
  amountTransfer: {
    textAlign: "center",
    fontSize: 34,
    fontWeight: "800",
    color: "#111",
    marginTop: 8,
  },
  labelTransfer: {
    color: "#666",
    marginBottom: 10,
    fontSize: 14,
  },

  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    alignItems: "center",
  },
  detailLabel: {
    color: "#777",
    fontSize: 14,
  },
  detailValue: {
    color: "#111",
    fontSize: 14,
    fontWeight: "600",
  },
   touchable: {
    flexShrink: 1, // Membantu pembungkus tombol menyusut sesuai sisa layar
    maxWidth: '50%'
  },
  statusBadge: {
    backgroundColor: "#FFF3D6",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    color: "#E8A100",
    fontWeight: "700",
    fontSize: 12,
  },

  vaContainerTransfer: {
    backgroundColor: "#F5F7FA",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  vaNumberTransfer: {
    fontSize: 20,
    fontWeight: "800",
    color: "#111",
  },
  copyButtonTransfer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  copyTextTransfer: {
    color: "#005BAC",
    fontWeight: "700",
  },

  buttonSaveQR: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 50,
    backgroundColor: "#E31E24",
    paddingHorizontal: 30,
    paddingVertical: 14,
    borderRadius: 14,
  },
  buttonTextSaveQR: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});