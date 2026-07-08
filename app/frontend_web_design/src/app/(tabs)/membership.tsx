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
interface dataActiveMembers {
  id: string;
  name: string;
  memberId: string;
  dateEnrolled: string;
  dateExpiration: string;
  status: "Active" | "Blocked";
  photo: string;
}

const initialDataActiveMembers: dataActiveMembers[] = [
  {
    id: "1",
    name: "James Medalla",
    memberId: "SFM2301N1",
    dateEnrolled: "2024-05-11",
    dateExpiration: "2026-05-11",
    status: "Active",
    photo: "https://i.pravatar.cc/300?img=1",
  },
  {
    id: "2",
    name: "Chris Medalla",
    memberId: "SFM2301N2",
    dateEnrolled: "2024-05-12",
    dateExpiration: "2026-05-12",
    status: "Active",
    photo: "https://i.pravatar.cc/300?img=2",
  },
  {
    id: "3",
    name: "James Chris",
    memberId: "SFM2301N3",
    dateEnrolled: "2024-05-13",
    dateExpiration: "2026-05-13",
    status: "Active",
    photo: "https://i.pravatar.cc/300?img=3",
  },
  {
    id: "4",
    name: "Sarah Medalla",
    memberId: "SFM2301N4",
    dateEnrolled: "2024-05-14",
    dateExpiration: "2026-05-14",
    status: "Blocked",
    photo: "https://i.pravatar.cc/300?img=4",
  },
  {
    id: "5",
    name: "James Sarah",
    memberId: "SFM2301N5",
    dateEnrolled: "2024-05-15",
    dateExpiration: "2026-05-15",
    status: "Active",
    photo: "https://i.pravatar.cc/300?img=5",
  },
  {
    id: "6",
    name: "Lee Medalla",
    memberId: "SFM2301N6",
    dateEnrolled: "2024-05-16",
    dateExpiration: "2026-05-16",
    status: "Active",
    photo: "https://i.pravatar.cc/300?img=6",
  },
  {
    id: "7",
    name: "James Medalla Lee",
    memberId: "SFM2301N7",
    dateEnrolled: "2024-05-17",
    dateExpiration: "2026-05-17",
    status: "Active",
    photo: "https://i.pravatar.cc/300?img=7",
  },
  {
    id: "8",
    name: "James Lee",
    memberId: "SFM2301N8",
    dateEnrolled: "2024-05-19",
    dateExpiration: "2026-05-19",
    status: "Active",
    photo: "https://i.pravatar.cc/300?img=8",
  },
  {
    id: "9",
    name: "Leeoe Medalla",
    memberId: "SFM2301N9",
    dateEnrolled: "2024-06-12",
    dateExpiration: "2026-06-12",
    status: "Active",
    photo: "https://i.pravatar.cc/300?img=9",
  },
  {
    id: "10",
    name: "James Leeber",
    memberId: "SFM2301N10",
    dateEnrolled: "2024-05-20",
    dateExpiration: "2026-05-20",
    status: "Active",
    photo: "https://i.pravatar.cc/300?img=10",
  },
  {
    id: "11",
    name: "Bearto Medalla",
    memberId: "SFM2301N11",
    dateEnrolled: "2024-05-12",
    dateExpiration: "2026-05-12",
    status: "Active",
    photo: "https://i.pravatar.cc/300?img=2",
  },
  {
    id: "12",
    name: "James Hong",
    memberId: "SFM2301N12",
    dateEnrolled: "2024-05-12",
    dateExpiration: "2026-05-12",
    status: "Active",
    photo: "https://i.pravatar.cc/300?img=2",
  },
  {
    id: "13",
    name: "Hong Lee Medalla",
    memberId: "SFM2301N13",
    dateEnrolled: "2024-05-12",
    dateExpiration: "2026-05-12",
    status: "Blocked",
    photo: "https://i.pravatar.cc/300?img=2",
  },
  {
    id: "14",
    name: "James Medalla Chonghe",
    memberId: "SFM2301N14",
    dateEnrolled: "2024-05-12",
    dateExpiration: "2026-05-12",
    status: "Active",
    photo: "https://i.pravatar.cc/300?img=2",
  },
  {
    id: "15",
    name: "David Medalla",
    memberId: "SFM2301N15",
    dateEnrolled: "2024-05-12",
    dateExpiration: "2026-05-12",
    status: "Active",
    photo: "https://i.pravatar.cc/300?img=2",
  },
  {
    id: "16",
    name: "James David",
    memberId: "SFM2301N16",
    dateEnrolled: "2024-05-12",
    dateExpiration: "2026-05-12",
    status: "Active",
    photo: "https://i.pravatar.cc/300?img=2",
  },
  {
    id: "17",
    name: "Sarah Johnson",
    memberId: "SFM2301N17",
    dateEnrolled: "2024-05-12",
    dateExpiration: "2026-05-12",
    status: "Active",
    photo: "https://i.pravatar.cc/300?img=2",
  },
  {
    id: "18",
    name: "David Lee",
    memberId: "SFM2301N18",
    dateEnrolled: "2024-05-12",
    dateExpiration: "2026-05-12",
    status: "Active",
    photo: "https://i.pravatar.cc/300?img=2",
  },
  {
    id: "19",
    name: "Emma Watson",
    memberId: "SFM2301N19",
    dateEnrolled: "2024-05-12",
    dateExpiration: "2026-05-12",
    status: "Blocked",
    photo: "https://i.pravatar.cc/300?img=2",
  },
  {
    id: "20",
    name: "Chris Evans",
    memberId: "SFM2301N20",
    dateEnrolled: "2024-05-12",
    dateExpiration: "2026-05-12",
    status: "Active",
    photo: "https://i.pravatar.cc/300?img=2",
  },
  {
    id: "21",
    name: "Evans Loo",
    memberId: "SFM2301N21",
    dateEnrolled: "2024-05-12",
    dateExpiration: "2026-05-12",
    status: "Active",
    photo: "https://i.pravatar.cc/300?img=2",
  },
  {
    id: "22",
    name: "Evans Medalla",
    memberId: "SFM2301N22",
    dateEnrolled: "2024-05-12",
    dateExpiration: "2026-05-12",
    status: "Active",
    photo: "https://i.pravatar.cc/300?img=2",
  },
  {
    id: "23",
    name: "James Chris",
    memberId: "SFM2301N23",
    dateEnrolled: "2024-05-12",
    dateExpiration: "2026-05-12",
    status: "Active",
    photo: "https://i.pravatar.cc/300?img=2",
  },
];

