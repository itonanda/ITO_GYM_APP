import React, { useEffect, useCallback, useState, useRef, useMemo } from 'react';
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
import { Ionicons, MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { ViewToken } from 'react-native';
import DateTimePicker from "@react-native-community/datetimepicker";
import CountryPicker, { CountryCode, Country } from 'react-native-country-picker-modal';
import { Link, useRouter, useGlobalSearchParams, useLocalSearchParams } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import { Background } from "@react-navigation/elements";
import { LinearGradient } from "expo-linear-gradient";


const { width } = Dimensions.get('window');

// ============ DATA ============
interface participantsItem {
  id: string;
  name: string;
  email: string;
  avatar: string;
  rank?: number;
}

const participantsData: participantsItem[] = [
  {
    id: "1",
    name: "Michael Jordan",
    email: "@michael",
    avatar: "https://i.pravatar.cc/300?img=12",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "@sarah",
    avatar: "https://i.pravatar.cc/300?img=32",
  },
  {
    id: "3",
    name: "David Lee",
    email: "@david",
    avatar: "https://i.pravatar.cc/300?img=15",
  },
  {
    id: "4",
    name: "Emma Watson",
    email: "@emma",
    avatar: "https://i.pravatar.cc/300?img=45",
  },
  {
    id: "5",
    name: "Chris Evans",
    email: "@chris",
    avatar: "https://i.pravatar.cc/300?img=22",
  },
];

interface ItemData {
  rank?: number;
  participantClass : any;
  profiles : any;
  id : string;
  full_name : string;

  class_title: any;
  users :any;
  id_class_title: string;
  title: string; // Replace with your actual table column schemas
  
  class_schedule : any;
  id_class_schedule: string;
  id_class_booking: string;
  start_time: string;
  end_time: string;
  available_quota: string;
  quota: string;
  highlight: false;

  booking_class: any;
}

interface UsersData {
  id_user : string
  full_name : string;
  email : string;
}

export default function ParticipantsScreen() {
  const router = useRouter();
  const navigation = useNavigation();

  const [searchText, setSearchText] = useState("");

  // STATE API
  const apiURL = process.env.EXPO_PUBLIC_API_URL;

  // Accesses both route params
  // const { accessToken, email } = useLocalSearchParams();
  const { accessToken,id_class_schedule } = useGlobalSearchParams();
  console.log(accessToken);
  console.log(id_class_schedule);

  // GET DATA
  const [items, setItems] = useState<ItemData[]>([]);
  const [filerData, setFilerData] = useState<ItemData[]>([]);
  const [users, setUsers] = useState<UsersData | null>(null);
  const [id_user, setIdUser] = useState('');
  // const [loading, setLoading] = useState<boolean>(true);
  const [loading, setLoading] = useState(true);
  // console.log(id_user);

  useEffect(() => {
    fetchDataUser();
    fetchDataClassParticipant();
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
        setIdUser(dataUser.id_user);
        // console.log(dataUser);
      } catch (error) {
        console.error('Error fetching list data:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchDataClassParticipant = async () => {
    try {
        // console.log(accessToken);
        const response = await fetch(`${apiURL}/class/participant/${id_class_schedule}`, {
        method: 'GET',
        headers: {
          'authorization': `Bearer ${accessToken}`, // Pass JWT token to backend
          'Content-Type': 'application/json',
        }
      });
        const data = await response.json();
        // setItems(data);
        setItems(data);
        setFilerData(data);
        console.log(data);
    } catch (error) {
      console.error('Error fetching list data:', error);
    } finally {
      setLoading(false);
    }
  };
    
  // FILTER + SORT
  const filteredParticipants = useMemo(() => {
    return [...participantsData]
      .filter((item) =>
        item.name
          .toLowerCase()
          .includes(searchText.toLowerCase())
      )
      
      .map((item, index) => ({
        ...item,
        rank: index + 1,
      }));
  }, [searchText]);

  //const topUser = filteredLeaderboard[0];

  const otherPlayersParticipants = filteredParticipants.filter(
    (item) => item.rank !== 0
  );

  const renderItemTime = ({
    item,
  }: {
    // item: participantsItem;
    item: ItemData;
  }) => {
    return (
      <TouchableOpacity style={styles.cardLeader}>
        <LinearGradient
          colors={["rgba(147, 18, 18, 0.27)", "rgba(193, 18, 18, 0.85)"]}
          style={styles.cardGradient}
        >
          {/* LEFT */}
          <View style={styles.leftSection}>
            <View
              style={styles.rankCircle}
            >
              <Text style={styles.rankText}>
                #{item.rank}
              </Text>
            </View>

            {/* <Image
              source={{ uri: item.avatar }}
              style={styles.avatar}
            /> */}

            <View>
              <Text style={styles.name}>
                {item.users.full_name}
              </Text>
              <Text style={styles.email}>
                {item.users.full_name}
              </Text>
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  const handleSearch = (text : string) => {
    // setSearchText(text);
    if (text) {
      const newData = items.filter(item => {
        const itemData = item.users.full_name ? item.users.full_name.toUpperCase() : '';
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
        // return itemData.indexOf(text.toUpperCase()) > -1;
      });
      // setItems(newData);
      setFilerData(newData);
      setSearchText(text);
    } 
    else {
      // setItems(items);
      setFilerData(items);
      setSearchText(text);
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
        {/* <TouchableOpacity style={styles.backButton} onPress={() => router.replace('/(tabs)/(coach)/dashboard')}> */}
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={22} color="#fff"/>
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Participants</Text>

        <View style={{ width: 40 }} />
      </LinearGradient>


      <View style={styles.contentLeader}>
            
          <StatusBar barStyle="light-content" />
  
          {/* BACKGROUND */}
          <View style={styles.bgCircle1} />
          <View style={styles.bgCircle2} />
  
          {/* SEARCH */}
          <View style={styles.searchContainer}>
            <Ionicons
              name="search"
              size={20}
              color="#9CA3AF"
            />
  
            <TextInput
              placeholder="Search Participants..."
              placeholderTextColor="#9CA3AF"
              value={searchText}
              // onChangeText={setSearchText}
              // onChangeText={handleSearch}
              onChangeText={(text) => handleSearch(text)}
              style={styles.searchInput}
            />
          </View>

          {/* LIST */}
          {/* <FlatList<participantsItem>
            data={otherPlayersParticipants} */}
          {/* <FlatList<ItemData>
            data={items}
            renderItem={renderItemTime}
            keyExtractor={(item) => item.id_class_booking}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
          /> */}
          <FlatList
            data={filerData}
            // scrollEnabled={false}
            keyExtractor={(item) => item.id_class_booking}
            // keyExtractor={(item) => item.id_class_schedule}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={
                <View style={{ padding: 20, alignItems: 'center' }}>
                <Text>No data found</Text>
                </View>
            }
            // renderItem={({ item }) => (
            renderItem={({ item, index }) => {
              return (
              <TouchableOpacity key={item.id_class_booking} style={styles.cardLeader}>
              <LinearGradient
                colors={["rgba(147, 18, 18, 0.27)", "rgba(193, 18, 18, 0.85)"]}
                style={styles.cardGradient}
              >
                
                <View style={styles.leftSection}>
                  <View
                    style={styles.rankCircle}
                  >
                    <Text style={styles.rankText}>
                      #{index+1}
                    </Text>
                  </View>

                  <Image
                    // source={{ uri: item.avatar }}
                    source={require('../../../assets/images/user/guest.png')}
                    style={styles.avatar}
                  />

                  <View>
                    <Text style={styles.name}>
                      {item.users.full_name}
                    </Text>
                    {/* <Text style={styles.email}>
                      {item.users.full_name}
                    </Text> */}
                  </View>
                </View>
              </LinearGradient>
            </TouchableOpacity>
            );
            // )}
            }}
          />
      </View>
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

  
// ====== Participants ======
  contentLeader: {
    flex: 1,
    backgroundColor: "#ffffff",
    marginTop: 10,
  },
  bgCircle1: {
    position: "absolute",
    width: 250,
    height: 250,
    borderRadius: 200,
    backgroundColor: "rgba(237, 58, 58, 0.18)",
    top: -80,
    right: -50,
  },

  bgCircle2: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: 200,
    backgroundColor: "rgba(235, 37, 37, 0.15)",
    bottom: 100,
    left: -80,
  },

  listContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 40,
  },

  cardLeader: {
    marginBottom: 5,
    borderRadius: 28,
    overflow: "hidden",
  },

  cardGradient: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    backgroundColor: "rgba(255, 255, 255, 0.44)",
  },

  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },

  rankCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.08)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  rankText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 10,
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 32,
    marginRight: 14,
  },

  name: {
    color: "#310606",
    fontSize: 14,
    fontWeight: "bold",
  },

  email: {
    color: "#2f3031",
    marginTop: 3,
    fontSize: 12,
  },
 
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.08)",
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 20,
    paddingHorizontal: 16,
    height: 56,
    borderWidth: 1,
    marginBottom: 20,
  },

  searchInput: {
    flex: 1,
    color: "#656565",
    marginLeft: 10,
    fontSize: 15,
  },

});