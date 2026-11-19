import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { Link, useRouter } from "expo-router";
import React, { useMemo, useRef, useState } from "react";
import {
  FlatList,
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
} from "react-native";
import PhoneInput from "../../components/PhoneInput";


// ============ DATA ============
interface dataActiveMembership {
  id: string;
  memberName: string;
  memberId: string;
  planName: string;
  planId: string;
  startDate: string;
  endDate: string;
  statusName: string;
  statusId: string;
}

const initialDataActiveMembership: dataActiveMembership[] = [
  {
    id: "1",
    memberName: "James Medalla",
    memberId: "SFM2301N1",
    planName: "1 Month Unlimited Plan",
    planId: "1",
    startDate: "2026-08-10",
    endDate: "2027-01-10",    
    statusName: "Active",
    statusId: "1",
  },
  {
    id: "2",
    memberName: "Chris Medalla",
    memberId: "SFM2301N2",
    planName: "3 Month Unlimited Plan",
    planId: "2",
    startDate: "2026-09-24",
    endDate: "2027-04-24",
    statusName: "Active",
    statusId: "1",
  },
  {
    id: "3",
    memberName: "James Chris",
    memberId: "SFM2301N3",
    planName: "3 Month Unlimited Plan",
    planId: "2",
    startDate: "2026-10-19",
    endDate: "2027-10-19",
    statusName: "Inactive",
    statusId: "2",
  },
];

const dataMember = [
  {
    id: '1',
    memberName: "James Medalla",
    memberId: "SFM2301N1",
  },
  {
    id: '2',
    memberName: "Chris Medalla",
    memberId: "SFM2301N2",
  },
  {
    id: '3',
    memberName: "James Chris",
    memberId: "SFM2301N3",
  },
];

const dataMembershipPlan = [
  {
    id: '1',
    planName: "1 Month Unlimited Plan",
    planId: "1",
  },
  {
    id: '2',
    planName: "3 Month Unlimited Plan",
    planId: "2",
  },
  {
    id: '3',
    planName: "Open Gym Day Pass",
    planId: "3",
  },
  {
    id: '4',
    planName: "Open Gym Unlimited",
    planId: "4",
  },
  {
    id: '5',
    planName: "1x Drop In",
    planId: "5",
  },
  {
    id: '6',
    planName: "5x Drop In",
    planId: "6",
  },
];

const dataMembershipStatus = [
  {
    id: '1',
    statusName: "Active",
    statusId: "1",
  },
  {
    id: '2',
    statusName: "Inactive",
    statusId: "2",
  },
];


