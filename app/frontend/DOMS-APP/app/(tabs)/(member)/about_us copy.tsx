import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { Link, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5,
} from '@expo/vector-icons';

export default function AboutUsScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* HERO SECTION */}
        <LinearGradient
          colors={['#9A0006', '#E82528', '#000000']}
          style={styles.heroSection}
        >
          <TouchableOpacity style={styles.backButton} onPress={() => router.replace('/dashboard')}>
              <Ionicons name="arrow-back" size={22} color="#fff"/>
          </TouchableOpacity>
          
          <Text style={styles.smallTitle}>WELCOME TO</Text>

          <Text style={styles.gymName}>
            DOMS FITNESS CLUB
          </Text>

          <Text style={styles.heroDescription}>
            Train harder, become stronger, and unlock the best version of yourself.
          </Text>

        </LinearGradient>


        {/* ABOUT SECTION */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About Us</Text>

          <Text style={styles.sectionDescription}>
           At Doms Fitness Club, we provide a premium fitness experience with state-of-the-art facilities, certified trainers and dynamic training programs designed to unlock your full potential.</Text>
        </View>


        {/* FEATURES */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Why Choose Us</Text>

          <View style={styles.featureContainer}>

            <View style={styles.featureCard}>
              <Ionicons name="barbell" size={34} color="#EF4444" />

              <Text style={styles.featureTitle}>
                Premium Equipment
              </Text>

              <Text style={styles.featureText}>
                High-quality modern workout equipment.
              </Text>
            </View>


            <View style={styles.featureCard}>
              <MaterialCommunityIcons
                name="account-group"
                size={34}
                color="#EF4444"
              />

              <Text style={styles.featureTitle}>
                Professional Trainers
              </Text>

              <Text style={styles.featureText}>
                Certified trainers ready to guide you.
              </Text>
            </View>


            <View style={styles.featureCard}>
              <Ionicons name="time" size={34} color="#EF4444" />

              <Text style={styles.featureTitle}>
                Flexible Schedule
              </Text>

              <Text style={styles.featureText}>
                Open everyday with flexible class schedules.
              </Text>
            </View>


            <View style={styles.featureCard}>
              <FontAwesome5 name="heartbeat" size={30} color="#EF4444" />

              <Text style={styles.featureTitle}>
                Healthy Lifestyle
              </Text>

              <Text style={styles.featureText}>
                Support your fitness and healthy lifestyle.
              </Text>
            </View>
          </View>
        </View>



        {/* CONTACT SECTION */}
        <View style={styles.contactContainer}>
          <Text style={styles.contactTitle}>Contact Us</Text>

          <Text style={styles.contactText}>
            📍 Doms Fitness Club, Jakarta
          </Text>

          <Text style={styles.contactText}>
            📞 +62 812 0000 0000
          </Text>

          <Text style={styles.contactText}>
            ✉️ support@domsfitness.com
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

  heroDescription: {
    color: '#D1D5DB',
    fontSize: 16,
    lineHeight: 28,
    marginTop: 16,
  },

  joinButton: {
    backgroundColor: '#EF4444',
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: 'center',
    marginTop: 28,
  },

  joinButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
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
    fontSize: 16,
    lineHeight: 28,
  },

  featureContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  featureCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
  },

  featureTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111827',
    marginTop: 16,
  },

  featureText: {
    color: '#6B7280',
    marginTop: 10,
    lineHeight: 22,
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
    padding: 28,
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
});