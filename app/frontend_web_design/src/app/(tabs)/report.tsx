import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { Link, useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
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
import { LinearGradient } from "expo-linear-gradient";
import { exportPdf } from "@/utils/exportPdf";


// ============ DATA ============
interface MemberReport {
  id: string;
  name: string;
  memberId: string;
  plan: string;
  status: "Active" | "Expired" | "Pending";
  joinDate: string;
  expirationDate: string;
  attendance: number;
}

interface Transaction {
  id: string;
  invoice: string;
  member: string;
  type: string;
  amount: number;
  date: string;
  status: "Success" | "Pending" | "Failed";
}



const membersData: MemberReport[] = [
  {
    id: "1",
    name: "James Medalla",
    memberId: "SFM2301N1",
    plan: "3 Month Unlimited Plan",
    status: "Active",
    joinDate: "2026-01-12",
    expirationDate: "2026-12-12",
    attendance: 28,
  },
  {
    id: "2",
    name: "Michael Tan",
    memberId: "SFM2301N2",
    plan: "3 Month Unlimited Plan",
    status: "Active",
    joinDate: "2026-02-10",
    expirationDate: "2026-11-10",
    attendance: 22,
  },
  {
    id: "3",
    name: "Sarah Wijaya",
    memberId: "SFM2301N3",
    plan: "1 Month Unlimited Plan",
    status: "Active",
    joinDate: "2026-03-05",
    expirationDate: "2026-12-05",
    attendance: 35,
  },
  {
    id: "4",
    name: "David Lim",
    memberId: "SFM2301N4",
    plan: "1 Month Unlimited Plan",
    status: "Expired",
    joinDate: "2025-08-10",
    expirationDate: "2026-08-10",
    attendance: 15,
  },
  {
    id: "5",
    name: "Jessica Tan",
    memberId: "SFM2301N5",
    plan: "Open Gym Unlimited",
    status: "Active",
    joinDate: "2026-04-02",
    expirationDate: "2027-04-02",
    attendance: 42,
  },
];

const transactionsData: Transaction[] = [
  {
    id: "1",
    invoice: "INV-20260901",
    member: "James Medalla",
    type: "3 Month Unlimited Plan",
    amount: 1200000,
    date: "2026-09-28",
    status: "Success",
  },
  {
    id: "2",
    invoice: "INV-20260902",
    member: "Sarah Wijaya",
    type: "1 Month Unlimited Plan",
    amount: 450000,
    date: "2026-09-28",
    status: "Success",
  },
  {
    id: "3",
    invoice: "INV-20260903",
    member: "Jessica Tan",
    type: "3 Month Unlimited Plan",
    amount: 1200000,
    date: "2026-09-27",
    status: "Success",
  },
  {
    id: "4",
    invoice: "INV-20260904",
    member: "Michael Tan",
    type: "Open Gym Day Pass",
    amount: 50000,
    date: "2026-09-27",
    status: "Pending",
  },
  {
    id: "5",
    invoice: "INV-20260905",
    member: "David Lim",
    type: "1x Drop In",
    amount: 50000,
    date: "2026-09-26",
    status: "Failed",
  },
  {
    id: "6",
    invoice: "INV-20260901",
    member: "James Medalla",
    type: "3 Month Unlimited Plan",
    amount: 1200000,
    date: "2026-09-28",
    status: "Success",
  },
  {
    id: "7",
    invoice: "INV-20260902",
    member: "Sarah Wijaya",
    type: "1 Month Unlimited Plan",
    amount: 450000,
    date: "2026-09-28",
    status: "Success",
  },
  {
    id: "8",
    invoice: "INV-20260903",
    member: "Jessica Tan",
    type: "3 Month Unlimited Plan",
    amount: 1200000,
    date: "2026-09-27",
    status: "Success",
  },
  {
    id: "9",
    invoice: "INV-20260904",
    member: "Michael Tan",
    type: "Open Gym Day Pass",
    amount: 50000,
    date: "2026-09-27",
    status: "Pending",
  },
  {
    id: "10",
    invoice: "INV-20260905",
    member: "David Lim",
    type: "1x Drop In",
    amount: 50000,
    date: "2026-09-26",
    status: "Failed",
  },
  {
    id: "11",
    invoice: "INV-20260901",
    member: "James Medalla",
    type: "3 Month Unlimited Plan",
    amount: 1200000,
    date: "2026-09-28",
    status: "Success",
  },
  {
    id: "12",
    invoice: "INV-20260902",
    member: "Sarah Wijaya",
    type: "1 Month Unlimited Plan",
    amount: 450000,
    date: "2026-09-28",
    status: "Success",
  },
  {
    id: "13",
    invoice: "INV-20260903",
    member: "Jessica Tan",
    type: "3 Month Unlimited Plan",
    amount: 1200000,
    date: "2026-09-27",
    status: "Success",
  },
  {
    id: "14",
    invoice: "INV-20260904",
    member: "Michael Tan",
    type: "Open Gym Day Pass",
    amount: 50000,
    date: "2026-09-27",
    status: "Pending",
  },
  {
    id: "15",
    invoice: "INV-20260905",
    member: "David Lim",
    type: "1x Drop In",
    amount: 50000,
    date: "2026-09-26",
    status: "Failed",
  },
  {
    id: "16",
    invoice: "INV-20260901",
    member: "James Medalla",
    type: "3 Month Unlimited Plan",
    amount: 1200000,
    date: "2026-09-28",
    status: "Success",
  },
  {
    id: "17",
    invoice: "INV-20260902",
    member: "Sarah Wijaya",
    type: "1 Month Unlimited Plan",
    amount: 450000,
    date: "2026-09-28",
    status: "Success",
  },
  {
    id: "18",
    invoice: "INV-20260903",
    member: "Jessica Tan",
    type: "3 Month Unlimited Plan",
    amount: 1200000,
    date: "2026-09-27",
    status: "Success",
  },
  {
    id: "19",
    invoice: "INV-20260904",
    member: "Michael Tan",
    type: "Open Gym Day Pass",
    amount: 50000,
    date: "2026-09-27",
    status: "Pending",
  },
  {
    id: "20",
    invoice: "INV-20260905",
    member: "David Lim",
    type: "1x Drop In",
    amount: 50000,
    date: "2026-09-26",
    status: "Failed",
  },
  {
    id: "21",
    invoice: "INV-20260901",
    member: "James Medalla",
    type: "3 Month Unlimited Plan",
    amount: 1200000,
    date: "2026-09-28",
    status: "Success",
  },
  {
    id: "22",
    invoice: "INV-20260902",
    member: "Sarah Wijaya",
    type: "1 Month Unlimited Plan",
    amount: 450000,
    date: "2026-09-28",
    status: "Success",
  },
  {
    id: "23",
    invoice: "INV-20260903",
    member: "Jessica Tan",
    type: "3 Month Unlimited Plan",
    amount: 1200000,
    date: "2026-09-27",
    status: "Success",
  },
  {
    id: "24",
    invoice: "INV-20260904",
    member: "Michael Tan",
    type: "Open Gym Day Pass",
    amount: 50000,
    date: "2026-09-27",
    status: "Pending",
  },
  {
    id: "25",
    invoice: "INV-20260905",
    member: "David Lim",
    type: "1x Drop In",
    amount: 50000,
    date: "2026-09-26",
    status: "Failed",
  },
];

const revenueData = [
  { month: "Jan", value: 42000000 },
  { month: "Feb", value: 48000000 },
  { month: "Mar", value: 52000000 },
  { month: "Apr", value: 47000000 },
  { month: "May", value: 61000000 },
  { month: "Jun", value: 58000000 },
  { month: "Jul", value: 68000000 },
  { month: "Aug", value: 72000000 },
  { month: "Sep", value: 85000000 },
  { month: "Oct", value: 56000000 },
  { month: "Nov", value: 75000000 },
  { month: "Des", value: 39000000 },
];

const attendanceData = [
  { day: "Mon", value: 142 },
  { day: "Tue", value: 168 },
  { day: "Wed", value: 154 },
  { day: "Thu", value: 181 },
  { day: "Fri", value: 195 },
  { day: "Sat", value: 228 },
  { day: "Sun", value: 187 },
];

const membershipData = [
  { membershipName: "1 Month Unlimited Plan", value: 420 },
  { membershipName: "3 Month Unlimited Plan", value: 480 },
  { membershipName: "Open Gym Day Pass", value: 520 },
  { membershipName: "Open Gym Unlimited", value: 470 },
  { membershipName: "1x Drop In", value: 61 },
  { membershipName: "5x Drop In", value: 58 },
];

export default function ReportScreen() {
  const router = useRouter();

  const activeMembers = membersData.filter(
    (item) => item.status === "Active"
  ).length;

  const expiredMembers = membersData.filter(
    (item) => item.status === "Expired"
  ).length; 

  const totalRevenue = transactionsData
    .filter((item) => item.status === "Success")
    .reduce((total, item) => total + item.amount, 0);

  
  const [transactions] = useState<Transaction[]>(transactionsData);
  const [search, setSearch] = useState("");
  const [entries, setEntries] = useState(10);
  const [page, setPage] = useState(1);

  const filteredTransactions = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    if (!keyword) {
      return transactions;
    }

    return transactions.filter((item) => {
      return (
        item.invoice.toLowerCase().includes(keyword) ||
        item.member.toLowerCase().includes(keyword) ||
        item.type.toLowerCase().includes(keyword) ||
        item.status.toLowerCase().includes(keyword) ||
        item.date.toLowerCase().includes(keyword)
      );
    });
  }, [transactions, search]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredTransactions.length / entries)
  );

  const paginatedTransactions = useMemo(() => {
    const startIndex = (page - 1) * entries;
    const endIndex = startIndex + entries;

    return filteredTransactions.slice(
      startIndex,
      endIndex
    );
  }, [filteredTransactions, page, entries]);

  const handleEntriesChange = (value: number) => {
    setEntries(value);
    setPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handlePrevious = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const startEntry =
    filteredTransactions.length === 0
      ? 0
      : (page - 1) * entries + 1;

  const endEntry =
    filteredTransactions.length === 0
      ? 0
      : Math.min(
          page * entries,
          filteredTransactions.length
        );

  const formatRupiah = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const maxRevenue = Math.max(
    ...revenueData.map((item) => item.value)
  );

  const maxAttendance = Math.max(
    ...attendanceData.map((item) => item.value)
  );

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
            active
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

            <View style={styles.cardList} >
              {/* HEADER */}
              <View style={styles.header}>
                <View>
                  <Text style={styles.pageTitle}>Gym Report</Text>
      
                  <Text style={styles.pageSubtitle}>
                    Overview and performance analytics
                  </Text>
                </View>
      
                <View style={styles.headerActions}>
                  {/* EXPORT */}
                  <TouchableOpacity
                    style={styles.exportButton}
                    onPress={() =>
                      exportPdf({
                        activeMembers,
                        expiredMembers,
                        totalRevenue,
                        revenueData,
                        attendanceData,
                        membershipData,
                        transactions: filteredTransactions,
                      })
                    }
                  >
                    <Ionicons name="download-outline" size={18} color="#E82528"/>
                    <Text style={styles.exportText}>Export Report</Text>
                  </TouchableOpacity>
                </View>
              </View>
            
              {/* KPI CARDS */}      
              <View style={styles.kpiGrid}>
                <KpiCard
                  title="Total Members"
                  value="1,248"
                  change="+12.5%"
                  icon="people-outline"
                  positive
                />
      
                <KpiCard
                  title="Active Members"
                  value={activeMembers.toString()}
                  change="+8.2%"
                  icon="checkmark-circle-outline"
                  positive
                />
      
                <KpiCard
                  title="Expired Members"
                  value={expiredMembers.toString()}
                  change="-4.3%"
                  icon="close-circle-outline"
                  positive
                />
      
                <KpiCard
                  title="New Members"
                  value="86"
                  change="+15.8%"
                  icon="person-add-outline"
                  positive
                />
              </View>
      
              {/* REVENUE KPI */}      
              <View style={styles.revenueGrid}>
                <LinearGradient
                  colors={["#390606", "#c01212", "#4b1010"]}
                  style={styles.revenueCard}
                >
                  <View style={styles.revenueHeader}>
                    <View>
                      <Text style={styles.revenueLabel}>Total Revenue</Text>      
                      <Text style={styles.revenueValue}>{formatRupiah(totalRevenue)}</Text>
                    </View>      
                    <View style={styles.revenueIcon}>
                      <Ionicons
                        name="wallet-outline"
                        size={27}
                        color="#fff"
                      />
                    </View>
                  </View>
      
                  <View style={styles.revenueFooter}>
                    <View style={styles.revenueChange}>
                      <Ionicons
                        name="trending-up"
                        size={16}
                        color="#fff"
                      />      
                      <Text style={styles.revenueChangeText}>18.6%</Text>
                    </View>      
                    <Text style={styles.revenueCompare}>vs last month</Text>
                  </View>
                </LinearGradient>
      
                <View style={styles.simpleRevenueCard}>
                  <Text style={styles.smallCardTitle}>Average Revenue / Member</Text>      
                  <Text style={styles.simpleRevenueValue}>{formatRupiah(600000)}</Text>
      
                  <View style={styles.progressBackground}>
                    <View
                      style={[
                        styles.progressFill,
                        { width: "50%" },
                      ]}
                    />
                  </View>      
                  <Text style={styles.progressText}>50% of monthly target</Text>
                </View>
              </View>
      
              {/* CHARTS */}      
              <View style={styles.chartGrid}>
                {/* REVENUE CHART */}      
                <View style={styles.chartCard}>
                  <View style={styles.cardHeader}>
                    <View>
                      <Text style={styles.cardTitle}>Revenue Overview</Text>      
                      <Text style={styles.cardSubtitle}>Monthly revenue performance</Text>
                    </View>      
                  </View>
      
                  <View style={styles.chartContainer}>
                    {revenueData.map((item) => {
                      const height = (item.value / maxRevenue) * 180;
      
                      return (
                        <View key={item.month} style={styles.barColumn}>
                          <Text style={styles.barValue}>{Math.round(item.value / 1000000)}M</Text>
      
                          <View style={styles.barBackground}>
                            <LinearGradient
                              colors={["#E82528","#9A0006"]}
                              style={[styles.bar,{ height }]}
                            />
                          </View>
      
                          <Text style={styles.barLabel}>{item.month}</Text>
                        </View>
                      );
                    })}
                  </View>
                </View>
      
                {/* ATTENDANCE */}      
                <View style={styles.chartCard}>
                  <View style={styles.cardHeader}>
                    <View>
                      <Text style={styles.cardTitle}>Attendance</Text>
      
                      <Text style={styles.cardSubtitle}>Weekly member attendance</Text>
                    </View>
                  </View>

                  <View style={styles.lineChart}>
                    {attendanceData.map((item) => {
                      const height = (item.value / maxAttendance) * 180;
      
                      return (
                        <View key={item.day} style={styles.attendanceColumn}>
                          <Text style={styles.attendanceValue}>{item.value}</Text>
      
                          <View style={styles.barBackground}>
                            <LinearGradient
                              colors={["#E82528","#9A0006"]}
                              style={[styles.bar,{ height }]}
                            />
                          </View>
         
                          <Text style={styles.dayLabel}>{item.day}</Text>   
                        </View>
                      );
                    })}
                  </View>
                </View>
              </View>
      
              {/* MEMBER ANALYTICS */}      
              <View style={styles.sectionHeader}>
                <View>
                  <Text style={styles.sectionTitlee}>Member Analytics</Text>      
                  <Text style={styles.sectionSubtitle}>Membership distribution and growth</Text>
                </View>
              </View>
      
              <View style={styles.analyticsGrid}>
                {/* MEMBERSHIP DISTRIBUTION */}
                <View style={styles.analyticsCard}>
                  <Text style={styles.cardTitle}>Membership Distribution</Text>

                  {(() => {
                    const total = membershipData.reduce(
                      (sum, item) => sum + Number(item.value || 0),
                      0
                    );

                    let degree = 0;

                    const gradient = membershipData.map((item, index) => {
                      const colors = [
                        "#E82528",
                        "#9A0006",
                        "#D65A5C",
                        "#151A2D",
                        "#777777",
                      ];

                      const start = degree;
                      degree += total > 0
                        ? (Number(item.value || 0) / total) * 360
                        : 0;

                      return `${colors[index % colors.length]} ${start}deg ${degree}deg`;
                    });

                    return total > 0 ? (
                      <View style={styles.donutContainer}>
                        {/* DONUT CHART - WEB */}
                        <View
                          style={[
                            styles.donut,
                            {
                              background: `conic-gradient(${gradient.join(", ")})`,
                            } as any,
                          ]}
                        >
                          <View style={styles.donutInner}>
                            <Text style={styles.donutValue}>
                              {total.toLocaleString("id-ID")}
                            </Text>

                            <Text style={styles.donutLabel}>
                              Members
                            </Text>
                          </View>
                        </View>

                        {/* LEGEND */}
                        <View style={styles.legend}>
                          {membershipData.map((item, index) => {
                            const colors = [
                              "#E82528",
                              "#9A0006",
                              "#D65A5C",
                              "#151A2D",
                              "#777777",
                            ];

                            const value = Number(item.value || 0);
                            const percentage = ((value / total) * 100).toFixed(1);

                            return (
                              <View
                                key={item.membershipName}
                                style={styles.legendRow}
                              >
                                <View style={styles.legendLeft}>
                                  <View
                                    style={[
                                      styles.legendDot,
                                      {
                                        backgroundColor:
                                          colors[index % colors.length],
                                      },
                                    ]}
                                  />

                                  <Text style={styles.legendName}>
                                    {item.membershipName}
                                  </Text>
                                </View>

                                <Text style={styles.legendCount}>
                                  {value.toLocaleString("id-ID")} 
                                  <Text style={{fontSize: 8, color:"#09ae04", marginLeft: 5 }}>({percentage}%)</Text>
                                </Text>
                              </View>
                            );
                          })}
                        </View>
                      </View>
                    ) : (
                      <Text style={styles.emptyText}>
                        No membership data
                      </Text>
                    );
                  })()}
                </View>
              </View>
    
                
            
              {/* TRANSACTION TABLE */}      
              <View style={styles.sectionHeader}>
                <View>
                  <Text style={styles.sectionTitlee}>Recent Transactions</Text>      
                  <Text style={styles.sectionSubtitle}>Latest gym payment transactions</Text>
                </View>
              </View>
      
              <View style={styles.transactionCard}>
                <View style={styles.topSection}>
        
                  {/* SHOW ENTRIES */}
                  <View style={styles.leftSectionList}>
                    <Text style={styles.labelList}>
                      Show Entries
                    </Text>
        
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
        
                  {/* SEARCH */}
                  <View style={styles.searchContainer}>
                    <Ionicons
                      name="search-outline"
                      size={19}
                      color="#888"
                    />
        
                    <TextInput
                      style={styles.searchInput}
                      value={search}
                      onChangeText={handleSearchChange}
                      placeholder="Search transaction..."
                      placeholderTextColor="#999"
                    />
        
                    {search.length > 0 && (
                      <Pressable
                        onPress={() => handleSearchChange("")}
                      >
                        <Ionicons
                          name="close-circle"
                          size={18}
                          color="#999"
                        />
                      </Pressable>
                    )}
                  </View>
                </View>
        
                <View style={styles.tableHeader}>
        
                  <Text
                    style={[
                      styles.tableHeaderText,
                      { flex: 1.2 },
                    ]}
                  >
                    Invoice
                  </Text>
        
                  <Text
                    style={[
                      styles.tableHeaderText,
                      { flex: 1.5 },
                    ]}
                  >
                    Member
                  </Text>
        
                  <Text
                    style={[
                      styles.tableHeaderText,
                      { flex: 1.5 },
                    ]}
                  >
                    Type
                  </Text>
        
                  <Text
                    style={[
                      styles.tableHeaderText,
                      { flex: 1 },
                    ]}
                  >
                    Amount
                  </Text>
        
                  <Text
                    style={[
                      styles.tableHeaderText,
                      { flex: 1 },
                    ]}
                  >
                    Date
                  </Text>
        
                  <Text
                    style={[
                      styles.tableHeaderText,
                      { flex: 0.8 },
                    ]}
                  >
                    Status
                  </Text>
                </View>
        
                {paginatedTransactions.length > 0 ? (
                  paginatedTransactions.map((item) => (
                    <View
                      key={item.id}
                      style={styles.tableRow}
                    >
                      {/* INVOICE */}
                      <Text
                        style={[
                          styles.tableText,
                          { flex: 1.2 },
                        ]}
                      >
                        {item.invoice}
                      </Text>
        
                      {/* MEMBER */}
                      <Text
                        style={[
                          styles.tableText,
                          { flex: 1.5 },
                        ]}
                        numberOfLines={1}
                      >
                        {item.member}
                      </Text>
        
                      {/* TYPE */}
                      <Text
                        style={[
                          styles.tableText,
                          { flex: 1.5 },
                        ]}
                        numberOfLines={1}
                      >
                        {item.type}
                      </Text>
        
                      {/* AMOUNT */}
                      <Text
                        style={[
                          styles.tableText,
                          {
                            flex: 1,
                            fontWeight: "700",
                          },
                        ]}
                      >
                        {formatRupiah(item.amount)}
                      </Text>
        
                      {/* DATE */}
                      <Text
                        style={[
                          styles.tableText,
                          { flex: 1 },
                        ]}
                      >
                        {item.date}
                      </Text>
        
                      {/* STATUS */}
                      <View style={{ flex: 0.8 }}>
                        <StatusBadge
                          status={item.status}
                        />
                      </View>
                    </View>
                  ))
                ) : (
                  /* EMPTY DATA */
                  <View style={styles.emptyContainer}>
                    <Ionicons
                      name="document-text-outline"
                      size={40}
                      color="#CCC"
                    />
        
                    <Text style={styles.emptyTitle}>
                      No transactions found
                    </Text>
        
                    <Text style={styles.emptySubtitle}>
                      Try another search keyword
                    </Text>
                  </View>
                )}
        
                <View style={styles.headerRowList} />
                <View style={styles.footerList}>
        
                  {/* SHOWING */}
                  <Text style={styles.footerTextList}>
                    Showing {startEntry}-{endEntry} of{" "}
                    {filteredTransactions.length} entries
                  </Text>
        
                  {/* PAGINATION */}
                  <View style={styles.paginationList}>
        
                    {/* PREVIOUS */}
                    <Pressable
                      style={[
                        styles.pageButtonList,
                        page === 1 &&
                          styles.disabledButton,
                      ]}
                      disabled={page === 1}
                      onPress={handlePrevious}
                    >
                      <Ionicons
                        name="chevron-back"
                        size={15}
                        color={
                          page === 1
                            ? "#AAA"
                            : "#333"
                        }
                      />
        
                      <Text
                        style={[
                          styles.pageButtonText,
                          page === 1 &&
                            styles.disabledText,
                        ]}
                      >
                        Previous
                      </Text>
                    </Pressable>
        
                    {/* PAGE NUMBER */}
                    <View style={styles.pageNumberContainer}>
                      <Text style={styles.pageNumberList}>
                        {page}
                      </Text>
        
                      <Text style={styles.pageOfText}>
                        of
                      </Text>
        
                      <Text style={styles.pageNumberList}>
                        {totalPages}
                      </Text>
                    </View>
        
                    {/* NEXT */}
                    <Pressable
                      style={[
                        styles.pageButtonList,
                        page === totalPages &&
                          styles.disabledButton,
                      ]}
                      disabled={page === totalPages}
                      onPress={handleNext}
                    >
                      <Text
                        style={[
                          styles.pageButtonText,
                          page === totalPages &&
                            styles.disabledText,
                        ]}
                      >
                        Next
                      </Text>
        
                      <Ionicons
                        name="chevron-forward"
                        size={15}
                        color={
                          page === totalPages
                            ? "#AAA"
                            : "#333"
                        }
                      />
                    </Pressable>
                  </View>
                </View>
              </View>
      
              {/* FOOTER */}      
              <View style={styles.footer}>
                <Text style={styles.footerText}>DOMS Management Report • Updated Today</Text>
              </View>
            </View>     
            
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

// export default MembershipDistribution;

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

/* KPI CARD */
function KpiCard({ title, value, change, icon, positive = false}: any) {
  return (
    <View style={styles.kpiCard}>
      <View style={styles.kpiTop}>
        <View style={styles.kpiIcon}>
          <Ionicons name={icon} size={21} color="#E82528"/>
        </View>

        <View style={styles.kpiChange}>
          <Ionicons
            name={
              positive
                ? "trending-up"
                : "trending-down"
            }
            size={14}
            color={positive ? "#16A34A" : "#DC2626"}
          />

          <Text
            style={{
              color: positive ? "#16A34A" : "#DC2626",
              fontSize: 12,
              fontWeight: "700",
            }}
          >
            {change}
          </Text>
        </View>
      </View>

      <Text style={styles.kpiTitle}>{title}</Text>
      <Text style={styles.kpiValue}>{value}</Text>
    </View>
  );
}


/* STATUS */
function StatusBadge({
  status,
}: {
  status: "Success" | "Pending" | "Failed";
}) {
  const config = {
    Success: {
      background: "#DCFCE7",
      text: "#15803D",
    },
    Pending: {
      background: "#FEF3C7",
      text: "#B45309",
    },
    Failed: {
      background: "#FEE2E2",
      text: "#B91C1C",
    },
  };

  return (
    <View
      style={[
        styles.statusBadge,
        {
          backgroundColor:
            config[status].background,
        },
      ]}
    >
      <Text
        style={[
          styles.statusText,
          {
            color: config[status].text,
          },
        ]}
      >
        {status}
      </Text>
    </View>
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

  cardList: {
    backgroundColor: "#ED1018",
    borderRadius: 20,
    borderWidth: 3,
    borderColor: "#f44c52",
    padding: 25,
    marginTop: 20,
    marginBottom: 20,
  },

//=========================================================================
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },

  pageTitle: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
  },

  pageSubtitle: {
    fontSize: 14,
    color: "#fff",
    marginTop: 5,
  },

  headerActions: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },

  periodWrapper: {
    height: 44,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E6E9EF",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  periodText: {
    color: "#333",
    fontSize: 13,
    fontWeight: "600",
  },

  exportButton: {
    height: 44,
    backgroundColor: "#fff",
    paddingHorizontal: 17,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  exportText: {
    color: "#E82528",
    fontSize: 13,
    fontWeight: "700",
  },

  /* FILTER */

  filterRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 20,
    flexWrap: "wrap",
  },

  filterButton: {
    paddingHorizontal: 15,
    paddingVertical: 9,
    borderRadius: 9,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  filterButtonActive: {
    backgroundColor: "#E82528",
    borderColor: "#E82528",
  },

  filterText: {
    color: "#667085",
    fontSize: 12,
    fontWeight: "600",
  },

  filterTextActive: {
    color: "#fff",
  },

  /* KPI */

  kpiGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    marginBottom: 16,
  },

  kpiCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 20,
    flex: 1,
    minWidth: 210,
    borderWidth: 1,
    borderColor: "#E9ECF2",
  },

  kpiTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },

  kpiIcon: {
    width: 42,
    height: 42,
    borderRadius: 11,
    backgroundColor: "#FFF0F0",
    alignItems: "center",
    justifyContent: "center",
  },

  kpiChange: {
    flexDirection: "row",
    gap: 3,
    alignItems: "center",
  },

  kpiTitle: {
    fontSize: 13,
    color: "#737C8E",
    marginBottom: 5,
  },

  kpiValue: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#000",
  },

  /* REVENUE */

  revenueGrid: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 20,
  },

  revenueCard: {
    flex: 1.5,
    minHeight: 150,
    borderRadius: 16,
    padding: 22,
  },

  revenueHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  revenueLabel: {
    color: "#FFFFFFCC",
    fontSize: 13,
  },

  revenueValue: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "800",
    marginTop: 8,
  },

  revenueIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: "#FFFFFF20",
    alignItems: "center",
    justifyContent: "center",
  },

  revenueFooter: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 18,
    gap: 8,
  },

  revenueChange: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },

  revenueChangeText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "800",
  },

  revenueCompare: {
    color: "#FFFFFFB0",
    fontSize: 12,
  },

  simpleRevenueCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 22,
    borderWidth: 1,
    borderColor: "#E9ECF2",
  },

  smallCardTitle: {
    fontSize: 13,
    color: "#737C8E",
  },

  simpleRevenueValue: {
    fontSize: 25,
    fontWeight: "800",
    color: "#172033",
    marginTop: 10,
    marginBottom: 15,
  },

  progressBackground: {
    height: 7,
    borderRadius: 10,
    backgroundColor: "#EEF1F5",
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    backgroundColor: "#E82528",
    borderRadius: 10,
  },

  progressText: {
    fontSize: 11,
    color: "#8A93A3",
    marginTop: 8,
  },

  /* CHART */

  chartGrid: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 25,
  },

  chartCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 22,
    borderWidth: 1,
    borderColor: "#E9ECF2",
    minHeight: 330,
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
  },

  // cardTitle: {
  //   fontSize: 16,
  //   fontWeight: "700",
  //   color: "#172033",
  // },

  cardSubtitle: {
    fontSize: 12,
    color: "#8A93A3",
    marginTop: 5,
  },

  chartContainer: {
    height: 245,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-around",
    paddingTop: 25,
  },

  barColumn: {
    alignItems: "center",
    flex: 1,
    height: 230,
    justifyContent: "flex-end",
  },

  barBackground: {
    height: 180,
    width: 26,
    justifyContent: "flex-end",
    backgroundColor: "#F4F5F7",
    borderRadius: 8,
    overflow: "hidden",
  },

  bar: {
    width: "100%",
    borderRadius: 8,
  },

  barValue: {
    fontSize: 9,
    color: "#777",
    marginBottom: 5,
  },

  barLabel: {
    fontSize: 10,
    color: "#858D9D",
    marginTop: 8,
  },

  lineChart: {
    height: 245,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-around",
  },

  attendanceColumn: {
    alignItems: "center",
    justifyContent: "flex-end",
    flex: 1,
  },

  attendanceBar: {
    width: 24,
    backgroundColor: "#E82528",
    borderRadius: 8,
    minHeight: 20,
  },

  dayLabel: {
    fontSize: 10,
    color: "#858D9D",
    marginTop: 8,
  },

  attendanceValue: {
    fontSize: 9,
    color: "#777",
    marginTop: 3,
  },

  /* SECTION */

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    marginTop: 10,
  },

  sectionTitlee: {
    fontSize: 19,
    fontWeight: "800",
    color: "#172033",
  },

  sectionSubtitle: {
    fontSize: 12,
    color: "#eee",
    marginTop: 4,
  },

  viewAll: {
    color: "#E82528",
    fontSize: 13,
    fontWeight: "700",
  },

  /* ANALYTICS */

  analyticsGrid: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 25,
  },

  // analyticsCard: {
  //   flex: 1,
  //   backgroundColor: "#fff",
  //   borderRadius: 16,
  //   padding: 22,
  //   borderWidth: 1,
  //   borderColor: "#E9ECF2",
  //   minHeight: 270,
  // },

  // donutContainer: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   justifyContent: "space-around",
  //   marginTop: 20,
  // },

  // donut: {
  //   width: 155,
  //   height: 155,
  //   borderRadius: 100,
  //   borderWidth: 27,
  //   borderColor: "#E82528",
  //   borderRightColor: "#4A5568",
  //   borderBottomColor: "#F59E0B",
  //   alignItems: "center",
  //   justifyContent: "center",
  // },

  // donutInner: {
  //   alignItems: "center",
  // },

  // donutValue: {
  //   fontSize: 22,
  //   fontWeight: "800",
  //   color: "#172033",
  // },

  // donutLabel: {
  //   fontSize: 10,
  //   color: "#8A93A3",
  // },

  // legend: {
  //   gap: 13,
  // },

  // legendRow: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   minWidth: 180,
  //   gap: 10,
  // },

  // legendDot: {
  //   width: 9,
  //   height: 9,
  //   borderRadius: 10,
  //   marginRight: 8,
  // },

  legendTitle: {
    flex: 1,
    fontSize: 12,
    color: "#5F6878",
  },

  // legendCount: {
  //   fontSize: 12,
  //   color: "#333",
  //   fontWeight: "700",
  //   marginRight: 10,
  // },

  legendPercent: {
    fontSize: 11,
    color: "#8A93A3",
  },

  growthNumber: {
    color: "#16A34A",
    fontWeight: "800",
    fontSize: 13,
  },

  growthChart: {
    flex: 1,
    height: 230,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 20,
  },

  growthColumn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },

  growthBar: {
    width: 25,
    backgroundColor: "#E82528",
    borderRadius: 7,
  },

  growthLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },

  /* CLASS */

  classCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E9ECF2",
    paddingHorizontal: 20,
    marginBottom: 25,
  },

  classRow: {
    minHeight: 78,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F1F3",
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },

  classNumber: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: "#FFF0F0",
    alignItems: "center",
    justifyContent: "center",
  },

  classInfo: {
    width: 180,
  },

  className: {
    fontSize: 13,
    fontWeight: "700",
    color: "#172033",
  },

  classTrainer: {
    fontSize: 11,
    color: "#8A93A3",
    marginTop: 4,
  },

  classProgressContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  classBooking: {
    fontSize: 11,
    color: "#667085",
    width: 45,
  },

  attendanceBadge: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    backgroundColor: "#FFF0F0",
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 8,
  },

  /* TRAINER */

  trainerGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 15,
    marginBottom: 25,
  },

  trainerCard: {
    flex: 1,
    minWidth: 250,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: "#E9ECF2",
  },

  trainerTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  avatarr: {
    width: 45,
    height: 45,
    borderRadius: 14,
    backgroundColor: "#FFF0F0",
    alignItems: "center",
    justifyContent: "center",
  },

  avatarText: {
    color: "#E82528",
    fontWeight: "800",
  },

  trainerName: {
    fontSize: 13,
    fontWeight: "700",
    color: "#172033",
  },

  trainerClass: {
    fontSize: 11,
    color: "#8A93A3",
    marginTop: 3,
  },

  rating: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  ratingText: {
    fontSize: 12,
    fontWeight: "700",
  },

  trainerStats: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#F0F1F3",
  },

  statLabel: {
    fontSize: 10,
    color: "#8A93A3",
  },

  statValue: {
    fontSize: 15,
    fontWeight: "800",
    color: "#172033",
    marginTop: 4,
  },

  /* TRANSACTION */

  transactionCardX: {
    backgroundColor: "#fff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E9ECF2",
    overflow: "hidden",
  },

  searchContainerX: {
    margin: 18,
    height: 42,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: "#E2E5EA",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    width: 300,
  },

  searchInputX: {
    flex: 1,
    marginLeft: 8,
    fontSize: 12,
    color: "#333",
    outlineStyle: "none" as any,
  },

  tableHeaderX: {
    flexDirection: "row",
    backgroundColor: "#F8F9FB",
    paddingHorizontal: 20,
    paddingVertical: 13,
    alignItems: "center",
  },

  tableHeaderTextX: {
    fontSize: 11,
    fontWeight: "700",
    color: "#7B8494",
  },

  tableRowX: {
    flexDirection: "row",
    paddingHorizontal: 20,
    minHeight: 65,
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#F0F1F3",
  },

  tableTextX: {
    fontSize: 11,
    color: "#475467",
  },

  statusBadgeX: {
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 7,
    alignSelf: "flex-start",
  },

  statusTextX: {
    fontSize: 10,
    fontWeight: "700",
  },

  footer: {
    paddingVertical: 25,
    alignItems: "center",
  },

  footerText: {
    fontSize: 11,
    color: "#bfc4ce",
  },

  //===========================================================
  transactionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E9EBEF",
    padding: 20,
  },

  topSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
    gap: 15,
  },

  leftSectionList: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  labelList: {
    fontSize: 12,
    color: "#555",
    fontWeight: "600",
  },

  pickerWrapperList: {
    width: 60,
    height: 38,
    borderWidth: 1,
    borderColor: "#D9DDE3",
    borderRadius: 10,
    backgroundColor: "#FFF",
    justifyContent: "center",
    overflow: "hidden",
  },

  pickerList: {
    width: "100%",
    height: 38,
    fontSize: 12,
  },

  searchContainer: {
    width: 280,
    height: 40,
    borderWidth: 1,
    borderColor: "#D9DDE3",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 11,
    backgroundColor: "#FFF",
  },

  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 12,
    color: "#333",
    outlineStyle: "none" as any,
  },

  tableHeader: {
    minHeight: 48,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F9FB",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#E9EBEF",
    paddingHorizontal: 12,
  },

  tableHeaderText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#667085",
  },

  tableRow: {
    minHeight: 58,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F1F3",
  },

  tableText: {
    fontSize: 11,
    color: "#344054",
    paddingRight: 8,
  },

  statusBadge: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 20,
  },

  statusText: {
    fontSize: 10,
    fontWeight: "700",
  },

  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 55,
  },

  emptyTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#555",
    marginTop: 10,
  },

  emptySubtitle: {
    fontSize: 11,
    color: "#999",
    marginTop: 4,
  },

  headerRowList: {
    height: 1,
    backgroundColor: "#E9EBEF",
    marginTop: 5,
  },

  footerList: {
    minHeight: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 10,
  },

  footerTextList: {
    fontSize: 11,
    color: "#7B8494",
  },

  paginationList: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  pageButtonList: {
    height: 34,
    paddingHorizontal: 11,
    borderWidth: 1,
    borderColor: "#D9DDE3",
    borderRadius: 7,
    backgroundColor: "#FFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },

  pageButtonText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#333",
  },

  disabledButton: {
    backgroundColor: "#F5F5F5",
    borderColor: "#E5E5E5",
    opacity: 0.6,
  },

  disabledText: {
    color: "#AAA",
  },

 
  pageNumberContainer: {
    height: 34,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },

  pageNumberList: {
    fontSize: 12,
    fontWeight: "800",
    color: "#E82528",
  },

  pageOfText: {
    fontSize: 11,
    color: "#999",
  },

  //=======================================
  printHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "#E82528",
    paddingBottom: 12,
    marginBottom: 15,
  },

  printLogo: {
    fontSize: 22,
    fontWeight: "800",
    color: "#151A2D",
  },

  printSubtitle: {
    fontSize: 11,
    color: "#777",
    marginTop: 3,
  },

  printReportTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#E82528",
    textAlign: "right",
  },

  printDate: {
    fontSize: 10,
    color: "#777",
    textAlign: "right",
    marginTop: 3,
  },

  printKpiRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 12,
  },

  printKpiCard: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#FAFAFA",
  },

  printKpiTitle: {
    fontSize: 10,
    color: "#777",
    marginBottom: 5,
  },

  printKpiValue: {
    fontSize: 20,
    fontWeight: "800",
    color: "#151A2D",
  },

  printRevenueRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 12,
  },

  printRevenueCard: {
    flex: 1,
    backgroundColor: "#9A0006",
    borderRadius: 8,
    padding: 14,
  },

  printAverageCard: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 8,
    padding: 14,
  },

  printRevenueTitle: {
    fontSize: 10,
    color: "#FFF",
  },

  printRevenueValue: {
    fontSize: 20,
    fontWeight: "800",
    color: "#FFF",
    marginTop: 5,
  },

  printRevenueValueDark: {
    fontSize: 20,
    fontWeight: "800",
    color: "#151A2D",
    marginTop: 5,
  },

  printRevenueGrowth: {
    fontSize: 10,
    color: "#FFF",
    marginTop: 5,
  },

  printSmallText: {
    fontSize: 10,
    color: "#777",
    marginTop: 5,
  },

  printSection: {
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },

  printSectionTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#151A2D",
  },

  printSectionSubtitle: {
    fontSize: 9,
    color: "#888",
    marginTop: 2,
  },

  printChart: {
    height: 140,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    marginTop: 10,
  },

  printBarColumn: {
    alignItems: "center",
    justifyContent: "flex-end",
    height: 130,
  },

  printBar: {
    width: 25,
    backgroundColor: "#E82528",
    borderRadius: 4,
    marginTop: 3,
  },

  printBarValue: {
    fontSize: 8,
    color: "#555",
  },

  printBarLabel: {
    fontSize: 8,
    color: "#555",
    marginTop: 3,
  },

  printTableHeader: {
    flexDirection: "row",
    backgroundColor: "#151A2D",
    paddingVertical: 7,
    marginTop: 10,
  },

  printTableHeaderText: {
    flex: 1,
    color: "#FFF",
    fontSize: 8,
    fontWeight: "700",
    paddingHorizontal: 5,
  },

  printTableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
    paddingVertical: 7,
  },

  printTableText: {
    flex: 1,
    fontSize: 8,
    color: "#333",
    paddingHorizontal: 5,
  },

  printFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },

  printFooterText: {
    fontSize: 8,
    color: "#999",
  },

  analyticsCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 22,
    borderWidth: 1,
    borderColor: "#E9ECF2",
    minHeight: 270,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#151A2D",
    marginBottom: 20,
  },

  donutContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 25,
    flexWrap: "wrap",
    marginLeft: 50,
  },

  donut: {
    width: 160,
    height: 160,
    borderRadius: 80,
    alignItems: "center",
    justifyContent: "center",
  },

  donutInner: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  donutValue: {
    fontSize: 23,
    fontWeight: "700",
    color: "#151A2D",
  },

  donutLabel: {
    fontSize: 12,
    color: "#777777",
  },

  legend: {
    flex: 1,
    minWidth: 200,
    gap: 20,
  },

  legendRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 50,
  },

  legendLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },

  legendName: {
    fontSize: 13,
    color: "#333333",
  },

  legendCount: {
    fontSize: 12,
    color: "#333333",
    fontWeight: "600",
    marginRight: 5,
  },

  emptyText: {
    textAlign: "center",
    color: "#777777",
    padding: 30,
  },
});
