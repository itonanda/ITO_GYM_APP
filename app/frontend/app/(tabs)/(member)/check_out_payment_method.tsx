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


// =========== DATA ===========
const paymentMethods = [
  {
    id: "1",
    title: "QRIS",
    icon: "qr-code-outline",
  },
  {
    id: "2",
    title: "Gopay",
    icon: "wallet-outline",
  },
  {
    id: "3",
    title: "BCA Transfer",
    icon: "card-outline",
  },
];


export default function CheckOutPaymentMethodScreen() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef(null);
  const [selected, setSelected] = useState("1");
  //const [selected, setSelected] = useState<number | null>(null);
  
  const handleNext = () => {
    const selectedMethod = paymentMethods.find(
      (item) => item.id === selected
    );

    Alert.alert(
      "Payment Selected",
      `You selected ${selectedMethod?.title}`,
      [
        {
          text: "OK",
          onPress: () => {
            // pindah screen sesuai payment
            if (selectedMethod?.title === "QRIS") {
              router.push("/(tabs)/(member)/check_out_qr");
            } else if (selectedMethod?.title === "Gopay") {
              router.push("/(tabs)/(member)/check_out_gopay");
            } else if (selectedMethod?.title === "BCA Transfer") {
              router.push("/(tabs)/(member)/check_out_bca");
            }
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
      <LinearGradient
        colors={["#E82528", "#9A0006"]}
        style={styles.header}
      >
        <TouchableOpacity style={styles.backButton} onPress={() => router.replace('/check_out')}>
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
                  <LinearGradient
                    colors={["#E4E9E4", "#cccfcc"]}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 0, y: 0 }}
                    style={styles.card}
                  >
                    <Text style={styles.payTitle}>Complete Your Payment</Text>
                    <Text style={styles.amount}>Rp 900.000</Text>

                    <View style={styles.divider} />

                    {/* DETAIL */}
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Final payment deadline</Text>
                      <View style={styles.statusBadge}>
                        <Text style={styles.statusText}>27 Juni 2027</Text>
                      </View>
                    </View>
                  </LinearGradient>
                </View>
              
                <View style={styles.headerTopCheckOut}>
                    {/* ================= HEADER TOP================= */}
                    <Text style={{fontSize:16, fontWeight:'bold', marginBottom:10}}>Payment Metohd</Text>
                </View>  
                
                {/* ================= Payment Metohd ================= */}
                <View style={styles.headerPaymentMetohd}>
                    <View style={styles.cardPaymentMetohd}>
                          {paymentMethods.map((item) => {
                          const active = selected === item.id;
              
                          return (
                              <TouchableOpacity
                              key={item.id}
                              activeOpacity={0.8}
                              style={[
                                  styles.paymentItemPaymentMetohd,
                                  active && styles.paymentItemActivePaymentMetohd,
                              ]}
                              onPress={() => setSelected(item.id)}
                              //onPress={() => router.replace('/(tabs)/CheckOutQR')}
                              >
                                  <View style={styles.leftContentPaymentMetohd}>
                                      <View
                                      style={[
                                          styles.iconContainerPaymentMetohd,
                                          active && styles.iconContainerActivePaymentMetohd,
                                      ]}
                                      >
                                      <Ionicons
                                          name={item.icon as any}
                                          size={22}
                                          color={active ? "#FFFFFF" : "#E31E24"}
                                      />
                                      </View>
                  
                                      <Text
                                      style={[
                                          styles.paymentTextPaymentMetohd,
                                          active && styles.paymentTextActivePaymentMetohd,
                                      ]}
                                      >
                                      {item.title}
                                      </Text>
                                  </View>
                  
                                  <View
                                      style={[
                                      styles.radioOuterPaymentMetohd,
                                      active && styles.radioOuterActivePaymentMetohd,
                                      ]}
                                  >
                                      {active && <View style={styles.radioInnerPaymentMetohd} />}
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


   
// ======== PAYMENT ========
  payTitle: {
    textAlign: "center",
    fontSize: 16,
    color: "#555",
    marginTop: 10,
  },
  amount: {
    textAlign: "center",
    fontSize: 34,
    fontWeight: "800",
    color: "#111",
    marginTop: 8,
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


  /* ===== HEADER TOP CHECK OUT ===== */
  headerTopCheckOut: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    marginBottom: -20,
  },
 

  /* ===== Payment Metohd ===== */
  headerPaymentMetohd: {
    borderColor: '#fff',
    backgroundColor: "#fff",
    borderWidth: 1,
    borderRadius: 20,
    marginRight: 15,
    marginLeft: 15,
    marginBottom: 100,
  },
  cardPaymentMetohd: {
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
  paymentItemPaymentMetohd: {
    height: 75,
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
  paymentItemActivePaymentMetohd: {
    backgroundColor: "#FFF1F1",
    borderColor: "#E31E24",
  },
  leftContentPaymentMetohd: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainerPaymentMetohd: {
    width: 45,
    height: 45,
    borderRadius: 14,
    backgroundColor: "#FFE5E5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  iconContainerActivePaymentMetohd: {
    backgroundColor: "#E31E24",
  },
  paymentTextPaymentMetohd: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
  },
  paymentTextActivePaymentMetohd: {
    color: "#E31E24",
  },
  radioOuterPaymentMetohd: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 2,
    borderColor: "#C7C7C7",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  radioOuterActivePaymentMetohd: {
    borderColor: "#E31E24",
  },
  radioInnerPaymentMetohd: {
    width: 13,
    height: 13,
    borderRadius: 7,
    backgroundColor: "#E31E24",
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