export default function MemberScreen() {
  const router = useRouter();
  const [activeMembersData, setActiveMembersData] = useState<
    dataActiveMembers[]
  >(initialDataActiveMembers);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [entries, setEntries] = useState(10);
  const [page, setPage] = useState(1);

  const filteredData = useMemo(() => {
    return activeMembersData.filter((item) => {
      const keyword = search.toLowerCase();

      const matchSearch =
        item.name.toLowerCase().includes(keyword) ||
        item.memberId.toString().toLowerCase().includes(keyword);

      const matchStatus =
        statusFilter === "All" ? true : item.status === statusFilter;

      return matchSearch && matchStatus;
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
      <Text style={[styles.dataTextList, { flex: 2 }]}>{item.memberId}</Text>

      <Text style={[styles.dataTextList, { flex: 2, textAlign: "center" }]}>
        {item.dateEnrolled}
      </Text>
      <Text style={[styles.dataTextList, { flex: 2, textAlign: "center" }]}>
        {item.dateExpiration}
      </Text>

      <Text
        style={[
          styles.dataTextList,
          {
            flex: 2,
            textAlign: "center",
            color: item.status === "Active" ? "#22C55E" : "#FACC15",
          },
        ]}
      >
        {item.status}
      </Text>

      <View
        style={{
          flex: 1.5,
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
  const [selectedActiveMembers, setSelectedActiveMembers] =
    useState<dataActiveMembers | null>(null);
  const [MemberName, setMemberName] = useState("");
  const [MemberId, setMemberId] = useState("");
  const [MemberDateEnrolled, setMemberDateEnrolled] = useState("");
  const [MemberDateExpiration, setMemberDateExpiration] = useState("");
  const [status, setStatus] = useState<"Active" | "Blocked">("Active");
  const [image, setImage] = useState("");

  const handleAdd = () => {
    setSelectedActiveMembers(null);
    setMemberName("");
    setMemberId("");
    setMemberDateEnrolled("");
    setMemberDateExpiration("");
    setStatus("Active");
    setImage("");

    setShowModal(true);
  };

  const handleEdit = (item: dataActiveMembers) => {
    setSelectedActiveMembers(item);
    setMemberName(item.name);
    setMemberId(item.memberId);
    setMemberDateEnrolled(item.dateEnrolled);
    setMemberDateExpiration(item.dateExpiration);
    setStatus(item.status);
    setImage(item.photo);

    setShowModal(true);
  };

  const handleSave = () => {
    if (MemberName.trim() === "") {
      alert("Member Name is required");
      return;
    }

    if (selectedActiveMembers) {
      // UPDATE
      const updatedData = activeMembersData.map((item) =>
        item.id === selectedActiveMembers.id
          ? {
              ...item,
              name: MemberName,
              memberId: MemberId,
              dateEnrolled: MemberDateEnrolled,
              dateExpiration: MemberDateExpiration,
              status: status,
              photo: image,
            }
          : item,
      );

      setActiveMembersData(updatedData);

      alert("Members updated successfully");
    } else {
      // ADD
      const newActiveMembers: dataActiveMembers = {
        id: Date.now().toString(),
        name: MemberName,
        memberId: MemberId,
        dateEnrolled: MemberDateEnrolled,
        dateExpiration: MemberDateExpiration,
        status: status,
        photo: image,
      };

      setActiveMembersData([...activeMembersData, newActiveMembers]);

      alert("Members added successfully");
    }
    resetForm();
  };

  const handleDelete = (id: string) => {
    const data = activeMembersData.filter((item) => item.id !== id);

    setActiveMembersData(data);

    alert("Members delete successfully");
  };

  const handleCancel = () => {
    resetForm();
    setShowModal(false);
  };

  const resetForm = () => {
    setSelectedActiveMembers(null);
    setMemberName("");
    setMemberId("");
    setMemberDateEnrolled("");
    setMemberDateExpiration("");
    setStatus("Active");
    setImage("");

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
          />
          <MenuItem
            icon="groups"
            title="Membership"
            onPress={() => router.push("/membership")}
            active
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
              <Text style={styles.sectionTitle}>Add Member</Text>
            </Pressable>

            <View style={styles.cardList}>
              <Text style={styles.titleList}>Gym Members</Text>

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
                    placeholder="Search members..."
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
                    <Picker.Item label="Blocked" value="Blocked" />
                  </Picker>
                </View>
              </View>

              {/* Header */}
              <View style={styles.headerRowList}>
                <Text style={[styles.headerTextList, { flex: 3 }]}>Name</Text>
                <Text style={[styles.headerTextList, { flex: 2 }]}>
                  Member ID
                </Text>

                <Text
                  style={[
                    styles.headerTextList,
                    {
                      flex: 2,
                      textAlign: "center",
                    },
                  ]}
                >
                  Date Enrolled
                </Text>

                <Text
                  style={[
                    styles.headerTextList,
                    {
                      flex: 2,
                      textAlign: "center",
                    },
                  ]}
                >
                  Date Expiration
                </Text>

                <Text
                  style={[
                    styles.headerTextList,
                    {
                      flex: 2,
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
                      flex: 1.5,
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
                    {selectedActiveMembers ? "Edit Member" : "Add Member"}
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

                  <Text style={styles.labelModal}>Member Name</Text>
                  <TextInput
                    value={MemberName}
                    onChangeText={setMemberName}
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
                          <Picker.Item label="Blocked" value="Blocked" />
                        </Picker>
                      </View>
                    </View>

                    <View
                      style={{
                        flex: 0.7,
                        marginLeft: 10,
                      }}
                    >
                      <Text style={styles.labelModal}>Date Enrolled</Text>

                      <TextInput
                        value={MemberDateEnrolled}
                        onChangeText={setMemberDateEnrolled}
                        style={styles.inputModal}
                      />
                    </View>

                    <View
                      style={{
                        flex: 0.7,
                        marginLeft: 10,
                      }}
                    >
                      <Text style={styles.labelModal}>Date Expiration</Text>

                      <TextInput
                        value={MemberDateExpiration}
                        onChangeText={setMemberDateExpiration}
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
