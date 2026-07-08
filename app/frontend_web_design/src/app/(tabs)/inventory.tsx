import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import React, { useMemo, useRef, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// ============ DATA ============
interface Equipment {
  id: string;
  name: string;
  total: number;
  status: "Active" | "Inactive";
  photo: string;
}

const initialEquipmentData: Equipment[] = [
  //const [equipmentData, setEquipmentData] = useState<Equipment[]>([
  {
    id: "1",
    name: "Treadmill",
    total: 1,
    status: "Active",
    photo: "https://i.pravatar.cc/300?img=15",
  },
  {
    id: "2",
    name: "10 lbs Dumbell",
    total: 3,
    status: "Inactive",
    photo: "https://i.pravatar.cc/300?img=16",
  },
  {
    id: "3",
    name: "15 lbs Dumbell",
    total: 6,
    status: "Active",
    photo: "https://i.pravatar.cc/300?img=17",
  },
  {
    id: "4",
    name: "20 lbs Dumbell",
    total: 12,
    status: "Active",
    photo: "https://i.pravatar.cc/300?img=18",
  },
  {
    id: "5",
    name: "21 lbs Dumbell",
    total: 12,
    status: "Active",
    photo: "https://i.pravatar.cc/300?img=19",
  },
  {
    id: "6",
    name: "22 lbs Dumbell",
    total: 12,
    status: "Active",
    photo: "https://i.pravatar.cc/300?img=20",
  },
  {
    id: "7",
    name: "23 lbs Dumbell",
    total: 12,
    status: "Active",
    photo: "https://i.pravatar.cc/300?img=21",
  },
  {
    id: "8",
    name: "24 lbs Dumbell",
    total: 12,
    status: "Active",
    photo: "https://i.pravatar.cc/300?img=22",
  },
  {
    id: "9",
    name: "26 lbs Dumbell",
    total: 12,
    status: "Active",
    photo: "https://i.pravatar.cc/300?img=23",
  },
  {
    id: "10",
    name: "27 lbs Dumbell",
    total: 12,
    status: "Active",
    photo: "https://i.pravatar.cc/300?img=24",
  },
  {
    id: "11",
    name: "26 lbs Dumbell",
    total: 12,
    status: "Active",
    photo: "https://i.pravatar.cc/300?img=25",
  },
  {
    id: "12",
    name: "29 lbs Dumbell",
    total: 12,
    status: "Active",
    photo: "https://i.pravatar.cc/300?img=26",
  },
  {
    id: "13",
    name: "30 lbs Dumbell",
    total: 12,
    status: "Active",
    photo: "https://i.pravatar.cc/300?img=27",
  },
  {
    id: "14",
    name: "31 lbs Dumbell",
    total: 12,
    status: "Inactive",
    photo: "https://i.pravatar.cc/300?img=28",
  },
  {
    id: "15",
    name: "32 lbs Dumbell",
    total: 12,
    status: "Active",
    photo: "https://i.pravatar.cc/300?img=29",
  },
  {
    id: "16",
    name: "33 lbs Dumbell",
    total: 12,
    status: "Active",
    photo: "https://i.pravatar.cc/300?img=30",
  },
  {
    id: "17",
    name: "34 lbs Dumbell",
    total: 12,
    status: "Active",
    photo: "https://i.pravatar.cc/300?img=31",
  },
  {
    id: "18",
    name: "35 lbs Dumbell",
    total: 12,
    status: "Active",
    photo: "https://i.pravatar.cc/300?img=32",
  },
  {
    id: "19",
    name: "36 lbs Dumbell",
    total: 12,
    status: "Active",
    photo: "https://i.pravatar.cc/300?img=33",
  },
  {
    id: "20",
    name: "37 lbs Dumbell",
    total: 12,
    status: "Active",
    photo: "https://i.pravatar.cc/300?img=34",
  },
  {
    id: "21",
    name: "40 lbs Dumbell",
    total: 12,
    status: "Active",
    photo: "https://i.pravatar.cc/300?img=35",
  },
  {
    id: "22",
    name: "41 lbs Dumbell",
    total: 12,
    status: "Active",
    photo: "https://i.pravatar.cc/300?img=36",
  },
  {
    id: "23",
    name: "42 lbs Dumbell",
    total: 12,
    status: "Active",
    photo: "https://i.pravatar.cc/300?img=37",
  },
  {
    id: "24",
    name: "43 lbs Dumbell",
    total: 12,
    status: "Active",
    photo: "https://i.pravatar.cc/300?img=38",
  },
  {
    id: "25",
    name: "44 lbs Dumbell",
    total: 12,
    status: "Inactive",
    photo: "https://i.pravatar.cc/300?img=39",
  },
  {
    id: "26",
    name: "Exercise Bike",
    total: 4,
    status: "Active",
    photo: "https://i.pravatar.cc/300?img=40",
  },
  {
    id: "27",
    name: "Bench Press",
    total: 2,
    status: "Active",
    photo: "https://i.pravatar.cc/300?img=41",
  },
  {
    id: "28",
    name: "Rowing Machine",
    total: 5,
    status: "Inactive",
    photo: "https://i.pravatar.cc/300?img=42",
  },
  {
    id: "29",
    name: "Pull Up Bar",
    total: 3,
    status: "Active",
    photo: "https://i.pravatar.cc/300?img=43",
  },
  {
    id: "30",
    name: "Cable Machine",
    total: 1,
    status: "Active",
    photo: "https://i.pravatar.cc/300?img=44",
  },
  {
    id: "31",
    name: "Smith Machine",
    total: 2,
    status: "Inactive",
    photo: "https://i.pravatar.cc/300?img=45",
  },
  {
    id: "32",
    name: "Leg Press",
    total: 4,
    status: "Active",
    photo: "https://i.pravatar.cc/300?img=46",
  },
  {
    id: "33",
    name: "Kettlebell",
    total: 20,
    status: "Active",
    photo: "https://i.pravatar.cc/300?img=47",
  },
  {
    id: "34",
    name: "Yoga Mat",
    total: 30,
    status: "Active",
    photo: "https://i.pravatar.cc/300?img=48",
  },
  //]);
];

export default function InventoryScreen() {
  const router = useRouter();
  const [equipmentData, setEquipmentData] =
    useState<Equipment[]>(initialEquipmentData);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [entries, setEntries] = useState(10);
  const [page, setPage] = useState(1);

  const filteredData = useMemo(() => {
    return equipmentData.filter((item) => {
      const matchName = item.name.toLowerCase().includes(search.toLowerCase());

      const matchStatus =
        statusFilter === "All" ? true : item.status === statusFilter;

      return matchName && matchStatus;
    });
  }, [search, statusFilter]);

  const totalPages = Math.ceil(filteredData.length / entries);

  const currentData = useMemo(() => {
    const startIndex = (page - 1) * entries;
    const endIndex = startIndex + entries;

    return filteredData.slice(startIndex, endIndex);
  }, [filteredData, page, entries]);

  const handleEntriesChange = (value: any) => {
    setEntries(value);
    setPage(1);
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.dataRowList}>
      <Text style={[styles.dataTextList, { flex: 3 }]}>{item.name}</Text>

      <Text style={[styles.dataTextList, { flex: 1, textAlign: "center" }]}>
        {item.total}
      </Text>

      <Text
        style={[
          styles.dataTextList,
          {
            flex: 1.6,
            textAlign: "center",
            color: item.status === "Active" ? "#22C55E" : "#FACC15",
          },
        ]}
      >
        {item.status}
      </Text>

      <View
        style={{
          flex: 0.8,
          alignItems: "center",
          flexDirection: "row",
          gap: 10,
        }}
      >
        <Pressable
          style={styles.editButtonList}
          onPress={() => handleEdit(item)}
        >
          <Text style={styles.editTextList}>Edit</Text>
        </Pressable>

        <Pressable
          style={{
            backgroundColor: "#fff",
            paddingHorizontal: 10,
            paddingVertical: 6,
            borderRadius: 10,
          }}
          onPress={() => handleDelete(item)}
        >
          <Feather name="trash" size={20} color="#9a0505" />
        </Pressable>
      </View>
    </View>
  );

  const [showModal, setShowModal] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(
    null,
  );
  const [equipmentName, setEquipmentName] = useState("");
  const [status, setStatus] = useState<"Active" | "Inactive">("Active");
  const [totalNo, setTotalNo] = useState(1);
  const [image, setImage] = useState("");

  const handleAdd = () => {
    setSelectedEquipment(null);
    setEquipmentName("");
    setTotalNo(0);
    setStatus("Active");
    setImage("");

    setShowModal(true);
  };

  const handleEdit = (item: Equipment) => {
    setSelectedEquipment(item);
    setEquipmentName(item.name);
    setTotalNo(item.total);
    setStatus(item.status);
    setImage(item.photo);

    setShowModal(true);
  };

  const handleSave = () => {
    if (equipmentName.trim() === "") {
      alert("Equipment Name is required");
      return;
    }

    if (selectedEquipment) {
      // UPDATE
      const updatedData = equipmentData.map((item) =>
        item.id === selectedEquipment.id
          ? {
              ...item,
              name: equipmentName,
              total: totalNo,
              status: status,
              photo: image,
            }
          : item,
      );

      setEquipmentData(updatedData);

      alert("Equipment updated successfully");
    } else {
      // ADD
      const newEquipment: Equipment = {
        id: Date.now().toString(),
        name: equipmentName,
        total: totalNo,
        status: status,
        photo: image,
      };

      setEquipmentData([...equipmentData, newEquipment]);

      alert("Equipment added successfully");
    }
    resetForm();
  };

  const handleDelete = (id: string) => {
    const data = equipmentData.filter((item) => item.id !== id);

    setEquipmentData(data);

    alert("Equipment delete successfully");
  };

  const handleCancel = () => {
    resetForm();
    setShowModal(false);
  };

  const resetForm = () => {
    setEquipmentName("");
    setTotalNo(1);
    setStatus("Active");
    setImage("");
    setSelectedEquipment(null);

    setShowModal(false);
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  const pickImageWeb = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setImage(imageUrl);
  };

  const removePhoto = () => {
    setImage("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

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
            active
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
            <Pressable style={styles.addTitleBadge} onPress={handleAdd}>
              <Text style={styles.sectionTitle}>Add Equipment</Text>
            </Pressable>

            <View style={styles.cardList}>
              <Text style={styles.titleList}>Manage Equipments</Text>

              {/* Top Section */}
              <View style={styles.topBarList}>
                <View style={styles.leftSectionList}>
                  <Text style={styles.labelList}>Show Entries</Text>

                  <View style={styles.pickerWrapperList}>
                    <Picker
                      selectedValue={entries}
                      onValueChange={handleEntriesChange}
                      style={styles.pickerList}
                    >
                      <Picker.Item label="10" value={10} />
                      <Picker.Item label="20" value={20} />
                      <Picker.Item label="30" value={30} />
                      <Picker.Item label="50" value={50} />
                    </Picker>
                  </View>
                </View>

                <View style={styles.filterContainerList}>
                  <TextInput
                    placeholder="Search equipment..."
                    value={search}
                    onChangeText={setSearch}
                    style={styles.searchInputList}
                  />

                  <Picker
                    selectedValue={statusFilter}
                    onValueChange={(value: string) => {
                      setStatusFilter(value);
                      setPage(1);
                    }}
                    style={styles.pickerSearchList}
                  >
                    <Picker.Item label="All Status" value="All" />
                    <Picker.Item label="Active" value="Active" />
                    <Picker.Item label="Inactive" value="Inactive" />
                  </Picker>
                </View>
              </View>

              {/* Header */}
              <View style={styles.headerRowList}>
                <Text style={[styles.headerTextList, { flex: 3 }]}>
                  Equipment Name
                </Text>

                <Text
                  style={[
                    styles.headerTextList,
                    {
                      flex: 1,
                      textAlign: "center",
                    },
                  ]}
                >
                  Total No.
                </Text>

                <Text
                  style={[
                    styles.headerTextList,
                    {
                      flex: 1.6,
                      textAlign: "center",
                    },
                  ]}
                >
                  Status
                </Text>

                <Text
                  style={[
                    styles.headerTextList,
                    {
                      flex: 0.8,
                      textAlign: "center",
                    },
                  ]}
                >
                  Actions
                </Text>
              </View>

              {/* Data */}
              <FlatList
                data={currentData}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
              />

              {/* Footer */}
              <View style={styles.headerRowList} />
              <View style={styles.footerList}>
                <Text style={styles.footerTextList}>
                  Showing {(page - 1) * entries + 1}-
                  {Math.min(page * entries, filteredData.length)} of{" "}
                  {filteredData.length} entries
                </Text>

                <View style={styles.paginationList}>
                  <Pressable
                    style={[
                      styles.pageButtonList,
                      page === 1 && {
                        opacity: 0.5,
                      },
                    ]}
                    disabled={page === 1}
                    onPress={() => setPage(page - 1)}
                  >
                    <Text style={{ fontWeight: "bold" }}>Previous</Text>
                  </Pressable>

                  <Text style={styles.pageNumberList}>
                    {page} / {totalPages}
                  </Text>

                  <Pressable
                    style={[
                      styles.pageButtonList,
                      page === totalPages && {
                        opacity: 0.5,
                      },
                    ]}
                    disabled={page === totalPages}
                    onPress={() => setPage(page + 1)}
                  >
                    <Text style={{ fontWeight: "bold" }}>Next</Text>
                  </Pressable>
                </View>
              </View>

              {/* Screen Modal */}
              {showModal && (
                <View style={styles.modalScreen}>
                  <Text style={styles.titleModal}>
                    {selectedEquipment ? "Edit Equipment" : "Add Equipment"}
                  </Text>

                  {/* Attach Photo Button */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={pickImageWeb}
                    style={{ display: "none" }}
                  />

                  <View style={{ flexDirection: "row" }}>
                    <Pressable onPress={openFilePicker}>
                      <Text style={styles.attachPhotoModal}>
                        Attach Photo ✏️
                      </Text>
                    </Pressable>
                    <Text style={styles.attachPhotoModal}> | </Text>
                    <Pressable onPress={removePhoto}>
                      <Text style={styles.attachPhotoModal}>
                        Remove Photo ❌
                      </Text>
                    </Pressable>
                  </View>

                  {image ? (
                    <Image
                      source={{ uri: image }}
                      style={styles.imagePlaceholderModal}
                    />
                  ) : (
                    <View style={styles.imagePlaceholderModal}></View>
                  )}

                  <Text style={styles.labelModal}>Equipment Name</Text>

                  <TextInput
                    value={equipmentName}
                    onChangeText={setEquipmentName}
                    style={styles.inputModal}
                  />

                  <View style={styles.rowModal}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.labelModal}>Status</Text>

                      <View style={styles.pickerContainerModal}>
                        <Picker
                          selectedValue={status}
                          onValueChange={(value) => setStatus(value)}
                          style={styles.pickerContainerListModal}
                        >
                          <Picker.Item label="Active" value="Active" />
                          <Picker.Item label="Inactive" value="Inactive" />
                        </Picker>
                      </View>
                    </View>

                    <View
                      style={{
                        flex: 0.7,
                        marginLeft: 10,
                      }}
                    >
                      <Text style={styles.labelModal}>Total No.</Text>

                      <TextInput
                        value={totalNo.toString()}
                        onChangeText={(text) => setTotalNo(Number(text))}
                        keyboardType="numeric"
                        style={styles.inputModal}
                      />
                    </View>
                  </View>

                  <View style={styles.buttonRowModal}>
                    <Pressable
                      style={styles.cancelButtonModal}
                      onPress={handleCancel}
                    >
                      <Text
                        style={{
                          color: "#F00",
                        }}
                      >
                        Cancel
                      </Text>
                    </Pressable>

                    <Pressable
                      style={styles.saveButtonModal}
                      onPress={handleSave}
                    >
                      <Text
                        style={{
                          color: "#fff",
                          fontWeight: "700",
                        }}
                      >
                        Save Changes
                      </Text>
                    </Pressable>
                  </View>
                </View>
              )}
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

  addTitleBadge: {
    width: "30%",
    backgroundColor: "#fff",
    //paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 30,
    //marginLeft: 20,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ED1018",
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

  //========= Inventory List =========
  cardList: {
    backgroundColor: "#ED1018",
    borderRadius: 20,
    borderWidth: 3,
    borderColor: "#f44c52",
    padding: 25,
    marginTop: 20,
    marginBottom: 20,
  },
  titleList: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 25,
  },
  topBarList: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
    alignItems: "center",
  },
  leftSectionList: {
    flexDirection: "row",
    alignItems: "center",
  },
  labelList: {
    color: "#fff",
    fontWeight: "700",
    marginRight: 10,
  },
  pickerWrapperList: {
    width: 60,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#C1121F",
  },
  pickerList: {
    height: 45,
    backgroundColor: "#C1121F",
    color: "#fff",
    borderRadius: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
  filterContainerList: {
    flexDirection: "row",
    gap: 15,
    marginBottom: 20,
    alignItems: "center",
  },
  searchInputList: {
    width: 250,
    height: 45,
    backgroundColor: "#C1121F",
    borderRadius: 10,
    paddingHorizontal: 15,
    color: "#fff",
    fontWeight: "bold",
  },
  pickerSearchList: {
    width: 90,
    height: 45,
    backgroundColor: "#C1121F",
    color: "#fff",
    borderRadius: 10,
    fontWeight: "bold",
    textAlign: "center",
  },

  headerRowList: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.22)",
    paddingBottom: 15,
    marginBottom: 10,
    marginTop: 20,
  },
  headerTextList: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  dataRowList: {
    flexDirection: "row",
    paddingVertical: 15,
    alignItems: "center",
  },
  dataTextList: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "500",
  },
  editButtonList: {
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 10,
  },
  editTextList: {
    fontWeight: "700",
  },

  footerList: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerTextList: {
    color: "#fff",
    fontWeight: "bold",
  },
  paginationList: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  pageButtonList: {
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 10,
  },
  pageNumberList: {
    color: "#fff",
    fontWeight: "bold",
  },

  // ====================== Show Modal Screen ================================
  modalScreen: {
    position: "absolute",
    top: 140,
    left: 20,
    right: 20,
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 25,
    elevation: 10,
  },

  titleModal: {
    color: "#E60012",
    fontWeight: "700",
    fontSize: 32,
  },

  attachPhotoModal: {
    color: "#6A5ACD",
    marginTop: 10,
    marginBottom: 20,
  },

  imagePlaceholderModal: {
    position: "absolute",
    top: 20,
    right: 30,
    width: 120,
    height: 120,
    backgroundColor: "#FF0015",
  },

  labelModal: {
    color: "#E60012",
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 10,
    marginTop: 15,
  },

  inputModal: {
    backgroundColor: "#D9D9DD",
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 18,
  },

  rowModal: {
    flexDirection: "row",
  },

  pickerContainerModal: {
    backgroundColor: "#D9D9DD",
    borderRadius: 10,
    overflow: "hidden",
    height: 50,
  },

  pickerContainerListModal: {
    height: 50,
    backgroundColor: "#D9D9DD",
    color: "#1f0809",
    borderRadius: 10,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },

  buttonRowModal: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 30,
    gap: 10,
  },

  cancelButtonModal: {
    borderWidth: 1,
    borderColor: "#FF0000",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },

  saveButtonModal: {
    backgroundColor: "#D4AF37",
    borderRadius: 20,
    paddingHorizontal: 25,
    paddingVertical: 10,
  },

  //=============================================================
  containera: {
    flex: 1,
    padding: 20,
  },

  addButton: {
    backgroundColor: "#D71920",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignSelf: "flex-start",
  },

  addText: {
    color: "#fff",
    fontWeight: "700",
  },

  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
  },

  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },

  editBtn: {
    backgroundColor: "#eee",
    padding: 10,
    borderRadius: 8,
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },

  modal: {
    width: 600,
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#D71920",
    marginBottom: 20,
  },

  attachText: {
    color: "#4F46E5",
    marginBottom: 15,
  },

  previewImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 15,
  },

  placeholder: {
    width: 150,
    height: 150,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 15,
  },

  input: {
    height: 50,
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
  },

  cancelBtn: {
    borderWidth: 1,
    borderColor: "#D71920",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },

  saveBtn: {
    backgroundColor: "#D4AF37",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },

  //-=======================
  titlea: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
    color: "#1E293B",
  },

  attachButton: {
    backgroundColor: "#2563EB",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignSelf: "flex-start",
  },

  attachTexta: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },

  fileContainer: {
    marginTop: 12,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 10,
    padding: 12,
    backgroundColor: "#FFFFFF",
  },

  fileText: {
    color: "#475569",
  },

  previewContainer: {
    marginTop: 20,
  },

  previewImagea: {
    width: 250,
    height: 250,
    borderRadius: 12,
    resizeMode: "cover",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  removeButton: {
    marginTop: 12,
    backgroundColor: "#DC2626",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: "flex-start",
  },

  removeText: {
    color: "#fff",
    fontWeight: "600",
  },
});
