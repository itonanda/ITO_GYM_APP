import React, { useMemo, useState } from "react";
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
import { Link, useRouter } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import { Background } from "@react-navigation/elements";
import { LinearGradient } from "expo-linear-gradient";


const { width } = Dimensions.get('window');

// ============ DATA ============
interface LeaderboardItem {
  id: string;
  name: string;
  email: string;
  points: number;
  workouts: number;
  time: number;
  weight: number;
  rep: number;
  avatar: string;
  rank?: number;
}

const leaderboardData: LeaderboardItem[] = [
  {
    id: "1",
    name: "Michael Jordan",
    email: "@michael",
    points: 9850,
    workouts: 28,
    time: 17,
    weight: 80,
    rep: 50,
    avatar: "https://i.pravatar.cc/300?img=12",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "@sarah",
    points: 9320,
    workouts: 24,    
    time: 29,
    weight: 75,
    rep: 45,
    avatar: "https://i.pravatar.cc/300?img=32",
  },
  {
    id: "3",
    name: "David Lee",
    email: "@david",
    points: 8740,
    workouts: 21,   
    time: 45,
    weight: 70,
    rep: 40,
    avatar: "https://i.pravatar.cc/300?img=15",
  },
  {
    id: "4",
    name: "Emma Watson",
    email: "@emma",
    points: 8200,
    workouts: 19,
    time: 60,
    weight: 65,
    rep: 35,
    avatar: "https://i.pravatar.cc/300?img=45",
  },
  {
    id: "5",
    name: "Chris Evans",
    email: "@chris",
    points: 7900,
    workouts: 17,
    time: 67,
    weight: 68,
    rep: 30,
    avatar: "https://i.pravatar.cc/300?img=22",
  },
];


