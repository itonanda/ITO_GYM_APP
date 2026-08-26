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
  Linking,
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

// ========== DATA ==========
const coachData = [
  {
    id: '1',
    name: 'Coach Bahlil',
    role: 'Personal Trainer',
    phone: '6285211122201',
    online: true,
    avatar: 'https://www.libm.co.uk/wp-content/uploads/2024/12/gym-instructor.png',
  },
  {
    id: '2',
    name: 'Coach Pigai',
    role: 'Nutrition Coach',
    phone: '628122211101',
    online: true,
    avatar: 'https://www.ufcgym.com/images/coaching/Personal_Training_Image.webp',
  },
  {
    id: '3',
    name: 'Customer Support',
    role: 'Membership Support',
    phone: '6281234567892',
    online: false,
    avatar: 'https://hips.hearstapps.com/hmg-prod/images/mh-trainer-2-1533576998.png',
  },
];


export default function ChatScreen() {
  const router = useRouter();
  
  const openWhatsApp = async (
    phone: string,
    name: string
  ) => {
    const message = `Hello ${name}, I need assistance.`;

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(
      message
    )}`;

    const supported = await Linking.canOpenURL(url);

    if (supported) {
      Linking.openURL(url);
    } else {
      Alert.alert(
        'WhatsApp Not Found',
        'Please install WhatsApp first.'
      );
    }
  };

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={() =>
        openWhatsApp(item.phone, item.name)
      }
    >
      <View>
        <Image
          source={{ uri: item.avatar }}
          style={styles.avatar}
        />

        {item.online && (
          <View style={styles.onlineDot} />
        )}
      </View>

      <View style={styles.info}>
        <Text style={styles.name}>
          {item.name}
        </Text>

        <Text style={styles.role}>
          {item.role}
        </Text>

        <View style={styles.statusRow}>
          <View
            style={[
              styles.statusIndicator,
              {
                backgroundColor: item.online
                  ? '#22C55E'
                  : '#6B7280',
              },
            ]}
          />

          <Text style={styles.statusText}>
            {item.online
              ? 'Online Now'
              : 'Offline'}
          </Text>
        </View>
      </View>

      <View style={styles.actionButton}>
        <Ionicons
          name="logo-whatsapp"
          size={24}
          color="#25D366"
        />
      </View>
    </TouchableOpacity>
  );


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
        
        <Text style={styles.headerTitle}>Chat</Text>

        <View style={{ width: 40 }} />
      </LinearGradient>
                
      <View style={styles.content}>
        <Text style={{fontSize: 14, color:'#373738'}}>
          Need Assistance?
        </Text>

        <Text style={{fontSize: 22, color:'#373738', fontWeight: 'bold', marginTop: 5}}>
          Contact Coach
        </Text>

        <Text style={{fontSize: 10, color:'#373738', lineHeight: 22}}>
          Get help directly from our trainers
          and support team.
        </Text>

          {/* Quick Action */}
        <View style={styles.quickContainer}>
          <TouchableOpacity
            style={styles.quickCard}
            onPress={() => Linking.openURL(`tel:081234567890`)}
          >
            <Ionicons name="call-outline" size={24} color="#fff"/>
            <Text style={styles.quickText}>Call</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickCard}
            onPress={() => Linking.openURL('sms:081234567890?body=Hello DOMS Fitness Club')}
          >
            <Ionicons name="mail" size={24} color="#fff"/>
            <Text style={styles.quickText}>SMS</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickCard}
            onPress={() => Linking.openURL('mailto:admin@doms.com')}
          >
            <Ionicons name="mail-outline" size={24} color="#fff"
            />
            <Text style={styles.quickText}>Email</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Available Contacts</Text>
      
      <FlatList
        data={coachData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          paddingBottom: 120,
        }}
        showsVerticalScrollIndicator={false}
      />


      {/* Floating WhatsApp */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() =>
          openWhatsApp(
            '628100011101',
            'Customer Support'
          )
        }
      >
        <Ionicons
          name="logo-whatsapp"
          size={30}
          color="#fff"
        />
      </TouchableOpacity>
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
    //flex: 1,
    padding: 20,
  },

// ===== Chat Screen =====
  quickContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  quickCard: {
    flex: 1,
    backgroundColor: '#9A0006',
    marginHorizontal: 5,
    borderRadius: 18,
    alignItems: 'center',
    paddingVertical: 18,
  },
  quickText: {
    color: '#FFF',
    marginTop: 8,
    fontSize: 13,
  },

  sectionTitle: {
    color: '#000',
    fontSize: 18,
    fontWeight: '700',
    marginHorizontal: 20,
    marginTop: 25,
    marginBottom: 15,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8d8686',
    marginHorizontal: 20,
    marginTop: 15,
    padding: 15,
    borderRadius: 22,
  },
  avatar: {
    width: 65,
    height: 65,
    borderRadius: 32.5,
  },
  onlineDot: {
    position: 'absolute',
    right: 2,
    bottom: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#22C55E',
    borderWidth: 2,
    borderColor: '#1B1F28',
  },
  info: {
    flex: 1,
    marginLeft: 15,
  },
  name: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
  role: {
    color: '#323436',
    marginTop: 4,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    color: '#d4d7de',
    marginLeft: 6,
    fontSize: 12,
  },

  actionButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#d3d4d7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fab: {
    position: 'absolute',
    right: 25,
    bottom: 30,
    width: 65,
    height: 65,
    borderRadius: 32.5,
    backgroundColor: '#25D366',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    marginBottom: 50,
  },
});