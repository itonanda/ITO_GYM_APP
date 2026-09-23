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
interface StockData {
  id: string;
  name: string;
  category: string;
  stock: number;
  status: "In Stock" | "Low Stock" | "Out of Stock";
  avatar: string;
}

const initialStockData: StockData[] = [
  {
    id: "1",
    name: "Whey Protein",
    category: "Supplement",
    stock: 20,
    status: "In Stock",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2sK9rSZLToFGoYsrUTUwE68W6iiwGwIpMkQ&s",
  },
  {
    id: "2",
    name: "Creatine",
    category: "Supplement",
    stock: 5,
    status: "Low Stock",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2sK9rSZLToFGoYsrUTUwE68W6iiwGwIpMkQ&s",
  },
  {
    id: "3",
    name: "Gym Towel",
    category: "Merchandise",
    stock: 0,
    status: "Out of Stock",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2sK9rSZLToFGoYsrUTUwE68W6iiwGwIpMkQ&s",
  },
  {
    id: "4",
    name: "Dumbbell 10kg",
    category: "Equipment",
    stock: 12,
    status: "In Stock",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2sK9rSZLToFGoYsrUTUwE68W6iiwGwIpMkQ&s",
  },
  {
    id: "5",
    name: "Resistance Band",
    category: "Equipment",
    stock: 2,
    status: "Low Stock",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2sK9rSZLToFGoYsrUTUwE68W6iiwGwIpMkQ&s",
  },
];

