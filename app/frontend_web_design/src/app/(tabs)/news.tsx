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
import RichTextEditor from "@/components/RichTextEditor";


// ============ DATA ============
interface dataActiveNews {
  id: string;
  titleName: string;  
  description: string;  
  picture: string  | null;
  category: string;
  postDate: string;
  status: string;
}

const initialDataActiveNews: dataActiveNews[] = [
  {
    id: "1",
    titleName: "Lomba 20 Juli",
    category: "Events",
    status: "Posted",
    description: "kompetisi tahunan yang paling dinanti: DOMS Challenge 2026!",
    picture: "https://i.pravatar.cc/300?img=55",
    postDate: "",
  },
];

const dataCategory = [
  {
    id: '1',
    CategoryName: "Workout",
  },
  {
    id: '2',
    CategoryName: "Nutrition",
  },
  {
    id: '3',
    CategoryName: "Events",
  },
  {
    id: '4',
    CategoryName: "Tips",
  },
];

const dataStatus = [
  {
    id: '1',
    StatusName: "Posted",
  },
  {
    id: '2',
    StatusName: "Hidden",
  },
  {
    id: '3',
    StatusName: "Pending",
  },
];

export default function NewsScreen() {
  const router = useRouter();
  const [activeNewsData, setActiveNewsData] = useState<
    dataActiveNews[]
  >(initialDataActiveNews);

  const [search, setSearch] = useState("");
  const [entries, setEntries] = useState(10);
  const [page, setPage] = useState(1);

  const filteredData = useMemo(() => {
    return activeNewsData.filter((item) => {
      const keyword = search.toLowerCase();

      const matchSearch =
        item.titleName.toLowerCase().includes(keyword) ||
        item.category.toString().toLowerCase().includes(keyword);
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
      <Text style={[styles.dataTextList, { flex: 3 }]}>{item.titleName}</Text>
      <Text style={[styles.dataTextList, { flex: 2 }]}>{item.category}</Text>
      <Text style={[styles.dataTextList, { flex: 2, textAlign: "center" }]}>{item.status}</Text>

      <View
        style={{
          flex: 2,
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
  const [selectedActiveNews, setSelectedActiveNews] =
    useState<dataActiveNews | null>(null);
  
  
  const [titleName, setTitleName] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState<string | null>(null);

  const [category, setCategory] = useState<any>(null);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [CategorySearch, setCategorySearch] = useState("");
  
  const [postDate, setPostDate] = useState("");

  const [status, setStatus] =  useState<any>(null);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [StatusSearch, setStatusSearch] = useState("");

  const handleAdd = () => {
    setSelectedActiveNews(null);
    setTitleName("");
    setDescription("");
    setPicture("");
    setCategory("");
    setPostDate("");
    setStatus("");

    setShowModal(true);
  };

  const handleEdit = (item: dataActiveNews) => {
    setSelectedActiveNews(item);
    setTitleName(item.titleName);
    setDescription(item.description);
    setPicture(item.picture);
    
    const selectedCategory = dataCategory.find(
      (Category) => Category.CategoryName === item.category
    );
    setCategory(selectedCategory || null);

    setPostDate(item.postDate);
    
    const selectedStatus = dataStatus.find(
      (Status) => Status.StatusName === item.status
    );
    setStatus(selectedStatus || null);

    setShowModal(true);
  };

  const handleSave = () => {
    if (titleName.trim() === "") {
      alert("Name is required");
      return;
    }
    if (!category) {
      alert("Please select a category name");
      return;
    }
    if (!status) {
      alert("Please select a status");
      return;
    }
    


    if (selectedActiveNews) {
      // UPDATE
      const updatedData = activeNewsData.map((item) =>
        item.id === selectedActiveNews.id
          ? {
              ...item,
              titleName: titleName,
              description: description,
              picture: picture,
              category: category,
              postDate: postDate,
              status: status,
            }
          : item,
      );

      setActiveNewsData(updatedData);

      alert("Updated successfully");
    } else {
      // ADD
      const newActiveNews: dataActiveNews = {
        id: Date.now().toString(),    
          titleName: titleName,
          description: description,
          picture: picture,
          category: category,
          postDate: postDate,
          status: status,
      };

      setActiveNewsData([...activeNewsData, newActiveNews]);

      alert("Added successfully");
    }
    resetForm();
  };

  const handleDelete = (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure, you want to delete this?"
    );

    if (!confirmDelete) return;

    const data = activeNewsData.filter((item) => item.id !== id);

    setActiveNewsData(data);

    alert("Delete successfully");
  };

  const handleCancel = () => {
    resetForm();
    setShowModal(false);
  };

  const resetForm = () => {
    setSelectedActiveNews(null);
    setTitleName("");
    setDescription("");
    setPicture("");
    setCategory("");
    setPostDate("");
    setStatus("");

    setShowModal(false);
  };

  // Upload Image
  const handleSelectImage = () => {
    if (Platform.OS !== "web") return;

    const input = document.createElement("input");

    input.type = "file";
    input.accept = "image/*";

    input.onchange = (event: any) => {
      const file = event.target.files?.[0];

      if (!file) return;

      // Validasi ukuran maksimal 50MB
      if (file.size > 50 * 1024 * 1024) {
        alert("Maximum file size is 50MB");
        return;
      }

      // if (file.size > 2 * 1024 * 1024 * 1024) {
      //   alert("Maximum file size is 2GB");
      //   return;
      // }

      const imageUrl = URL.createObjectURL(file);

      setPicture(imageUrl);
    };

    input.click();
  };

  const filteredCategory = dataCategory.filter((item) => {
    const search = CategorySearch.toLowerCase();

    return (
      item.CategoryName.toLowerCase().includes(search) 
    );
  });

  const filteredStatus = dataStatus.filter((item) => {
    const search = StatusSearch.toLowerCase();

    return (
      item.StatusName.toLowerCase().includes(search) 
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
              {/* Sub Menu - News */}
              {showSubMenu && (
                <View style={{ marginLeft: 40 }}>
                  <MenuSubItem
                    icon="assignment"
                    title="Type"
                    onPress={() => router.push("/news_type")}
                  />
                  <MenuSubItem
                    icon="assignment"
                    title="Status"
                    onPress={() => router.push("/news_status")}
                  />
                </View>
              )}
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
              <Text style={styles.sectionTitle}>Add News</Text>
            </Pressable>

            <View style={styles.cardList}>
              <Text style={styles.titleList}>Published News</Text>

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
                    placeholder="Search News..."
                    value={search}
                    onChangeText={setSearch}
                    style={styles.searchInputList}
                  />
                </View>
              </View>

              {/* Header */}
              <View style={styles.headerRowList}>
                <Text style={[styles.headerTextList, { flex: 3 }]}>Title Name</Text>
                <Text style={[styles.headerTextList, { flex: 2 }]}>Category</Text>
                <Text style={[styles.headerTextList, { flex: 2, textAlign: "center" }]}>Status</Text>
                <Text style={[styles.headerTextList, { flex: 2, justifyContent: "center" }]}>Actions</Text>
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
                    {selectedActiveNews ? "Edit News" : "Add News"}
                  </Text>

                  {/* Input Title Name */}
                  <View style={styles.rowModal}>
                    <View
                      style={{
                        flex: 1,
                      }}
                    >
                      <Text style={styles.labelModal}>Title Name</Text>
                      <TextInput
                        value={titleName}
                        onChangeText={setTitleName}
                        style={styles.inputModal}
                      />
                    </View>
                  </View>

                  {/* Input Category */}
                  <View style={styles.rowModal}>
                    <View
                      style={{
                        flex: 1,
                      }}
                    >
                      <Text style={styles.labelModal}>Category</Text>
                      
                      <TouchableOpacity
                        style={styles.memberSelect}
                        onPress={() => {
                          setShowCategoryDropdown(!showCategoryDropdown);
    
                          if (showCategoryDropdown) {
                            setCategorySearch("");
                          }
                        }}
                      >
                        <Text style={styles.memberSelectText}>
                          {category
                            ? `${category.CategoryName}`
                            : "--Select Category Name--"}
                        </Text>
    
                        <MaterialIcons
                          name={showCategoryDropdown ? "keyboard-arrow-up" : "keyboard-arrow-down"}
                          size={20}
                          color="#777"
                        />
                      </TouchableOpacity>
    
                      {showCategoryDropdown && (
                        <View style={styles.memberDropdown}>
    
                          {/* SEARCH */}
                          <View style={styles.searchContainer}>
                            <Text style={styles.searchIcon}>
                              🔍
                            </Text>
    
                            <TextInput
                              style={styles.searchInput}
                              placeholder="Search Category"
                              placeholderTextColor="#888"
                              value={CategorySearch}
                              onChangeText={setCategorySearch}
                            />
    
                            {CategorySearch.length > 0 && (
                              <TouchableOpacity
                                onPress={() => setCategorySearch("")}
                              >
                                <Text style={styles.clearSearch}>
                                  ✕
                                </Text>
                              </TouchableOpacity>
                            )}
                          </View>
    
                          {/* Category LIST */}
                          <ScrollView
                            style={styles.memberList}
                            nestedScrollEnabled
                          >
                            {filteredCategory.length > 0 ? (
                              filteredCategory.map((item) => (
                                <TouchableOpacity
                                  key={item.id}
                                  style={styles.memberItem}
                                  onPress={() => {
                                    setCategory(item);
                                    setShowCategoryDropdown(false);
                                    setCategorySearch("");
                                  }}
                                >
                                  <Text style={styles.memberItemText}>
                                    {item.CategoryName}
                                  </Text>
                                </TouchableOpacity>
                              ))
                            ) : (
                              <View style={styles.noResult}>
                                <Text style={styles.noResultText}>
                                  Category not found
                                </Text>
                              </View>
                            )}
                          </ScrollView>
                        </View>
                      )}
                    </View>
                  </View>

                  {/* Description */}
                  <View style={styles.rowModal}>
                    <View
                      style={{
                        flex: 1,
                      }}
                    >
                      <Text style={styles.labelModal}>Description</Text>                      
                      <RichTextEditor
                        value={description}
                        onChange={(html) => setDescription(html)}
                        placeholder="Write news description..."
                        minHeight={300}
                      />
                    </View>
                  </View>

                  {/* Picture */}
                  <View style={styles.rowModal}>
                    <View
                      style={{
                        flex: 1,
                      }}
                    >
                      <Text style={styles.labelModal}>Picture</Text>  
                        
                      <Pressable
                        style={styles.uploadBox}
                        onPress={handleSelectImage}
                      >
                        {picture ? (
                          <Image
                            source={{ uri: picture }}
                            style={styles.previewImage}
                            resizeMode="contain"
                          />
                        ) : (
                          <>
                            <Text style={styles.uploadTitle}>
                              Upload your files
                            </Text>

                            <Text style={styles.uploadDescription}>
                              JPEG and PNG formats, up to 50MB
                            </Text>

                            <View style={styles.selectButton}>
                              <Text style={styles.selectButtonText}>
                                Select File
                              </Text>
                            </View>
                          </>
                        )}
                      </Pressable>
                    </View>
                  </View>

                  {/* Select Status */}
                  <View style={styles.rowModal}>
                    <View
                      style={{
                        flex: 1,
                      }}
                    >
                      <Text style={styles.labelModal}>Status</Text>
                      
                      <TouchableOpacity
                        style={styles.memberSelect}
                        onPress={() => {
                          setShowStatusDropdown(!showStatusDropdown);
    
                          if (showStatusDropdown) {
                            setStatusSearch("");
                          }
                        }}
                      >
                        <Text style={styles.memberSelectText}>
                          {status
                            ? `${status.StatusName}`
                            : "--Select Status Name--"}
                        </Text>
    
                        <MaterialIcons
                          name={showCategoryDropdown ? "keyboard-arrow-up" : "keyboard-arrow-down"}
                          size={20}
                          color="#777"
                        />
                      </TouchableOpacity>
    
                      {showStatusDropdown && (
                        <View style={styles.memberDropdown}>
    
                          {/* SEARCH */}
                          <View style={styles.searchContainer}>
                            <Text style={styles.searchIcon}>
                              🔍
                            </Text>
    
                            <TextInput
                              style={styles.searchInput}
                              placeholder="Search Status"
                              placeholderTextColor="#888"
                              value={StatusSearch}
                              onChangeText={setStatusSearch}
                            />
    
                            {StatusSearch.length > 0 && (
                              <TouchableOpacity
                                onPress={() => setStatusSearch("")}
                              >
                                <Text style={styles.clearSearch}>
                                  ✕
                                </Text>
                              </TouchableOpacity>
                            )}
                          </View>
    
                          {/* Status LIST */}
                          <ScrollView
                            style={styles.memberList}
                            nestedScrollEnabled
                          >
                            {filteredStatus.length > 0 ? (
                              filteredStatus.map((item) => (
                                <TouchableOpacity
                                  key={item.id}
                                  style={styles.memberItem}
                                  onPress={() => {
                                    setStatus(item);
                                    setShowStatusDropdown(false);
                                    setStatusSearch("");
                                  }}
                                >
                                  <Text style={styles.memberItemText}>
                                    {item.StatusName}
                                  </Text>
                                </TouchableOpacity>
                              ))
                            ) : (
                              <View style={styles.noResult}>
                                <Text style={styles.noResultText}>
                                  Status not found
                                </Text>
                              </View>
                            )}
                          </ScrollView>
                        </View>
                      )}
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

//------------------------------------------------------------------------------

   sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
    marginLeft: 5,
  },

  redBadge: {
    backgroundColor: "#D80000",
    height: 25,
    minWidth: 90,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 18,
  },

  redBadgeText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "500",
  },

  radioCircle: {
    width: 19,
    height: 19,
    borderWidth: 2,
    borderColor: "#171717",
    borderRadius: 10,
    marginLeft: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  radioInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#D80000",
  },

  checkCircle: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: "#222",
    borderRadius: 10,
    marginLeft: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  checkText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#222",
  },

  editorContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 7,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E6E6E6",
    minHeight: 280,
  },

  toolbar: {
    height: 36,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 7,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
    backgroundColor: "#FFFFFF",
  },

  toolbarButton: {
    width: 28,
    height: 28,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
  },

  toolbarText: {
    fontSize: 13,
    color: "#333",
    fontWeight: "500",
  },

  toolbarDivider: {
    width: 1,
    height: 18,
    backgroundColor: "#DDD",
    marginHorizontal: 3,
  },

  toolbarSpacer: {
    flex: 1,
  },

  undoText: {
    fontSize: 18,
    color: "#999",
    marginHorizontal: 5,
  },

  moreText: {
    fontSize: 18,
    color: "#444",
    marginLeft: 5,
  },

  nativeEditor: {
    minHeight: 230,
    padding: 25,
    fontSize: 14,
    color: "#333",
    textAlignVertical: "top",
  },

  uploadBox: {
    minHeight: 110,
    borderWidth: 1,
    borderColor: "#D6D6D6",
    borderStyle: "dashed",
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 3,
    overflow: "hidden",
  },

  uploadTitle: {
    fontSize: 13,
    color: "#333",
    marginBottom: 7,
  },

  uploadDescription: {
    fontSize: 9,
    color: "#999",
    marginBottom: 12,
  },

  selectButton: {
    borderWidth: 1,
    borderColor: "#D8D8D8",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },

  selectButtonText: {
    fontSize: 9,
    color: "#444",
  },

  previewImage: {
    width: "100%",
    height: 180,
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