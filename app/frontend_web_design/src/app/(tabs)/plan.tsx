import { Ionicons, MaterialIcons } from "@expo/vector-icons";
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

// ============ DATA ============
const dataPlan = [
  {
    id: "1",
    planName: "1 month",
    validity: "1",
    amount: "800",
  },
  {
    id: "2",
    planName: "3 month",
    validity: "3",
    amount: "2200",
  },
  {
    id: "3",
    planName: "6 month",
    validity: "6",
    amount: "4300",
  },
  {
    id: "4",
    planName: "Annual",
    validity: "12",
    amount: "8500",
  },
];

export default function PlanScreen() {
  const router = useRouter();

  const [planName, setPlanName] = useState("");
  const [validity, setValidity] = useState("");
  const [amount, setAmount] = useState("");
  const [search, setSearch] = useState("");
  const [plans, setPlans] = useState(dataPlan);

  const handleSave = () => {
    if (!planName || !validity || !amount) return;

    const newPlan = {
      id: Date.now().toString(),
      planName,
      validity,
      amount,
    };

    setPlans([...plans, newPlan]);

    setPlanName("");
    setValidity("");
    setAmount("");
  };

  const filteredData = plans.filter((item) =>
    item.planName.toLowerCase().includes(search.toLowerCase()),
  );

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
          />
          <MenuItem
            icon="check-box"
            title="Plan"
            onPress={() => router.push("/plan")}
            active
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
            {/* TOP SCREEN */}
            <View style={styles.sectionTitleBadge}>
              <Text style={styles.sectionTitle}>Add Plan</Text>
            </View>

            {/* Input Plan */}
            <View style={styles.topScreenCard}>
              <View style={styles.row}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.labelInput}>Plan Name</Text>
                  <TextInput
                    style={styles.inputPlan}
                    value={planName}
                    onChangeText={setPlanName}
                  />
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={styles.labelInput}>Validity</Text>
                  <TextInput
                    style={styles.inputPlan}
                    value={validity}
                    keyboardType="numeric"
                    onChangeText={setValidity}
                  />
                </View>
              </View>

              <View style={{ marginTop: 20, width: "49%" }}>
                <Text style={styles.labelInput}>Amount</Text>
                <TextInput
                  style={styles.inputPlan}
                  value={amount}
                  keyboardType="numeric"
                  onChangeText={setAmount}
                />
              </View>

              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={handleSave}
                >
                  <Text style={styles.saveText}>Save</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.cancelButton}>
                  <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* View Plan */}
            <View style={styles.centerScreenCard}>
              <View style={styles.centerBar}>
                <View style={styles.entries}>
                  <Text style={styles.entriesText}>Show Entries</Text>

                  <View style={styles.dropdown}>
                    <Text style={styles.dropdownText}>10 ▼</Text>
                  </View>
                </View>

                <TextInput
                  placeholder="Search"
                  placeholderTextColor="#fff"
                  style={styles.searchInput}
                  value={search}
                  onChangeText={setSearch}
                />
              </View>

              {/* HEADER */}
              <View style={styles.headerRow}>
                <Text style={[styles.headerText, { flex: 2 }]}>
                  ⇅ Plan Name
                </Text>
                <Text style={styles.headerText}>⇅ Validity</Text>
                <Text style={styles.headerText}>⇅ Amount</Text>
                <Text style={styles.headerText}>⇅ Edit</Text>
              </View>

              <FlatList
                data={filteredData}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <View style={styles.dataRow}>
                    <Text style={[styles.dataText, { flex: 2 }]}>
                      {item.planName}
                    </Text>

                    <Text style={styles.dataText}>{item.validity}</Text>

                    <Text style={styles.dataText}>{item.amount}</Text>

                    <TouchableOpacity style={styles.editBtn}>
                      <Text style={styles.editText}>Edit</Text>
                    </TouchableOpacity>
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
  grid: {
    flexDirection: "row",
    gap: 20,
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

  sectionTitleBadge: {
    width: "20%",
    backgroundColor: "#fff",
    //paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 30,
    //marginLeft: 20,
    padding: 15,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 24,
    color: "#ED1018",
    fontWeight: "700",
    textAlign: "center",
    //marginBottom: 15,
  },

  // ==== Top Screen ====
  topScreenCard: {
    flex: 1,
    //height: 500,
    backgroundColor: "#ED1018",
    borderRadius: 20,
    padding: 40,
    marginTop: 10,
    marginBottom: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  row: {
    flexDirection: "row",
    gap: 20,
  },
  labelInput: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 10,
  },
  inputPlan: {
    backgroundColor: "#e7e7e7",
    borderRadius: 14,
    height: 55,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 30,
    gap: 10,
  },
  saveButton: {
    backgroundColor: "#f4cf35",
    borderRadius: 14,
    paddingHorizontal: 25,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
  },
  saveText: {
    fontWeight: "700",
    color: "#001f7f",
  },
  cancelButton: {
    backgroundColor: "#fff",
    borderRadius: 14,
    paddingHorizontal: 25,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
  },
  cancelText: {
    color: "#444",
  },

  // ==== Center Screen ====
  centerScreenCard: {
    //flex: 1,
    height: 500,
    backgroundColor: "#ED1018",
    borderRadius: 20,
    padding: 40,
    marginTop: 10,
    marginBottom: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  centerBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
    alignItems: "center",
  },

  entries: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  entriesText: {
    color: "#fff",
  },
  dropdown: {
    backgroundColor: "#c4000f",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 12,
  },
  dropdownText: {
    color: "#fff",
  },

  searchInput: {
    width: 180,
    height: 40,
    backgroundColor: "#c4000f",
    borderRadius: 12,
    color: "#fff",
    paddingHorizontal: 15,
  },

  headerRow1: {
    flexDirection: "row",
    marginBottom: 15,
  },
  headerText1: {
    flex: 1,
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },

  dataRow1: {
    flexDirection: "row",
    paddingVertical: 15,
    alignItems: "center",
    marginRight: 20,
  },
  dataText1: {
    flex: 1,
    color: "#fff",
    fontSize: 15,
  },

  headerRow: {
    flexDirection: "row",
    marginBottom: 15,
  },
  headerText: {
    flex: 1,
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
    textAlign: "right",
  },

  dataRow: {
    flexDirection: "row",
    marginBottom: 15,
  },
  dataText: {
    flex: 1,
    color: "#fff",
    fontSize: 15,
    textAlign: "right",
  },

  editBtn: {
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 20,
  },

  editText: {
    color: "#333",
    fontSize: 12,
  },
});
