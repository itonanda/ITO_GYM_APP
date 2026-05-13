//-------------------------
// Update 2026-05-12
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
import { LinearGradient } from "expo-linear-gradient";
import QRCode from "react-native-qrcode-svg";
import ViewShot from "react-native-view-shot";
import * as MediaLibrary from "expo-media-library";
import * as Clipboard from "expo-clipboard";

const { width } = Dimensions.get('window');


export default function CheckOutBCATransferScreen() {
  const router = useRouter();

  const vaNumber = "88081234567890";

  const copyVA = async () => {
    await Clipboard.setStringAsync(vaNumber);

    Alert.alert("Copied", "Virtual Account copied successfully");
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
                          source={require('../../assets/payment/logo_BCA.png')}
                          style={styles.logo}
                        />
                      </View>
                    
                      <Text style={styles.titleTransfer}>
                        Complete Your Payment
                      </Text>
            
                      <Text style={styles.amountTransfer}>
                        Rp 900.000
                      </Text>
            
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
});