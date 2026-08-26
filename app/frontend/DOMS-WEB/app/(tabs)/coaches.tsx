import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { Link, useRouter, useGlobalSearchParams, useLocalSearchParams } from "expo-router";
import React, { useMemo, useRef, useState, useEffect } from "react";
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
} from "react-native";
import PhoneInput from "../../components/PhoneInput";
// ============ DATA ============
interface dataActiveCoaches {
  id: string;
  name: string;
  coachId: string;
  dateExpiration: string;
  photo: string;
  email: string;
  birthDate: string;
  phone: string;
  password: string;
  gender: string;
}

const initialDataActiveCoaches: dataActiveCoaches[] = [
  {
    id: "1",
    name: "James Medalla",
    coachId: "SFM2301N1",
    dateExpiration: "2026-05-11",
    photo: "https://i.pravatar.cc/300?img=1",
    email: "Testing@gmail.com",
    birthDate: "2000-05-10",
    phone: "6285122233300",
    password: "12345",
    gender: "Male",
  },
  {
    id: "2",
    name: "Chris Medalla",
    coachId: "SFM2301N2",
    dateExpiration: "2026-05-11",
    photo: "https://i.pravatar.cc/300?img=1",
    email: "Testing@gmail.com",
    birthDate: "2000-05-10",
    phone: "6285122233300",
    password: "12345",
    gender: "Female",
  },
  {
    id: "3",
    name: "James Chris",
    coachId: "SFM2301N3",
    dateExpiration: "2026-05-11",
    photo: "https://i.pravatar.cc/300?img=1",
    email: "Testing@gmail.com",
    birthDate: "2000-05-10",
    phone: "6285122233300",
    password: "12345",
    gender: "Male",
  },
  {
    id: "4",
    name: "Sarah Medalla",
    coachId: "SFM2301N4",
    dateExpiration: "2026-05-11",
    photo: "https://i.pravatar.cc/300?img=1",
    email: "Testing@gmail.com",
    birthDate: "2000-05-10",
    phone: "6285122233300",
    password: "12345",
    gender: "Female",
  },
  {
    id: "5",
    name: "James Sarah",
    coachId: "SFM2301N5",
    dateExpiration: "2026-05-11",
    photo: "https://i.pravatar.cc/300?img=1",
    email: "Testing@gmail.com",
    birthDate: "2000-05-10",
    phone: "6285122233300",
    password: "12345",
    gender: "Male",
  },
  {
    id: "6",
    name: "Lee Medalla",
    coachId: "SFM2301N6",
    dateExpiration: "2026-05-11",
    photo: "https://i.pravatar.cc/300?img=1",
    email: "Testing@gmail.com",
    birthDate: "2000-05-10",
    phone: "6285122233300",
    password: "12345",
    gender: "Male",
  },
  {
    id: "7",
    name: "James Medalla Lee",
    coachId: "SFM2301N7",
    dateExpiration: "2026-05-11",
    photo: "https://i.pravatar.cc/300?img=1",
    email: "Testing@gmail.com",
    birthDate: "2000-05-10",
    phone: "6285122233300",
    password: "12345",
    gender: "Male",
  },
];

interface UsersData {
  id_user : string;
  full_name : string;
  email : string;
}

interface CoachesData {
  id_user : string;
  full_name : string;
  email : string;
}

