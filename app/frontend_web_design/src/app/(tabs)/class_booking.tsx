import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import {
  Alert,
  Platform,
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
import DateTimePicker from "@react-native-community/datetimepicker";

// ============ DATA ============
interface dataBooking {
  id: string;
  memberName: string;
  memberId: string;
  ClassScheduleId: string;
  CoachName: string;
  CoachId: string;
  ScheduleName: string;
  ScheduleStartTime: string;
  ScheduleEndTime: string;
  ScheduleDate: string;
  ScheduleQuota: string;
  ScheduleAvailableQuota: string;
}

const initialDataBooking: dataBooking[] = [
  {
    id: "1",
    memberName: "James Medalla",
    memberId: "SFM2301N1",
    ClassScheduleId: "CS01",
    CoachName: "Bahlil",
    CoachId: "COA2301N1",
    ScheduleName: "Morning Class",
    ScheduleStartTime: "11:23",
    ScheduleEndTime: "12:43",
    ScheduleDate: "2026-08-15",
    ScheduleQuota: "20",
    ScheduleAvailableQuota: "20",
  },
  {
    id: "2",
    memberName: "Chris Medalla",
    memberId: "SFM2301N2",
    ClassScheduleId: "CS02",
    CoachName: "Bahlil",
    CoachId: "COA2301N1",
    ScheduleName: "Afternoon Class",
    ScheduleStartTime: "18:20",
    ScheduleEndTime: "19:00",
    ScheduleDate: "2026-08-16",
    ScheduleQuota: "15",
    ScheduleAvailableQuota: "10",
  },
  {
    id: "3",
    memberName: "James Chris",
    memberId: "SFM2301N3",
    ClassScheduleId: "CS03",
    CoachName: "Medalla Toy",
    CoachId: "COA2301N2",
    ScheduleName: "Evening Class",
    ScheduleStartTime: "05:00",
    ScheduleEndTime: "09:43",
    ScheduleDate: "2026-08-15",
    ScheduleQuota: "15",    
    ScheduleAvailableQuota: "9",
  },  
  {
    id: "4",
    memberName: "James Medalla",
    memberId: "SFM2301N1",
    ClassScheduleId: "CS04",
    CoachName: "James Boy",
    CoachId: "COA2301N3",
    ScheduleName: "Night Class",
    ScheduleStartTime: "20:23",
    ScheduleEndTime: "21:43",
    ScheduleDate: "2026-08-16",
    ScheduleQuota: "20",
    ScheduleAvailableQuota: "19",
  },
  {
    id: "5",
    memberName: "James Medalla",
    memberId: "SFM2301N1",
    ClassScheduleId: "CS05",
    CoachName: "James Boy",
    CoachId: "COA2301N3",
    ScheduleName: "Night Class",
    ScheduleStartTime: "21:23",
    ScheduleEndTime: "23:43",
    ScheduleDate: "2026-08-16",
    ScheduleQuota: "20",
    ScheduleAvailableQuota: "19",
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

const dataSchedule = [
  {
    id: '1',
    ClassScheduleId: "CS01",
    CoachName: "Bahlil",
    CoachId: "COA2301N1",
    ScheduleName: "Morning Class",
    ScheduleStartTime: "11:23",
    ScheduleEndTime: "12:43",
    ScheduleDate: "2026-08-15",
    ScheduleQuota: "20",
    ScheduleAvailableQuota: "20",
  },
  {
    id: '2',
    ClassScheduleId: "CS02",
    CoachName: "Bahlil",
    CoachId: "COA2301N1",
    ScheduleName: "Afternoon Class",
    ScheduleStartTime: "18:20",
    ScheduleEndTime: "19:00",
    ScheduleDate: "2026-08-15",
    ScheduleQuota: "15",
    ScheduleAvailableQuota: "10",
  },
  {
    id: '3',
    ClassScheduleId: "CS03",
    CoachName: "Medalla Toy",
    CoachId: "COA2301N2",
    ScheduleName: "Evening Class",
    ScheduleStartTime: "05:00",
    ScheduleEndTime: "09:43",
    ScheduleDate: "2026-08-16",
    ScheduleQuota: "15",    
    ScheduleAvailableQuota: "9",
  },
  {
    id: '4',
    ClassScheduleId: "CS04",
    CoachName: "James Boy",
    CoachId: "COA2301N3",
    ScheduleName: "Night Class",
    ScheduleStartTime: "20:23",
    ScheduleEndTime: "21:43",
    ScheduleDate: "2026-08-16",
    ScheduleQuota: "20",
    ScheduleAvailableQuota: "19",
  },
];

export default function ClassBookingScreen() {
  const router = useRouter();
  const [BookingData, setBookingData] = useState<dataBooking[]>(initialDataBooking);

  const [search, setSearch] = useState("");
  const [entries, setEntries] = useState(10);
  const [page, setPage] = useState(1);

  const filteredData = useMemo(() => {
    return BookingData.filter((item) => {
      const keyword = search.toLowerCase();

      const matchSearch =
        item.memberName.toLowerCase().includes(keyword) ||
        item.memberId.toString().toLowerCase().includes(keyword) ||
        item.CoachName.toLowerCase().includes(keyword) ||
        item.CoachId.toString().toLowerCase().includes(keyword) ||
        item.ScheduleName.toLowerCase().includes(keyword) ||
        item.ScheduleDate.toLowerCase().includes(keyword);
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
      <Text style={[styles.dataTextList, { flex: 2.5 }]}>{item.memberId}  -  {item.memberName}</Text>
      <Text style={[styles.dataTextList, { flex: 4 }]}>{item.CoachId}   -   {item.CoachName}   -   {item.ScheduleName}   {"\n"}-   {item.ScheduleDate}   -   {item.ScheduleStartTime}-{item.ScheduleEndTime}   -   {item.ScheduleAvailableQuota}/{item.ScheduleQuota}</Text>

      <View
        style={{
          flex: 1,
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
  const [selectedDataBooking, setSelectedDataBooking] = useState<dataBooking | null>(
    null,
  );

  
  const handleAdd = () => {
    setSelectedDataBooking(null);
    setMemberName("");
    setmemberId("");
    setClassScheduleId("");
    setCoachName("");
    setCoachId("");
    setScheduleName("");
    setScheduleQuota("");
    setScheduleAvailableQuota("");
    setScheduleStartTime("");
    setScheduleEndTime("");
    setScheduleDate("");

    
    setShowModal(true);
  };

  const handleEdit = (item: dataBooking) => {
    setSelectedDataBooking(item);
    // Cari data member berdasarkan memberId
    const selectedMember = dataMember.find(
      (member) => member.memberId === item.memberId
    );
    // Simpan object member
    setMemberName(selectedMember || null);
    // Simpan member ID
    setmemberId(item.memberId);


    // Cari data coach berdasarkan class Schedule
    const selectedCoach = dataSchedule.find(
      (Coach) => Coach.ClassScheduleId === item.ClassScheduleId
    );
    // Simpan object coach
    setCoachName(selectedCoach || null);
    // Simpan coach ID
    setCoachId(item.CoachId);

    setScheduleName(item.ScheduleName);
    setScheduleQuota(item.ScheduleQuota);
    setScheduleAvailableQuota(item.ScheduleAvailableQuota);

    setScheduleStartTime(item.ScheduleStartTime);
    setScheduleEndTime(item.ScheduleEndTime);
    setScheduleDate(item.ScheduleDate);

    // Tutup dropdown member
    setShowCoachDropdown(false);
    setCoachSearch("");

    // Buka modal Edit
    setShowModal(true);
  };

  const handleSave = () => {
    if (!memberName) {
      alert("Please select a member name");
      return;
    }

    if (selectedDataBooking) {
      // UPDATE
      const updatedData = BookingData.map((item) =>
        item.id === selectedDataBooking.id
          ? {
              ...item,
              memberName: memberName,
              memberId: memberId,     
              ClassScheduleId: ClassScheduleId,         
              CoachName: CoachName,
              CoachId: CoachId,
              ScheduleName: ScheduleName,
              ScheduleQuota: ScheduleQuota,
              ScheduleAvailableQuota: ScheduleAvailableQuota,
              ScheduleStartTime: ScheduleStartTime,
              ScheduleEndTime: ScheduleEndTime,
              ScheduleDate: ScheduleDate,
            }
          : item,
      );

      setBookingData(updatedData);

      alert("Updated successfully");
    } else {
      // ADD
      const newActiveMembers: dataBooking = {
        id: Date.now().toString(),
        memberName: memberName,
        memberId: memberId,
        ClassScheduleId: ClassScheduleId,
        CoachName: CoachName,
        CoachId: CoachId,
        ScheduleName: ScheduleName,
        ScheduleQuota: ScheduleQuota,
        ScheduleAvailableQuota: ScheduleAvailableQuota,
        ScheduleStartTime: ScheduleStartTime,
        ScheduleEndTime: ScheduleEndTime,
        ScheduleDate: ScheduleDate,
      };

      setBookingData([...BookingData, newActiveMembers]);

      alert("Added successfully");
    }
    resetForm();
  };
  
  const handleDelete = (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure, you want to delete this?"
    );

    if (!confirmDelete) return;

    const data = BookingData.filter((item) => item.id !== id);

    setBookingData(data);

    alert("Delete successfully");
  };

  const handleCancel = () => {
    resetForm();
    setShowModal(false);
  };

  const resetForm = () => {
    setSelectedDataBooking(null);
    setMemberName("");
    setmemberId("");
    setCoachName("");
    setCoachId("");
    setScheduleName("");
    setScheduleQuota("");
    setScheduleAvailableQuota("");
    setScheduleStartTime("");
    setScheduleEndTime("");
    setScheduleDate("");

    setShowModal(false);
  };

  const [memberName, setMemberName] = useState<any>(null);
  const [showMemberDropdown, setShowMemberDropdown] = useState(false);
  const [memberSearch, setMemberSearch] = useState("");
  const [memberId, setmemberId] = useState("");

  const filteredMembers = dataMember.filter((item) => {
    const search = memberSearch.toLowerCase();

    return (
      item.memberName.toLowerCase().includes(search) ||
      item.memberId.toLowerCase().includes(search)
    );
  });


  const [ClassScheduleId, setClassScheduleId] = useState("");
  const [CoachName, setCoachName] = useState<any>(null);
  const [showCoachDropdown, setShowCoachDropdown] = useState(false);
  const [CoachSearch, setCoachSearch] = useState("");
  const [CoachId, setCoachId] = useState("");
  
  const [ScheduleName, setScheduleName] = useState(""); 
  const [ScheduleQuota, setScheduleQuota] = useState(""); 
  const [ScheduleAvailableQuota, setScheduleAvailableQuota] = useState(""); 

  const [ScheduleStartTime, setScheduleStartTime] = useState(""); 
  const [ScheduleEndTime, setScheduleEndTime] = useState(""); 
  const [ScheduleDate, setScheduleDate] = useState(""); 

  const filteredCoach = dataSchedule.filter((item) => {
    const search = CoachSearch.toLowerCase();

    return (
      item.CoachName.toLowerCase().includes(search) ||
      item.CoachId.toLowerCase().includes(search) ||
      item.ScheduleName.toLowerCase().includes(search) ||
      item.ScheduleDate.toLowerCase().includes(search)
    );
  });

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
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
            onPress={() => router.push("/membership")}
          />
          <MenuItem
            icon="home-work"
            title="Class"
            active
            onPress={() => {
              router.push("/class");
              setShowSubMenu(true);
            }}
            rightIcon={
              <MaterialIcons
                name={showSubMenu ? "keyboard-arrow-up" : "keyboard-arrow-down"}
                size={22}
                color="#ED1018"
              />
            }
          />
              {/* Sub Menu - View Class */}
              {showSubMenu && (
                <View style={{ marginLeft: 40 }}>
                  <MenuSubItem
                    icon="schedule-send"
                    title="Booking"
                    onPress={() => router.push("/class_booking")}
                    active
                  />
                  <MenuSubItem
                    icon="assignment"
                    title="Status"
                    onPress={() => router.push("/class_status")}
                  />
                  <MenuSubItem
                    icon="assignment"
                    title="Class Name"
                    onPress={() => router.push("/class_name")}
                  />
                </View>
              )}
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
              <Text style={styles.sectionTitle}>Add Booking</Text>
            </Pressable>

            <View style={styles.cardList}>
              <Text style={styles.BookingList}>Booking</Text>

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
                    placeholder="Search Booking..."
                    value={search}
                    onChangeText={setSearch}
                    style={styles.searchInputList}
                  />
                </View>
              </View>

              {/* Header */}
              <View style={styles.headerRowList}>
                <Text style={[styles.headerTextList, { flex: 2.5 }]}>Member Name</Text>
                <Text style={[styles.headerTextList, { flex: 4 }]}>Schedule</Text>
                
                <Text
                  style={[
                    styles.headerTextList,
                    {
                      flex: 1,
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
                  <Text style={styles.BookingModal}>
                    {selectedDataBooking ? "Edit Booking" : "Add Booking"}
                  </Text>

                  {/* SELECT MEMBER NAME */}
                  <Text style={styles.label}>
                    Member Name
                  </Text>

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
                        {filteredMembers.length > 0 ? (
                          filteredMembers.map((item) => (
                            <TouchableOpacity
                              key={item.id}
                              style={styles.memberItem}
                              onPress={() => {
                                setMemberName(item);
                                setShowMemberDropdown(false);
                                setMemberSearch("");
                              }}
                            >
                              <Text style={styles.memberItemText}>
                                {item.memberId}  -  {item.memberName}
                              </Text>
                            </TouchableOpacity>
                          ))
                        ) : (
                          <View style={styles.noResult}>
                            <Text style={styles.noResultText}>
                              Member not found
                            </Text>
                          </View>
                        )}
                      </ScrollView>
                    </View>
                  )}

                  {/* SELECT SCHEDULE DETAIL */}
                  <Text style={styles.label}>
                    Schedule
                  </Text>

                  <TouchableOpacity
                    style={styles.memberSelect}
                    onPress={() => {
                      setShowCoachDropdown(!showCoachDropdown);

                      if (showCoachDropdown) {
                        setCoachSearch("");
                      }
                    }}
                  >
                    <Text style={styles.memberSelectText}>
                      {CoachName
                        ? `${CoachName.CoachId}  -  ${CoachName.CoachName}  -  ${CoachName.ScheduleName}  -  ${CoachName.ScheduleDate}  -  ${CoachName.ScheduleStartTime}-${CoachName.ScheduleEndTime}  -  ${CoachName.ScheduleAvailableQuota}/${CoachName.ScheduleQuota}`
                        : "--Select Schedule--"}
                    </Text>

                    <MaterialIcons
                      name={showCoachDropdown ? "keyboard-arrow-up" : "keyboard-arrow-down"}
                      size={20}
                      color="#777"
                    />
                  </TouchableOpacity>

                  {showCoachDropdown && (
                    <View style={styles.memberDropdown}>

                      {/* SEARCH */}
                      <View style={styles.searchContainer}>
                        <Text style={styles.searchIcon}>
                          🔍
                        </Text>

                        <TextInput
                          style={styles.searchInput}
                          placeholder="Search Schedule"
                          placeholderTextColor="#888"
                          value={CoachSearch}
                          onChangeText={setCoachSearch}
                        />

                        {CoachSearch.length > 0 && (
                          <TouchableOpacity
                            onPress={() => setCoachSearch("")}
                          >
                            <Text style={styles.clearSearch}>
                              ✕
                            </Text>
                          </TouchableOpacity>
                        )}
                      </View>

                      {/* SCHEDULE LIST */}
                      <ScrollView
                        style={styles.memberList}
                        nestedScrollEnabled
                      >
                        {filteredCoach.length > 0 ? (
                          filteredCoach.map((item) => (
                            <TouchableOpacity
                              key={item.id}
                              style={styles.memberItem}
                              onPress={() => {
                                setCoachName(item);
                                setShowCoachDropdown(false);
                                setCoachSearch("");
                              }}
                            >
                              <Text style={styles.memberItemText}>
                                {item.CoachId}   -   {item.CoachName}   -   {item.ScheduleName}   -   {item.ScheduleDate}   -   {item.ScheduleStartTime}-{item.ScheduleEndTime}   -   {item.ScheduleAvailableQuota}/{item.ScheduleQuota}
                              </Text>
                            </TouchableOpacity>
                          ))
                        ) : (
                          <View style={styles.noResult}>
                            <Text style={styles.noResultText}>
                              Schedule not found
                            </Text>
                          </View>
                        )}
                      </ScrollView>
                    </View>
                  )}

                  

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
    gap: 10,
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
  
  BookingList: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 25,
  },
  
  BookingModal: {
    color: "#5a050c",
    fontWeight: "700",
    fontSize: 32,
  },


  //================================= Member Id dan Name =================================
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#E60012",
    marginBottom: 8,
    marginTop: 5,
  },

  inputLeave: {
    height: 50,
    backgroundColor: "#D9D9DD",
    borderWidth: 1,
    borderColor: "#DDDDDD",
    borderRadius: 8,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },

  inputText: {
    fontSize: 14,
    color: "#222",
  },

  placeholderLeave: {
    color: "#999",
  },

  dropdown: {
    backgroundColor: "#D9D9DD",
    borderWidth: 1,
    borderColor: "#DDDDDD",
    borderRadius: 8,
    marginTop: -8,
    marginBottom: 15,
    overflow: "hidden",
  },

  reasonItem: {
    height: 48,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },

  reasonText: {
    fontSize: 14,
    color: "#333",
  },

  notesInput: {
    minHeight: 110,
    backgroundColor: "#D9D9DD",
    borderWidth: 1,
    borderColor: "#DDDDDD",
    borderRadius: 8,
    padding: 14,
    fontSize: 14,
    color: "#222",
    marginBottom: 20,
  },

  inputSelect: {
    //height: 45,
    borderWidth: 1,
    borderColor: "#ccc",
    //borderRadius: 8,
    //paddingHorizontal: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    //backgroundColor: "#fff",

    backgroundColor: "#D9D9DD",
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 14,
  },

  dropdownSelect: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginTop: 5,
    maxHeight: 180,
    backgroundColor: "#fff",
  },

  itemSelect: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
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
