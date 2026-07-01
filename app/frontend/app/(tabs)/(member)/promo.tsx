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
import * as Clipboard from "expo-clipboard";

const { width } = Dimensions.get('window');

// ========== DATA ==========
const promoData = [
  {
    id: 1,
    highlight: true,
    title: '2 Month Unlimited',
    subtitle: 'Valid until 30 June',
    discount: '20%',
  },
  {
    id: 2,
    highlight: true,
    title: '3 Month Unlimited',
    subtitle: 'Valid until 30 June',
    discount: '30%',
  },
  {
    id: 3,
    highlight: true,
    title: '6 Month Unlimited',
    subtitle: 'Save up to 50%',
    discount: '50%',
  },
];

const voucherData = [
  {
    id: 1,
    highlight: true,
    titleVoucher: 'DOMS50',
    subtitle: 'Extra 50% discount',
  },
  {
    id: 2,
    highlight: true,
    titleVoucher: 'DOMS30',
    subtitle: 'Extra 30% discount',
  },
  {
    id: 3,
    highlight: true,
    titleVoucher: 'DOMS10',
    subtitle: 'Extra 10% discount',
  },
];



export default function PromoScreen() {
  const router = useRouter();
  const [activeIndexPromoData, setActiveIndexPromoData] = useState(0);
  const flatListRefPromoData = useRef(null);
  const [activeIndexVoucherData, setActiveIndexVoucherData] = useState(0);
  const flatListRefVoucherData = useRef(null);

  const onViewableItemsChangedPromoData = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index !== null) {
        setActiveIndexPromoData(viewableItems[0].index);
      }
    }
  ).current;

  const viewConfigPromoData = {
    viewAreaCoveragePercentThreshold: 50,
  };

  const onViewableItemsChangedVoucherData = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index !== null) {
        setActiveIndexVoucherData(viewableItems[0].index);
      }
    }
  ).current;

  const viewConfigVoucherData = {
    viewAreaCoveragePercentThreshold: 50,
  };

  const copyTitleVoucher = async (titleVoucher: string) => {
    await Clipboard.setStringAsync(titleVoucher);

    Alert.alert('Copied', `${titleVoucher}`);
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
        
        <Text style={styles.headerTitle}>Special Promo</Text>

        <View style={{ width: 40 }} />
      </LinearGradient>


      <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 120 }}
            >
                <View style={styles.content}>
                    <Text style={{fontSize:12, marginLeft: 20, color:'#8B949E'}}>
                        Exclusive offers for your fitness journey
                    </Text>

                    {/* Hero Banner */}
                    <LinearGradient
                        colors={['#FF7B00', '#E82528']}
                        style={styles.heroBanner}
                    >
                        <Text style={styles.heroLabel}>
                        LIMITED OFFER
                        </Text>

                        <Text style={styles.heroTitle}>
                        Get 50% OFF
                        </Text>

                        <Text style={styles.heroDesc}>
                        Annual Membership Package
                        </Text>

                        <TouchableOpacity style={styles.heroButton}>
                        <Text style={styles.heroButtonText}>
                            Claim Now
                        </Text>
                        </TouchableOpacity>
                    </LinearGradient>

 
                    {/* ================= Promo Cards ================= */}
                    {promoData.some(item => item.highlight) && (
                        <>
                        <Text style={styles.sectionTitle}>Available Promos</Text>
            
                            <FlatList
                                data={promoData}
                                scrollEnabled={false}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={({ item }) => {
                                if (!item.highlight) return null;
                
                                return (
                                    <TouchableOpacity key={item.id} style={styles.card} activeOpacity={1} >
                                        <View>
                                            <Text style={styles.cardTitle}>
                                            {item.title}
                                            </Text>
                                            <Text style={styles.cardSubtitle}>
                                            {item.subtitle}
                                            </Text>
                                        </View>
                                        <View style={styles.discountBadge}>
                                            <Text style={styles.discountText}>
                                            {item.discount}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                );
                                }}
                            />
                        </>
                    )}


                    {/* ================= Voucher ================= */}
                    {voucherData.some(item => item.highlight) && (
                        <>
                        <Text style={styles.sectionTitle}>Voucher Code</Text>
            
                            <FlatList
                                data={voucherData}
                                scrollEnabled={false}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={({ item }) => {
                                if (!item.highlight) return null;
                
                                return (
                                    <View key={item.id} style={styles.voucherCard}>
                                        <View>
                                            <Text style={styles.voucherCode}>
                                                {item.titleVoucher}
                                            </Text>
                                            <Text style={styles.voucherInfo}>
                                                {item.subtitle}
                                            </Text>
                                        </View>
                                        <TouchableOpacity key={item.id} style={styles.copyBtn} activeOpacity={1} onPress={() => copyTitleVoucher(item.titleVoucher)}>
                                            <Ionicons
                                                name="copy-outline"
                                                size={18}
                                                color="#fff"
                                            />
                                        </TouchableOpacity>
                                    </View>
                                );
                                }}
                            />
                        </>
                    )}
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

// ====== Promo Screen ======
  heroBanner: {
    //marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 30,
    padding: 28,
  },
  heroLabel: {
    color: '#FFE5D0',
    fontWeight: '600',
  },
  heroTitle: {
    color: '#fff',
    fontSize: 34,
    fontWeight: '800',
    marginTop: 8,
  },
  heroDesc: {
    color: '#fff',
    marginTop: 5,
  },
  heroButton: {
    marginTop: 20,
    backgroundColor: '#fff',
    alignSelf: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 15,
  },
  heroButtonText: {
    fontWeight: '700',
  },


  sectionTitle: {
    color: '#000',
    fontSize: 18,
    fontWeight: '700',
    marginTop: 30,
    marginBottom: 15,
    //paddingHorizontal: 20,
  },
  card: {
    backgroundColor: '#161B22',
    //marginHorizontal: 20,
    marginBottom: 15,
    borderRadius: 24,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  cardSubtitle: {
    color: '#8B949E',
    marginTop: 5,
  },
  discountBadge: {
    backgroundColor: '#FF7B00',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 15,
  },
  discountText: {
    color: '#fff',
    fontWeight: '700',
  },

  voucherCard: {
    //marginHorizontal: 20,
    backgroundColor: '#161B22',
    marginBottom: 15,
    borderRadius: 24,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  voucherCode: {
    color: '#00E676',
    fontSize: 24,
    fontWeight: '700',
  },
  voucherInfo: {
    color: '#8B949E',
    marginTop: 4,
  },
  copyBtn: {
    backgroundColor: '#FF7B00',
    padding: 12,
    borderRadius: 14,
  },
});