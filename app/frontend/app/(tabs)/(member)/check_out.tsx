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
const vatitlenumber = "1";
const vatitleunit = "Month Unlimited";
const vaprice = "900.000";

export default function CheckOutScreen() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef(null);
  const [selected, setSelected] = useState("1");

  
  // STATE FORM
  const [Voucher, setVoucher] = useState('');
  const [OrderSummary, setOrderSummary] = useState('');

  // DATE
  const [MembershipStartDate, setMembershipStartDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);
  
  // COUNTRY
  const [countryCode, setCountryCode] = useState<CountryCode>('ID');
  const [countryCodes, setCountryCodes] = useState<CountryCode[]>(['ID']);
  
  // FORMAT DATE
  const formatDate = (date: Date) =>
    `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1)
    .toString()
    .padStart(2, '0')}/${date.getFullYear()}`;

  // FORMAT 1 Month
  const OneMonth = new Date();
    OneMonth.setMonth(OneMonth.getMonth() + 1);
    console.log(OneMonth);

  const onChangeDate = (event: any, selectedDate?: Date) => {
      setShowDate(Platform.OS === 'ios');
      if (selectedDate) setMembershipStartDate(selectedDate);
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
        <TouchableOpacity style={styles.backButton} onPress={() => router.replace('/dashboard')}>
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
                    <View style={styles.classCheckOutRow}>
                      <View style={styles.classCheckOutPlan_V1}>
                          <Text style={styles.classTitleNumberCheckOut}>{vatitlenumber}</Text>
                      </View>
                      <View style={styles.classCheckOutPlan_V2}>
                          <Text style={styles.classTitleCheckOut}>{vatitleunit}</Text>
                      </View>
                    </View>
                  </LinearGradient>
                </View>

                
                <View style={styles.headerCheckOut}>
                {/* ================= HEADER TOP================= */}
                <View style={styles.headerCheckOut}>
                    {/* Membership Start Date */}
                    <Text style={styles.labelCheckOut}>Membership Start Date</Text>
                    <TouchableOpacity style={styles.headerMemberDate}>
                            <TouchableOpacity
                                style={styles.MemberDate_V1}
                                onPress={() => setShowDate(true)}
                                >
                                    <Text>{formatDate(MembershipStartDate)}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.MemberDate_V2}
                                onPress={() => setShowDate(true)}
                                >
                                    <Ionicons name={'calendar-outline'} size={23} />
                            </TouchableOpacity>
                    </TouchableOpacity> 
                    {showDate && (
                    <DateTimePicker
                        value={MembershipStartDate}
                        mode="date"
                        display="default"
                        onChange={onChangeDate}
                        maximumDate={OneMonth}
                        minimumDate={new Date()}
                    />
                    )}
                        
                    
                    {/* Voucher */}
                    <Text style={styles.labelCheckOut}>Voucher</Text>
                    <TextInput
                    style={styles.inputCheckOut}
                    placeholder="Voucher"
                    value={Voucher}
                    //onChangeText={setVoucher}
                    onChangeText={(text) => {
                        setVoucher(text);
                    }}
                    />

                    {/* Order summary */}
                    <Text style={styles.labelCheckOut}>Order Summary</Text>
                    <TextInput
                    style={styles.inputCheckOut}
                    placeholder="Order Summary"
                    value={OrderSummary}
                    //onChangeText={setOrderSummary}
                    onChangeText={(text) => {
                        setOrderSummary(text);
                    }}
                    />
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
        <View style={styles.headerBottomRowCheckOut}>
          {/* PAGE */}
          <View>
            <Text style={{fontSize:16, color:'#000', fontWeight:'bold'}}>
                Total Price
            </Text>
          </View>                
          <View>
            <View>
              <Text style={{fontSize:16, color:'#000', fontWeight:'bold'}}>
                  Rp. {vaprice}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.headerBottomRowCheckOutNext}>
          {/* BUTTON */}
          <TouchableOpacity activeOpacity={0.8} onPress={() => router.replace('/check_out_payment_method')}>
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

  
/* ===== Detail Input Check Out ===== */
  headerCheckOut: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    //marginTop: 20,
    marginBottom: 20,
    paddingVertical: 20,
  },

  classCheckOutRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    //borderWidth: 1,
    borderRadius: 12,
    //borderColor: '#000',
    //backgroundColor: '#E4E9E4',
    //margin: 20,
    //marginTop: 10, 
    //marginBottom: 20,
  },
  classCheckOutPlan_V1: {
    //flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    marginHorizontal: 2,
    backgroundColor: '#E4E9E4',
    height: 70,
    width: 80,
    justifyContent: 'center',
    textAlign: 'center',
    borderWidth: 1,
    borderRadius: 12,
    borderColor: '#000',
  },
   classCheckOutPlan_V2: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    marginHorizontal: 2,
    //backgroundColor: '#E4E9E4',
    height: 70,
    //width: 230,
    borderRadius: 16,
    justifyContent: 'center',
    textAlign: 'center',
  },
  classTitleNumberCheckOut: {
    fontSize: 30,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignContent: 'center',
    textAlign: 'center',
  },
  classTitleCheckOut: {
    fontSize: 16,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignContent: 'center',
    textAlign: 'center',
  },

  labelCheckOut: {
    marginBottom: 6,
    marginTop: 12,
    fontWeight: '500',
  },
  inputCheckOut: {
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 12,
    padding: 14,
    backgroundColor: '#E4E9E4',
  },
  
  headerMemberDate: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: "#E4E9E4",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#eee',
  },
  MemberDate_V1: {
    flex: 1,
    backgroundColor: '#E4E9E4',
    borderWidth: 1,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    borderColor: '#E4E9E4',
    padding: 14,
  },
  MemberDate_V2: {
    backgroundColor: '#E4E9E4',
    borderWidth: 1,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    borderColor: '#E4E9E4',
    padding: 14,
    alignItems: 'center',
    justifyContent: 'center',
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
  headerBottomRowCheckOut: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 2,
    marginTop: 20,
    gap: 80,
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