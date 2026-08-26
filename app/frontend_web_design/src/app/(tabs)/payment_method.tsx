import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
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
} from "react-native";
import PhoneInput from "../../components/PhoneInput";
import { ImageSourcePropType } from "react-native";


// ============ DATA ============
interface dataActiveMethod {
  id: string;
  methodName: string;
  imageQR: ImageSourcePropType | null;
  accountNumber: string;
  imageLogo: ImageSourcePropType | null;
  name: string;
  coachId: string;
  dateExpiration: string;
  photo: string;
  email: string;
  birthDate: string;
  dialCodePhone: string;
  phone: string;
  password: string;
  gender: string;
}

const initialDataActiveMethod: dataActiveMethod[] = [
  {
    id: "1",
    methodName: "QRIS",
    imageQR: require("../../../assets/payment/payment_QR.png"),
    accountNumber: "",
    imageLogo: require("../../../assets/payment/logo_QR.png"),
    name: "James Medalla",
    coachId: "SFM2301N1",
    dateExpiration: "2026-05-11",
    photo: "https://i.pravatar.cc/300?img=1",
    email: "Testing@gmail.com",
    birthDate: "2000-05-10",
    dialCodePhone: "60",
    phone: "85122233360",
    password: "12345",
    gender: "Male",
  },
  {
    id: "2",
    methodName: "Gopay",
    imageQR: require("../../../assets/payment/payment_Gopay.png"),
    accountNumber: "",
    imageLogo: require("../../../assets/payment/logo_Gopay.png"),
    name: "Chris Medalla",
    coachId: "SFM2301N2",
    dateExpiration: "2026-05-11",
    photo: "https://i.pravatar.cc/300?img=1",
    email: "Testing@gmail.com",
    birthDate: "2000-05-10",
    dialCodePhone: "62",
    phone: "85122233362",
    password: "12345",
    gender: "Female",
  },
  {
    id: "3",
    methodName: "Transfer Bank BCA",
    imageQR: "",
    accountNumber: "",
    imageLogo: require("../../../assets/payment/logo_BCA.png"),
    name: "James Chris",
    coachId: "SFM2301N3",
    dateExpiration: "2026-05-11",
    photo: "https://i.pravatar.cc/300?img=1",
    email: "Testing@gmail.com",
    birthDate: "2000-05-10",
    dialCodePhone: "65",
    phone: "85122233365",
    password: "12345",
    gender: "Male",
  },
];

