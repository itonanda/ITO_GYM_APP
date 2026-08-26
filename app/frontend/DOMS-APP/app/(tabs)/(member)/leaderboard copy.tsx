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
    avatar: "https://i.pravatar.cc/300?img=12",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "@sarah",
    points: 9320,
    workouts: 24,
    avatar: "https://i.pravatar.cc/300?img=32",
  },
  {
    id: "3",
    name: "David Lee",
    email: "@david",
    points: 8740,
    workouts: 21,
    avatar: "https://i.pravatar.cc/300?img=15",
  },
  {
    id: "4",
    name: "Emma Watson",
    email: "@emma",
    points: 8200,
    workouts: 19,
    avatar: "https://i.pravatar.cc/300?img=45",
  },
  {
    id: "5",
    name: "Chris Evans",
    email: "@chris",
    points: 7900,
    workouts: 17,
    avatar: "https://i.pravatar.cc/300?img=22",
  },
];


export default function LeaderboardScreen() {
  const router = useRouter();

  const [searchText, setSearchText] =
    useState("");

  // FILTER + SORT
  const filteredLeaderboard = useMemo(() => {
    return [...leaderboardData]
      .filter((item) =>
        item.name
          .toLowerCase()
          .includes(searchText.toLowerCase())
      )
      .sort((a, b) => b.points - a.points)
      .map((item, index) => ({
        ...item,
        rank: index + 1,
      }));
  }, [searchText]);

  const topUser = filteredLeaderboard[0];

  const otherPlayers = filteredLeaderboard.filter(
    (item) => item.rank !== 1
  );

  const renderItem = ({
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

              <View style={styles.workoutRow}>
                <MaterialCommunityIcons
                  name="dumbbell"
                  size={14}
                  color="#A855F7"
                />

                <Text style={styles.workoutText}>
                  {item.workouts} workouts
                </Text>
              </View>
            </View>
          </View>

          {/* RIGHT */}
          <View style={styles.rightSection}>
            <Text style={styles.points}>
              {item.points.toLocaleString()}
            </Text>

            <Text style={styles.pointsLabel}>
              TOTAL POINTS
            </Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
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
        
        <Text style={styles.headerTitle}>Leaderboard</Text>

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
            placeholder="Search player..."
            placeholderTextColor="#9CA3AF"
            value={searchText}
            onChangeText={setSearchText}
            style={styles.searchInput}
          />
        </View>

        {/* TOP PLAYER */}
        {topUser && (
          <LinearGradient
            colors={["#3c0405", "#9A0006", "#E82528"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.championCard}
          >
            <View style={styles.crownWrapper}>
              <Ionicons
                name="trophy"
                size={28}
                color="#FFD700"
              />
            </View>

            <Image
              source={{ uri: topUser.avatar }}
              style={styles.championAvatar}
            />

            <Text style={styles.championName}>
              {topUser.name}
            </Text>

            <Text style={styles.championEmail}>
              {topUser.email}
            </Text>

            <View style={styles.statsRow}>
              <View style={styles.statBox}>
                <Text style={styles.statValue}>
                  {topUser.points}
                </Text>

                <Text style={styles.statLabel}>
                  Points
                </Text>
              </View>

              <View style={styles.separator} />

              <View style={styles.statBox}>
                <Text style={styles.statValue}>
                  {topUser.workouts}
                </Text>

                <Text style={styles.statLabel}>
                  Workouts
                </Text>
              </View>

              {/*<View style={styles.separator} />

              <View style={styles.statBox}>
                <Text style={styles.statValue}>
                  #{topUser.rank}
                </Text>

                <Text style={styles.statLabel}>
                  Rank
                </Text>
              </View>*/}
            </View>
          </LinearGradient>
        )}

        {/* LIST */}
        <FlatList<LeaderboardItem>
          data={otherPlayers}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
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
    width: 30,
    height: 30,
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
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 32,
    marginRight: 14,
  },

  name: {
    color: "#310606",
    fontSize: 14,
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
    fontSize: 16,
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

});