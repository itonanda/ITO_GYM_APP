import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
  FlatList,
  Dimensions,
} from 'react-native';
import { Link, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5,
} from '@expo/vector-icons';
import { ViewToken } from 'react-native';


const { width } = Dimensions.get('window');

/* ================= DATA ================= */
const layananProgram = [
  {
    id: '1',
    title: 'Functional Training',
    desc: 'Latihan gerakan harian untuk meningkatkan performa aktivitas sehari-hari.',
    icon: "barbell",
  },
  {
    id: '2',
    title: 'Personal Training',
    desc: 'Program latihan privat yang dirancang khusus sesuai kebutuhan & tujuan Anda.',
    icon: "people"
  },
  {
    id: '3',
    title: 'Community Event',
    desc: 'Aktivitas seru bersama member untuk membangun kebersamaan dan kekompakan.',
    icon: "time",
  },
];


export default function AboutUsScreen() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef(null);

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index !== null) {
        setActiveIndex(viewableItems[0].index);
      }
    }
  ).current;

  const viewConfig = {
    viewAreaCoveragePercentThreshold: 50,
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <ScrollView 
        showsVerticalScrollIndicator={false}
      >

        {/* HERO SECTION */}
        <LinearGradient
          colors={['#E82528', '#9A0006', '#000000']}
          style={styles.heroSection}
        >
          <TouchableOpacity style={styles.backButton} onPress={() => router.replace('/dashboard')}>
              <Ionicons name="arrow-back" size={22} color="#fff"/>
          </TouchableOpacity>
          
          <Text style={styles.smallTitle}>WELCOME TO</Text>

          <Text style={styles.gymName}>
            DOMS FITNESS
          </Text>

          {/* <Text style={styles.heroDescription}>
            Train harder, become stronger, and unlock the best version of yourself.
          </Text> */}

        </LinearGradient>


        {/* ABOUT SECTION */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About Us</Text>

          <Text style={styles.sectionDescription}>
            DOMSBOX merupakan sebuah usaha di bidang kebugaran yang sudah berdiri sejak tahun 2020. Dengan menggunakan metode latihan CrossFit, DOMSBOX menjadi pusat kebugaran yang berbeda dari pusat kebugaran yang sudah ada sebelumnya.{"\n"}
            Selain itu, didukung dengan basis komunitas yang kuat menjadikan jenis olahraga ini semakin dicari oleh masyarakat dewasa ini.{"\n"}
            Nama DOMS (Delayed Onset Muscle Soreness) sendiri mencerminkan semangat kami, bahwa dalam setiap rasa lelah dan nyeri adalah tanda dari pertumbuhan dan kemajuan.
          </Text>
        </View>


        {/* FEATURES */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Layanan & Program Kami</Text>
        </View>

        <FlatList
          ref={flatListRef}
          data={layananProgram}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewConfig}
          renderItem={({ item }) => (
            <TouchableOpacity key={item.id} style={styles.headerCard} activeOpacity={1}>       
                <View style={styles.classCard}>
                  <View style={styles.cardContent}>
                    <View>
                      <Ionicons
                        name={item.icon as any}
                        size={34}
                        color="#EF4444"
                      />
                      <Text style={styles.featureTitle}>{item.title}</Text>
                      <Text style={styles.featureText}>{item.desc}</Text>
                    </View>
                  </View>
                </View>
            </TouchableOpacity>
          )}
        />

        {/* ================= DOT INDICATOR  PROMO================= */}
        <View style={styles.dotContainer}>
          {layananProgram.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                activeIndex === index && styles.activeDot,
              ]}
            />
          ))}
        </View>


        {/* VISI MISI */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Visi</Text>

          <Text style={styles.sectionDescription}>
            Menjadi wadah bagi siapapun untuk menjadi versi yang lebih baik setiap harinya.
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Misi</Text>
          <Text style={styles.featureTitle}>Aman, Efektif, & Menyenangkan :</Text>
          <Text style={styles.sectionDescription}>
            Memberikan program latihan yang aman, efektif, dan menyenangkan sehingga meningkatkan kesadaran masyarakat akan pentingnya latihan untuk mendukung gaya hidup yang aktif.
          </Text>
          <Text style={styles.featureTitle}>Komunitas yang Positif :</Text>
          <Text style={styles.sectionDescription}>
            Membangun komunitas yang suportif dan positif bagi seluruh anggota.
          </Text>
        </View>



        {/* CONTACT SECTION */}
        <View style={styles.contactContainer}>
          <Text style={styles.contactTitle}>Contact Us</Text>

          <Text style={styles.contactText}>
            📍 Doms Fitness, Jakarta
          </Text>

          <Text style={styles.contactText}>
            📞 +62 817 4151 491
          </Text>

          <Text style={styles.contactText}>
            ✉️ infodomsbox@gmail.com
          </Text>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },

  heroSection: {
    paddingTop: 60,
    paddingBottom: 60,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
  },

  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },

  smallTitle: {
    color: '#9CA3AF',
    fontSize: 14,
    letterSpacing: 3,
  },

  gymName: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: '800',
    marginTop: 12,
  },

  section: {
    paddingHorizontal: 20,
    marginTop: 30,
  },

  sectionTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 14,
  },

  sectionDescription: {
    color: '#6B7280',
    fontSize: 14,
    lineHeight: 28,
    textAlign: "justify",
  },

  featureContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  featureCard: {
    width: '50%',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 30,
    marginBottom: 16,
  },

  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginTop: 10,
  },

  featureText: { 
    fontSize: 14,
    fontWeight: '400',
    color: '#6B7280',
    marginTop: 10,
    marginBottom: 10,
    lineHeight: 28,
  },

  statsContainer: {
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 28,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 28,
  },

  statBox: {
    alignItems: 'center',
  },

  statNumber: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  statLabel: {
    color: '#FEE2E2',
    marginTop: 8,
    fontSize: 15,
  },

  trainerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 18,
  },

  trainerImage: {
    width: '100%',
    height: 220,
  },

  trainerInfo: {
    padding: 18,
  },

  trainerName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
  },

  trainerRole: {
    color: '#6B7280',
    marginTop: 6,
    fontSize: 15,
  },

  contactContainer: {
    backgroundColor: '#9A0006',
    marginTop: 30,
    //padding: 28,
    paddingRight: 28,
    paddingLeft: 28,
    paddingTop: 28,
    paddingBottom: 50,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },

  contactTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 18,
  },

  contactText: {
    color: '#D1D5DB',
    fontSize: 16,
    marginBottom: 12,
  },

  
  // === CLASS CARD ===
  headerCard: {
    width: width - 40,
    //backgroundColor: '#d26868',
    marginHorizontal: 20,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    //marginBottom: 20,
  },
  classCard: {
    width: width - 40,
    marginHorizontal: 20,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
  },
  cardContent: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  //=== DOT ===
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 12,
    marginBottom: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#000',
  },
});