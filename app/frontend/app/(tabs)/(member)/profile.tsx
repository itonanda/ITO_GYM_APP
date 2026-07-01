import React, { useEffect, useState, useRef } from 'react';
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
import AntDesign from '@expo/vector-icons/AntDesign';
import { useGlobalSearchParams, useLocalSearchParams } from 'expo-router';

const { width } = Dimensions.get('window');

interface UsersData {
  id_user : string;
  name : string;
  email : string;
}

export default function MemberProfileScreen() {
  const router = useRouter();  
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef(null);
  
  // Accesses both route params
  const apiURL = process.env.EXPO_PUBLIC_API_URL;
  // const { accessToken } = useLocalSearchParams();
  const { accessToken } = useGlobalSearchParams();
// GET DATA
  // Accesses both route params ([id]) and query params (?name=John)
    const [users, setUsers] = useState<UsersData | null>(null);
    const [loading, setLoading] = useState(true);
    const { id_user } = useGlobalSearchParams();
    const [error, setError] = useState(null);

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

  const fetchDataUser = async () => {
      try {
        setLoading(true);
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
        // userId(dataUser.userId);
        // console.log(dataUser);
      } catch (error) {
        console.error('Error fetching list data:', error);
        //setError(error.message);
      } finally {
        setLoading(false);
      }
    };

  const handleSignOut = () => {
    fetch(`${apiURL}/auth/signout`, {
        method: 'POST',
        headers: {
        authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        },
    })
      .then(response => response.json())
      .then(response => {
      if(!response.error){
          router.navigate('../') // Use router.navigate for general navigation
      }
      })
      .catch(error => {
      console.error('Error:', error);
      });
  };
  
  useEffect(() => {
    fetchDataUser();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#E82528" />

      {/* HEADER */}
      <LinearGradient
        colors={["#E82528", "#9A0006"]}
        style={styles.headerProfile}
      >
        {/* ================= HEADER ================= */}
        <View style={styles.avatarProfile}>
          <Ionicons name="person-outline" size={50} color="#000" />
        </View>
        {/* <Text style={styles.statusProfile}>Active</Text>
        <Text style={styles.nameProfile}>John Doe</Text>
        <Text style={styles.emailProfile}>JohnDoe@gmail.com</Text>  */}
        <View>
          {/* {users && (
            <Text style={styles.statusProfile}>Active</Text>
          )} */}
          {users && (
            <Text style={styles.nameProfile}>{users.name}</Text>
          )}
          {users && (
            <Text style={styles.emailProfile}>{users.email}</Text> 
          )}
        </View>
        <View style={{ width: 40 }} />
      </LinearGradient>


      <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 120 }}
            >
                {/* ================= MENU PROFILE ================= */}
                <View style={styles.headerMenuProfile}>
                  {/*============ Edit Profile ============*/}
                  <View style={{justifyContent:'flex-end', alignItems:'flex-end', marginTop: 10}}>
                    <TouchableOpacity style={styles.menuButtonProfile}>
                      <TouchableOpacity style={styles.ButtonProfile} onPress={() => router.replace('/+not-found')}>
                        <View style={styles.menuIconProfile}>
                          <AntDesign name="edit" size={22} color="#000"/>
                        </View>
                        <Text style={styles.menuTextProfile}>Edit Profile</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.ButtonNextProfile} onPress={() => router.replace('/+not-found')}>
                        <View style={styles.menuIconProfile}>
                          <Ionicons name="chevron-forward" size={22} color="#000"/>
                        </View>
                      </TouchableOpacity>
                    </TouchableOpacity>            
                  </View> 
                  {/*============ Change Password ============*/}
                  <View style={{justifyContent:'flex-end', alignItems:'flex-end', marginTop: 10}}>
                    <TouchableOpacity style={styles.menuButtonProfile}>
                      <TouchableOpacity style={styles.ButtonProfile} onPress={() => router.replace('/+not-found')}>
                        <View style={styles.menuIconProfile}>
                          <AntDesign name="key" size={22} color="#000"/>
                        </View>
                        <Text style={styles.menuTextProfile}>Change Password</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.ButtonNextProfile} onPress={() => router.replace('/+not-found')}>
                        <View style={styles.menuIconProfile}>
                          <Ionicons name="chevron-forward" size={22} color="#000"/>
                        </View>
                      </TouchableOpacity>
                    </TouchableOpacity>            
                  </View> 
                  {/*============ Settings ============*/}
                  <View style={{justifyContent:'flex-end', alignItems:'flex-end', marginTop: 10}}>
                    <TouchableOpacity style={styles.menuButtonProfile}>
                      <TouchableOpacity style={styles.ButtonProfile} onPress={() => router.replace('/+not-found')}>
                        <View style={styles.menuIconProfile}>
                          <AntDesign name="setting" size={22} color="#000"/>
                        </View>
                        <Text style={styles.menuTextProfile}>Settings</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.ButtonNextProfile} onPress={() => router.replace('/+not-found')}>
                        <View style={styles.menuIconProfile}>
                          <Ionicons name="chevron-forward" size={22} color="#000"/>
                        </View>
                      </TouchableOpacity>
                    </TouchableOpacity>            
                  </View> 
                  {/*============ Log Out ============*/}
                  <View style={{justifyContent:'flex-end', alignItems:'flex-end', marginTop: 10}}>
                    <TouchableOpacity style={styles.menuButtonProfile}>
                      {/* <TouchableOpacity style={styles.ButtonProfile}  onPress={() => router.replace('/+not-found')}> */}
                      <TouchableOpacity style={styles.ButtonProfile}  onPress={handleSignOut}>
                        <View style={styles.menuIconProfile}>
                          <AntDesign name="logout" size={22} color="#000"/>
                        </View>
                        <Text style={styles.menuTextProfile}>Log Out</Text>
                      </TouchableOpacity>
                      {/* <TouchableOpacity style={styles.ButtonNextProfile} onPress={() => router.replace('/+not-found')}> */}
                      <TouchableOpacity style={styles.ButtonNextProfile} onPress={handleSignOut}>
                        <View style={styles.menuIconProfile}>
                          <Ionicons name="chevron-forward" size={22} color="#000"/>
                        </View>
                      </TouchableOpacity>
                    </TouchableOpacity>            
                  </View> 
                </View> 
            </ScrollView>


      {/* ================= BOTTOM TAB ================= */}
      <View style={styles.bottomTab}>
        <View style={styles.bottomTabTitle}>
          <Link href={"/dashboard"}>
            <View style={styles.bottomTabTitle}>
              <Ionicons name="home" size={24} color="#E11F27" />
              <Text style={styles.bottomTabTitle}>Home</Text>
            </View>
          </Link>
        </View>
        <View style={styles.bottomTabTitle}>
          <Link href={"/+not-found"}>
            <View style={styles.bottomTabTitle}>
              <Ionicons name="calendar" size={24} color="#E11F27" />
              <Text style={styles.bottomTabTitle}>Activity</Text>
            </View>
          </Link>
        </View>


        <View style={styles.bottomTabBarbel}>
          <Link href={"/+not-found"}>
            <Ionicons name="barbell" size={35} color="#fff"/>
          </Link>
        </View>


        <View style={styles.bottomTabTitle}>
          <Link href={"/+not-found"}>
            <View style={styles.bottomTabTitle}>
              <AntDesign name="rise" size={24} color="#E11F27" />
              <Text style={styles.bottomTabTitle}>Progress</Text>
            </View>
          </Link>
        </View>
        <View style={styles.bottomTabTitle}>
          <Link href={"/+not-found"}>
            <View style={styles.bottomTabTitle}>
              <Ionicons name="body" size={24} color="#E11F27" />
              <Text style={styles.bottomTabTitle}>You</Text>
            </View>
          </Link>
        </View>
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

