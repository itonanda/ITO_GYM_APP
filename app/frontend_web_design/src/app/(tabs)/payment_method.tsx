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
  ImageSourcePropType,
} from "react-native";
import PhoneInput from "../../components/PhoneInput";


// ============ DATA ============
interface dataActiveMethod {
  id: string;
  methodName: string;
  photoQR: ImageSourcePropType | null;
  accountNumber: string;
  photoLogo: ImageSourcePropType | null;
}

const initialDataActiveMethod: dataActiveMethod[] = [
  {
    id: "1",
    methodName: "QRIS",
    photoQR: require("@/assets/payment/payment_QR.png"),
    accountNumber: "",
    photoLogo: require("@/assets/payment/logo_QR.png"),
  },
  {
    id: "2",
    methodName: "Gopay",
    photoQR: require("@/assets/payment/payment_Gopay.png"),
    accountNumber: "",
    photoLogo: require("@/assets/payment/logo_Gopay.png"),
  },
  {
    id: "3",
    methodName: "Transfer Bank BCA",
    photoQR: null,
    accountNumber: "11111222223333",
    photoLogo: require("@/assets/payment/logo_BCA.png"),
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
        item.methodName.toLowerCase().includes(keyword);
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
      <Text style={[styles.dataTextList, { flex: 3 }]}>{item.methodName}</Text>
      
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
  const [selectedActiveMethod, setSelectedActiveMethod] =
    useState<dataActiveMethod | null>(null);


  
  const [methodName, setmethodName] = useState("");
  const [accountNumber, setaccountNumber] = useState("");
              

  const handleAdd = () => {
    setSelectedActiveMethod(null);
    setmethodName("");
    setImageQR(null);
    setaccountNumber("");
    setImageLogo(null);


    setShowModal(true);
  };

  const handleEdit = (item: dataActiveMethod) => {
    setSelectedActiveMethod(item);
    setmethodName(item.methodName);
    setImageQR(item.photoQR);
    setaccountNumber(item.accountNumber);
    setImageLogo(item.photoLogo);

    
    setShowModal(true);
  };

  const handleSave = () => {
    if (methodName.trim() === "") {
      alert("Method Name is required");
      return;
    }

    if (selectedActiveMethod) {
      // UPDATE
      const updatedData = activeMethodData.map((item) =>
        item.id === selectedActiveMethod.id
          ? {
              ...item,
              methodName: methodName,
              photoQR: imageQR,
              accountNumber: accountNumber,
              photoLogo: imageLogo,
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
        photoQR: imageQR,
        accountNumber: accountNumber,
        photoLogo: imageLogo,
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
    setImageQR(null);
    setaccountNumber("");
    setImageLogo(null);


    setShowModal(false);
  };

  

  const [imageQR, setImageQR] = useState<ImageSourcePropType | null>(null);
  const [imageLogo, setImageLogo] = useState<ImageSourcePropType | null>(null);

  const fileInputQRRef = useRef<HTMLInputElement | null>(null);
  const fileInputLogoRef = useRef<HTMLInputElement | null>(null);

  // Attach QR
  const handleAttachQR = () => {
    fileInputQRRef.current?.click();
  };

  // Attach Logo
  const handleAttachLogo = () => {
    fileInputLogoRef.current?.click();
  };

  // Pilih QR
  const handleQRChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setImageQR({ uri: URL.createObjectURL(file) });
    }
  };

  // Pilih Logo
  const handleLogoChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      setImageLogo({ uri: URL.createObjectURL(file) });
    }
  };

  // Remove QR
  const handleRemoveQR = () => {
    setImageQR(null);

    if (fileInputQRRef.current) {
      fileInputQRRef.current.value = "";
    }
  };

  // Remove Logo
  const handleRemoveLogo = () => {
    setImageLogo(null);

    if (fileInputLogoRef.current) {
      fileInputLogoRef.current.value = "";
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
              source={require("@/assets/images/user/user.png")}
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
                  <Text style={styles.titleModal}>
                    {selectedActiveMethod ? "Edit Method" : "Add Method"}
                  </Text>

                  {/* Input Method Name */}
                  <View style={styles.rowModal}>
                    <View
                      style={{
                        flex: 1,
                      }}
                    >
                      <Text style={styles.labelModal}>Method Name</Text>

                      <TextInput
                        value={methodName}
                        onChangeText={setmethodName}
                        style={styles.inputModal}
                      />
                    </View>
                  </View>

                  {/* Attach QR dan Logo */}
                  <View style={[styles.rowModal]}>
                    <View
                      style={{
                        flex: 0.5,
                      }}
                    >
                      <Text style={styles.labelModal}>Attach QR</Text>
                    
                      <View style={{ alignItems: "center" }}>
                        <View style={{ flexDirection: "row" }}>
                          <TouchableOpacity onPress={handleAttachQR}>
                            <Text style={styles.attachPhotoModal}>
                              Attach QR ✏️
                            </Text>
                          </TouchableOpacity>

                          <Text style={styles.attachPhotoModal}> | </Text>

                          <TouchableOpacity onPress={handleRemoveQR}>
                            <Text style={styles.attachPhotoModal}>
                              Remove QR ❌
                            </Text>
                          </TouchableOpacity>
                        </View>

                        <View style={styles.imageBox}>
                          {imageQR && (
                            <Image
                              source={imageQR}
                              style={styles.image}
                            />
                          )}
                        </View>

                        {/* Input hidden untuk Web */}
                        <input
                          ref={fileInputQRRef}
                          type="file"
                          accept="image/*"
                          style={{ display: "none" }}
                          onChange={handleQRChange}
                        />
                      </View>
                    </View>

                    <View
                      style={{
                        flex: 0.5,
                      }}
                    >
                      <Text style={styles.labelModal}>Attach Logo</Text>

                      <View style={{ alignItems: "center" }}>
                        <View style={{ flexDirection: "row" }}>
                          <TouchableOpacity onPress={handleAttachLogo}>
                            <Text style={styles.attachPhotoModal}>
                              Attach Logo ✏️
                            </Text>
                          </TouchableOpacity>

                          <Text style={styles.attachPhotoModal}> | </Text>

                          <TouchableOpacity onPress={handleRemoveLogo}>
                            <Text style={styles.attachPhotoModal}>
                              Remove Logo ❌
                            </Text>
                          </TouchableOpacity>
                        </View>

                        <View style={styles.imageBox}>
                          {imageLogo && (
                            <Image
                              source={imageLogo}
                              style={styles.image}
                            />
                          )}
                        </View>

                        {/* Input hidden untuk Web */}
                        <input
                          ref={fileInputLogoRef}
                          type="file"
                          accept="image/*"
                          style={{ display: "none" }}
                          onChange={handleLogoChange}
                        />
                      </View>
                    </View>
                  </View>

                  {/* Input Account Number */}
                  <View style={styles.rowModal}>
                    <View
                      style={{
                        flex: 0.5,
                      }}
                    >
                      <Text style={styles.labelModal}>Account Number</Text>

                      <TextInput
                        value={accountNumber}
                        onChangeText={setaccountNumber}
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

  imagePlaceholderModalQR: {
    position: "absolute",
    top: 20,
    right: 30,
    width: 120,
    height: 120,
    backgroundColor: "#FF0015",
  },

  imagePlaceholderModalLogo: {
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

  imageBox: {
    width: 180,
    height: 180,
    backgroundColor: "red",
  },

  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});