export default function CoachesScreen() {
  const router = useRouter();
  const [activeCoachesData, setActiveCoachesData] = useState<
    dataActiveCoaches[]
  >(initialDataActiveCoaches);

  const [search, setSearch] = useState("");
  const [entries, setEntries] = useState(10);
  const [page, setPage] = useState(1);

  const filteredData = useMemo(() => {
    return activeCoachesData.filter((item) => {
      const keyword = search.toLowerCase();

      const matchSearch =
        item.name.toLowerCase().includes(keyword) ||
        item.coachId.toString().toLowerCase().includes(keyword);
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
      <Text style={[styles.dataTextList, { flex: 3 }]}>{item.full_name}</Text>
      <Text style={[styles.dataTextList, { flex: 2 }]}>{item.id}</Text>

      <Text style={[styles.dataTextList, { flex: 2, textAlign: "center" }]}>
        {item.phone}
      </Text>
      <Text style={[styles.dataTextList, { flex: 2, textAlign: "center" }]}>
        {item.updated_at}
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
  const [selectedActiveCoaches, setSelectedActiveCoaches] =
    useState<dataActiveCoaches | null>(null);
  const [CoachId, setCoachId] = useState("");
  const [CoachDateExpiration, setCoachDateExpiration] = useState("");
  const [status, setStatus] = useState<"Active" | "Inactive">("Active");
  const [image, setImage] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [dialCodePhone, setDialCodePhone] = useState("62");
  const [phone, setPhone] = useState("");
  const [dialCodeEmergencyContactNo, setDialCodeEmergencyContactNo] = useState("62");
  const [emergencyContactNo, setEmergencyContactNo] = useState("");
  const [emergencyContactName, setEmergencyContactName] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");

  const handleAdd = () => {
    setSelectedActiveCoaches(null);
    setFullName("");
    setCoachId("");
    setCoachDateExpiration("");
    setStatus("Active");
    setImage("");
    setEmail("");
    setBirthDate("");
    setPhone("");
    setPassword("");
    setGender("");

    setShowModal(true);
  };

  // const handleEdit = (item: dataActiveCoaches) => {
  //   setSelectedActiveCoaches(item);
  //   setFullName(item.name);
  //   setCoachId(item.coachId);
  //   setCoachDateExpiration(item.dateExpiration);
  //   setImage(item.photo);
  //   setEmail(item.email);
  //   setBirthDate(item.birthDate);
  //   setPhone(item.phone);
  //   setPassword(item.password);
  //   setGender(item.gender);

  //   setShowModal(true);
  // };

  const handleEdit = (item: any) => {
    setSelectedActiveCoaches(item);
    setFullName(item.full_name);
    setCoachId(item.id);
    setCoachDateExpiration(item.updated_at);
    setImage(item.photo);
    setEmail(item.email);
    setBirthDate(item.birth_of_date);
    setPhone(item.phone);
    setPassword(item.password);
    setGender(item.gender);

    setShowModal(true);
  };

  const handleSave = () => {
    if (fullName.trim() === "") {
      alert("Member Name is required");
      return;
    }

    if (selectedActiveCoaches) {
      // UPDATE
      const updatedData = activeCoachesData.map((item) =>
        item.id === selectedActiveCoaches.id
          ? {
              ...item,
              name: fullName,
              coachId: CoachId,
              dateExpiration: CoachDateExpiration,
              photo: image,
              email: email,
              birthDate: birthDate,
              phone: phone,
              password: password,
              gender: gender,
            }
          : item,
      );

      setActiveCoachesData(updatedData);

      alert("Members updated successfully");
    } else {
      // ADD
      const newActiveCoaches: dataActiveCoaches = {
        id: Date.now().toString(),
        name: fullName,
        coachId: CoachId,
        dateExpiration: CoachDateExpiration,
        photo: image,
        email: email,
        birthDate: birthDate,
        phone: phone,
        password: password,
        gender: gender,
      };

      setActiveCoachesData([...activeCoachesData, newActiveCoaches]);

      alert("Members added successfully");
    }
    resetForm();
  };

  const handleDelete = (id: string) => {
    const data = activeCoachesData.filter((item) => item.id !== id);

    setActiveCoachesData(data);

    alert("Members delete successfully");
  };

  const handleCancel = () => {
    resetForm();
    setShowModal(false);
  };

  const resetForm = () => {
    setSelectedActiveCoaches(null);
    setFullName("");
    setCoachId("");
    setCoachDateExpiration("");
    setImage("");
    setEmail("");
    setBirthDate("");
    setPhone("");
    setPassword("");
    setGender("");

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

  const [birthDate, setBirthDate] = useState("");
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const onChangeDate = (event: any, selectedDate?: Date) => {
    setShowPicker(false);

    if (selectedDate) {
      setDate(selectedDate);

      const formatted =
        selectedDate.getFullYear() +
        "-" +
        String(selectedDate.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(selectedDate.getDate()).padStart(2, "0");

      setBirthDate(formatted);
    }
  };

  // Accesses both route params
  const apiURL = process.env.EXPO_PUBLIC_API_URL;
  // const { accessToken, email } = useLocalSearchParams();
  const { accessToken } = useGlobalSearchParams();
  // console.log(accessToken);

  // GET DATA
  const [users, setUsers] = useState<UsersData | null>(null);
  const [coaches, setCoaches] = useState<null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDataUser();
    fetchDataCoach();
  }, []);

  const fetchDataUser = async () => {
    try {
      // console.log(accessToken);
      const responseUser = await fetch(`${apiURL}/profile`, {
      method: 'GET',
      headers: {
        'authorization': `Bearer ${accessToken}`, // Pass JWT token to backend
        'Content-Type': 'application/json',
      }
    });
      const dataUser = await responseUser.json();
      setUsers(dataUser);
      // console.log(dataUser);
    } catch (error) {
      console.error('Error fetching list data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDataCoach = async () => {
    try {
      // console.log(accessToken);
      const responseCoach= await fetch(`${apiURL}/coaches`, {
      method: 'GET',
      headers: {
        'authorization': `Bearer ${accessToken}`, // Pass JWT token to backend
        'Content-Type': 'application/json',
      }
    });
      const dataCoach = await responseCoach.json();
      setCoaches(dataCoach);
      console.log(dataCoach);
    } catch (error) {
      console.error('Error fetching list data:', error);
    } finally {
      setLoading(false);
    }
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

          {/* <Text style={styles.adminName}>Fandi Wijaya</Text> */}
            {users && (
            <Text style={styles.adminName}>{users.full_name}</Text>
            )}
          {/* <Text style={styles.email}>fandiwijaya@doms.com</Text> */}
            {users && (
            <Text style={styles.email}>{users.email}</Text>
            )}
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <MenuItem
            icon="dashboard"
            title="Dashboard"
            onPress={() => router.push("/dashboard")}
          />
          <MenuItem
            icon="people"
            title="View Members"
            onPress={() => router.push("/members")}
          />
          <MenuItem
            icon="fitness-center"
            title="Coaches"
            onPress={() => router.push("/coaches")}
            active
          />
          <MenuItem
            icon="home-work"
            title="Class"
            onPress={() => router.push("/class")}
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
            icon="auto-stories"
            title="Report"
            onPress={() => router.push("/report")}
          />
          <MenuItem
            icon="badge"
            title="Profile"
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
            <Pressable style={styles.addTitleBadge} onPress={handleAdd}>
              <Text style={styles.sectionTitle}>Add Coach</Text>
            </Pressable>

            <View style={styles.cardList}>
              <Text style={styles.titleList}>Manage Coaches</Text>

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
                    placeholder="Search Coaches..."
                    value={search}
                    onChangeText={setSearch}
                    style={styles.searchInputList}
                  />
                </View>
              </View>

              {/* Header */}
              <View style={styles.headerRowList}>
                <Text style={[styles.headerTextList, { flex: 3 }]}>Name</Text>
                <Text style={[styles.headerTextList, { flex: 2 }]}>
                  Coach ID
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
                  Contact
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
                data={coaches}
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
                    {selectedActiveCoaches ? "Edit Coach" : "Add Coach"}
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
                  {/* Input Member Name */}
                  {selectedActiveCoaches ? (
                    <View style={styles.rowModal}>
                      <View
                        style={{
                          flex: 0.5,
                        }}
                      >
                        <Text style={styles.labelModal}>Coach ID</Text>

                        <TextInput
                          value={CoachId}
                          editable={false}
                          style={styles.inputModal}
                        />
                      </View>

                      <View
                        style={{
                          flex: 0.5,
                          marginLeft: 10,
                        }}
                      >
                        <Text style={styles.labelModal}>Full Name</Text>
                        <TextInput
                          value={fullName}
                          onChangeText={setFullName}
                          style={styles.inputModal}
                        />
                      </View>
                    </View>
                  ) : (
                    <View style={styles.rowModal}>
                      <View
                        style={{
                          flex: 1,
                        }}
                      >
                        <Text style={styles.labelModal}>Full Name</Text>
                        <TextInput
                          value={fullName}
                          onChangeText={setFullName}
                          style={styles.inputModal}
                        />
                      </View>
                    </View>
                  )}
                  {/* Input Date Expiration */}
                  {selectedActiveCoaches ? (
                    <View style={styles.rowModal}>
                      <View
                        style={{
                          flex: 0.5,
                        }}
                      >
                        <Text style={styles.labelModal}>Date Expiration</Text>

                        {Platform.OS === "web" ? (
                          <input
                            type="date"
                            value={CoachDateExpiration}
                            disabled={true}
                            //max={new Date().toISOString().split("T")[0]}
                            onChange={(e) =>
                              setCoachDateExpiration(e.target.value)
                            }
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
                              onPress={() => setShowPicker(true)}
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
                                {CoachDateExpiration === ""
                                  ? "Select Date"
                                  : CoachDateExpiration}
                              </Text>
                            </TouchableOpacity>

                            {showPicker && (
                              <DateTimePicker
                                value={date}
                                mode="date"
                                display="default"
                                onChange={onChangeDate}
                              />
                            )}
                          </>
                        )}
                      </View>

                  {/* Input Email dan Birth of Date */}
                  <View style={styles.rowModal}>
                    <View
                      style={{
                        flex: 0.7,
                      }}
                    >
                      <Text style={styles.labelModal}>Email</Text>
                      <TextInput
                        value={email}
                        onChangeText={setEmail}
                        style={styles.inputModal}
                      />
                    </View>

                    <View
                      style={{
                        flex: 0.7,
                        marginLeft: 10,
                      }}
                    >
                      <Text style={styles.labelModal}>Birth of Date</Text>

                      {Platform.OS === "web" ? (
                        <input
                          type="date"
                          value={birthDate}
                          max={new Date().toISOString().split("T")[0]}
                          onChange={(e) => setBirthDate(e.target.value)}
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
                            onPress={() => setShowPicker(true)}
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
                              {birthDate === "" ? "Select Date" : birthDate}
                            </Text>
                          </TouchableOpacity>

                          {showPicker && (
                            <DateTimePicker
                              value={date}
                              mode="date"
                              display="default"
                              maximumDate={new Date()}
                              onChange={onChangeDate}
                            />
                          )}
                        </>
                      )}
                    </View>
                  </View>

                  {/* Input Phone Number */}
                  <View
                        style={{
                          flex: 0.5,
                          marginLeft: 10,
                        }}
                      >
                        <Text style={styles.labelModal}>Contact</Text>

                        <TextInput
                          value={phone}
                          onChangeText={setPhone}
                          style={styles.inputModal}
                        />
                      </View>
                    </View>
                  ) : (
                    <View style={styles.rowModal}>
                      <View
                        style={{
                          flex: 1,
                        }}
                      >
                        <Text style={styles.labelModal}>Contact</Text>

                        <TextInput
                          value={phone}
                          onChangeText={setPhone}
                          style={styles.inputModal}
                        />
                      </View>
                    </View>
                  )}
                  
                  <View style={styles.rowModal}>
                    <View
                      style={{
                        flex: 0.7,
                        marginLeft: 10,
                      }}
                    >
                      <Text style={styles.labelModal}>Phone Number</Text>
                      
                      <PhoneInput
                        phone={phone}
                        dialCodePhone={dialCodePhone}
                        onChangePhone={setPhone}
                        onChangeDialCode={setDialCodePhone}
                      />                        
                    </View>
                  </View>
                  {/* Input Emergency Contact Name dan Emergency Contact No */}
                  <View style={styles.rowModal}>
                    <View
                      style={{
                        flex: 0.7,
                      }}
                    >
                      <Text style={styles.labelModal}>
                        Emergency Contact Name
                      </Text>

                      <TextInput
                        value={emergencyContactName}
                        onChangeText={setEmergencyContactName}
                        style={styles.inputModal}
                      />
                    </View>

                    <View
                      style={{
                        flex: 0.7,
                        marginLeft: 10,
                      }}
                    >
                      <Text style={styles.labelModal}>
                        Emergency Contact Number
                      </Text>
                      
                      <PhoneInput
                        phone={emergencyContactNo}
                        dialCodePhone={dialCodeEmergencyContactNo}
                        onChangePhone={setEmergencyContactNo}
                        onChangeDialCode={setDialCodeEmergencyContactNo}
                      />    
                    </View>
                  </View>

                  {/* Input Gender dan Password */}
                  <View style={styles.rowModal}>
                    <View
                      style={{
                        flex: 0.5,
                      }}
                    >
                      <Text style={styles.labelModal}>Gender</Text>
                      <View style={styles.pickerContainerModal}>
                        <Picker
                          selectedValue={gender}
                          onValueChange={(value) => setGender(value)}
                          style={styles.pickerContainerListModal}
                        >
                          <Picker.Item label="-- Select Gender --" value="" />
                          <Picker.Item label="Male" value="Male" />
                          <Picker.Item label="Female" value="Female" />
                        </Picker>
                      </View>
                    </View>

                    <View
                      style={{
                        flex: 0.5,
                        marginLeft: 10,
                      }}
                    >
                      <Text style={styles.labelModal}>Password</Text>

                      <TextInput
                        value={password}
                        onChangeText={setPassword}
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

 
});
