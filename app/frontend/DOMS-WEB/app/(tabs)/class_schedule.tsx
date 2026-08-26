import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
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
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

// ============ DATA ============
interface dataSchedule {
  id: string;
  CoachName: string,
  CoachId: string,
  ScheduleName: string;
  ScheduleStartTime: string;
  ScheduleEndTime: string;
  ScheduleDate: string;
  ScheduleDescriptions: string;
  ScheduleList: string;
  ScheduleQuota: string;
}

const initialDataSchedule: dataSchedule[] = [
  {
    id: "1",
    CoachName: "Bahlil",
    CoachId: "COA2301N1",
    ScheduleName: "Morning Class",
    ScheduleStartTime: "11:23",
    ScheduleEndTime: "12:43",
    ScheduleDate: "2026-08-15",
    ScheduleDescriptions: "For Upper body, make you more energize and feel better .....",
    ScheduleList: "Jump",
    ScheduleQuota: "20",
  },
  {
    id: "2",
    CoachName: "Bahlil",
    CoachId: "COA2301N1",
    ScheduleName: "Afternoon Class",
    ScheduleStartTime: "18:20",
    ScheduleEndTime: "19:00",
    ScheduleDate: "2026-08-15",
    ScheduleDescriptions: "",
    ScheduleList: "Jump",
    ScheduleQuota: "15",
  },
  {
    id: "3",
    CoachName: "Medalla Toy",
    CoachId: "COA2301N2",
    ScheduleName: "Evening Class",
    ScheduleStartTime: "05:00",
    ScheduleEndTime: "09:43",
    ScheduleDate: "2026-08-15",
    ScheduleDescriptions: "For Upper body, make you more energize and feel better .....",
    ScheduleList: "",
    ScheduleQuota: "15",
  },
  
  {
    id: "4",
    CoachName: "James Boy",
    CoachId: "COA2301N3",
    ScheduleName: "Night Class",
    ScheduleStartTime: "21:23",
    ScheduleEndTime: "23:43",
    ScheduleDate: "2026-08-16",
    ScheduleDescriptions: "",
    ScheduleList: "Jump",
    ScheduleQuota: "20",
  },
];

const dataCoach = [
  {
    id: '1',
    CoachName: "Bahlil",
    CoachId: "COA2301N1",
  },
  {
    id: '2',
    CoachName: "Medalla Toy",
    CoachId: "COA2301N2",
  },
  {
    id: '3',
    CoachName: "James Boy",
    CoachId: "COA2301N3",
  },
];

const dataScheduleName = [
  {
    id: '1',
    ScheduleName: "Morning Class",
  },
  {
    id: '2',
    ScheduleName: "Afternoon Class",
  },
  {
    id: '3',
    ScheduleName: "Evening Class",
  },  
  {
    id: '4',
    ScheduleName: "Night Class",
  },
];