/* ========== Profile ========== */
  headerProfile: {
    paddingTop: 40,
    paddingBottom: 40,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    justifyContent: 'space-between',
    alignItems: 'center',
    //marginTop: 30,
  },
  avatarProfile: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 10,
    borderWidth:1,
  },
  statusProfile: {
    color: "#000",
    fontSize: 14,
    fontWeight: "bold",
  },
  nameProfile: {
    color: "#fff",
    fontSize: 35,
    fontWeight: "bold",
  },
  emailProfile: {
    color: "#fff",
    fontSize: 14,
  },


  
  /* BOTTOM MENU */
  headerMenuProfile: {
    backgroundColor: '#fff',
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuButtonProfile: {
    height: 55,
    width: 330,
    borderRadius: 14,
    borderWidth: 1,
    backgroundColor: '#FEFEFE',
    flexDirection: "row",
    marginBottom: 10,
  },
  ButtonProfile: {
    height: 55,
    width: 280,
    borderTopLeftRadius: 14,
    borderBottomLeftRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
    gap: 10,
  },
  ButtonNextProfile: {
    height: 55,
    width: 50,
    borderTopRightRadius: 14,
    borderBottomRightRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
    gap: 10,
  },
  menuIconProfile: {
    width: 22,
    height: 22,
    marginLeft: 10,
    marginRight: 10,
  },
  menuTextProfile: {
    fontSize: 18,
    fontWeight: "500",
    color:'#000',
  },

  //=========== BOTTOM TAB ===========
  bottomTab: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 85,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 15,
    borderTopColor:'#000',
    borderTopWidth: 1,
  },
  bottomTabBarbel: {
    bottom: 0,
    backgroundColor: '#E11F27',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    top:-30,
    borderRadius:20,
    padding: 10,
    borderColor: '#000',
    borderWidth: 1,
  },
  bottomTabTitle: {
    fontSize: 12,
    fontWeight: 500,
    alignItems: 'center',
  },
});