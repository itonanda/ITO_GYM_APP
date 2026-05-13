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
import QRCode from "react-native-qrcode-svg";
import ViewShot from "react-native-view-shot";
import * as MediaLibrary from "expo-media-library";

const { width } = Dimensions.get('window');


export default function CheckOutGopayScreen() {
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

  //Scan QR
  const viewShotRef = useRef<any>(null);

  const saveQRCode = async () => {
    try {
      // izin akses galeri
      const permission = await MediaLibrary.requestPermissionsAsync();

      if (!permission.granted) {
        Alert.alert("Izin ditolak", "Harus izinkan akses galeri");
        return;
      }

      // capture QR jadi image
      const uri = await viewShotRef.current.capture();

      // save ke gallery
      await MediaLibrary.saveToLibraryAsync(uri);

      Alert.alert("Berhasil", "QR berhasil disimpan ke galeri");
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Gagal menyimpan QR");
    }
  };


  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#E82528" />

      {/* HEADER */}
      <LinearGradient
        colors={["#E82528", "#9A0006"]}
        style={styles.header}
      >
        <TouchableOpacity style={styles.backButton} onPress={() => router.replace('/(tabs)/CheckPaymentMethod')}>
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
                          source={require('../../assets/payment/logo_Gopay.png')}
                          style={styles.logo}
                        />
                      </View>

                      <Text style={styles.payTitle}>Complete Your Payment</Text>

                      <Text style={styles.amount}>Rp 900.000</Text>

                      <View style={styles.divider} />

                      {/* DETAIL */}
                      <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Payment Method</Text>
                        <Text style={styles.detailValue}>Gopay</Text>
                      </View>

                      {/*<View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Transaction ID</Text>
                        <Text style={styles.detailValue}>TRX982374</Text>
                      </View>

                      <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Status</Text>
                        <View style={styles.statusBadge}>
                          <Text style={styles.statusText}>Waiting Payment</Text>
                        </View>
                      </View>*/}
                    </View>

                    {/* INSTRUCTION */}
                    <View style={styles.instructionCard}>
                      <ViewShot
                        ref={viewShotRef}
                        options={{
                          format: "png",
                          quality: 1,
                        }}
                      >
                        <View style={styles.qrWrapper}>
                            <Image
                              source={require('../../assets/payment/payment_Gopay.png')}
                              style={styles.qrImage}
                            />
                            {/*<Image
                                source={{
                                uri: "https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=PaymentQRIS",
                                }}
                                style={styles.qrImage}
                            />*/}
                        </View>

                        <Text style={styles.description}>
                            Open Gojek app and scan this QR code to complete payment
                        </Text>
                      </ViewShot>
                      
                      <TouchableOpacity activeOpacity={0.8} onPress={saveQRCode}>
                        <LinearGradient
                            colors={["#E82528", "#9A0006"]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 0, y: 1 }}
                            style={styles.buttonSaveQR}
                          >
                          <Text style={styles.buttonTextSaveQR}>Save QR</Text>
                        </LinearGradient>
                      </TouchableOpacity>
                                
                      {/*<View style={styles.infoContainer}>
                          <View style={styles.infoItem}>
                              <Ionicons
                              name="shield-checkmark"
                              size={22}
                              color="#16A34A"
                              />
              
                              <Text style={styles.infoText}>
                              Secure Payment
                              </Text>
                          </View>
              
                          <View style={styles.infoItem}>
                              <Ionicons
                              name="time-outline"
                              size={22}
                              color="#E31E24"
                              />
              
                              <Text style={styles.infoText}>
                              Valid 15 Minutes
                              </Text>
                          </View>
                      </View>*/}
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
  logoContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  logo: {
    width: 150,
    height: 50,
  },
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
  detailValue: {
    color: "#111",
    fontSize: 14,
    fontWeight: "600",
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


// ======== SCAN QR PAYMENT ========
  qrWrapper: {
    width: 300,
    height: 300,
    borderRadius: 28,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 25,
  },
  qrImage: {
    width: 300,
    height: 300,
    borderRadius: 16,
  }, 
  description: {
    fontSize: 15,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  infoContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 16,
  },
  infoText: {
    marginLeft: 8,
    fontSize: 8,
    fontWeight: "600",
    color: "#111827",
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