export default function PaymentMethodScreen() {
  const router = useRouter();
  const [activeMethodData, setActiveMethodData] = useState<
    dataActiveMethod[]
  >(initialDataActiveMethod);

  const [search, setSearch] = useState("");
  const [entries, setEntries] = useState(10);
  const [page, setPage] = useState(1);

  const filteredData = useMemo(() => {
    return activeMethodData.filter((item) => {
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
      <Text style={[styles.dataTextList, { flex: 3 }]}>{item.name}</Text>
      <Text style={[styles.dataTextList, { flex: 2 }]}>{item.coachId}</Text>

      <Text style={[styles.dataTextList, { flex: 2, textAlign: "center" }]}>
        +{item.dialCodePhone} {item.phone}
      </Text>
      <Text style={[styles.dataTextList, { flex: 2, textAlign: "center" }]}>
        {item.dateExpiration}
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

  const [showSubMenu, setShowSubMenu] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedActiveMethod, setSelectedActiveMethod] =
    useState<dataActiveMethod | null>(null);


  
  const [methodName, setmethodName] = useState("");
  const [imageQR, setimageQR] = useState<ImageSourcePropType | null>(null);
  // const [imageQR, setimageQR] = useState("");
  const [accountNumber, setaccountNumber] = useState("");
  const [imageLogo, setimageLogo] = useState<ImageSourcePropType | null>(null);
  // const [imageLogo, setimageLogo] = useState("");
              
              
  const [CoachId, setCoachId] = useState("");
  const [CoachDateExpiration, setCoachDateExpiration] = useState("");
  const [status, setStatus] = useState<"Active" | "Inactive">("Active");
  const [image, setImage] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [dialCodePhone, setDialCodePhone] = useState("62");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");

  const handleAdd = () => {
    setSelectedActiveMethod(null);
    setmethodName("");
    setimageQR(null);
    setaccountNumber("");
    setimageLogo(null);



    setFullName("");
    setCoachId("");
    setCoachDateExpiration("");
    setStatus("Active");
    setImage("");
    setEmail("");
    setBirthDate("");
    setDialCodePhone("");
    setPhone("");
    setPassword("");
    setGender("");

    setShowModal(true);
  };

  const handleEdit = (item: dataActiveMethod) => {
    setSelectedActiveMethod(item);
    setmethodName(item.methodName);
    setimageQR(item.imageQR);
    setaccountNumber(item.accountNumber);
    setimageLogo(item.imageLogo);




    setFullName(item.name);
    setCoachId(item.coachId);
    setCoachDateExpiration(item.dateExpiration);
    setImage(item.photo);
    setEmail(item.email);
    setBirthDate(item.birthDate);
    setDialCodePhone(item.dialCodePhone);
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

    if (selectedActiveMethod) {
      // UPDATE
      const updatedData = activeMethodData.map((item) =>
        item.id === selectedActiveMethod.id
          ? {
              ...item,
              methodName: methodName,
              imageQR: imageQR,
              accountNumber: accountNumber,
              imageLogo: imageLogo,
              name: fullName,
              coachId: CoachId,
              dateExpiration: CoachDateExpiration,
              photo: image,
              email: email,
              birthDate: birthDate,
              dialCodePhone: dialCodePhone,
              phone: phone,
              password: password,
              gender: gender,
            }
          : item,
      );

      setActiveMethodData(updatedData);

      alert("Members updated successfully");
    } else {
      // ADD
      const newActiveMethod: dataActiveMethod = {
        id: Date.now().toString(),        
        methodName: methodName,
        imageQR: imageQR,
        accountNumber: accountNumber,
        imageLogo: imageLogo,
        name: fullName,
        coachId: CoachId,
        dateExpiration: CoachDateExpiration,
        photo: image,
        email: email,
        birthDate: birthDate,
        dialCodePhone: dialCodePhone,
        phone: phone,
        password: password,
        gender: gender,
      };

      setActiveMethodData([...activeMethodData, newActiveMethod]);

      alert("Members added successfully");
    }
    resetForm();
  };

  const handleDelete = (id: string) => {
    const data = activeMethodData.filter((item) => item.id !== id);

    setActiveMethodData(data);

    alert("Members delete successfully");
  };

  const handleCancel = () => {
    resetForm();
    setShowModal(false);
  };

  const resetForm = () => {
    setSelectedActiveMethod(null);
    setmethodName("");
    setimageQR(null);
    setaccountNumber("");
    setimageLogo(null);



    setFullName("");
    setCoachId("");
    setCoachDateExpiration("");
    setImage("");
    setEmail("");
    setBirthDate("");
    setDialCodePhone("");
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
            onPress={() => router.push("/class")}
          />
          <MenuItem
            icon="credit-card"
            title="Payment"
            active
            onPress={() => {
              router.push("/payment");
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
              {/* Sub Menu - View Payment */}
              {showSubMenu && (
                <View style={{ marginLeft: 40 }}>
                  <MenuSubItem
                    icon="assignment"
                    title="Method"
                    onPress={() => router.push("/payment_method")}
                    active
                  />
                  <MenuSubItem
                    icon="assignment"
                    title="Status"
                    onPress={() => router.push("/payment_status")}
                  />
                </View>
              )}
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
              <Text style={styles.sectionTitle}>Add Method</Text>
            </Pressable>

            <View style={styles.cardList}>
              <Text style={styles.titleList}>Method</Text>

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
                    placeholder="Search Method..."
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
                    {selectedActiveMethod ? "Edit Method" : "Add Method"}
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
                  {selectedActiveMethod ? (
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
                  {/* Input Contact dan Date Expiration */}
                  {selectedActiveMethod ? (
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

                      <View
                        style={{
                          flex: 0.5,
                          marginLeft: 10,
                        }}
                      >
                        <Text style={styles.labelModal}>Contact</Text>

                        <PhoneInput
                          phone={phone}
                          dialCodePhone={dialCodePhone}
                          onChangePhone={setPhone}
                          onChangeDialCode={setDialCodePhone}
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
                        
                        <PhoneInput
                          phone={phone}
                          dialCodePhone={dialCodePhone}
                          onChangePhone={setPhone}
                          onChangeDialCode={setDialCodePhone}
                        />  
                      </View>
                    </View>
                  )}

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

 
});
