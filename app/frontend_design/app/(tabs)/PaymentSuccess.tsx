//-------------------------
// Update 2026-05-18
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
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";


const { width } = Dimensions.get('window');

// =========== DATA ===========
const vaTransactionID = "#TRX2026";
const vaPaymentMethod = "Gopay";
const vaDate = "18 May 2026";
const vaprice = "900.000";
const vaStatus = "SUCCESS";


// DATE
const hari = [
  "Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"
];
const bulan = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];
// Today
const today = new Date();

const formatTanggal = (date: Date) => {
  const namaHari = hari[date.getDay()];
  const tanggal = date.getDate();
  const namaBulan = bulan[date.getMonth()];
  const tahun = date.getFullYear();

  return `${namaHari}, ${tanggal} ${namaBulan} ${tahun}`;
};

const downloadInvoice = async () => {
  try {
    const html = `
      <html>
      <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <style>

      *{
        margin:0;
        padding:0;
        box-sizing:border-box;
      }

      body{
        background:#FFFFFF;
        font-family: Arial, sans-serif;
        padding:30px 20px;
      }

      .wrapper{
        width:100%;
      }

      .topGlow{
        width:220px;
        height:220px;
        background:#22C55E;
        border-radius:999px;
        position:absolute;
        top:-80px;
        right:-80px;
        opacity:0.15;
      }

      .card{
        position:relative;
        overflow:hidden;
        background:linear-gradient(180deg,#ffffff,#ffffff);
        border-radius:35px;
        padding:35px 28px;
        border:1px solid rgba(255,255,255,0.08);
        box-shadow:0 15px 40px rgba(0,0,0,0.55);
      }

      .brand{
        text-align:center;
        color:#22C55E;
        font-size:18px;
        letter-spacing:4px;
        font-weight:bold;
        margin-bottom:35px;
      }

      .successCircle{
        width:130px;
        height:130px;
        margin:auto;
        border-radius:999px;
        background:rgba(34,197,94,0.12);
        border:5px solid #22C55E;
        display:flex;
        justify-content:center;
        align-items:center;
        box-shadow:0 0 40px rgba(34,197,94,0.35);
      }

      .check{
        color:#22C55E;
        font-size:70px;
        font-weight:bold;
      }

      .title{
        color:#22C55E;
        text-align:center;
        font-size:34px;
        font-weight:bold;
        margin-top:30px;
      }

      .subtitle{
        color:#94A3B8;
        text-align:center;
        font-size:15px;
        line-height:26px;
        margin-top:14px;
        padding:0 10px;
      }

      .amountBox{
        margin-top:35px;
        background:linear-gradient(90deg,#22C55E,#16A34A);
        padding:28px;
        border-radius:28px;
        text-align:center;
        box-shadow:0 10px 30px rgba(34,197,94,0.25);
      }

      .amountLabel{
        color:white;
        opacity:0.8;
        font-size:14px;
      }

      .amount{
        color:white;
        font-size:42px;
        font-weight:bold;
        margin-top:8px;
      }

      .divider{
        height:1px;
        background:rgba(255,255,255,0.08);
        margin:35px 0;
      }

      .row{
        display:flex;
        justify-content:space-between;
        align-items:center;
        margin-bottom:24px;
      }

      .label{
        color:#94A3B8;
        font-size:15px;
      }

      .value{
        color:black;
        font-size:15px;
        font-weight:bold;
      }

      .status{
        color:#22C55E;
        font-weight:bold;
      }

      .membership{
        margin-top:10px;
        background:rgba(255,255,255,0.04);
        border-radius:22px;
        padding:22px;
        border:1px solid rgba(255,255,255,0.05);
      }

      .membershipTitle{
        color:white;
        font-size:17px;
        font-weight:bold;
      }

      .membershipDesc{
        color:#94A3B8;
        margin-top:8px;
        line-height:24px;
        font-size:14px;
      }

      .footer{
        margin-top:35px;
        text-align:center;
        color:#64748B;
        font-size:13px;
        line-height:22px;
      }

      .badge{
        margin:auto;
        margin-top:30px;
        width:180px;
        text-align:center;
        padding:14px;
        border-radius:999px;
        background:rgba(34,197,94,0.12);
        border:1px solid rgba(34,197,94,0.25);
        color:#22C55E;
        font-weight:bold;
        letter-spacing:1px;
      }

      </style>
      </head>

      <body>

      <div class="wrapper">

        <div class="card">

          <div class="topGlow"></div>

          <div class="brand">
            DOMS
          </div>

          <div class="successCircle">
            <div class="check">✓</div>
          </div>

          <div class="title">
            Payment Successful
          </div>

          <div class="subtitle">
            Your membership has been activated successfully
          </div>

          <div class="amountBox">
            <div class="amountLabel">
              TOTAL PAYMENT
            </div>

            <div class="amount">
              Rp ${vaprice}
            </div>
          </div>

          <div class="divider"></div>

          <div class="row">
            <div class="label">Transaction ID</div>
            <div class="value">${vaTransactionID}</div>
          </div>

          <div class="row">
            <div class="label">Payment Method</div>
            <div class="value">${vaPaymentMethod}</div>
          </div>

          <div class="row">
            <div class="label">Date</div>
            <div class="value">${formatTanggal(today)}</div>
          </div>

          <div class="row">
            <div class="label">Status</div>
            <div class="status">${vaStatus}</div>
          </div>

          <div class="badge">
            MEMBERSHIP ACTIVE
          </div>

        </div>

      </div>

      </body>
      </html>
      `;

    // Generate PDF
    const { uri } = await Print.printToFileAsync({
      html,
    });

    // Share / Download ke HP
    await Sharing.shareAsync(uri);

  } catch (error) {
    Alert.alert("Error", "Failed download invoice");
  }
};


