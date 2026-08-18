import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
} from "react-native";

import { countries } from "../data/countries";

interface PhoneInputProps {
  phone: string;
  dialCodePhone: string;
  onChangePhone: (phone: string) => void;
  onChangeDialCode: (dialCode: string) => void;
}

export default function PhoneInput({
  phone,
  dialCodePhone,
  onChangePhone,
  onChangeDialCode,
}: PhoneInputProps) {
  const [showCountries, setShowCountries] = useState(false);

  // Negara yang sedang dipilih
  const [selectedCountry, setSelectedCountry] = useState(
    countries.find(
      (item) => item.dialCode === dialCodePhone
    ) || countries[0]
  );

  // Kalau dialCode berubah dari parent
  // misalnya saat Edit Member
  useEffect(() => {
    const country = countries.find(
      (item) => item.dialCode === dialCodePhone
    );

    if (country) {
      setSelectedCountry(country);
    }
  }, [dialCodePhone]);

  const handlePhoneChange = (text: string) => {
    // Hanya angka
    let value = text.replace(/\D/g, "");

    // Hilangkan 0 di depan
    if (value.startsWith("0")) {
      value = value.substring(1);
    }

    onChangePhone(value);
  };

  const handleSelectCountry = (country: (typeof countries)[number]) => {
    setSelectedCountry(country);

    onChangeDialCode(country.dialCode);

    setShowCountries(false);
  };

  return (
    <>
      {/* PHONE INPUT */}
      <View style={styles.container}>

        {/* COUNTRY CODE */}
        <TouchableOpacity
          style={styles.countryButton}
          onPress={() => setShowCountries(true)}
          activeOpacity={0.7}
        >
          <Text style={styles.flag}>
            {selectedCountry.flag}
          </Text>

          <Text style={styles.dialCode}>
            +{selectedCountry.dialCode}
          </Text>

          <Text style={styles.arrow}>
            ▼
          </Text>
        </TouchableOpacity>

        {/* PHONE NUMBER */}
        <TextInput
          style={styles.phoneInput}
          value={phone}
          onChangeText={handlePhoneChange}
          //placeholder="81234567890"
          keyboardType="phone-pad"
          maxLength={15}
        />
      </View>

      {/* COUNTRY MODAL */}
      <Modal
        visible={showCountries}
        transparent
        animationType="fade"
        onRequestClose={() => setShowCountries(false)}
      >
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => setShowCountries(false)}
        >
          <View
            style={styles.modalContainer}
            onStartShouldSetResponder={() => true}
          >
            <Text style={styles.modalTitle}>
              Select Country
            </Text>

            <FlatList
              data={countries}
              keyExtractor={(item) => item.code}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.countryItem}
                  onPress={() => handleSelectCountry(item)}
                >
                  <Text style={styles.countryFlag}>
                    {item.flag}
                  </Text>

                  <Text style={styles.countryName}>
                    {item.name}
                  </Text>

                  <Text style={styles.countryDialCode}>
                    +{item.dialCode}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ffffff",
    borderRadius: 8,
    backgroundColor: "#D9D9DD",
    overflow: "hidden",
  },

  countryButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    borderRightWidth: 1,
    borderRightColor: "#ffffff",
    minWidth: 105,
  },

  flag: {
    fontSize: 21,
    marginRight: 6,
  },

  dialCode: {
    fontSize: 15,
    color: "#222",
  },

  arrow: {
    fontSize: 9,
    marginLeft: 6,
    color: "#777",
  },

  phoneInput: {
    flex: 1,
    height: 48,
    paddingHorizontal: 12,
    fontSize: 16,
    color: "#222",
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalContainer: {
    width: "90%",
    maxWidth: 400,
    maxHeight: "70%",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 20,
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 15,
  },

  countryItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ffffff",
  },

  countryFlag: {
    fontSize: 24,
    width: 45,
  },

  countryName: {
    flex: 1,
    fontSize: 15,
    color: "#222",
  },

  countryDialCode: {
    fontSize: 15,
    color: "#666",
  },
});


// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   Modal,
//   FlatList,
//   StyleSheet,
// } from "react-native";

// import { countries, Country } from "../data/countries";

// interface PhoneInputProps {
//   value: string;
//   onChangePhone: (phone: string) => void;
// }

