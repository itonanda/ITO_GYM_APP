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
interface dataOpenGym {
  id: string;
  OpenGymName: string;
  OpenGymNameId: string;
  OpenGymStartTime: string;
  OpenGymEndTime: string;
  OpenGymDate: string;
  OpenGymDescriptions: string;
  OpenGymActivityPlan: string;
}

const initialDataOpenGym: dataOpenGym[] = [
  {
    id: "1",
    OpenGymName: "Open Gym Class",
    OpenGymNameId: "1",
    OpenGymStartTime: "07:00",
    OpenGymEndTime: "20:00",
    OpenGymDate: "2026-11-18",
    OpenGymDescriptions: "Train at Your Own Pace. Enjoy a flexible workout experience with access to available gym equipment for one day. Perfect for individuals who prefer independent training and want to stay active while working toward their personal fitness goals.",
    OpenGymActivityPlan: "Gym Equipment Access. Access available strength and cardio equipment. One-Day Access. Valid only for your selected visit date. Independent Training. Train at your own pace and follow your own plan. Terms & Conditions. This pass covers gym equipment usage only. Group classes, personal training sessions, and additional paid facilities are not included.",
  },
];

const dataOpenGymName = [
  {
    id: '1',
    OpenGymName: "Open Gym Class",
    OpenGymNameId: "1",
  },
];