export default function LeaderboardScreen() {
  const router = useRouter();
  const [selectedDay, setSelectedDay] = useState("time");

  const [searchText, setSearchText] =
    useState("");

  // FILTER + SORT Time
  const filteredLeaderboardTime = useMemo(() => {
    return [...leaderboardData]
      .filter((item) =>
        item.name
          .toLowerCase()
          .includes(searchText.toLowerCase())
      )
      .sort((a, b) => a.time - b.time)
      .map((item, index) => ({
        ...item,
        rank: index + 1,
      }));
  }, [searchText]);

  //const topUser = filteredLeaderboard[0];

  const otherPlayersTime = filteredLeaderboardTime.filter(
    (item) => item.rank !== 0
  );

  const renderItemTime = ({
    item,
  }: {
    item: LeaderboardItem;
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
              style={[
                styles.rankCircle,
                item.rank === 1 && styles.gold,
                item.rank === 2 && styles.silver,
                item.rank === 3 && styles.bronze,
              ]}
            >
              <Text style={styles.rankText}>
                #{item.rank}
              </Text>
            </View>

            <Image
              source={{ uri: item.avatar }}
              style={styles.avatar}
            />

            <View>
              <Text style={styles.name}>
                {item.name}
              </Text>
            </View>
          </View>

          {/* RIGHT */}
          <View style={styles.rightSection}>
            <Text style={styles.points}>
              {item.time}s
            </Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  // FILTER + SORT Berat
  const filteredLeaderboardBerat = useMemo(() => {
    return [...leaderboardData]
      .filter((item) =>
        item.name
          .toLowerCase()
          .includes(searchText.toLowerCase())
      )
      .sort((a, b) => b.weight - a.weight)
      .map((item, index) => ({
        ...item,
        rank: index + 1,
      }));
  }, [searchText]);

  //const topUser = filteredLeaderboard[0];

  const otherPlayersBerat = filteredLeaderboardBerat.filter(
    (item) => item.rank !== 0
  );

  const renderItemBerat = ({
    item,
  }: {
    item: LeaderboardItem;
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
              style={[
                styles.rankCircle,
                item.rank === 1 && styles.gold,
                item.rank === 2 && styles.silver,
                item.rank === 3 && styles.bronze,
              ]}
            >
              <Text style={styles.rankText}>
                #{item.rank}
              </Text>
            </View>

            <Image
              source={{ uri: item.avatar }}
              style={styles.avatar}
            />

            <View>
              <Text style={styles.name}>
                {item.name}
              </Text>
            </View>
          </View>

          {/* RIGHT */}
          <View style={styles.rightSection}>
            <Text style={styles.points}>
              {item.weight}kg
            </Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  };
  
  // FILTER + SORT Rap
  const filteredLeaderboardRap = useMemo(() => {
    return [...leaderboardData]
      .filter((item) =>
        item.name
          .toLowerCase()
          .includes(searchText.toLowerCase())
      )
      .sort((a, b) => b.rep - a.rep)
      .map((item, index) => ({
        ...item,
        rank: index + 1,
      }));
  }, [searchText]);

  //const topUser = filteredLeaderboard[0];

  const otherPlayersRap = filteredLeaderboardBerat.filter(
    (item) => item.rank !== 0
  );

  const renderItemRap = ({
    item,
  }: {
    item: LeaderboardItem;
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
              style={[
                styles.rankCircle,
                item.rank === 1 && styles.gold,
                item.rank === 2 && styles.silver,
                item.rank === 3 && styles.bronze,
              ]}
            >
              <Text style={styles.rankText}>
                #{item.rank}
              </Text>
            </View>

            <Image
              source={{ uri: item.avatar }}
              style={styles.avatar}
            />

            <View>
              <Text style={styles.name}>
                {item.name}
              </Text>
            </View>
          </View>

          {/* RIGHT */}
          <View style={styles.rightSection}>
            <Text style={styles.points}>
              {item.rep}
            </Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  };


  const TimeScreen = () => (
    <View style={styles.contentLeader}>
        {/* LIST */}
        <FlatList<LeaderboardItem>
          data={otherPlayersTime}
          renderItem={renderItemTime}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
    </View>
  );
  
  const BeratScreen = () => (
    <View style={styles.contentLeader}>
        {/* LIST */}
        <FlatList<LeaderboardItem>
          data={otherPlayersBerat}
          renderItem={renderItemBerat}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
    </View>
  );

  const RapScreen = () => (
    <View style={styles.contentLeader}>
        {/* LIST */}
        <FlatList<LeaderboardItem>
          data={otherPlayersRap}
          renderItem={renderItemRap}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
    </View>
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
        
        <Text style={styles.headerTitle}>Leaderboard</Text>

        <View style={{ width: 40 }} />
      </LinearGradient>


      <View style={styles.leaderboardRow}>
        {/* Time */}
        <TouchableOpacity
          style={[
            styles.leaderboardButton,
            selectedDay === "time" && styles.leaderboardActiveButton
          ]}
          onPress={() => setSelectedDay("time")}
        >
          <Text
            style={[
              styles.leaderboardButtonText,
              selectedDay === "time" && styles.leaderboardActiveText
            ]}
          >
              Time
          </Text>
        </TouchableOpacity>
        {/* Berat */}
        <TouchableOpacity
          style={[
            styles.leaderboardButton,
            selectedDay === "berat" && styles.leaderboardActiveButton
          ]}
          onPress={() => setSelectedDay("berat")}
        >
          <Text
            style={[
              styles.leaderboardButtonText,
              selectedDay === "berat" && styles.leaderboardActiveText
            ]}
          >
              Berat
          </Text>
        </TouchableOpacity>
        {/* Rap */}
        <TouchableOpacity
          style={[
            styles.leaderboardButton,
            selectedDay === "rap" && styles.leaderboardActiveButton
          ]}
          onPress={() => setSelectedDay("rap")}
        >
          <Text
            style={[
              styles.leaderboardButtonText,
              selectedDay === "rap" && styles.leaderboardActiveText
            ]}
          >
              Rap
          </Text>
        </TouchableOpacity>
        
      </View>

      {/* kondisi screen */}
      {selectedDay === "time" ? (
        <TimeScreen />
      ) : selectedDay === "berat" ? (
        <BeratScreen />
      ) : (
        <RapScreen />
      )}
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


// ====== Leaderboard ======
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

  championCard: {
    width: width - 40,
    alignSelf: "center",
    borderRadius: 24,
    paddingVertical: 10,
    alignItems: "center",
    //overflow: "hidden",
    //padding: 20,
    //shadowColor: "#000",
    //shadowOpacity: 0.08,
    //shadowRadius: 10,
    //elevation: 4,
  },

  topGlow: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "rgba(255,255,255,0.15)",
    top: -80,
  },

  crownWrapper: {
    width: 40,
    height: 40,
    borderRadius: 30,
    backgroundColor: "rgba(255,255,255,0.15)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },

  championAvatar: {
    width: 70,
    height: 70,
    borderRadius: 70,
    borderWidth: 4,
    borderColor: "#fff",
  },

  championName: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 16,
  },

  championEmail: {
    color: "#E5E7EB",
    marginTop: 4,
    fontSize: 14,
  },

  statsRow: {
    flexDirection: "row",
    marginTop: 30,
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: 24,
    paddingVertical: 18,
    paddingHorizontal: 12,
    alignItems: "center",
  },

  statBox: {
    alignItems: "center",
    paddingHorizontal: 18,
  },

  statValue: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  statLabel: {
    color: "#E5E7EB",
    fontSize: 12,
    marginTop: 4,
  },

  separator: {
    width: 1,
    height: 40,
    backgroundColor: "rgba(255,255,255,0.2)",
  },

  listHeader: {
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  listTitle: {
    color: "#470406",
    fontSize: 18,
    fontWeight: "bold",
  },

  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 21,
    backgroundColor: "rgba(107, 15, 15, 0.72)",
    justifyContent: "center",
    alignItems: "center",
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

  gold: {
    backgroundColor: "#F59E0B",
  },

  silver: {
    backgroundColor: "#9CA3AF",
  },

  bronze: {
    backgroundColor: "#B45309",
  },

  rankText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 10,
  },

  avatar: {
    width: 60,
    height: 60,
    borderRadius: 32,
    marginRight: 14,
  },

  name: {
    color: "#310606",
    fontSize: 12,
    fontWeight: "bold",
  },

  username: {
    color: "#2f3031",
    marginTop: 3,
    fontSize: 12,
  },

  workoutRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },

  workoutText: {
    color: "#fcfcfd",
    marginLeft: 6,
    fontSize: 10,
  },

  rightSection: {
    alignItems: "flex-end",
    marginRight: 10,
  },

  points: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },

  pointsLabel: {
    color: "#3a3b3b",
    fontSize: 8,
    marginTop: 4,
    letterSpacing: 1,
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


  /* ===== Leaderboard ===== */
  leaderboardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: '#eee',
    backgroundColor: '#fafafa',
    margin: 20,
  },
  leaderboardButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    marginHorizontal: 2,
    backgroundColor: '#fff',
    height: 70,
    width: 150,
    borderRadius: 16,
    justifyContent: 'center',
    textAlign: 'center',
  },
  leaderboardActiveButton: {
    backgroundColor: "#e53935"
  },
  leaderboardButtonText: {
    color: "#333",
    fontWeight: "bold",
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  leaderboardActiveText: {
    color: "#fff",
    fontWeight: "bold",
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  leaderboardDateText: {
    fontSize: 18,
    marginTop: 10
  },

});