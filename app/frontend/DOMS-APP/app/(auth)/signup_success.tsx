import AntDesign from "@expo/vector-icons/AntDesign";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

export default function SignUpSuccessScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* ================= DETAIL ================= */}
        <AntDesign name="file-done" size={100} color="#08c631" />
        <Text style={styles.title}>Registration {"\n"}Successful</Text>
        <Text style={styles.subtitle}>
          Thank you for registering! Please check your email to verify your
          account.
        </Text>

        {/*============ BUTTON OK ============*/}
        <View
          style={{
            justifyContent: "flex-end",
            alignItems: "flex-end",
            marginTop: 50,
          }}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => router.replace("/signin")}
          >
            <LinearGradient
              colors={["#08c631", "#034511"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.homeButton}
            >
              <Text style={styles.homeText}>OK</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

{
  /* ================= STYLES ================= */
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 40,
    paddingBottom: 40,
    paddingHorizontal: 20,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    //fontWeight: 'bold',
    textAlign: "center",
  },

  homeButton: {
    height: 50,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 30,
    color: "#eee",
  },
  homeText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
});