export default function OpenGymScreen() {
  const router = useRouter();
  const [OpenGymData, setOpenGymData] = useState<dataOpenGym[]>(initialDataOpenGym);

  const [search, setSearch] = useState("");
  const [entries, setEntries] = useState(10);
  const [page, setPage] = useState(1);

  const filteredData = useMemo(() => {
    return OpenGymData.filter((item) => {
      const keyword = search.toLowerCase();

      const matchSearch =
        item.OpenGymName.toLowerCase().includes(keyword) ||
        item.OpenGymDate.toLowerCase().includes(keyword);
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
      <Text style={[styles.dataTextList, { flex: 4 }]}>{item.OpenGymName}</Text>
      <Text style={[styles.dataTextList, { flex: 2 }]}>{item.OpenGymDate}</Text>
      <Text style={[styles.dataTextList, { flex: 2 }]}>{item.OpenGymStartTime} - {item.OpenGymEndTime}</Text>

      <View
        style={{
          flex: 1.7,
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
  const [selectedDataOpenGym, setSelectedDataOpenGym] = useState<dataOpenGym | null>(
    null,
  );
  
  const [OpenGymName, setOpenGymName] = useState<any>(null);
  const [showOpenGymNameDropdown, setShowOpenGymNameDropdown] = useState(false);
  const [OpenGymNameSearch, setOpenGymNameSearch] = useState("");
  const [OpenGymNameId, setOpenGymNameId] = useState("");  
  const [OpenGymStartTime, setOpenGymStartTime] = useState(new Date());
  const [OpenGymEndTime, setOpenGymEndTime] = useState(new Date());  
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [OpenGymDate, setOpenGymDate] = useState("");   
  const [showOpenGymDate, setShowOpenGymDate] = useState(false);
  const [date, setDate] = useState(new Date());
  const [OpenGymDescriptions, setOpenGymDescriptions] = useState("Train at Your Own Pace. Enjoy a flexible workout experience with access to available gym equipment for one day. Perfect for individuals who prefer independent training and want to stay active while working toward their personal fitness goals."); 
  const [OpenGymActivityPlan, setOpenGymActivityPlan] = useState(""); 

  const handleAdd = () => {
    setSelectedDataOpenGym(null);
    setOpenGymName("");
    setOpenGymNameId("");

    const start = new Date();
    start.setHours(7, 0, 0, 0);

    const end = new Date();
    end.setHours(20, 0, 0, 0);

    setOpenGymStartTime(start);
    setOpenGymEndTime(end);
    setOpenGymDate("");
    setOpenGymDescriptions("");
    setOpenGymActivityPlan("");

    setShowModal(true);
  };

  const handleEdit = (item: dataOpenGym) => {
    setSelectedDataOpenGym(item);
    
    const selectedOpenGymName = dataOpenGymName.find(
      (OpenGym) => OpenGym.OpenGymNameId === item.OpenGymNameId
    );
    // Simpan object
    setOpenGymName(selectedOpenGymName || null);
    // Simpan ID
    setOpenGymNameId(item.OpenGymNameId);
    
    const start = new Date();
    const [sh, sm] = item.OpenGymStartTime.split(":");
    start.setHours(Number(sh), Number(sm), 0, 0);

    const end = new Date();
    const [eh, em] = item.OpenGymEndTime.split(":");
    end.setHours(Number(eh), Number(em), 0, 0);

    setOpenGymStartTime(start);
    setOpenGymEndTime(end);
    setOpenGymDate(item.OpenGymDate);
    setOpenGymDescriptions(item.OpenGymDescriptions);
    setOpenGymActivityPlan(item.OpenGymActivityPlan);

    // Tutup dropdown
    setShowOpenGymNameDropdown(false);
    setOpenGymNameSearch("");

    // Buka modal Edit
    setShowModal(true);
  };

  const handleSave = () => {
    if (!OpenGymName) {
      alert("Please select a Open Gym Name");
      return;
    }
    if (OpenGymEndTime < OpenGymStartTime) {
      alert("Invalid Time, End time cannot be earlier than start time.");
      return;
    }
    if (OpenGymDate.trim() === "") {
      alert("Date is required");
      return;
    }

    if (selectedDataOpenGym) {
      // UPDATE
      const selectedIndex = OpenGymData.findIndex(
        (item) => item.id === selectedDataOpenGym.id,
      );

      if (selectedIndex !== -1) {
        const updatedData = [...OpenGymData];

        updatedData[selectedIndex] = {
          ...updatedData[selectedIndex],
              OpenGymName: OpenGymName,
              OpenGymNameId: OpenGymNameId,
              OpenGymStartTime: formatTime(OpenGymStartTime),
              OpenGymEndTime: formatTime(OpenGymEndTime),
              OpenGymDate: OpenGymDate,
              OpenGymDescriptions: OpenGymDescriptions,
              OpenGymActivityPlan: OpenGymActivityPlan,
            }

        setOpenGymData(updatedData);

        alert("Updated successfully");
      }
    } else {
      // ADD
      const newActiveMembers: dataOpenGym = {
        id: Date.now().toString(),
        OpenGymName: OpenGymName,
        OpenGymNameId: OpenGymNameId,
        OpenGymStartTime: formatTime(OpenGymStartTime),
        OpenGymEndTime: formatTime(OpenGymEndTime),
        OpenGymDate: OpenGymDate,
        OpenGymDescriptions: OpenGymDescriptions,
        OpenGymActivityPlan: OpenGymActivityPlan,
      };

      setOpenGymData([...OpenGymData, newActiveMembers]);

      alert("Added successfully");
    }
    resetForm();
  };

  const handleDelete = (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure, you want to delete this?"
    );

    if (!confirmDelete) return;

    const data = OpenGymData.filter((item) => item.id !== id);

    setOpenGymData(data);

    alert("Delete successfully");
  };

  const handleCancel = () => {
    resetForm();
    setShowModal(false);
  };

  const resetForm = () => {
    setSelectedDataOpenGym(null);
    setOpenGymName("");
    setOpenGymNameId("");

    const start = new Date();
    start.setHours(9, 0, 0, 0); // 09:00

    const end = new Date();
    end.setHours(10, 0, 0, 0); // 10:00

    setOpenGymStartTime(start);
    setOpenGymEndTime(end);
    setOpenGymDate("");
    setOpenGymDescriptions("");
    setOpenGymActivityPlan("");

    setShowModal(false);
  };

  const filteredOpenGymName = dataOpenGymName.filter((item) => {
    const search = OpenGymNameSearch.toLowerCase();

    return (
      item.OpenGymName.toLowerCase().includes(search) ||
      item.OpenGymNameId.toLowerCase().includes(search)
    );
  });

  const onChangeOpenGymDate = (event: any, selectedDate?: Date) => {
    setShowOpenGymDate(false);

    if (selectedDate) {
      setDate(selectedDate);

      const formatted =
        selectedDate.getFullYear() +
        "-" +
        String(selectedDate.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(selectedDate.getDate()).padStart(2, "0");

      setOpenGymDate(formatted);
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
            onPress={() => router.push("/membership")}
          />
          <MenuItem
            icon="home-work"
            title="Class"
            onPress={() => router.push("/class")}
          />
          <MenuItem
            icon="sports-handball"
            title="Open Gym"
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
              {/* Sub Menu - View Open Gym */}
              {showSubMenu && (
                <View style={{ marginLeft: 40 }}>
                  <MenuSubItem
                    icon="schedule-send"
                    title="Booking"
                    onPress={() => router.push("/open_gym_booking")}
                  />
                  <MenuSubItem
                    icon="assignment"
                    title="Status"
                    onPress={() => router.push("/open_gym_status")}
                  />
                  <MenuSubItem
                    icon="assignment"
                    title="Open Gym Name"
                    onPress={() => router.push("/open_gym_name")}
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
        {/* <View style={styles.topBar}>
          <Text style={styles.feedback}>Feedback</Text>

          <Ionicons name="notifications" size={24} color="#ED1018" />
        </View> */}

        {/* GRID */}
        <View style={styles.grid}>
          {/* LEFT */}
          <View style={{ flex: 2 }}>
            {/* TOP SCREEN */}
            <Pressable style={styles.addScheduleBadge} onPress={handleAdd}>
              <Text style={styles.sectionSchedule}>Add Open Gym</Text>
            </Pressable>

            <View style={styles.cardList}>
              <Text style={styles.ScheduleList}>Open Gym</Text>

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
                    placeholder="Search Open Gym..."
                    value={search}
                    onChangeText={setSearch}
                    style={styles.searchInputList}
                  />
                </View>
              </View>

              {/* Header */}
              <View style={styles.headerRowList}>
                <Text style={[styles.headerTextList, { flex: 4 }]}>Open Gym Name</Text>
                <Text style={[styles.headerTextList, { flex: 2 }]}>Date</Text>
                <Text style={[styles.headerTextList, { flex: 2 }]}>Time</Text>
                
                <Text
                  style={[
                    styles.headerTextList,
                    {
                      flex: 1.7,
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
                    {selectedDataOpenGym ? "Edit Schedule" : "Add Schedule"}
                  </Text>

                  {/* Input Open Gym Name */}
                  <View style={styles.rowModal}>
                    <View
                      style={{
                        flex: 1,
                      }}
                    >
                      <Text style={styles.labelModal}>Open Gym Name</Text>

                      <TouchableOpacity
                        style={styles.memberSelect}
                        onPress={() => {
                          setShowOpenGymNameDropdown(!showOpenGymNameDropdown);
    
                          if (showOpenGymNameDropdown) {
                            setOpenGymNameSearch("");
                          }
                        }}
                      >
                        <Text style={styles.memberSelectText}>
                          {OpenGymName
                            ? `${OpenGymName.OpenGymName}`
                            : "--Select Open Gym Name--"}
                        </Text>
    
                        <MaterialIcons
                          name={showOpenGymNameDropdown ? "keyboard-arrow-up" : "keyboard-arrow-down"}
                          size={20}
                          color="#777"
                        />
                      </TouchableOpacity>
    
                      {showOpenGymNameDropdown && (
                        <View style={styles.memberDropdown}>
    
                          {/* SEARCH */}
                          <View style={styles.searchContainer}>
                            <Text style={styles.searchIcon}>
                              🔍
                            </Text>
    
                            <TextInput
                              style={styles.searchInput}
                              placeholder="Search Open Gym Name"
                              placeholderTextColor="#888"
                              value={OpenGymNameSearch}
                              onChangeText={setOpenGymNameSearch}
                            />
    
                            {OpenGymNameSearch.length > 0 && (
                              <TouchableOpacity
                                onPress={() => setOpenGymNameSearch("")}
                              >
                                <Text style={styles.clearSearch}>
                                  ✕
                                </Text>
                              </TouchableOpacity>
                            )}
                          </View>
    
                          {/* Open Gym Name List */}
                          <ScrollView
                            style={styles.memberList}
                            nestedScrollEnabled
                          >                      
                            <View style={{ maxHeight: 200 }}>
                              <FlatList
                                data={filteredOpenGymName}
                                keyExtractor={(item) => item.id.toString()}
                                keyboardShouldPersistTaps="handled"
                                nestedScrollEnabled
                                renderItem={({ item }) => (
                                  <TouchableOpacity
                                    style={styles.memberItem}
                                    onPress={() => {
                                      setOpenGymName(item);
                                      setShowOpenGymNameDropdown(false);
                                      setOpenGymNameSearch("");
                                    }}
                                  >
                                    <Text style={styles.memberItemText}>{item.OpenGymName}</Text>
                                  </TouchableOpacity>
                                )}
                              />
                            </View>
                          </ScrollView>
                        </View>
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
                          value={formatTime(OpenGymStartTime)}
                          onChange={(e) => {
                            const [h, m] = e.target.value.split(":");
                            const date = new Date(OpenGymStartTime);
                            date.setHours(Number(h), Number(m), 0, 0);
                            setOpenGymStartTime(date);
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
                            <Text>{formatTime(OpenGymStartTime)}</Text>
                            <Ionicons name="time-outline" size={22} color="#777" />
                          </TouchableOpacity>

                          {showStartTimePicker && (
                            <DateTimePicker
                              value={OpenGymStartTime}
                              mode="time"
                              is24Hour
                              display="default"
                              onChange={(event, selectedTime) => {
                                setShowStartTimePicker(false);
                                if (selectedTime) setOpenGymStartTime(selectedTime);
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
                          value={formatTime(OpenGymEndTime)}
                          onChange={(e) => {
                            const [h, m] = e.target.value.split(":");
                            const date = new Date(OpenGymEndTime);
                            date.setHours(Number(h), Number(m), 0, 0);
                            setOpenGymEndTime(date);
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
                            <Text>{formatTime(OpenGymStartTime)}</Text>
                            <Ionicons name="time-outline" size={22} color="#777" />
                          </TouchableOpacity>

                          {showEndTimePicker && (
                            <DateTimePicker
                              value={OpenGymEndTime}
                              mode="time"
                              is24Hour
                              display="default"
                              onChange={(event, selectedTime) => {
                                setShowEndTimePicker(false);
                                if (selectedTime) setOpenGymEndTime(selectedTime);
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
                          value={OpenGymDate}
                          //max={new Date().toISOString().split("T")[0]}
                          min={new Date().toISOString().split("T")[0]}
                          onChange={(e) => setOpenGymDate(e.target.value)}
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
                            onPress={() => setShowOpenGymDate(true)}
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
                              {OpenGymDate === "" ? "Select Date" : OpenGymDate}
                            </Text>
                          </TouchableOpacity>

                          {showOpenGymDate && (
                            <DateTimePicker
                              value={date}
                              mode="date"
                              display="default"
                              //maximumDate={new Date()}
                              minimumDate={new Date()}
                              onChange={onChangeOpenGymDate}
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
                        value={OpenGymDescriptions}
                        onChangeText={setOpenGymDescriptions}
                        style={styles.inputModal}
                        placeholder="Train at Your Own Pace. Enjoy a flexible workout experience with access to available gym equipment for one day. Perfect for individuals who prefer independent training and want to stay active while working toward their personal fitness goals."
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
                        value={OpenGymActivityPlan}
                        onChangeText={setOpenGymActivityPlan}
                        multiline
                        numberOfLines={5}
                        textAlignVertical="top"
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
      // marginBottom: 20,
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