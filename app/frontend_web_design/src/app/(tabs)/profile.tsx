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
  ImageSourcePropType,
} from "react-native";
import PhoneInput from "@/components/PhoneInput";


// ============ DATA ============
interface dataActiveMembersProfile {
  id: string;
  name: string;
  memberId: string;
  dateEnrolled: string;
  dateExpiration: string;
  photo: ImageSourcePropType | null;
  email: string;
  birthDate: string;
  dialCodePhone: string;
  phone: string;
  password: string;
  confirmPassword: string;
  dialCodeEmergencyContactNo: string;
  emergencyContactNo: string;
  emergencyContactName: string;
  gender: string;
}

const initialProfile: dataActiveMembersProfile = 
  {
    id: "1",
    name: "Fandi Wijaya",
    memberId: "GYM00001",
    dateEnrolled: "2024-05-11",
    dateExpiration: "2026-05-11",
    photo: require("@/assets/images/user/user.png"),
    email: "fandiwijaya@doms.com",
    birthDate: "2000-05-10",
    dialCodePhone: "60",
    phone: "85122233360",
    password: "12345",
    confirmPassword: "12345",
    dialCodeEmergencyContactNo: "60",
    emergencyContactNo: "85122233301",
    emergencyContactName: "Budi",
    gender: "Male",
  };