export default function ClassScheduleScreen() {
  const router = useRouter();
  const [ScheduleData, setScheduleData] = useState<dataSchedule[]>(initialDataSchedule);

  const [search, setSearch] = useState("");
  const [entries, setEntries] = useState(10);
  const [page, setPage] = useState(1);

  const filteredData = useMemo(() => {
    return ScheduleData.filter((item) => {
      const keyword = search.toLowerCase();

      const matchSearch =
        item.ScheduleName.toLowerCase().includes(keyword);
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
      <Text style={[styles.dataTextList, { flex: 3 }]}>{item.ScheduleName}</Text>

      <View
        style={{
          flex: 0.7,
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
  const [selectedDataSchedule, setSelectedDataSchedule] = useState<dataSchedule | null>(
    null,
  );

  const [CoachName, setCoachName] = useState<any>(null);
  const [showCoachDropdown, setShowCoachDropdown] = useState(false);
  const [CoachSearch, setCoachSearch] = useState("");
  const [CoachId, setCoachId] = useState("");  
  const [ScheduleName, setScheduleName] = useState("");  
  const [showScheduleName, setShowScheduleName] = useState(false);
  const [ScheduleStartTime, setScheduleStartTime] = useState(new Date());
  const [ScheduleEndTime, setScheduleEndTime] = useState(new Date());
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [ScheduleDate, setScheduleDate] = useState(""); 
  const [showScheduleDate, setShowScheduleDate] = useState(false);
  const [date, setDate] = useState(new Date());
  const [ScheduleDescriptions, setScheduleDescriptions] = useState('For Upper body, make you more energize and feel better .....');
  const [ScheduleList, setScheduleList] = useState(""); 
  const [ScheduleQuota, setScheduleQuota] = useState(""); 
  
  const handleAdd = () => {
    setSelectedDataSchedule(null);
    setCoachName("");
    setCoachId("");
    setScheduleName("");

    const start = new Date();
    start.setHours(5, 0, 0, 0);

    const end = new Date();
    end.setHours(6, 0, 0, 0);

    setScheduleStartTime(start);
    setScheduleEndTime(end);
    setScheduleDate("");
    setScheduleDescriptions("");
    setScheduleList("");
    setScheduleQuota("");

    setShowModal(true);
  };

  const handleEdit = (item: dataSchedule) => {
    // Simpan data Leave yang sedang diedit
    setSelectedDataSchedule(item);
    // Cari data member berdasarkan memberId
    const selectedCoach = dataCoach.find(
      (Coach) => Coach.CoachId === item.CoachId
    );
    // Simpan object member
    setCoachName(selectedCoach || null);
    // Simpan member ID
    setCoachId(item.CoachId);
    
    setScheduleName(item.ScheduleName);

    const start = new Date();
    const [sh, sm] = item.ScheduleStartTime.split(":");
    start.setHours(Number(sh), Number(sm), 0, 0);

    const end = new Date();
    const [eh, em] = item.ScheduleEndTime.split(":");
    end.setHours(Number(eh), Number(em), 0, 0);

    setScheduleStartTime(start);
    setScheduleEndTime(end);
    setScheduleDate(item.ScheduleDate);
    setScheduleDescriptions(item.ScheduleDescriptions);
    setScheduleList(item.ScheduleList);
    setScheduleQuota(item.ScheduleQuota);

    // Tutup dropdown member
    setShowCoachDropdown(false);
    setCoachSearch("");

    // Buka modal Edit
    setShowModal(true);
  };

  const handleSave = () => {
    if (ScheduleName.trim() === "") {
      alert("Name is required");
      return;
    }

    if (selectedDataSchedule) {
      // UPDATE
      const updatedData = ScheduleData.map((item) =>
        item.id === selectedDataSchedule.id
          ? {
              ...item,
              CoachName: CoachName,
              CoachId: CoachId,
              ScheduleName: ScheduleName, 
              ScheduleStartTime: formatTime(ScheduleStartTime),
              ScheduleEndTime: formatTime(ScheduleEndTime),
              ScheduleDate: ScheduleDate,
              ScheduleDescriptions: ScheduleDescriptions,
              ScheduleList: ScheduleList,
              ScheduleQuota: ScheduleQuota,
            }
          : item,
      );

      setScheduleData(updatedData);

      alert("Updated successfully");
    } else {
      // ADD
      const newActiveMembers: dataSchedule = {
        id: Date.now().toString(),
        CoachName: CoachName,
        CoachId: CoachId,
        ScheduleName: ScheduleName, 
        ScheduleStartTime: formatTime(ScheduleStartTime),
        ScheduleEndTime: formatTime(ScheduleEndTime),
        ScheduleDate: ScheduleDate,
        ScheduleDescriptions: ScheduleDescriptions,
        ScheduleList: ScheduleList,
        ScheduleQuota: ScheduleQuota,
      };

      setScheduleData([...ScheduleData, newActiveMembers]);

      alert("Added successfully");
    }
    resetForm();
  };

  const handleDelete = (id: string) => {
    const data = ScheduleData.filter((item) => item.id !== id);

    setScheduleData(data);

    alert("Delete successfully");
  };

  const handleCancel = () => {
    resetForm();
    setShowModal(false);
  };

  const resetForm = () => {
    setSelectedDataSchedule(null);
    setCoachName("");
    setCoachId("");
    setScheduleName("");

    const start = new Date();
    start.setHours(9, 0, 0, 0); // 09:00

    const end = new Date();
    end.setHours(10, 0, 0, 0); // 10:00

    setScheduleStartTime(start);
    setScheduleEndTime(end);
    setScheduleDate("");
    setScheduleDescriptions("");
    setScheduleList("");
    setScheduleQuota("");

    setShowModal(false);
  };

  const filteredCoach = dataCoach.filter((item) => {
    const search = CoachSearch.toLowerCase();

    return (
      item.CoachName.toLowerCase().includes(search) ||
      item.CoachId.toLowerCase().includes(search)
    );
  });

  const onChangeScheduleDate = (event: any, selectedDate?: Date) => {
    setShowScheduleDate(false);

    if (selectedDate) {
      setDate(selectedDate);

      const formatted =
        selectedDate.getFullYear() +
        "-" +
        String(selectedDate.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(selectedDate.getDate()).padStart(2, "0");

      setScheduleDate(formatted);
    }
  };

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
              source={require("../../assets/images/user/user.png")}
              style={styles.avatar}
            />
          </TouchableOpacity>

          <Text style={styles.adminName}>Fandi Wijaya</Text>

          <Text style={styles.email}>fandiwijaya@doms.com</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <MenuItem
            icon="dashboard"
            Schedule="Dashboard"
            onPress={() => router.push("/dashboard")}
          />
          <MenuItem
            icon="people"
            Schedule="View Members"
            onPress={() => router.push("/members")}
          />
          <MenuItem
            icon="fitness-center"
            Schedule="Coaches"
            onPress={() => router.push("/coaches")}
          />
          <MenuItem
            icon="home-work"
            Schedule="Class"
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
            {/* Sub Menu - Class */}
            {showSubMenu && (
              <View style={{ marginLeft: 40 }}>
                <MenuSubItem
                  icon="schedule-send"
                  Schedule="Booking"
                  onPress={() => router.push("/class_booking")}
                />
                <MenuSubItem
                  icon="schedule"
                  Schedule="Schedule"
                  onPress={() => router.push("/class_schedule")}
                  active
                />
                <MenuSubItem
                  icon="assignment"
                  Schedule="Status"
                  onPress={() => router.push("/class_status")}
                />
                <MenuSubItem
                  icon="assignment"
                  Schedule="Title"
                  onPress={() => router.push("/class_title")}
                />
              </View>
            )}
          <MenuItem
            icon="inventory-2"
            Schedule="Inventory"
            onPress={() => router.push("/inventory")}
          />
          <MenuItem
            icon="edit-square"
            Schedule="News"
            onPress={() => router.push("/news")}
          />
          <MenuItem
            icon="credit-card"
            Schedule="Payment"
            onPress={() => router.push("/payment")}
          />
          <MenuItem
            icon="discount"
            Schedule="Promos"
            onPress={() => router.push("/promos")}
          />
          <MenuItem
            icon="auto-stories"
            Schedule="Report"
            onPress={() => router.push("/report")}
          />
          <MenuItem
            icon="badge"
            Schedule="Profile"
            onPress={() => router.push("/profile")}
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
            <Pressable style={styles.addScheduleBadge} onPress={handleAdd}>
              <Text style={styles.sectionSchedule}>Add Schedule</Text>
            </Pressable>

            <View style={styles.cardList}>
              <Text style={styles.ScheduleList}>Schedule</Text>

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
                    placeholder="Search Schedule..."
                    value={search}
                    onChangeText={setSearch}
                    style={styles.searchInputList}
                  />
                </View>
              </View>

              {/* Header */}
              <View style={styles.headerRowList}>
                <Text style={[styles.headerTextList, { flex: 4 }]}>Coach Name</Text>
                <Text style={[styles.headerTextList, { flex: 3 }]}>Schedule Name</Text>
                <Text style={[styles.headerTextList, { flex: 2 }]}>Date</Text>
                <Text style={[styles.headerTextList, { flex: 2 }]}>Time</Text>
                <Text style={[styles.headerTextList, { flex: 2 }]}>Quota</Text>
                
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
                  <Text style={styles.ScheduleModal}>
                    {selectedDataSchedule ? "Edit Schedule" : "Add Schedule"}
                  </Text>

                  {/* Input Coach Name */}
                  <View style={styles.rowModal}>
                    <View
                      style={{
                        flex: 1,
                      }}
                    >
                      <Text style={styles.labelModal}>Coach Name</Text>

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
                            ? `${CoachName.CoachId}  -  ${CoachName.CoachName}`
                            : "--Select Coach Name--"}
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
                              placeholder="Search Member Name / ID"
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
    
                          {/* COACH LIST */}
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
                                    {item.CoachId}  -  {item.CoachName}
                                  </Text>
                                </TouchableOpacity>
                              ))
                            ) : (
                              <View style={styles.noResult}>
                                <Text style={styles.noResultText}>
                                  Coach not found
                                </Text>
                              </View>
                            )}
                          </ScrollView>
                        </View>
                      )}
                    </View>
                  </View>

                  {/* Input Schedule Name */}
                  <View style={styles.rowModal}>
                    <View
                      style={{
                        flex: 1,
                      }}
                    >
                      <Text style={styles.labelModal}>Schedule Name</Text>
                      <TouchableOpacity
                        style={styles.inputSelect}
                        onPress={() => setShowScheduleName(!showScheduleName)}
                      >
                        <Text>{ScheduleName || "Select Type"}</Text>

                        <MaterialIcons
                          name={showScheduleName ? "keyboard-arrow-up" : "keyboard-arrow-down"}
                          size={24}
                        />
                      </TouchableOpacity>

                      {showScheduleName && (
                        <FlatList
                          data={dataScheduleName}
                          keyExtractor={(item) => item.id}
                          style={styles.dropdownSelect}
                          renderItem={({ item }) => (
                            <TouchableOpacity
                              style={styles.itemSelect}
                              onPress={() => {
                                setScheduleName(item.ScheduleName);
                                setShowScheduleName(false);
                              }}
                            >
                              <Text>{item.ScheduleName}</Text>
                            </TouchableOpacity>
                          )}
                        />
                      )}      
                    </View>
                  </View>

                  {/* Input Start Time dan End Time */}
                  <View style={styles.rowModal}>
                    <View
                      style={{
                        flex: 1,
                      }}
                    >
                      <Text style={styles.labelModal}>Start Time</Text>

                      {Platform.OS === "web" ? (
                        <input
                          type="time"
                          value={formatTime(ScheduleStartTime)}
                          onChange={(e) => {
                            const [h, m] = e.target.value.split(":");
                            const date = new Date(ScheduleStartTime);
                            date.setHours(Number(h), Number(m), 0, 0);
                            setScheduleStartTime(date);
                          }}
                          style={{
                            width: "100%",
                            height: "50px",
                            borderRadius: "12px",
                            border: "1px solid #D9D9DD",
                            backgroundColor: "#D9D9DD",
                            padding: "0 15px",
                            fontSize: "16px",
                            boxSizing: "border-box",
                          }}
                        />
                      ) : (
                        <>
                          <TouchableOpacity
                            style={styles.inputModal}
                            onPress={() => setShowStartTimePicker(true)}
                          >
                            <Text>{formatTime(ScheduleStartTime)}</Text>
                            <Ionicons name="time-outline" size={22} color="#777" />
                          </TouchableOpacity>

                          {showStartTimePicker && (
                            <DateTimePicker
                              value={ScheduleStartTime}
                              mode="time"
                              is24Hour
                              display="default"
                              onChange={(event, selectedTime) => {
                                setShowStartTimePicker(false);
                                if (selectedTime) setScheduleStartTime(selectedTime);
                              }}
                            />
                          )}
                        </>
                      )}
                    </View>

                    <View
                      style={{
                        flex: 1,
                        marginLeft: 10,
                      }}
                    >
                      <Text style={styles.labelModal}>End Time</Text>

                      {Platform.OS === "web" ? (
                        <input
                          type="time"
                          value={formatTime(ScheduleEndTime)}
                          onChange={(e) => {
                            const [h, m] = e.target.value.split(":");
                            const date = new Date(ScheduleEndTime);
                            date.setHours(Number(h), Number(m), 0, 0);
                            setScheduleEndTime(date);
                          }}
                          style={{
                            width: "100%",
                            height: "50px",
                            borderRadius: "12px",
                            border: "1px solid #D9D9DD",
                            backgroundColor: "#D9D9DD",
                            padding: "0 15px",
                            fontSize: "16px",
                            boxSizing: "border-box",
                          }}
                        />
                      ) : (
                        <>
                          <TouchableOpacity
                            style={styles.inputModal}
                            onPress={() => setShowEndTimePicker(true)}
                          >
                            <Text>{formatTime(ScheduleStartTime)}</Text>
                            <Ionicons name="time-outline" size={22} color="#777" />
                          </TouchableOpacity>

                          {showEndTimePicker && (
                            <DateTimePicker
                              value={ScheduleEndTime}
                              mode="time"
                              is24Hour
                              display="default"
                              onChange={(event, selectedTime) => {
                                setShowEndTimePicker(false);
                                if (selectedTime) setScheduleEndTime(selectedTime);
                              }}
                            />
                          )}
                        </>
                      )}
                    </View>
                  </View>

                  {/* Input Date */}
                  <View style={styles.rowModal}>
                    <View
                      style={{
                        flex: 1,
                      }}
                    >
                      <Text style={styles.labelModal}>Date</Text>
                      {Platform.OS === "web" ? (
                        <input
                          type="date"
                          value={ScheduleDate}
                          //max={new Date().toISOString().split("T")[0]}
                          min={new Date().toISOString().split("T")[0]}
                          onChange={(e) => setScheduleDate(e.target.value)}
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
                            onPress={() => setShowScheduleDate(true)}
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
                              {ScheduleDate === "" ? "Select Date" : ScheduleDate}
                            </Text>
                          </TouchableOpacity>

                          {showScheduleDate && (
                            <DateTimePicker
                              value={date}
                              mode="date"
                              display="default"
                              //maximumDate={new Date()}
                              minimumDate={new Date()}
                              onChange={onChangeScheduleDate}
                            />
                          )}
                        </>
                      )}   
                    </View>
                  </View>

                  {/* Input Descriptions */}
                  <View style={styles.rowModal}>
                    <View
                      style={{
                        flex: 1,
                      }}
                    >
                      <Text style={styles.labelModal}>Descriptions</Text>
                    
                      <TextInput
                        value={ScheduleDescriptions}
                        onChangeText={setScheduleDescriptions}
                        style={styles.inputModal}
                        placeholder="For Upper body, make you more energize and feel better ....."
                        placeholderTextColor="#999"
                      />
                    </View>
                  </View>

                  {/* Input Activity Plan */}
                  <View style={styles.rowModal}>
                    <View
                      style={{
                        flex: 1,
                      }}
                    >
                      <Text style={styles.labelModal}>Activity Plan</Text>
                    
                      <TextInput
                        style={styles.notesInput}
                        placeholder="Write Activity Plan..."
                        placeholderTextColor="#999"
                        value={ScheduleList}
                        onChangeText={setScheduleList}
                        multiline
                        numberOfLines={5}
                        textAlignVertical="top"
                      />
                    </View>
                  </View>

                  {/* Input Quota */}
                  <View style={styles.rowModal}>
                    <View
                      style={{
                        flex: 1,
                      }}
                    >
                      <Text style={styles.labelModal}>Quota</Text>
                    
                      <TextInput
                        value={ScheduleQuota}
                        onChangeText={(text) => setScheduleQuota(text.replace(/\D/g, ""))}
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
  Schedule,
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
          {Schedule}
        </Text>
      </View>

      {rightIcon}
    </TouchableOpacity>
  );
}