// const PhoneInput: React.FC<PhoneInputProps> = ({
//   value,
//   onChangePhone,
// }) => {
//   const [selectedCountry, setSelectedCountry] = useState<Country>(
//     countries[0]
//   );

//   const [showCountries, setShowCountries] = useState(false);

//   const handlePhoneChange = (text: string) => {
//     // Hanya angka
//     let phone = text.replace(/\D/g, "");

//     // Kalau user mengetik 0 di depan
//     if (phone.startsWith("0")) {
//       phone = phone.substring(1);
//     }

//     onChangePhone(phone);
//   };

//   const selectCountry = (country: Country) => {
//     setSelectedCountry(country);
//     setShowCountries(false);
//   };

//   return (
//     <>
//       <View style={styles.container}>

//         {/* COUNTRY */}
//         <TouchableOpacity
//           style={styles.countryButton}
//           onPress={() => setShowCountries(true)}
//           activeOpacity={0.7}
//         >
//           <Text style={styles.flag}>
//             {selectedCountry.flag}
//           </Text>

//           <Text style={styles.dialCode}>
//             +{selectedCountry.dialCode}
//           </Text>

//           <Text style={styles.arrow}>
//             ▼
//           </Text>
//         </TouchableOpacity>

//         {/* PHONE NUMBER */}
//         <TextInput
//           style={styles.phoneInput}
//           value={value}
//           onChangeText={handlePhoneChange}
//           placeholder="81234567890"
//           keyboardType="phone-pad"
//           maxLength={15}
//         />
//       </View>

//       {/* COUNTRY MODAL */}
//       <Modal
//         visible={showCountries}
//         transparent
//         animationType="fade"
//         onRequestClose={() => setShowCountries(false)}
//       >
//         <TouchableOpacity
//           style={styles.overlay}
//           activeOpacity={1}
//           onPress={() => setShowCountries(false)}
//         >
//           <View
//             style={styles.modalContainer}
//             onStartShouldSetResponder={() => true}
//           >
//             <Text style={styles.modalTitle}>
//               Select Country
//             </Text>

//             <FlatList
//               data={countries}
//               keyExtractor={(item) => item.code}
//               renderItem={({ item }) => (
//                 <TouchableOpacity
//                   style={styles.countryItem}
//                   onPress={() => selectCountry(item)}
//                 >
//                   <Text style={styles.countryFlag}>
//                     {item.flag}
//                   </Text>

//                   <Text style={styles.countryName}>
//                     {item.name}
//                   </Text>

//                   <Text style={styles.countryDialCode}>
//                     +{item.dialCode}
//                   </Text>
//                 </TouchableOpacity>
//               )}
//             />
//           </View>
//         </TouchableOpacity>
//       </Modal>
//     </>
//   );
// };

// export default PhoneInput;

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: "row",
//     width: "100%",
//     height: 50,
//     borderWidth: 1,
//     borderColor: "#D1D5DB",
//     borderRadius: 8,
//     backgroundColor: "#FFFFFF",
//     overflow: "hidden",
//   },

//   countryButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: 12,
//     borderRightWidth: 1,
//     borderRightColor: "#D1D5DB",
//     minWidth: 105,
//   },

//   flag: {
//     fontSize: 22,
//     marginRight: 6,
//   },

//   dialCode: {
//     fontSize: 15,
//     color: "#222",
//   },

//   arrow: {
//     fontSize: 10,
//     marginLeft: 6,
//     color: "#777",
//   },

//   phoneInput: {
//     flex: 1,
//     height: 48,
//     paddingHorizontal: 12,
//     fontSize: 16,
//     color: "#222",
//     outlineStyle: "none" as any,
//   },

//   overlay: {
//     flex: 1,
//     backgroundColor: "rgba(0,0,0,0.45)",
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   modalContainer: {
//     width: "90%",
//     maxWidth: 400,
//     maxHeight: "70%",
//     backgroundColor: "#FFFFFF",
//     borderRadius: 12,
//     padding: 20,
//   },

//   modalTitle: {
//     fontSize: 20,
//     fontWeight: "600",
//     marginBottom: 15,
//   },

//   countryItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: "#EEEEEE",
//   },

//   countryFlag: {
//     fontSize: 25,
//     width: 45,
//   },

//   countryName: {
//     flex: 1,
//     fontSize: 15,
//     color: "#222",
//   },

//   countryDialCode: {
//     fontSize: 15,
//     color: "#666",
//   },
// });