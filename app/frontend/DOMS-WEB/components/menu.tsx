import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Link, useRouter, useGlobalSearchParams, useLocalSearchParams  } from "expo-router";
import { useEffect, useCallback, useState, useRef } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface UsersData {
  id_user : string;
  full_name : string;
  email : string;
}

export default function MenuScreen(selected:any) {
  const router = useRouter();
  // const [pilih, setSelected] = useState(selected);

  // Accesses both route params
  const apiURL = process.env.EXPO_PUBLIC_API_URL;
  // const { accessToken, email } = useLocalSearchParams();
  const { accessToken } = useGlobalSearchParams();
  // console.log(accessToken);

  // GET DATA
  const [users, setUsers] = useState<UsersData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDataUser();
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
      // console.log(dataUser);
    } catch (error) {
      console.error('Error fetching list data:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    // SIDEBAR
    <View style={styles.sidebar}>
      <View style={styles.profileSection}>
        <TouchableOpacity>
          <Image
            source={require("../assets/images/user/user.png")}
            style={styles.avatar}
          />
        </TouchableOpacity>
        {users && (
          <Text style={styles.adminName}>{users.full_name}</Text>
        )}
        {users && (
          <Text style={styles.email}>{users.email}</Text>
        )}
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <MenuItem
          icon="dashboard"
          title="Dashboard"
          onPress={() => router.push("/dashboard")}
          // active = {selected}
        />
        <MenuItem
          icon="people"
          title="View Members"
          onPress={() => router.push("/members")}
          // active = {selected}
        />
        <MenuItem
          icon="fitness-center"
          title="Coaches"
          onPress={() => router.push("/coaches")}
          // active = {selected}
        />
        <MenuItem
          icon="home-work"
          title="Class"
          onPress={() => router.push("/class")}
          // active = {selected}
        />
        <MenuItem
          icon="inventory-2"
          title="Inventory"
          onPress={() => router.push("/inventory")}
          // active = {selected}
        />
        <MenuItem
          icon="edit-square"
          title="News"
          onPress={() => router.push("/news")}
          // active = {selected}
        />
        <MenuItem
          icon="credit-card"
          title="Payment"
          onPress={() => router.push("/payment")}
          // active = {selected}
        />
        <MenuItem
          icon="discount"
          title="Promos"
          onPress={() => router.push("/promos")}
          // active = {selected}
        />
        <MenuItem
          icon="auto-stories"
          title="Report"
          onPress={() => router.push("/report")}
          // active = {selected}
        />
        <MenuItem
          icon="badge"
          title="Profile"
          onPress={() => router.push("/profile")}
          // active = {selected}
        />
      </ScrollView>

      <TouchableOpacity style={styles.logout}>
        <MaterialIcons name="logout" size={20} color="#fff" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

function MenuItem({
  icon,
  title,
  active = false,
  onPress,
  rightIcon,
}: any) {
  return (
    <TouchableOpacity
      style={[styles.menuItem, active && styles.activeMenu]}
      onPress={onPress}
    >
      <View style={styles.menuLeft}>
        <MaterialIcons
          name={icon}
          size={22}
          color={active ? "#ED1018" : "#fff"}
        />

        <Text
          style={[
            styles.menuText,
            active && {
              color: "#ED1018",
              fontWeight: "bold",
            },
          ]}
        >
          {title}
        </Text>
      </View>

      {rightIcon}
    </TouchableOpacity>
  );
}

function MenuSubItem({ icon, title, active = false, onPress }: any) {
  return (
    <TouchableOpacity
      style={[styles.menuSubItem, active && styles.activeMenuSub]}
      onPress={onPress}
    >
      <MaterialIcons
        name={icon}
        size={22}
        color={active ? "#ED1018" : "#fff"}
      />

      <Text
        style={[
          styles.menuSubText,
          active && {
            color: "#ED1018",
            fontWeight: "bold",
          },
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    width: 260,
    backgroundColor: "#ED1018",
    paddingVertical: 30,
  },

  profileSection: {
    alignItems: "center",
    marginBottom: 30,
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  adminName: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    marginTop: 15,
  },

  email: {
    color: "#fff",
    fontSize: 12,
  },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
    height: 52,
    gap: 15,
  },
  activeMenu: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginHorizontal: 10,
  },
  menuText: {
    color: "#fff",
  },

  subMenu: {
    color: "white",
    paddingVertical: 8,
    paddingLeft: 10,
  },
  menuSubItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    height: 30,
    gap: 15,
    marginTop: 5,
  },
  activeMenuSub: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginHorizontal: 10,
  },
  menuSubText: {
    color: "#fff",
  },

  logout: {
    flexDirection: "row",
    gap: 10,
    marginTop: 20,
    marginLeft: 20,
  },

  logoutText: {
    color: "#fff",
  },
});