function MenuSubItem({ icon, Schedule, active = false, onPress }: any) {
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
        {Schedule}
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

  addScheduleBadge: {
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
  sectionScheduleBadge: {
    width: "20%",
    backgroundColor: "#fff",
    //paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 30,
    //marginLeft: 20,
    padding: 15,
    marginBottom: 15,
  },
  sectionSchedule: {
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
  ScheduleList: {
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

  ScheduleModal: {
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

   
 //================================= Schedule =================================
   notesInput: {
    minHeight: 110,
    backgroundColor: "#D9D9DD",
    borderWidth: 1,
    borderColor: "#DDDDDD",
    borderRadius: 8,
    padding: 14,
    fontSize: 15,
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
    fontSize: 15,
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
    fontSize: 15,
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
    fontSize: 15,
    color: "#111",
    outlineStyle: "none" as any,
  },

  clearSearch: {
    fontSize: 15,
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
    fontSize: 15,
    color: "#111",
  },

  noResult: {
    padding: 20,
    alignItems: "center",
  },

  noResultText: {
    fontSize: 15,
    color: "#888",
  },

  inputTime: {
  height: 50,
  backgroundColor: "#D9D9DD",
  borderRadius: 12,
  paddingHorizontal: 15,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: 15,
},

timeText: {
  fontSize: 16,
  color: "#111",
},

label: {
  fontSize: 14,
  fontWeight: "600",
  marginBottom: 8,
},
});