export default function InventoryStockScreen() {
  const router = useRouter();
  const [StockDataData, setStockDataData] =
    useState<StockData[]>(initialStockData);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [entries, setEntries] = useState(10);
  const [page, setPage] = useState(1);

  const filteredData = useMemo(() => {
    return StockDataData.filter((item) => {
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
      <Text style={[styles.dataTextList, { flex: 2 }]}>{item.name}</Text>
      <Text style={[styles.dataTextList, { flex: 2, textAlign: "center" }]}>{item.category}</Text>
      <Text style={[styles.dataTextList, { flex: 1, textAlign: "center" }]}>{item.stock}</Text>

      <Text
        style={[
          styles.dataTextList,
          {
            flex: 2,
            textAlign: "center",
            fontWeight: "bold",
            color:  item.status === "In Stock"
                      ? "#22C55E"
                      : item.status === "Low Stock"
                      ? "#F59E0B"
                      : "#a1b3ce",
          },
        ]}
      >
        {item.status}
      </Text>

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
  const [selectedStockData, setSelectedStockData] = useState<StockData | null>(
    null,
  );

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(1);
  const [status, setStatus] = useState<"In Stock" | "Low Stock" | "Out of Stock">("In Stock");
  const [avatar, setAvatar] = useState("");

  const handleAdd = () => {
    setSelectedStockData(null);
    setName("");
    setCategory("");
    setStock(0);
    setStatus("In Stock");
    setAvatar("");

    setShowModal(true);
  };

  const handleEdit = (item: StockData) => {
    setSelectedStockData(item);
    setName(item.name);
    setCategory(item.category);
    setStock(item.stock);
    setStatus(item.status);
    setAvatar(item.avatar);

    setShowModal(true);
  };

  const handleSave = () => {
    if (name.trim() === "") {
      alert("Name is required");
      return;
    }
    if (category.trim() === "") {
      alert("Category is required");
      return;
    }

    if (selectedStockData) {
      // UPDATE
      const updatedData = StockDataData.map((item) =>
        item.id === selectedStockData.id
          ? {
              ...item,
              name: name,
              category: category,
              stock: stock,
              status: status,
              avatar: avatar,
            }
          : item,
      );

      setStockDataData(updatedData);

      alert("Updated successfully");
    } else {
      // ADD
      const newStockData: StockData = {
        id: Date.now().toString(),
        name: name,
        category: category,
        stock: stock,
        status: status,
        avatar: avatar,
      };

      setStockDataData([...StockDataData, newStockData]);

      alert("Added successfully");
    }
    resetForm();
  };

  const handleDelete = (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure, you want to delete this?"
    );

    if (!confirmDelete) return;

    const data = StockDataData.filter((item) => item.id !== id);

    setStockDataData(data);

    alert("Delete successfully");
  };

  const handleCancel = () => {
    resetForm();
    setShowModal(false);
  };

  const resetForm = () => {
    setName("");
    setCategory("");
    setStock(0);
    setStatus("In Stock");
    setAvatar("");
    setSelectedStockData(null);

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
     setAvatar(imageUrl);
   };
 
   const removePhoto = () => {
     setAvatar("");
 
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
            active
            onPress={() => {
              router.push("/inventory");
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
              {/* Sub Menu - View Inventory */}
              {showSubMenu && (
                <View style={{ marginLeft: 40 }}>
                  <MenuSubItem
                    icon="layers"
                    title="Equipments"
                    onPress={() => router.push("/inventory")}
                  />
                  <MenuSubItem
                    icon="layers"
                    title="Stocks"
                    onPress={() => router.push("/inventory_stock")}
                    active
                  />
                </View>
              )}
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
              <Text style={styles.sectionTitle}>Add Item</Text>
            </Pressable>

            <View style={styles.cardList}>
              <Text style={styles.titleList}>Manage Items</Text>

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
                    placeholder="Search..."
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
                    <Picker.Item label="In Stock" value="In Stock" />
                    <Picker.Item label="Low Stock" value="Low Stock" />
                    <Picker.Item label="Out of Stock" value="Out of Stock" />
                  </Picker>
                </View>
              </View>

              {/* Header */}
              <View style={styles.headerRowList}>
                <Text style={[styles.headerTextList, { flex: 2 }]}>Name</Text>
                <Text style={[styles.headerTextList, { flex: 2, textAlign: "center" }]}>Category</Text>
                <Text style={[styles.headerTextList, { flex: 1, textAlign: "center" }]}>Stock</Text>
                <Text style={[styles.headerTextList, { flex: 2, textAlign: "center" }]}>Status</Text>
                <Text style={[styles.headerTextList, { flex: 1, textAlign: "center" }]}>Actions</Text>
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
                    {selectedStockData ? "Edit Item" : "Add Item"}
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

                  {avatar ? (
                    <Image
                      source={{ uri: avatar }}
                      style={styles.imagePlaceholderModal}
                    />
                  ) : (
                    <View style={styles.imagePlaceholderModal}></View>
                  )}

                  {/* Input Name dan Category */}
                  <View style={styles.rowModal}>
                    <View style={{ flex: 0.5 }}>
                      <Text style={styles.labelModal}>Name</Text>

                      <TextInput
                        value={name}
                        onChangeText={setName}
                        style={styles.inputModal}
                      />
                    </View>

                    <View
                      style={{
                        flex: 0.5,
                        marginLeft: 10,
                      }}
                    >
                      <Text style={styles.labelModal}>Category</Text>

                      <TextInput
                        value={category}
                        onChangeText={setCategory}
                        style={styles.inputModal}
                      />
                    </View>
                  </View>

                  {/* Input Stock dan Status */}
                  <View style={styles.rowModal}>
                    <View style={{ flex: 0.5 }}>
                      <Text style={styles.labelModal}>Stock</Text>

                      <TextInput
                        value={stock.toString()}
                        onChangeText={(text) => setStock(Number(text.replace(/\D/g, "")))}
                        keyboardType="numeric"
                        style={styles.inputModal}
                      />
                    </View>

                    <View
                      style={{
                        flex: 0.5,
                        marginLeft: 10,
                      }}
                    >
                      <Text style={styles.labelModal}>Status</Text>

                      <View style={styles.pickerContainerModal}>
                        <Picker
                          selectedValue={status}
                          onValueChange={(value) => setStatus(value)}
                          style={styles.pickerContainerListModal}
                        >
                          <Picker.Item label="In Stock" value="In Stock" />
                          <Picker.Item label="Low Stock" value="Low Stock" />
                          <Picker.Item label="Out of Stock" value="Out of Stock" />
                        </Picker>
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
