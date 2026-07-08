import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
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
import { Calendar } from "react-native-calendars";

// ============ DATA ============
// Active Members
const dataActiveMembers = [
  {
    id: "1",
    name: "James Medalla",
    datePaid: "2024-05-12",
    dateExpiry: "2026-05-12",
    status: "Active",
    avatar: "https://i.pravatar.cc/300?img=12",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    datePaid: "2025-06-08",
    dateExpiry: "2027-06-08",
    status: "Active",
    avatar: "https://i.pravatar.cc/300?img=32",
  },
  {
    id: "3",
    name: "David Lee",
    datePaid: "2026-07-16",
    dateExpiry: "2028-07-16",
    status: "Active",
    avatar: "https://i.pravatar.cc/300?img=15",
  },
  {
    id: "4",
    name: "Emma Watson",
    datePaid: "2024-08-22",
    dateExpiry: "2027-08-22",
    status: "Blocked",
    avatar: "https://i.pravatar.cc/300?img=45",
  },
  {
    id: "5",
    name: "Chris Evans",
    datePaid: "2025-09-28",
    dateExpiry: "2028-09-28",
    status: "Active",
    avatar: "https://i.pravatar.cc/300?img=22",
  },
  {
    id: "6",
    name: "Evans Loo",
    datePaid: "2024-10-09",
    dateExpiry: "2026-10-09",
    status: "Active",
    avatar: "https://i.pravatar.cc/300?img=26",
  },
];

//Active Coaches
const dataActiveCoaches = [
  {
    id: "1",
    name: "Tracey Anderson",
    status: "Active",
    avatar:
      "https://media1.popsugar-assets.com/files/thumbor/Vs-peculDgbwlQ69GFWZOflUA3w=/fit-in/1584x2376/filters:format_auto():upscale()/2024/03/27/879/n/1922729/tmp_KacYWd_37032d100cfae3b6_GettyImages-859819156.jpg",
  },
  {
    id: "2",
    name: "Hany Rambod",
    status: "Active",
    avatar:
      "https://cdn.shopify.com/s/files/1/0032/5736/8611/files/HanyRambod_1080_480x480.jpg?v=1566268070",
  },
  {
    id: "3",
    name: "Gunnar Peterson",
    status: "Active",
    avatar:
      "https://motivatetalent.com/wp-content/uploads/2023/10/Pi7_Image_GunnarPetersonHeadshot_4.jpg",
  },
  {
    id: "4",
    name: "Nick Bare",
    status: "Blocked",
    avatar:
      "https://www.greatestphysiques.com/wp-content/uploads/2017/12/Nick-Bare.09.jpg",
  },
  {
    id: "5",
    name: "Harley Pasternack",
    status: "Active",
    avatar:
      "https://magazine.utoronto.ca/wp-content/uploads/2023/05/harley-pasternak-1600x0-c-default.jpg",
  },
  {
    id: "6",
    name: "Charles Glass",
    status: "Active",
    avatar:
      "https://thebarbell.com/wp-content/uploads/2022/09/Charles-Glass-workout.jpg",
  },
];

//Calendar
const workoutSchedule: Record<string, any[]> = {
  "2026-06-05": [
    {
      id: "1",
      title: "Morning Cardio",
      time: "07:00 AM",
    },
  ],
  "2026-06-18": [
    {
      id: "1",
      title: "Morning Cardio",
      time: "07:00 AM",
    },
    {
      id: "2",
      title: "Morning Cardio",
      time: "09:00 AM",
    },
  ],
  "2026-07-01": [
    {
      id: "1",
      title: "Morning Cardio",
      time: "07:00 AM",
    },
    {
      id: "2",
      title: "Morning Cardio",
      time: "09:00 AM",
    },
    {
      id: "3",
      title: "Morning Cardio",
      time: "12:00 AM",
    },
  ],
};