export default function ProfileScreen() {
  const router = useRouter();
  
  const [showModal, setShowModal] = useState(false);
  const [isEditPassword, setIsEditPassword] = useState(false);

  const [profile, setProfile] = useState<dataActiveMembersProfile>(initialProfile);

  const [MemberId, setMemberId] = useState(profile.memberId);
  const [MemberDateEnrolled, setMemberDateEnrolled] = useState(profile.dateEnrolled);
  const [MemberDateExpiration, setMemberDateExpiration] = useState(profile.dateExpiration);
  const [image, setImage] = useState(profile.photo);
  const [fullName, setFullName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [dialCodePhone, setDialCodePhone] = useState("62");
  const [phone, setPhone] = useState(profile.phone);
  const [dialCodeEmergencyContactNo, setDialCodeEmergencyContactNo] = useState("62");
  const [emergencyContactNo, setEmergencyContactNo] = useState(profile.emergencyContactNo);
  const [emergencyContactName, setEmergencyContactName] = useState(profile.emergencyContactName);
  const [gender, setGender] = useState(profile.gender);

  const [password, setPassword] = useState(profile.password);
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(profile.confirmPassword);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSaveProfile = () => {    
    if (fullName.trim() === "") {
      alert("Member Name is required");
      return;
    }

    setProfile((prev) => ({
      ...prev,
      name: fullName,
      memberId: MemberId,
      dateEnrolled: MemberDateEnrolled,
      dateExpiration: MemberDateExpiration,
      photo: image,
      email: email,
      birthDate: birthDate,
      dialCodePhone: dialCodePhone,
      phone: phone,
      dialCodeEmergencyContactNo: dialCodeEmergencyContactNo,
      emergencyContactNo: emergencyContactNo,
      emergencyContactName: emergencyContactName,
      gender: gender,
    }));
    // setShowEditProfile(false);
    alert("Profile updated successfully");
  };

  const handleSavePassword = () => {    
    // Validasi Password
    if (password.trim() === "") {
      alert("Password is required");
      return;
    }

    // Validasi Confirm Password
    if (confirmPassword.trim() === "") {
      alert("Confirm Password is required");
      return;
    }

    // Cek Password dan Confirm Password
    if (password !== confirmPassword) {
      alert("Password and Confirm Password must be the same");
      return;
    }

    setProfile((prev) => ({
      ...prev,
      password: password,
      confirmPassword: confirmPassword,
    }));

    setShowModal(false);
    alert("Password updated successfully");
  };

  const handleCancel = () => {
    setShowModal(false);
  };
 

  const fileInputRef = useRef<HTMLInputElement>(null);

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  const pickImageWeb = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setImage({ uri: URL.createObjectURL(file) });
    }
  };

  const removePhoto = () => {
    setImage(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const [birthDate, setBirthDate] = useState(profile.birthDate);
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
            <View style={styles.cardListProfile}>
              <Text style={styles.titleListProfile}>Profile</Text>

              <View style={{marginBottom: 100}}>
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
                    source={image}
                    style={styles.imagePlaceholderModal}
                  />
                ) : (
                  <View style={styles.imagePlaceholderModal}></View>
                )}
              </View>

              {/* Input Member Name */}
              <View style={styles.rowModal}>
                <View
                  style={{
                    flex: 0.5,
                  }}
                >
                  <Text style={styles.labelModal}>Member ID</Text>

                  <TextInput
                    value={MemberId}
                    editable={false}
                    style={styles.inputModal}
                  />
                </View>

                <View
                  style={{
                    flex: 1,
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

              {/* Input Date Enrolled dan Date Expiration */}
              <View style={styles.rowModal}>
                <View
                  style={{
                    flex: 0.7,
                  }}
                >
                  <Text style={styles.labelModal}>Date Enrolled</Text>

                  {Platform.OS === "web" ? (
                    <input
                      type="date"
                      value={MemberDateEnrolled}
                      disabled={true}
                      max={new Date().toISOString().split("T")[0]}
                      onChange={(e) =>
                        setMemberDateEnrolled(e.target.value)
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
                          {MemberDateEnrolled === ""
                            ? "Select Date"
                            : MemberDateEnrolled}
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

                <View
                  style={{
                    flex: 0.7,
                    marginLeft: 10,
                  }}
                >
                  <Text style={styles.labelModal}>Date Expiration</Text>

                  {Platform.OS === "web" ? (
                    <input
                      type="date"
                      value={MemberDateExpiration}
                      disabled={true}
                      //max={new Date().toISOString().split("T")[0]}
                      onChange={(e) =>
                        setMemberDateExpiration(e.target.value)
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
                          {MemberDateExpiration === ""
                            ? "Select Date"
                            : MemberDateExpiration}
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

              {/* Input Gender dan Phone Number */}
              <View style={styles.rowModal}>
                <View
                  style={{
                    flex: 0.7,
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
             

              <View style={styles.buttonRowModal}>
                <Pressable
                  style={styles.EditPasswordButtonModal}
                  onPress={() => setShowModal(true)}
                >
                  <Feather name="key" size={20} color="#9a0505" />
                  <Text
                    style={{
                      color: "#F00",
                      fontWeight: "700",
                    }}
                  >
                    Edit Password
                  </Text>
                </Pressable>

                <Pressable
                  style={styles.saveButtonModal}
                  onPress={handleSaveProfile}
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

              
              {/* -------------------------------------------------- */}
              {/* ------------------ Screen Modal ------------------ */}
              {/* -------------------------------------------------- */}


              <Modal
                visible={showModal}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setShowModal(false)}
              >
                <View style={styles.modalScreen}>
                  <Text style={styles.titleModal}>Edit Password</Text>

                  {/* Input Password */}
                  <View style={styles.rowModal}>
                      <View
                        style={{
                          flex: 0.7,
                        }}
                      >
                        <Text style={styles.labelModal}>Password</Text>
                        <View style={styles.passwordContainer}>
                          <TextInput
                            value={password}
                            onChangeText={setPassword}
                            style={styles.passwordInput}
                            secureTextEntry={!showPassword}
                          />

                          <TouchableOpacity
                            onPress={() =>
                              setShowPassword(!showPassword)
                            }
                            style={styles.eyeButton}
                          >
                            <Ionicons
                              name={
                                showPassword
                                  ? "eye-off-outline"
                                  : "eye-outline"
                              }
                              size={22}
                              color="#666"
                            />
                          </TouchableOpacity>
                        </View>                              
                      </View>

                      <View
                        style={{
                          flex: 0.7,
                          marginLeft: 10,
                        }}
                      >
                        <Text style={styles.labelModal}>Confirm Password</Text>
                        <View style={styles.passwordContainer}>
                          <TextInput
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            style={styles.passwordInput}
                            secureTextEntry={!showConfirmPassword}
                          />

                          <TouchableOpacity
                            onPress={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                            style={styles.eyeButton}
                          >
                            <Ionicons
                              name={
                                showConfirmPassword
                                  ? "eye-off-outline"
                                  : "eye-outline"
                              }
                              size={22}
                              color="#666"
                            />
                          </TouchableOpacity>
                        </View>                                 
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
                        onPress={handleSavePassword}
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
              </Modal>
              














              
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
  cardListProfile: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    borderWidth: 3,
    borderColor: "#f44c52",
    padding: 25,
    marginTop: 20,
    marginBottom: 20,
  },
  titleListProfile: {
    color: "#ED1018",
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
    left: 320,
    right: 320,
    backgroundColor: "#f5f5f5",
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

  EditPasswordButtonModal: {
    borderWidth: 1,
    borderColor: "#FF0000",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: "row",
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

  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    backgroundColor: "#D9D9DD",
  },

  passwordInput: {
    flex: 1,
    height: 50,
    paddingHorizontal: 15,
    fontSize: 15,
  },

  eyeButton: {
    paddingHorizontal: 12,
  },
});