export default function MembershipScreen() {
  const router = useRouter();
  const [activeMembershipData, setActiveMembershipData] = useState<
    dataActiveMembership[]
  >(initialDataActiveMembership);

  const [search, setSearch] = useState("");
  const [entries, setEntries] = useState(10);
  const [page, setPage] = useState(1);

  const filteredData = useMemo(() => {
    return activeMembershipData.filter((item) => {
      const keyword = search.toLowerCase();

      const matchSearch =
        item.memberName.toLowerCase().includes(keyword) ||
        item.memberId.toString().toLowerCase().includes(keyword);
      return matchSearch;
    });
  }, [search]);

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
      <Text style={[styles.dataTextList, { flex: 4 }]}>{item.memberId}  -  {item.memberName}</Text>
      <Text style={[styles.dataTextList, { flex: 3, textAlign: "center" }]}>{item.planName}</Text>
      <Text style={[styles.dataTextList, { flex: 3, textAlign: "center" }]}>{item.startDate} | {item.endDate}</Text>

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

  const [showSubMenu, setShowSubMenu] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedActiveMembership, setSelectedActiveMembership] =
    useState<dataActiveMembership | null>(null);
  const [MemberId, setMemberId] = useState("");
  const [PlanId, setPlanId] = useState("");  
  const [StatusId, setStatusId] = useState("");

  const handleAdd = () => {
    setSelectedActiveMembership(null);
    setMemberName("");
    setMemberId("");
    setPlanName("");
    setPlanId("");
    setStartDate("");
    setEndDate("");
    setStatusName("");
    setStatusId("");

    setShowModal(true);
  };

  const handleEdit = (item: dataActiveMembership) => {
    setSelectedActiveMembership(item);

    // Cari data member berdasarkan memberId
    const selectedMember = dataMember.find(
      (member) => member.memberId === item.memberId
    );
    // Simpan object member
    setMemberName(selectedMember || null);
    // Simpan member ID
    setMemberId(item.memberId);

    // Cari data membership plan berdasarkan planId
    const selectedMembershipPlan = dataMembershipPlan.find(
      (membershipPlan) => membershipPlan.planId === item.planId
    );
    // Simpan object membership plan
    setPlanName(selectedMembershipPlan || null);
    // Simpan Plan ID
    setPlanId(item.planId);

    setStartDate(item.startDate);
    setEndDate(item.endDate);

    // Cari data membership status berdasarkan statusId
    const selectedMembershipStatus = dataMembershipStatus.find(
      (membershipStatus) => membershipStatus.statusId === item.statusId
    );
    // Simpan object membership status
    setStatusName(selectedMembershipStatus || null);
    // Simpan Status ID
    setStatusId(item.statusId);

    // Tutup dropdown member
    setShowMemberDropdown(false);
    setMemberSearch("");

    // Tutup dropdown membership Plan
    setShowPlanNameDropdown(false);
    setPlanNameSearch("");

    // Tutup dropdown membership status
    setShowStatusNameDropdown(false);
    setStatusNameSearch("");

    setShowModal(true);
  };

  const handleSave = () => {
    
    if (selectedActiveMembership) {
      // UPDATE
      const selectedIndex = activeMembershipData.findIndex(
        (item) => item.id === selectedActiveMembership.id,
      );

      if (selectedIndex !== -1) {
        const updatedData = [...activeMembershipData];

        updatedData[selectedIndex] = {
          ...updatedData[selectedIndex],
              memberName: memberName,
              memberId: MemberId,
              planName: planName,
              planId: PlanId,
              startDate: startDate,
              endDate: endDate,
              statusName: statusName,
              statusId: StatusId,
            }

        setActiveMembershipData(updatedData);

        alert("Updated successfully");
      }
    } else {
      // ADD
      const newActiveMembership: dataActiveMembership = {
        id: Date.now().toString(),
        memberName: memberName,
        memberId: MemberId,
        planName: planName,
        planId: PlanId,
        startDate: startDate,
        endDate: endDate,
        statusName: statusName,
        statusId: StatusId,
      };

      setActiveMembershipData([...activeMembershipData, newActiveMembership]);

      alert("Added successfully");
    }
    resetForm();
  };

  const handleDelete = (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure, you want to delete this?"
    );

    if (!confirmDelete) return;

    const data = activeMembershipData.filter((item) => item.id !== id);

    setActiveMembershipData(data);

    alert("Delete successfully");
  };

  const handleCancel = () => {
    resetForm();
    setShowModal(false);
  };

  const resetForm = () => {
    setSelectedActiveMembership(null);
    setMemberName("");
    setMemberId("");
    setPlanName("");
    setPlanId("");
    setStartDate("");
    setEndDate("");
    setStatusName("");
    setStatusId("");

    setShowModal(false);
  };

  
  const [memberName, setMemberName] = useState<any>(null);
  const [showMemberDropdown, setShowMemberDropdown] = useState(false);
  const [memberSearch, setMemberSearch] = useState("");

  const filteredMembers = dataMember.filter((item) => {
    const search = memberSearch.toLowerCase();

    return (
      item.memberName.toLowerCase().includes(search) ||
      item.memberId.toLowerCase().includes(search)
    );
  });
  
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showStartDate, setShowStartDate] = useState(false);
  const [showEndDate, setShowEndDate] = useState(false);
  const [date, setDate] = useState(new Date());

  const onChangeStartDate = (event: any, selectedDate?: Date) => {
    setShowStartDate(false);

    if (selectedDate) {
      setDate(selectedDate);

      const formatted =
        selectedDate.getFullYear() +
        "-" +
        String(selectedDate.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(selectedDate.getDate()).padStart(2, "0");

      setStartDate(formatted);
    }
  };

  const onChangeEndDate = (event: any, selectedDate?: Date) => {
    setShowEndDate(false);

    if (selectedDate) {
      setDate(selectedDate);

      const formatted =
        selectedDate.getFullYear() +
        "-" +
        String(selectedDate.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(selectedDate.getDate()).padStart(2, "0");

      setEndDate(formatted);
    }
  };

  const [planName, setPlanName] = useState<any>(null);
  const [showPlanNameDropdown, setShowPlanNameDropdown] = useState(false);
  const [planNameSearch, setPlanNameSearch] = useState("");

  const filteredPlanName = dataMembershipPlan.filter((item) => {
    const search = planNameSearch.toLowerCase();

    return (
      item.planName.toLowerCase().includes(search) ||
      item.planId.toLowerCase().includes(search)
    );
  });

  const [statusName, setStatusName] = useState<any>(null);
  const [showStatusNameDropdown, setShowStatusNameDropdown] = useState(false);
  const [statusNameSearch, setStatusNameSearch] = useState("");

  const filteredStatusName = dataMembershipStatus.filter((item) => {
    const search = statusNameSearch.toLowerCase();

    return (
      item.statusName.toLowerCase().includes(search) ||
      item.statusId.toLowerCase().includes(search)
    );
  });


  return (
    <View style={styles.container}>
      {/* SIDEBAR */}
      <View style={styles.sidebar}>
        <View style={styles.profileSection}>
          <TouchableOpacity onPress={() => router.push("/profile")}>
            <Image
              source={require("@/assets/images/user/user.png")}
              style={styles.avatar}
            />
          </TouchableOpacity>

          <Link style={styles.adminName} href={"/(tabs)/profile"}>Fandi Wijaya</Link>
          <Link style={styles.email} href={"/(tabs)/profile"}>fandiwijaya@doms.com</Link>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <MenuItem
            icon="dashboard"
            title="Dashboard"
            onPress={() => router.push("/dashboard")}
          />
          <MenuItem
            icon="account-circle"
            title="Admin"
            onPress={() => router.push("/admin")}
          />
          <MenuItem
            icon="supervised-user-circle"
            title="Coaches"
            onPress={() => router.push("/coaches")}
          />
          <MenuItem
            icon="people"
            title="Members"
            onPress={() => router.push("/members")}
          />
          <MenuItem
            icon="card-membership"
            title="Membership"
            active
            onPress={() => setShowSubMenu(!showSubMenu)}
            rightIcon={
              <MaterialIcons
                name={showSubMenu ? "keyboard-arrow-up" : "keyboard-arrow-down"}
                size={22}
                color="#ED1018"
              />
            }
          />
              {/* Sub Menu - View Membership */}
              {showSubMenu && (
                <View style={{ marginLeft: 40 }}>
                  <MenuSubItem
                    icon="assignment-turned-in"
                    title="Plan"
                    onPress={() => router.push("/membership_plan")}
                  />
                  <MenuSubItem
                    icon="assignment-ind"
                    title="Leave"
                    onPress={() => router.push("/membership_leave")}
                  />
                  <MenuSubItem
                    icon="assignment"
                    title="Quota"
                    onPress={() => router.push("/membership_quota")}
                  />
                  <MenuSubItem
                    icon="assignment"
                    title="Status"
                    onPress={() => router.push("/membership_status")}
                  />
                  <MenuSubItem
                    icon="assignment"
                    title="Type"
                    onPress={() => router.push("/membership_type")}
                  />
                </View>
              )}
          <MenuItem
            icon="home-work"
            title="Class"
            onPress={() => router.push("/class")}
          />
          <MenuItem
            icon="sports-handball"
            title="Open Gym"
            onPress={() => router.push("/open_gym")}
          />
          <MenuItem
            icon="credit-card"
            title="Payment"
            onPress={() => router.push("/payment")}
          />
          <MenuItem
            icon="discount"
            title="Promos"
            onPress={() => router.push("/promos")}
          />
          <MenuItem
            icon="inventory-2"
            title="Inventory"
            onPress={() => router.push("/inventory")}
          />
          <MenuItem
            icon="edit-square"
            title="News"
            onPress={() => router.push("/news")}
          />
          <MenuItem
            icon="auto-stories"
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
        {/* <View style={styles.topBar}>
          <Text style={styles.feedback}>Feedback</Text>

          <Ionicons name="notifications" size={24} color="#ED1018" />
        </View> */}

        {/* GRID */}
        <View style={styles.grid}>
          {/* LEFT */}
          <View style={{ flex: 2 }}>
            {/* TOP SCREEN */}
            <Pressable style={styles.addTitleBadge} onPress={handleAdd}>
              <Text style={styles.sectionTitle}>Add Membership</Text>
            </Pressable>

            <View style={styles.cardList}>
              <Text style={styles.titleList}>Membership</Text>

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
                    placeholder="Search Membership..."
                    value={search}
                    onChangeText={setSearch}
                    style={styles.searchInputList}
                  />
                </View>
              </View>

              {/* Header */}
              <View style={styles.headerRowList}>
                <Text style={[styles.headerTextList, { flex: 4 }]}>Member Name</Text>
                <Text style={[styles.headerTextList,{flex: 3,textAlign: "center"}]}>Membership Plan</Text>
                <Text style={[styles.headerTextList,{flex: 3,textAlign: "center"}]}>Date</Text>

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

              {/* -------------------------------------------------- */}
              {/* ------------------ Screen Modal ------------------ */}
              {/* -------------------------------------------------- */}

              {showModal && (
                <View style={styles.modalScreen}>
                  <Text style={styles.titleModal}>
                    {selectedActiveMembership ? "Edit Membership" : "Add Membership"}
                  </Text>          

                  {selectedActiveMembership ? 
                    <View>
                      {/* Edit Membership */}
                      {/* MEMBER NAME */}
                      <Text style={styles.labelModal}>Member Name</Text>

                      <TextInput
                        value={`${memberName.memberId}  -  ${memberName.memberName}`}
                        editable={false}
                        style={styles.inputModal}
                      />

                      {/* MEMBERSHIP PLAN NAME */}
                      <Text style={styles.labelModal}>Membership Plan Name</Text>

                      <TextInput
                        value={`${planName.planName}`}
                        editable={false}
                        style={styles.inputModal}
                      />
                                            
                      {/* START DATE and END DATE */}
                      <View style={styles.rowModal}>
                        <View style={{flex: 0.7}}>
                          <Text style={styles.labelModal}>
                            Start Date
                          </Text>
                          
                          <TextInput
                            value={startDate}
                            editable={false}
                            style={styles.inputModal}
                          />
                        </View>

                        <View style={{flex: 0.7, marginLeft: 10,}}>
                          <Text style={styles.labelModal}>
                            End Date
                          </Text>

                          <TextInput
                            value={endDate}
                            editable={false}
                            style={styles.inputModal}
                          />
                        </View>
                      </View>

                      {/* MEMBERSHIP PLAN STATUS */}
                      <Text style={styles.labelModal}>Membership Plan Status</Text>

                      <TouchableOpacity
                        style={styles.memberSelect}
                        onPress={() => {
                          setShowStatusNameDropdown(!showStatusNameDropdown);

                          if (showStatusNameDropdown) {
                            setStatusNameSearch("");
                          }
                        }}
                      >
                        <Text style={styles.memberSelectText}>
                          {statusName
                            ? `${statusName.statusName}`
                            : "--Select Membership Plan Status--"}
                        </Text>

                        <MaterialIcons
                          name={showStatusNameDropdown ? "keyboard-arrow-up" : "keyboard-arrow-down"}
                          size={20}
                          color="#777"
                        />
                      </TouchableOpacity>

                      {showStatusNameDropdown && (
                        <View style={styles.memberDropdown}>

                          {/* SEARCH */}
                          <View style={styles.searchContainer}>
                            <Text style={styles.searchIcon}>
                              🔍
                            </Text>

                            <TextInput
                              style={styles.searchInput}
                              placeholder="Search Membership Plan Status"
                              placeholderTextColor="#888"
                              value={statusNameSearch}
                              onChangeText={setStatusNameSearch}
                            />

                            {statusNameSearch.length > 0 && (
                              <TouchableOpacity
                                onPress={() => setStatusNameSearch("")}
                              >
                                <Text style={styles.clearSearch}>
                                  ✕
                                </Text>
                              </TouchableOpacity>
                            )}
                          </View>

                          {/* MEMBERSHIP PLAN STATUS LIST */}
                          <ScrollView
                            style={styles.memberList}
                            nestedScrollEnabled
                          >                        
                            <View style={{ maxHeight: 200 }}>
                              <FlatList
                                data={filteredStatusName}
                                keyExtractor={(item) => item.id.toString()}
                                keyboardShouldPersistTaps="handled"
                                nestedScrollEnabled
                                renderItem={({ item }) => (
                                  <TouchableOpacity
                                    style={styles.memberItem}
                                    onPress={() => {
                                      setStatusName(item);
                                      setShowStatusNameDropdown(false);
                                      setStatusNameSearch("");
                                    }}
                                  >
                                    <Text style={styles.memberItemText}>{item.statusName}</Text>
                                  </TouchableOpacity>
                                )}
                              />
                            </View>
                          </ScrollView>
                        </View>
                      )}
                    </View>
                  : 
                    <View>
                      {/* Add Membership */}
                      {/* MEMBER NAME */}
                      <Text style={styles.labelModal}>Member Name</Text>

                      <TouchableOpacity
                        style={styles.memberSelect}
                        onPress={() => {
                          setShowMemberDropdown(!showMemberDropdown);

                          if (showMemberDropdown) {
                            setMemberSearch("");
                          }
                        }}
                      >
                        <Text style={styles.memberSelectText}>
                          {memberName
                            ? `${memberName.memberId}  -  ${memberName.memberName}`
                            : "--Select Member Name--"}
                        </Text>

                        <MaterialIcons
                          name={showMemberDropdown ? "keyboard-arrow-up" : "keyboard-arrow-down"}
                          size={20}
                          color="#777"
                        />
                      </TouchableOpacity>

                      {showMemberDropdown && (
                        <View style={styles.memberDropdown}>

                          {/* SEARCH */}
                          <View style={styles.searchContainer}>
                            <Text style={styles.searchIcon}>
                              🔍
                            </Text>

                            <TextInput
                              style={styles.searchInput}
                              placeholder="Search Member Name / ID"
                              placeholderTextColor="#888"
                              value={memberSearch}
                              onChangeText={setMemberSearch}
                            />

                            {memberSearch.length > 0 && (
                              <TouchableOpacity
                                onPress={() => setMemberSearch("")}
                              >
                                <Text style={styles.clearSearch}>
                                  ✕
                                </Text>
                              </TouchableOpacity>
                            )}
                          </View>

                          {/* MEMBER LIST */}
                          <ScrollView
                            style={styles.memberList}
                            nestedScrollEnabled
                          >                        
                            <View style={{ maxHeight: 200 }}>
                              <FlatList
                                data={filteredMembers}
                                keyExtractor={(item) => item.id.toString()}
                                keyboardShouldPersistTaps="handled"
                                nestedScrollEnabled
                                renderItem={({ item }) => (
                                  <TouchableOpacity
                                    style={styles.memberItem}
                                    onPress={() => {
                                      setMemberName(item);
                                      setShowMemberDropdown(false);
                                      setMemberSearch("");
                                    }}
                                  >
                                    <Text style={styles.memberItemText}>{item.memberId} - {item.memberName}</Text>
                                  </TouchableOpacity>
                                )}
                              />
                            </View>
                          </ScrollView>
                        </View>
                      )}

                      {/* MEMBERSHIP PLAN NAME */}
                      <Text style={styles.labelModal}>Membership Plan Name</Text>

                      <TouchableOpacity
                        style={styles.memberSelect}
                        onPress={() => {
                          setShowPlanNameDropdown(!showPlanNameDropdown);

                          if (showPlanNameDropdown) {
                            setPlanNameSearch("");
                          }
                        }}
                      >
                        <Text style={styles.memberSelectText}>
                          {planName
                            ? `${planName.planName}`
                            : "--Select Membership Plan Name--"}
                        </Text>

                        <MaterialIcons
                          name={showPlanNameDropdown ? "keyboard-arrow-up" : "keyboard-arrow-down"}
                          size={20}
                          color="#777"
                        />
                      </TouchableOpacity>

                      {showPlanNameDropdown && (
                        <View style={styles.memberDropdown}>

                          {/* SEARCH */}
                          <View style={styles.searchContainer}>
                            <Text style={styles.searchIcon}>
                              🔍
                            </Text>

                            <TextInput
                              style={styles.searchInput}
                              placeholder="Search Membership Plan Name / ID"
                              placeholderTextColor="#888"
                              value={planNameSearch}
                              onChangeText={setPlanNameSearch}
                            />

                            {planNameSearch.length > 0 && (
                              <TouchableOpacity
                                onPress={() => setPlanNameSearch("")}
                              >
                                <Text style={styles.clearSearch}>
                                  ✕
                                </Text>
                              </TouchableOpacity>
                            )}
                          </View>

                          {/* MEMBERSHIP PLAN LIST */}
                          <ScrollView
                            style={styles.memberList}
                            nestedScrollEnabled
                          >                        
                            <View style={{ maxHeight: 200 }}>
                              <FlatList
                                data={filteredPlanName}
                                keyExtractor={(item) => item.id.toString()}
                                keyboardShouldPersistTaps="handled"
                                nestedScrollEnabled
                                renderItem={({ item }) => (
                                  <TouchableOpacity
                                    style={styles.memberItem}
                                    onPress={() => {
                                      setPlanName(item);
                                      setShowPlanNameDropdown(false);
                                      setPlanNameSearch("");
                                    }}
                                  >
                                    <Text style={styles.memberItemText}>{item.planName}</Text>
                                  </TouchableOpacity>
                                )}
                              />
                            </View>
                          </ScrollView>
                        </View>
                      )}
                      
                      {/* START DATE */}                      
                      <Text style={styles.labelModal}>Start Date</Text>

                      {Platform.OS === "web" ? (
                        <input
                          type="date"
                          value={startDate}
                          //max={new Date().toISOString().split("T")[0]}
                          min={new Date().toISOString().split("T")[0]}
                          onChange={(e) => setStartDate(e.target.value)}
                          style={{
                            paddingRight: 10,
                            paddingLeft: 10,
                            border: "1px solid #ccc",
                            backgroundColor: "#D9D9DD",
                            height: 50,
                            borderRadius: 10,
                            fontSize: 15,
                          }}
                        />
                      ) : (
                        <>
                          <TouchableOpacity
                            onPress={() => setShowStartDate(true)}
                            style={{
                              height: 50,
                              borderWidth: 1,
                              borderColor: "#ccc",
                              borderRadius: 10,
                              justifyContent: "center",
                              paddingHorizontal: 15,
                            }}
                          >
                            <Text>
                              {startDate === "" ? "Select Date" : startDate}
                            </Text>
                          </TouchableOpacity>

                          {showStartDate && (
                            <DateTimePicker
                              value={date}
                              mode="date"
                              display="default"
                              //maximumDate={new Date()}
                              minimumDate={new Date()}
                              onChange={onChangeStartDate}
                            />
                          )}
                        </>
                      )}

                      {/* MEMBERSHIP PLAN STATUS */}
                      <Text style={styles.labelModal}>Membership Plan Status</Text>

                      <TouchableOpacity
                        style={styles.memberSelect}
                        onPress={() => {
                          setShowStatusNameDropdown(!showStatusNameDropdown);

                          if (showStatusNameDropdown) {
                            setStatusNameSearch("");
                          }
                        }}
                      >
                        <Text style={styles.memberSelectText}>
                          {statusName
                            ? `${statusName.statusName}`
                            : "--Select Membership Plan Status--"}
                        </Text>

                        <MaterialIcons
                          name={showStatusNameDropdown ? "keyboard-arrow-up" : "keyboard-arrow-down"}
                          size={20}
                          color="#777"
                        />
                      </TouchableOpacity>

                      {showStatusNameDropdown && (
                        <View style={styles.memberDropdown}>

                          {/* SEARCH */}
                          <View style={styles.searchContainer}>
                            <Text style={styles.searchIcon}>
                              🔍
                            </Text>

                            <TextInput
                              style={styles.searchInput}
                              placeholder="Search Membership Plan Status"
                              placeholderTextColor="#888"
                              value={statusNameSearch}
                              onChangeText={setStatusNameSearch}
                            />

                            {statusNameSearch.length > 0 && (
                              <TouchableOpacity
                                onPress={() => setStatusNameSearch("")}
                              >
                                <Text style={styles.clearSearch}>
                                  ✕
                                </Text>
                              </TouchableOpacity>
                            )}
                          </View>

                          {/* MEMBERSHIP PLAN STATUS LIST */}
                          <ScrollView
                            style={styles.memberList}
                            nestedScrollEnabled
                          >                        
                            <View style={{ maxHeight: 200 }}>
                              <FlatList
                                data={filteredStatusName}
                                keyExtractor={(item) => item.id.toString()}
                                keyboardShouldPersistTaps="handled"
                                nestedScrollEnabled
                                renderItem={({ item }) => (
                                  <TouchableOpacity
                                    style={styles.memberItem}
                                    onPress={() => {
                                      setStatusName(item);
                                      setShowStatusNameDropdown(false);
                                      setStatusNameSearch("");
                                    }}
                                  >
                                    <Text style={styles.memberItemText}>{item.statusName}</Text>
                                  </TouchableOpacity>
                                )}
                              />
                            </View>
                          </ScrollView>
                        </View>
                      )}
                    </View>
                  }                   


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
                        Submit
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
    fontSize: 15,
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
    color: "#5a050c",
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
    fontSize: 16,
    fontWeight: "600",
    color: "#E60012",
    marginBottom: 8,
    marginTop: 5,
  },

  inputModal: {
    backgroundColor: "#D9D9DD",
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 15,
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
    fontSize: 15,
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


 
  
  memberSelect: {
    height: 50,
    backgroundColor: "#D9D9DD",
    borderRadius: 12,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },

  memberSelectText: {
    fontSize: 14,
    color: "#111",
  },

  arrow: {
    fontSize: 25,
    color: "#111",
  },

  memberDropdown: {
    backgroundColor: "#D9D9DD",
    borderWidth: 1,
    borderColor: "#D5D5D5",
    borderRadius: 12,
    marginTop: 8,
    overflow: "hidden",
  },

  searchContainer: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#DDDDDD",
  },

  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },

  searchInput: {
    flex: 1,
    height: 48,
    fontSize: 14,
    color: "#111",
    outlineStyle: "none" as any,
  },

  clearSearch: {
    fontSize: 14,
    color: "#777",
    paddingHorizontal: 8,
  },

  memberList: {
    maxHeight: 250,
  },

  memberItem: {
    minHeight: 55,
    justifyContent: "center",
    paddingHorizontal: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },

  memberItemText: {
    fontSize: 14,
    color: "#111",
  },

  noResult: {
    padding: 20,
    alignItems: "center",
  },

  noResultText: {
    fontSize: 14,
    color: "#888",
  },
});