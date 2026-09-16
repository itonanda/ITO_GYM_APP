import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import {
  FlatList,
  Platform,
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
interface dataPayment {
  id: string;
  memberId: string;
  memberName: string;
  membershipPlanName: string;
  paymentMethodName: string;
  transactionId: string;
  paymentStatusName: string;
  transactionDate: string;
  confirmTransactionDate: string;
}

const initialDataPayment: dataPayment[] = [
  {
    id: "1",
    memberId: "SFM2301N1",
    memberName: "James Medalla",
    membershipPlanName: "3 Month Unlimited Plan",
    paymentMethodName: "QRIS",
    transactionId: "TXN-69F330E30D934B00BB98423FC32DACA5",
    paymentStatusName: "Successced",
    transactionDate: "2027-09-01",
    confirmTransactionDate: "2027-09-01",
  },
  {
    id: "2",
    memberId: "SFM2301N2",
    memberName: "Chris Medalla",
    membershipPlanName: "Open Gym Day Pass",
    paymentMethodName: "Gopay",
    transactionId: "TXN-8AF6C636F02340AEA73B2EAF6D1565C8",
    paymentStatusName: "Pending",
    transactionDate: "2027-09-03",
    confirmTransactionDate: "",
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
    membershipPlanName: "1 Month Unlimited Plan",
  },
  {
    id: '2',
    membershipPlanName: "3 Month Unlimited Plan",
  },
  {
    id: '3',
    membershipPlanName: "Open Gym Day Pass",
  },
];

const dataPaymentMethod = [
  {
    id: '1',
    paymentMethodName: "QRIS",
  },
  {
    id: '2',
    paymentMethodName: "Gopay",
  },
  {
    id: '3',
    paymentMethodName: "Transfer Bank BCA",
  },
  {
    id: '4',
    paymentMethodName: "CASH",
  },
];

const dataPaymentStatus = [
  {
    id: '1',
    paymentStatusName: "Pending",
  },
  {
    id: '2',
    paymentStatusName: "Successced",
  },
  {
    id: '3',
    paymentStatusName: "Failed",
  },
];

export default function PaymentScreen() {
  const router = useRouter();
  const [paymentsData, setpaymentsData] = useState<dataPayment[]>(initialDataPayment);

  const [search, setSearch] = useState("");
  const [entries, setEntries] = useState(10);
  const [page, setPage] = useState(1);

  const filteredData = useMemo(() => {
    return paymentsData.filter((item) => {
      const keyword = search.toLowerCase();

      const matchSearch =
        item.memberName.toLowerCase().includes(keyword) ||
        item.memberId.toString().toLowerCase().includes(keyword) ||
        item.transactionId.toString().toLowerCase().includes(keyword);
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
      <Text style={[styles.dataTextList, { flex: 3 }]}>{item.memberId} - {item.memberName}</Text>
      <Text style={[styles.dataTextList, { flex: 2, textAlign: "center" }]}>{item.transactionId}</Text>
      <Text style={[styles.dataTextList, { flex: 2, textAlign: "center" }]}>{item.paymentStatusName}</Text>

      <View
        style={{
          flex: 1,
          alignItems: "center",
          flexDirection: "row",
          gap: 10,
        }}
      >
        <Pressable
          // style={styles.editButtonList}
          style={{
            backgroundColor: "#fff",
            paddingHorizontal: 10,
            paddingVertical: 6,
            borderRadius: 10,
          }}
          onPress={() => handleEdit(item)}
        >
          {/* <Text style={styles.editTextList}>Edit</Text> */}
          <Feather name="check-circle" size={20} color="#9a0505" />
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
  const [selecteddataPayment, setSelecteddataPayment] = useState<dataPayment | null>(
    null,
  );

  const [memberId, setMemberId] = useState("");
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

  const [membershipPlanName, setMembershipPlanName] = useState<any>(null);
  const [showMembershipPlanDropdown, setShowMembershipPlanDropdown] = useState(false);
  const [membershipPlanSearch, setMembershipPlanSearch] = useState("");

  const filteredMembershipPlan = dataMembershipPlan.filter((item) => {
    const search = memberSearch.toLowerCase();

    return (
      item.membershipPlanName.toLowerCase().includes(search)
    );
  });

  const [paymentMethodName, setPaymentMethodName] = useState<any>(null);
  const [showPaymentMethodDropdown, setShowPaymentMethodDropdown] = useState(false);
  const [paymentMethodSearch, setPaymentMethodSearch] = useState("");

  const filteredPaymentMethod = dataPaymentMethod.filter((item) => {
    const search = paymentMethodSearch.toLowerCase();

    return (
      item.paymentMethodName.toLowerCase().includes(search)
    );
  });

  const [transactionId, setTransactionId] = useState("");

  const [paymentStatusName, setPaymentStatusName] = useState<any>(null);
  const [showPaymentStatusDropdown, setShowPaymentStatusDropdown] = useState(false);
  const [paymentStatusSearch, setPaymentStatusSearch] = useState("");

  const filteredPaymentStatus = dataPaymentStatus.filter((item) => {
    const search = paymentStatusSearch.toLowerCase();

    return (
      item.paymentStatusName.toLowerCase().includes(search)
    );
  });

  const [transactionDate, setTransactionDate] = useState("");
  const [showTransactionDate, setShowTransactionDate] = useState(false);
  const [date, setDate] = useState(new Date());
  const onChangeTransactionDate = (event: any, selectedDate?: Date) => {
    setShowTransactionDate(false);

    if (selectedDate) {
      setDate(selectedDate);

      const formatted =
        selectedDate.getFullYear() +
        "-" +
        String(selectedDate.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(selectedDate.getDate()).padStart(2, "0");

      setTransactionDate(formatted);
    }
  };
  
  
  
  // const getToday = () => {
  //   const today = new Date();

  //   const day = String(today.getDate()).padStart(2, "0");
  //   const month = String(today.getMonth() + 1).padStart(2, "0");
  //   const year = today.getFullYear();

  //   return `${day}/${month}/${year}`;
  // };

  // const [confirmTransactionDate, setConfirmTransactionDate] = useState(getToday());




  const [confirmTransactionDate, setConfirmTransactionDate] = useState("");
  const [showConfirmTransactionDate, setShowConfirmTransactionDate] = useState(false);
  const onChangeConfirmTransactionDate = (event: any, selectedDate?: Date) => {
    setShowConfirmTransactionDate(false);

    if (selectedDate) {
      setDate(selectedDate);

      const formatted =
        selectedDate.getFullYear() +
        "-" +
        String(selectedDate.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(selectedDate.getDate()).padStart(2, "0");

      setConfirmTransactionDate(formatted);
    }
  };


  const handleAdd = () => {
    setSelecteddataPayment(null);
    setMemberId("");
    setMemberName("");
    setMembershipPlanName("");
    setPaymentMethodName("");
    setTransactionId("");
    setPaymentStatusName("");
    setTransactionDate("");
    setConfirmTransactionDate("");

    setShowModal(true);
  };

  const handleEdit = (item: dataPayment) => {
    setSelecteddataPayment(item);

    const selectedMember = dataMember.find(
      (member) => member.memberId === item.memberId
    );
    setMemberName(selectedMember || null);
    setMemberId(item.memberId);

    const selectedMembershipPlan = dataMembershipPlan.find(
      (membershipPlan) => membershipPlan.membershipPlanName === item.membershipPlanName
    );
    setMembershipPlanName(selectedMembershipPlan || null);
    
    const selectedPaymentMethod = dataPaymentMethod.find(
      (paymentMethod) => paymentMethod.paymentMethodName === item.paymentMethodName
    );
    setPaymentMethodName(selectedPaymentMethod || null);

    setTransactionId(item.transactionId);

    const selectedPaymentStatus = dataPaymentStatus.find(
      (paymentStatus) => paymentStatus.paymentStatusName === item.paymentStatusName
    );
    setPaymentStatusName(selectedPaymentStatus || null);

    setTransactionDate(item.transactionDate);
    setConfirmTransactionDate(item.confirmTransactionDate);

    setShowModal(true);
  };

  const handleSave = () => {
    if (!memberName) {
      alert("Please select a member name");
      return;
    }
    if (!membershipPlanName) {
      alert("Please select a membership plan name");
      return;
    }
    if (!paymentMethodName) {
      alert("Please select a payment method name");
      return;
    }
    if (!paymentStatusName) {
      alert("Please select a payment status name");
      return;
    }
    if (!confirmTransactionDate) {
      alert("Confirm Transaction Date is required");
      return;
    }

    if (selecteddataPayment) {
      // UPDATE
      const updatedData = paymentsData.map((item) =>
        item.id === selecteddataPayment.id
          ? {
              ...item,
              memberId: memberId,
              memberName: memberName,
              membershipPlanName: membershipPlanName,
              paymentMethodName: paymentMethodName,
              transactionId: transactionId,
              paymentStatusName: paymentStatusName,
              transactionDate: transactionDate,
              confirmTransactionDate: confirmTransactionDate,
            }
          : item,
      );

      setpaymentsData(updatedData);

      alert("Updated successfully");
    } else {
      // ADD
      const newActiveMembers: dataPayment = {
        id: Date.now().toString(),
          memberId: memberId,
          memberName: memberName,
          membershipPlanName: membershipPlanName,
          paymentMethodName: paymentMethodName,
          transactionId: transactionId,
          paymentStatusName: paymentStatusName,
          transactionDate: transactionDate,
          confirmTransactionDate: confirmTransactionDate,
      };

      setpaymentsData([...paymentsData, newActiveMembers]);

      alert("Added successfully");
    }
    resetForm();
  };

  const handleDelete = (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure, you want to delete this?"
    );

    if (!confirmDelete) return;

    const data = paymentsData.filter((item) => item.id !== id);

    setpaymentsData(data);

    alert("Delete successfully");
  };

  const handleCancel = () => {
    resetForm();
    setShowModal(false);
  };

  const resetForm = () => {
    setSelecteddataPayment(null);
    setMemberId("");
    setMemberName("");
    setMembershipPlanName("");
    setPaymentMethodName("");
    setTransactionId("");
    setPaymentStatusName("");
    setTransactionDate("");

    setShowModal(false);
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
            onPress={() => setShowSubMenu(!showSubMenu)}
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
              <Text style={styles.sectionTitle}>Add Payment</Text>
            </Pressable>

            <View style={styles.cardList}>
              <Text style={styles.titleList}>Payment</Text>

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
                    placeholder="Search ..."
                    value={search}
                    onChangeText={setSearch}
                    style={styles.searchInputList}
                  />
                </View>
              </View>

              {/* Header */}
              <View style={styles.headerRowList}>
                <Text style={[styles.headerTextList, { flex: 3 }]}>Member Name</Text>
                <Text style={[styles.headerTextList, { flex: 2, textAlign: "center" }]}>Transaction ID</Text>
                <Text style={[styles.headerTextList, { flex: 2, textAlign: "center" }]}>Transaction Status</Text>

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
                    {selecteddataPayment ? "Confrim Payment" : "Add Payment"}
                  </Text>

                  {/* MEMBER NAME */}
                  <Text style={styles.label}>Member Name</Text>
                  
                  <TouchableOpacity           
                    disabled={!!selecteddataPayment}         
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

                  {/* MEMBERSHIP PLAN NAME */}
                  <Text style={styles.label}>Membership Plan Name</Text>

                  <TouchableOpacity
                    disabled={!!selecteddataPayment}
                    style={styles.memberSelect}
                    onPress={() => {
                      setShowMembershipPlanDropdown(!showMembershipPlanDropdown);

                      if (showMembershipPlanDropdown) {
                        setMembershipPlanSearch("");
                      }
                    }}
                  >
                    <Text style={styles.memberSelectText}>
                      {membershipPlanName
                        ? `${membershipPlanName.membershipPlanName}`
                        : "--Select Membership Plan Name--"}
                    </Text>

                    <MaterialIcons
                      name={showMemberDropdown ? "keyboard-arrow-up" : "keyboard-arrow-down"}
                      size={20}
                      color="#777"
                    />
                  </TouchableOpacity>

                  {showMembershipPlanDropdown && (
                    <View style={styles.memberDropdown}>

                      {/* SEARCH */}
                      <View style={styles.searchContainer}>
                        <Text style={styles.searchIcon}>
                          🔍
                        </Text>

                        <TextInput
                          style={styles.searchInput}
                          placeholder="Search Membership Plan Name"
                          placeholderTextColor="#888"
                          value={membershipPlanSearch}
                          onChangeText={setMembershipPlanSearch}
                        />

                        {membershipPlanSearch.length > 0 && (
                          <TouchableOpacity
                            onPress={() => setMembershipPlanSearch("")}
                          >
                            <Text style={styles.clearSearch}>
                              ✕
                            </Text>
                          </TouchableOpacity>
                        )}
                      </View>

                      {/* Membership Plan List */}
                      <ScrollView
                        style={styles.memberList}
                        nestedScrollEnabled
                      >
                        {filteredMembershipPlan.length > 0 ? (
                          filteredMembershipPlan.map((item) => (
                            <TouchableOpacity
                              key={item.id}
                              style={styles.memberItem}
                              onPress={() => {
                                setMembershipPlanName(item);
                                setShowMembershipPlanDropdown(false);
                                setMembershipPlanSearch("");
                              }}
                            >
                              <Text style={styles.memberItemText}>
                                {item.membershipPlanName}
                              </Text>
                            </TouchableOpacity>
                          ))
                        ) : (
                          <View style={styles.noResult}>
                            <Text style={styles.noResultText}>
                              Membership Plan not found
                            </Text>
                          </View>
                        )}
                      </ScrollView>
                    </View>
                  )}

                  {/* PAYMENT METHOD NAME */}
                  <Text style={styles.label}>Payment Method Name</Text>

                  <TouchableOpacity
                  disabled={!!selecteddataPayment}
                    style={styles.memberSelect}
                    onPress={() => {
                      setShowPaymentMethodDropdown(!showPaymentMethodDropdown);

                      if (showPaymentMethodDropdown) {
                        setPaymentMethodSearch("");
                      }
                    }}
                  >
                    <Text style={styles.memberSelectText}>
                      {paymentMethodName
                        ? `${paymentMethodName.paymentMethodName}`
                        : "--Select Payment Method Name--"}
                    </Text>

                    <MaterialIcons
                      name={showPaymentMethodDropdown ? "keyboard-arrow-up" : "keyboard-arrow-down"}
                      size={20}
                      color="#777"
                    />
                  </TouchableOpacity>

                  {showPaymentMethodDropdown && (
                    <View style={styles.memberDropdown}>

                      {/* SEARCH */}
                      <View style={styles.searchContainer}>
                        <Text style={styles.searchIcon}>
                          🔍
                        </Text>

                        <TextInput
                          style={styles.searchInput}
                          placeholder="Search Payment Method Name"
                          placeholderTextColor="#888"
                          value={paymentMethodSearch}
                          onChangeText={setPaymentMethodSearch}
                        />

                        {paymentMethodSearch.length > 0 && (
                          <TouchableOpacity
                            onPress={() => setPaymentMethodSearch("")}
                          >
                            <Text style={styles.clearSearch}>
                              ✕
                            </Text>
                          </TouchableOpacity>
                        )}
                      </View>

                      {/* Payment Method List */}
                      <ScrollView
                        style={styles.memberList}
                        nestedScrollEnabled
                      >
                        {filteredPaymentMethod.length > 0 ? (
                          filteredPaymentMethod.map((item) => (
                            <TouchableOpacity
                              key={item.id}
                              style={styles.memberItem}
                              onPress={() => {
                                setPaymentMethodName(item);
                                setShowPaymentMethodDropdown(false);
                                setPaymentMethodSearch("");
                              }}
                            >
                              <Text style={styles.memberItemText}>
                                {item.paymentMethodName}
                              </Text>
                            </TouchableOpacity>
                          ))
                        ) : (
                          <View style={styles.noResult}>
                            <Text style={styles.noResultText}>
                              Payment Method not found
                            </Text>
                          </View>
                        )}
                      </ScrollView>
                    </View>
                  )}

                  {/* Transaction ID and Date  */}  
                  {selecteddataPayment ? 
                    <View style={styles.rowModal}> 
                      <View
                        style={{
                          flex: 0.5,
                        }}
                      >
                        <Text style={styles.labelModal}>Transaction ID</Text>
                        <TextInput
                          value={transactionId}
                          onChangeText={setTransactionId}
                          style={styles.inputModal}
                          editable={false}
                        />
                      </View>

                      <View
                        style={{
                          flex: 0.5,
                          marginLeft: 10,
                        }}
                      >
                        <Text style={styles.labelModal}>Transaction Date</Text>
                        
                        {Platform.OS === "web" ? (
                          <input
                            disabled={!!selecteddataPayment}
                            type="date"
                            value={transactionDate}
                            //max={new Date().toISOString().split("T")[0]}
                            //min={new Date().toISOString().split("T")[0]}
                            onChange={(e) => setTransactionDate(e.target.value)}
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
                              onPress={() => setShowTransactionDate(true)}
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
                                {transactionDate === "" ? "Select Date" : transactionDate}
                              </Text>
                            </TouchableOpacity>

                            {showTransactionDate && (
                              <DateTimePicker
                                value={date}
                                mode="date"
                                display="default"
                                //maximumDate={new Date()}
                                //minimumDate={new Date()}
                                onChange={onChangeTransactionDate}
                              />
                            )}
                          </>
                        )}
                      </View>
                    </View>
                  : <View style={styles.rowModal}/>}


                  {/* Payment Status and Confrim Transaction Date  */}
                  <View style={styles.rowModal}>
                    <View
                      style={{
                        flex: 0.5,
                      }}
                    >
                      <Text style={styles.labelModal}>Payment Status</Text>
                      
                      <TouchableOpacity
                        style={styles.memberSelect}
                        onPress={() => {
                          setShowPaymentStatusDropdown(!showPaymentStatusDropdown);

                          if (showPaymentStatusDropdown) {
                            setPaymentStatusSearch("");
                          }
                        }}
                      >
                        <Text style={styles.memberSelectText}>
                          {paymentStatusName
                            ? `${paymentStatusName.paymentStatusName}`
                            : "--Select Payment Status --"}
                        </Text>

                        <MaterialIcons
                          name={showPaymentStatusDropdown ? "keyboard-arrow-up" : "keyboard-arrow-down"}
                          size={20}
                          color="#777"
                        />
                      </TouchableOpacity>

                      {showPaymentStatusDropdown && (
                        <View style={styles.memberDropdown}>

                          {/* SEARCH */}
                          <View style={styles.searchContainer}>
                            <Text style={styles.searchIcon}>
                              🔍
                            </Text>

                            <TextInput
                              style={styles.searchInput}
                              placeholder="Search Payment Status"
                              placeholderTextColor="#888"
                              value={paymentStatusSearch}
                              onChangeText={setPaymentStatusSearch}
                            />

                            {paymentStatusSearch.length > 0 && (
                              <TouchableOpacity
                                onPress={() => setPaymentStatusSearch("")}
                              >
                                <Text style={styles.clearSearch}>
                                  ✕
                                </Text>
                              </TouchableOpacity>
                            )}
                          </View>

                          {/* Payment Status List */}
                          <ScrollView
                            style={styles.memberList}
                            nestedScrollEnabled
                          >
                            {filteredPaymentStatus.length > 0 ? (
                              filteredPaymentStatus.map((item) => (
                                <TouchableOpacity
                                  key={item.id}
                                  style={styles.memberItem}
                                  onPress={() => {
                                    setPaymentStatusName(item);
                                    setShowPaymentStatusDropdown(false);
                                    setPaymentStatusSearch("");
                                  }}
                                >
                                  <Text style={styles.memberItemText}>
                                    {item.paymentStatusName}
                                  </Text>
                                </TouchableOpacity>
                              ))
                            ) : (
                              <View style={styles.noResult}>
                                <Text style={styles.noResultText}>
                                  Payment Status not found
                                </Text>
                              </View>
                            )}
                          </ScrollView>
                        </View>
                      )}
                    </View>

                    <View
                      style={{
                        flex: 0.5,
                        marginLeft: 10,
                      }}
                    >
                      <Text style={styles.labelModal}>Confirm Transaction Date</Text>

                      {Platform.OS === "web" ? (
                        <input
                          type="date"
                          value={confirmTransactionDate}
                          max={new Date().toISOString().split("T")[0]}
                          min={new Date().toISOString().split("T")[0]}
                          onChange={(e) => setConfirmTransactionDate(e.target.value)}
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
                            onPress={() => setShowConfirmTransactionDate(true)}
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
                              {confirmTransactionDate === "" ? "Select Date" : confirmTransactionDate}
                            </Text>
                          </TouchableOpacity>

                          {showConfirmTransactionDate && (
                            <DateTimePicker
                              value={date}
                              mode="date"
                              display="default"
                              maximumDate={new Date()}
                              minimumDate={new Date()}
                              onChange={onChangeConfirmTransactionDate}
                            />
                          )}
                        </>
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

  //=====================================================
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