export default function PaymentSuccessScreen() {
  const router = useRouter();
  

  return (
    <LinearGradient
      colors={["#FFFFFF", "#FFFFFF", "#22C55E"]}
      style={styles.container}
    >
      <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 120 }}
      >
          <View style={styles.containerPayNotif}>
              <StatusBar barStyle="light-content" backgroundColor="#FFFFFF" />
              {/* Success Icon */}
              <View style={styles.iconContainerPayNotif}>
                <View style={styles.iconCirclePayNotif}>
                  <Ionicons name="checkmark-done" size={80} color="#22C55E" />
                </View>
              </View>

              {/* Title */}
              <Text style={styles.titlePayNotif}>Payment Successful</Text>

              <Text style={styles.subtitlePayNotif}>
                Your membership has been activated successfully
              </Text>

              {/* Card */}
              <View style={styles.cardPayNotif}>
                <View style={styles.rowPayNotif}>
                  <Text style={styles.labelPayNotif}>Order ID</Text>
                  <Text style={styles.valuePayNotif}>{vaTransactionID}</Text>
                </View>

                <View style={styles.rowPayNotif}>
                  <Text style={styles.labelPayNotif}>Payment Method</Text>
                  <Text style={styles.valuePayNotif}>{vaPaymentMethod}</Text>
                </View>

                <View style={styles.rowPayNotif}>
                  <Text style={styles.labelPayNotif}>Amount</Text>
                  <Text style={styles.amountPayNotif}>Rp {vaprice}</Text>
                </View>

                <View style={styles.rowPayNotif}>
                  <Text style={styles.labelPayNotif}>Date</Text>
                  <Text style={styles.valuePayNotif}>{formatTanggal(today)}</Text>
                </View>
              </View>

              {/* Buttons */}
              <TouchableOpacity style={styles.downloadButtonPayNotif} onPress={downloadInvoice}>
                <Ionicons name="download-outline" size={25} color="#fff" />
                <Text style={styles.downloadTextPayNotif}>Download Invoice</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.homeButtonPayNotif}
                onPress={() => router.replace('/(tabs)/MemberDashboard')}
              >
                <Text style={styles.homeTextPayNotif}>Back To Home</Text>
              </TouchableOpacity>
          </View>
      </ScrollView>
      
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
/* ===== HEADER TOP ===== */
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  containerPayNotif: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  iconContainerPayNotif: {
    marginBottom: 25,
  },
  iconCirclePayNotif: {
    width: 120,
    height: 120,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.08)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#22C55E",
  },
  titlePayNotif: {
    color: "#22C55E",
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitlePayNotif: {
    color: "#7c7d7e",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 35,
    paddingHorizontal: 20,
  },
  cardPayNotif: {
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.23)",
    borderRadius: 24,
    padding: 22,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.38)",
  },
  rowPayNotif: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18,
  },
  labelPayNotif: {
    color: "#7c7d7e",
    fontSize: 14,
  },
  valuePayNotif: {
    color: "#2c2c2d",
    fontSize: 14,
    fontWeight: "600",
  },
  amountPayNotif: {
    color: "#22C55E",
    fontSize: 16,
    fontWeight: "bold",
  },
  downloadButtonPayNotif: {
    width: "100%",
    height: 58,
    borderRadius: 18,
    backgroundColor: "#22C55E",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 18,
  },
  downloadTextPayNotif: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
  homeButtonPayNotif: {
    width: "100%",
    height: 58,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.78)",
    justifyContent: "center",
    alignItems: "center",
  },
  homeTextPayNotif: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});