//Inventory
const dataInventory = [
  {
    id: "1",
    name: "Whey Protein",
    category: "Supplement",
    stock: 20,
    status: "In Stock",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2sK9rSZLToFGoYsrUTUwE68W6iiwGwIpMkQ&s",
  },
  {
    id: "2",
    name: "Creatine",
    category: "Supplement",
    stock: 5,
    status: "Low Stock",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2sK9rSZLToFGoYsrUTUwE68W6iiwGwIpMkQ&s",
  },
  {
    id: "3",
    name: "Gym Towel",
    category: "Merchandise",
    stock: 0,
    status: "Out of Stock",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2sK9rSZLToFGoYsrUTUwE68W6iiwGwIpMkQ&s",
  },
  {
    id: "4",
    name: "Dumbbell 10kg",
    category: "Equipment",
    stock: 12,
    status: "In Stock",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2sK9rSZLToFGoYsrUTUwE68W6iiwGwIpMkQ&s",
  },
  {
    id: "5",
    name: "Resistance Band",
    category: "Equipment",
    stock: 2,
    status: "Low Stock",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2sK9rSZLToFGoYsrUTUwE68W6iiwGwIpMkQ&s",
  },
];

//Sales
const dataSales = {
  achieved: 45,
  target: 50,
};

export default function DashboardScreen() {
  const router = useRouter();

  const [searchMembers, setSearchMembers] = useState("");
  const filteredDataActiveMembers = dataActiveMembers.filter(
    (item) =>
      item.name.toLowerCase().includes(searchMembers.toLowerCase()) ||
      item.status.toLowerCase().includes(searchMembers.toLowerCase()) ||
      item.datePaid.toLowerCase().includes(searchMembers.toLowerCase()) ||
      item.dateExpiry.toLowerCase().includes(searchMembers.toLowerCase()),
  );
  // const filteredDataActiveMembers = dataActiveMembers
  //   .filter((item) => {
  //     const keyword = search.toLowerCase();
  //     return (
  //       item.status.toLowerCase().includes(keyword) ||
  //       item.name.toLowerCase().includes(keyword) ||
  //       item.datePaid.toLowerCase().includes(keyword) ||
  //       item.dateExpiry.toLowerCase().includes(keyword)
  //     );
  //   })
  //   .slice(0, 5);

  const [searchCoaches, setSearchCoaches] = useState("");
  const filteredDataActiveCoaches = dataActiveCoaches.filter(
    (item) =>
      item.name.toLowerCase().includes(searchCoaches.toLowerCase()) ||
      item.status.toLowerCase().includes(searchCoaches.toLowerCase()),
  );
  // const filteredDataActiveCoaches = dataActiveCoaches
  //   .filter((item) => {
  //     const keyword = searchCoaches.toLowerCase();
  //     return (
  //       item.status.toLowerCase().includes(keyword) ||
  //       item.name.toLowerCase().includes(keyword)
  //     );
  //   })
  //   .slice(0, 5);

  const today = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(today);
  const selectedWorkouts = workoutSchedule[selectedDate] || [];

  const [searchInventory, setSearchInventory] = useState("");
  const filteredDataInventory = dataInventory.filter(
    (item) =>
      item.name.toLowerCase().includes(searchInventory.toLowerCase()) ||
      item.category.toLowerCase().includes(searchInventory.toLowerCase()) ||
      item.status.toLowerCase().includes(searchInventory.toLowerCase()),
  );
  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Stock":
        return "#22C55E";
      case "Low Stock":
        return "#F59E0B";
      case "Out of Stock":
        return "#EF4444";
      default:
        return "#64748B";
    }
  };

  const percentage = (dataSales.achieved / dataSales.target) * 100;
  const circlePercent = Math.min(percentage, 100);

  return (
    <View style={styles.container}>
      {/* SIDEBAR */}
      <View style={styles.sidebar}>
        <View style={styles.profileSection}>
          <TouchableOpacity>
            <Image
              source={require("../../../assets/images/user/user.png")}
              style={styles.avatar}
            />
          </TouchableOpacity>

          <Text style={styles.adminName}>Fandi Wijaya</Text>

          <Text style={styles.email}>fandiwijaya@doms.com</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <MenuItem
            icon="dashboard"
            title="Dashboard"
            onPress={() => router.push("/dashboard")}
            active
          />
          <MenuItem
            icon="check-box"
            title="Plan"
            onPress={() => router.push("/plan")}
          />
          <MenuItem
            icon="credit-card"
            title="Payment"
            onPress={() => router.push("/payment")}
          />
          <MenuItem
            icon="inventory"
            title="Inventory"
            onPress={() => router.push("/inventory")}
          />
          <MenuItem
            icon="groups"
            title="Membership"
            onPress={() => router.push("/membership")}
          />
          <MenuItem
            icon="fitness-center"
            title="Coaches"
            onPress={() => router.push("/coaches")}
          />
          <MenuItem
            icon="menu-book"
            title="Report"
            onPress={() => router.push("/report")}
          />
        </ScrollView>

        <TouchableOpacity style={styles.logout}>
          <MaterialIcons name="logout" size={20} color="#fff" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* CONTENT */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* TOP BAR */}
        <View style={styles.topBar}>
          <Text style={styles.feedback}>Feedback</Text>

          <Ionicons name="notifications" size={24} color="#ED1018" />
        </View>

        {/* GRID */}
        <View style={styles.grid}>
          {/* LEFT */}
          <View style={{ flex: 2 }}>
            <View style={styles.welcomeCard}>
              <View style={{ flex: 1 }}>
                <Text style={styles.welcomeTitle}>
                  Welcome,
                  <Text style={{ color: "#ED1018" }}> Fandi Wijaya</Text>
                </Text>

                <Text style={styles.welcomeDesc}>
                  Help members stay motivated, track their progress, and guide
                  them toward achieving their fitness goals.
                </Text>
              </View>

              <TouchableOpacity>
                <Image
                  source={require("../../../assets/images/bg_logoo.png")}
                  style={styles.circle}
                />
              </TouchableOpacity>
            </View>

            {/* Active Members */}
            <Text style={styles.sectionTitle}>Active Members</Text>

            <View style={styles.memberCard}>
              <View style={styles.searchRow}>
                <TextInput
                  placeholder="Search Members..."
                  value={searchMembers}
                  onChangeText={setSearchMembers}
                  style={styles.search}
                />
                <Feather name="search" size={20} color="#fff" />
              </View>

              <View style={styles.memberRowTitle}>
                <View style={{ flex: 1 }} />
                <Text style={styles.memberTitle}>Date paid</Text>
                <Text style={styles.memberTitle}>Date Expiry</Text>
                <Text style={styles.memberTitle}>Status</Text>
              </View>

              <FlatList
                data={filteredDataActiveMembers}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                  <View style={styles.memberRow}>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <TouchableOpacity>
                        <Image
                          source={{ uri: item.avatar }}
                          style={styles.memberAvatar}
                        />
                      </TouchableOpacity>
                      <Text style={styles.memberName}>{item.name}</Text>
                      <View style={{ flex: 1 }} />
                      <Text style={styles.memberDate}>{item.datePaid}</Text>
                      <Text style={styles.memberDate}>{item.dateExpiry}</Text>
                    </View>
                    <View style={styles.activeBadge}>
                      <Text style={styles.activeText}>{item.status}</Text>
                    </View>
                  </View>
                )}
              />
            </View>

            <View style={styles.bottomRow}>
              <View style={styles.smallCard}>
                <Text style={styles.cardTitle}>Sales</Text>

                {/* Target Card */}
                <View style={styles.targetCard}>
                  <Text style={styles.targetTitle}>Monthly Target</Text>

                  <Text style={styles.targetValue}>
                    {dataSales.achieved} / {dataSales.target} Memberships
                  </Text>

                  <View style={styles.progressBackground}>
                    <View
                      style={[
                        styles.progressFill,
                        { width: `${circlePercent}%` },
                      ]}
                    />
                  </View>

                  <Text style={styles.progressText}>
                    {circlePercent}% Completed
                  </Text>
                </View>
              </View>

              <View style={styles.smallCard}>
                <Text style={styles.cardTitle}>Coaches</Text>

                <View style={styles.searchRow}>
                  <TextInput
                    placeholder="Search Coaches..."
                    value={searchCoaches}
                    onChangeText={setSearchCoaches}
                    style={styles.search}
                  />
                  <Feather name="search" size={20} color="#232222" />
                </View>

                <FlatList
                  data={filteredDataActiveCoaches}
                  keyExtractor={(item) => item.id}
                  showsVerticalScrollIndicator={false}
                  renderItem={({ item }) => (
                    <View style={styles.coachRow}>
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <TouchableOpacity>
                          <Image
                            source={{ uri: item.avatar }}
                            style={styles.coachAvatar}
                          />
                        </TouchableOpacity>
                        <Text style={styles.coachName}>{item.name}</Text>
                        <View style={styles.activeBadgeCoach}>
                          <Text style={styles.activeTextCoach}>
                            {item.status}
                          </Text>
                        </View>
                      </View>
                    </View>
                  )}
                />
              </View>
            </View>
          </View>

          {/* RIGHT */}
          <View style={{ flex: 1 }}>
            {/* Calendar */}
            <View style={styles.calendarCard}>
              <Text style={styles.cardTitle}>Calendar</Text>

              <Calendar
                onDayPress={(day) => {
                  setSelectedDate(day.dateString);
                }}
                markedDates={{
                  [selectedDate]: {
                    selected: true,
                    selectedColor: "#4F46E5",
                  },
                }}
              />

              <Text
                style={{
                  marginTop: 20,
                  marginBottom: 10,
                  fontSize: 16,
                  fontWeight: "600",
                }}
              >
                Schedule - {selectedDate}
              </Text>

              <FlatList
                data={selectedWorkouts}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                  <Text
                    style={{
                      textAlign: "center",
                      marginTop: 30,
                      color: "#999",
                    }}
                  >
                    No Schedule Available
                  </Text>
                }
                renderItem={({ item }) => (
                  <View
                    style={{
                      backgroundColor: "#FFF",
                      padding: 5,
                      borderRadius: 12,
                      marginBottom: 5,
                      elevation: 1,
                    }}
                  >
                    <Text style={{ fontSize: 16, fontWeight: "600" }}>
                      {item.title}
                    </Text>

                    <Text style={{ marginTop: 5, color: "#666" }}>
                      {item.time}
                    </Text>
                  </View>
                )}
              />
            </View>

            {/* Inventory */}
            <View style={styles.inventoryCard}>
              <Text style={styles.cardTitle}>Inventory</Text>

              <View style={styles.searchRow}>
                <TextInput
                  placeholder="Search Inventory..."
                  value={searchInventory}
                  onChangeText={setSearchInventory}
                  style={styles.search}
                />
                <Feather name="search" size={20} color="#232222" />
              </View>

              <FlatList
                data={filteredDataInventory}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                  <View style={styles.itemCard}>
                    <TouchableOpacity>
                      <Image
                        source={{ uri: item.avatar }}
                        style={styles.iconBox}
                      />
                    </TouchableOpacity>

                    <View style={{ flex: 1 }}>
                      <Text style={styles.itemName}>{item.name}</Text>
                      <Text style={styles.category}>{item.category}</Text>
                      <Text style={styles.stock}>Stock: {item.stock}</Text>
                    </View>

                    <View
                      style={[
                        styles.statusBadge,
                        {
                          backgroundColor: getStatusColor(item.status),
                        },
                      ]}
                    >
                      <Text style={styles.statusText}>{item.status}</Text>
                    </View>
                  </View>
                )}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function MenuItem({ icon, title, active = false, onPress }: any) {
  return (
    <TouchableOpacity
      style={[styles.menuItem, active && styles.activeMenu]}
      onPress={onPress}
    >
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
            fontWeight: "700",
          },
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#D9D9D9",
  },

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
    paddingHorizontal: 20,
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

  logout: {
    flexDirection: "row",
    gap: 10,
    marginTop: 20,
    marginLeft: 20,
  },

  logoutText: {
    color: "#fff",
  },

  content: {
    flex: 1,
    padding: 25,
  },

  topBar: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 30,
    marginBottom: 20,
    alignItems: "center",
  },

  feedback: {
    color: "#ED1018",
  },

  grid: {
    flexDirection: "row",
    gap: 20,
  },

  welcomeCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    flexDirection: "row",
    elevation: 5,
    marginBottom: 20,
  },

  welcomeTitle: {
    fontSize: 24,
    fontWeight: "600",
  },

  welcomeDesc: {
    color: "#888",
    marginTop: 10,
    lineHeight: 22,
  },

  circle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#AEAEB2",
  },

  sectionTitle: {
    fontSize: 24,
    color: "#ED1018",
    fontWeight: "700",
    marginBottom: 15,
  },

  memberCard: {
    height: 500,
    backgroundColor: "#6F739C",
    borderRadius: 18,
    padding: 20,
  },

  searchRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  search: {
    width: 180,
    backgroundColor: "#5f6494c1",
    color: "#fff",
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 10,
  },

  memberRowTitle: {
    flexDirection: "row",
    //alignItems: "center",
    marginTop: 25,
    marginHorizontal: 40,
  },

  memberTitle: {
    color: "#fff",
    marginHorizontal: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },

  listContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 40,
  },

  memberRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 25,
  },

  memberAvatar: {
    width: 45,
    height: 45,
    borderRadius: 22,
    backgroundColor: "#AAA",
  },

  memberName: {
    color: "#fff",
    marginLeft: 15,
    width: 180,
    fontWeight: "600",
  },

  memberDate: {
    color: "#fff",
    marginHorizontal: 18,
  },

  activeBadge: {
    backgroundColor: "#33C481",
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 15,
    marginLeft: 20,
  },

  activeText: {
    color: "#fff",
    fontWeight: "700",
  },

  bottomRow: {
    flexDirection: "row",
    gap: 20,
    marginTop: 20,
  },

  smallCard: {
    flex: 1,
    height: 350,
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 20,
    elevation: 4,
  },

  cardTitle: {
    color: "#ED1018",
    fontWeight: "700",
    fontSize: 20,
  },

  progressCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 15,
    borderColor: "#ED1018",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 20,
  },

  percent: {
    fontSize: 28,
    fontWeight: "700",
    color: "#ED1018",
  },

  coachRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },

  coachAvatar: {
    width: 35,
    height: 35,
    borderRadius: 18,
    backgroundColor: "#ED1018",
    marginRight: 10,
  },

  coachName: {
    color: "#302f2f",
    marginLeft: 5,
    width: 130,
    fontWeight: "600",
  },

  coachDate: {
    color: "#302f2f",
    marginHorizontal: 18,
  },

  activeBadgeCoach: {
    backgroundColor: "#33C481",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    marginLeft: 10,
  },

  activeTextCoach: {
    color: "#fff",
    fontWeight: "700",
  },

  calendarCard: {
    height: 550,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    elevation: 4,
    marginBottom: 20,
  },

  inventoryCard: {
    height: 500,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    elevation: 4,
    marginBottom: 20,
  },

  itemCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 16,
    marginBottom: 12,
  },

  iconBox: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },

  itemName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0F172A",
  },

  category: {
    color: "#64748B",
    marginTop: 3,
  },

  stock: {
    marginTop: 3,
    color: "#334155",
  },

  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },

  statusText: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "600",
  },

  targetCard: {
    marginHorizontal: 20,
    backgroundColor: "#DE1019",
    borderRadius: 24,
    padding: 20,
    marginTop: 10,
    marginBottom: 10,
  },

  targetTitle: {
    color: "#fff",
    fontSize: 16,
  },

  targetValue: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "700",
    marginVertical: 10,
  },

  progressBackground: {
    height: 10,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.3)",
  },

  progressFill: {
    height: 10,
    borderRadius: 10,
    backgroundColor: "#fff",
  },

  progressText: {
    color: "#fff",
    marginTop: 10,
  },
});
