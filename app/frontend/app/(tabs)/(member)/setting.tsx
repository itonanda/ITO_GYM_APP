import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Image,
  StatusBar,
  Dimensions,
} from 'react-native';
import { Link, useRouter } from 'expo-router';
import {
  Ionicons,
  MaterialIcons,
  Feather,
  FontAwesome5,
} from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useGlobalSearchParams } from 'expo-router';

const { width } = Dimensions.get('window');

interface UsersData {
  id_user : string;
  full_name : string;
  email : string;
}

export default function SettingsScreen() {
  const router = useRouter();  
  const [notificationEnabled, setNotificationEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  // Accesses both route params
  const apiURL = process.env.EXPO_PUBLIC_API_URL;
  const { accessToken } = useGlobalSearchParams();
// GET DATA
  // Accesses both route params ([id]) and query params (?name=John)
  const [users, setUsers] = useState<UsersData | null>(null);
  const [loading, setLoading] = useState(true);
  const { id_user } = useGlobalSearchParams();
  const [error, setError] = useState(null);

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
        'authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        },
    })
      .then(response => response.json())
      .then(response => {
      if(!response.error){
          router.navigate('/') // Use router.navigate for general navigation
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
      <StatusBar barStyle="light-content" />
     
      {/* HEADER */}
      <LinearGradient
        colors={['#9A0006', '#E82528', '#4d0205']}
        style={styles.header}
      >
        <View style={styles.profileContainer}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop',
            }}
            style={styles.profileImage}
          />

          <View style={styles.profileInfo}>
            {users && (
            <Text style={styles.profileName}>{users.full_name}</Text>
            )}
            {users && (
            <Text style={styles.profileEmail}>
              {users.email}
            </Text>
            )}
            <Text style={styles.profileStatus}>Active</Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        {/* ACCOUNT SECTION */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>

          {users && (
          <TouchableOpacity style={styles.menuCard} onPress={() =>
              router.push({
                pathname: '/(tabs)/(member)/edit_profile',
                params: { id_user: users.id_user },
                // state: { 
                //   token: 'super-secret-token-12345',
                //   userId: 99
                // }
              })
            }>
            <View style={styles.leftMenu}>
              <Ionicons name="person-outline" size={24} color="#EF4444" />

              <Text style={styles.menuText}>Edit Profile</Text>
            </View>

            <Ionicons name="chevron-forward" size={22} color="#9CA3AF" />
          </TouchableOpacity>
          )}
          {users && (
          <TouchableOpacity style={styles.menuCard}onPress={() =>
              router.push({
                pathname: '/(tabs)/(member)/change_password',
                params: { id_user: users.id_user },
                // state: { 
                //   token: 'super-secret-token-12345',
                //   userId: 99
                // }
              })
            }>
            <View style={styles.leftMenu}>
              <MaterialIcons name="key" size={24} color="#EF4444" />

              <Text style={styles.menuText}>Change Password</Text>
            </View>

            <Ionicons name="chevron-forward" size={22} color="#9CA3AF" />
          </TouchableOpacity>
          )}
        </View>


        {/* PREFERENCES */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>

          <View style={styles.menuCard}>
            <View style={styles.leftMenu}>
              <Ionicons name="notifications-outline" size={24} color="#EF4444" />

              <Text style={styles.menuText}>Push Notifications</Text>
            </View>

            <Switch
              value={notificationEnabled}
              onValueChange={setNotificationEnabled}
              trackColor={{ false: '#D1D5DB', true: '#FCA5A5' }}
              thumbColor={notificationEnabled ? '#EF4444' : '#F9FAFB'}
            />
          </View>
        </View>


        {/* SUPPORT */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>

          <TouchableOpacity style={styles.menuCard}>
            <View style={styles.leftMenu}>
              <Feather name="help-circle" size={24} color="#EF4444" />

              <Text style={styles.menuText}>Help Center</Text>
            </View>

            <Ionicons name="chevron-forward" size={22} color="#9CA3AF" />
          </TouchableOpacity>


          <TouchableOpacity style={styles.menuCard}>
            <View style={styles.leftMenu}>
              <Ionicons name="document-text-outline" size={24} color="#EF4444" />

              <Text style={styles.menuText}>Terms & Conditions</Text>
            </View>

            <Ionicons name="chevron-forward" size={22} color="#9CA3AF" />
          </TouchableOpacity>


          <TouchableOpacity style={styles.menuCard}>
            <View style={styles.leftMenu}>
              <FontAwesome5 name="shield-alt" size={22} color="#EF4444" />

              <Text style={styles.menuText}>Privacy Policy</Text>
            </View>

            <Ionicons name="chevron-forward" size={22} color="#9CA3AF" />
          </TouchableOpacity>
        </View>


        {/* LOGOUT */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleSignOut}>
          <Ionicons name="log-out-outline" size={24} color="#FFFFFF" />

          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>


        <Text style={styles.versionText}>
          Dome Fitness v1.0.0
        </Text>

      </ScrollView>


      {/* ================= BOTTOM TAB ================= */}
      <View style={styles.bottomTab}>
        <View style={styles.bottomTabTitle}>
          <Link href={"/(tabs)/(member)/dashboard"}>
            <View style={styles.bottomTabTitle}>
              <Ionicons name="home" size={24} color="#E11F27" />
              <Text style={styles.bottomTabTitle}>Home</Text>
            </View>
          </Link>
        </View>
        <View style={styles.bottomTabTitle}>
          <Link href={'/+not-found'}>
            <View style={styles.bottomTabTitle}>
              <Ionicons name="calendar" size={24} color="#E11F27" />
              <Text style={styles.bottomTabTitle}>Activity</Text>
            </View>
          </Link>
        </View>


        <View style={styles.bottomTabBarbel}>
          <Link href={"/(tabs)/(member)/workout_of_the_day"}>
            <Ionicons name="barbell" size={35} color="#fff"/>
          </Link>
        </View>


        <View style={styles.bottomTabTitle}>
          <Link href={'/+not-found'}>
            <View style={styles.bottomTabTitle}>
              <AntDesign name="rise" size={24} color="#E11F27" />
              <Text style={styles.bottomTabTitle}>Progress</Text>
            </View>
          </Link>
        </View>
        <View style={styles.bottomTabTitle}>
          <Link href={'/+not-found'}>
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
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },

  header: {
    paddingTop: 70,
    paddingBottom: 40,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
  },

  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },

  profileInfo: {
    marginLeft: 18,
  },

  profileName: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '800',
  },

  profileEmail: {
    color: '#D1D5DB',
    marginTop: 6,
    fontSize: 15,
  },
  
  profileStatus: {
    color: '#bcc3cf',
    marginTop: 6,
    fontSize: 14,
    fontWeight: 'bold',
  },

  section: {
    marginTop: 30,
    paddingHorizontal: 20,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 16,
  },

  menuCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    paddingHorizontal: 18,
    paddingVertical: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },

  leftMenu: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  menuText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginLeft: 14,
  },

  logoutButton: {
    backgroundColor: '#EF4444',
    marginHorizontal: 20,
    marginTop: 40,
    borderRadius: 22,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },

  logoutText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
    marginLeft: 10,
  },

  versionText: {
    textAlign: 'center',
    color: '#9CA3AF',
    marginTop: 24,
    marginBottom: 40,
    fontSize: 14,
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