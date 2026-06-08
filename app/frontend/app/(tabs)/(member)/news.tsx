import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Alert,
  StatusBar,
  FlatList,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ViewToken } from 'react-native';
import DateTimePicker from "@react-native-community/datetimepicker";
import CountryPicker, { CountryCode, Country } from 'react-native-country-picker-modal';
import { Link, useRouter } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import { Background } from "@react-navigation/elements";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get('window');

const newsData = [
  {
    id: '1',
    title: '5 Common Mistakes When Doing Squats',
    category: 'Workout',
    time: '2 Hours Ago',
    image:
      'https://cdn.muscleandstrength.com/sites/default/files/fit_woman_doing_a_dumbbell_lunge_in_the_gym.jpg',
  },
  {
    id: '2',
    title: 'Top 10 High Protein Foods for Muscle Growth',
    category: 'Nutrition',
    time: 'Yesterday',
    image:
      'https://livhospital.b-cdn.net/wp-content/uploads/2025/11/26232644/image-8492.png',
  },
  {
    id: '3',
    title: 'Join Our Summer Fitness Challenge and Win Exciting Prizes',
    category: 'Events',
    time: '1 Day Ago',
    image:
      'https://images.contentstack.io/v3/assets/blt45c082eaf9747747/blt1c76acd311ddcbfe/66957ccaec61e9dc46bfd6db/freeletics-summer-challenge-2024.jpg?format=pjpg&auto=webp&quality=76&width=1232',
  },
  {
    id: '4',
    title: 'Stretching Tips Before Workout',
    category: 'Tips',
    time: '2 Days Ago',
    image:
      'https://www.opaortho.com/wp-content/uploads/2024/08/stretching-exercises-for-flexibility.png',
  },
];

const categories = [
  'All',
  'Workout',
  'Nutrition',
  'Events',
  'Tips',
];

type NewsItem = {
  id: string;
  title: string;
  category: string;
  time: string;
  image: string;
};

export default function NewsScreen() {
  const router = useRouter();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] =
    useState('All');

  const filteredNews = useMemo(() => {
    return newsData.filter((item) => {
      const categoryMatch =
        selectedCategory === 'All' ||
        item.category === selectedCategory;

      const searchMatch = item.title
        .toLowerCase()
        .includes(search.toLowerCase());

      return categoryMatch && searchMatch;
    });
  }, [search, selectedCategory]);

  const renderNews = ({
    item,
  }: {
    item: NewsItem;
  }) => (
    <TouchableOpacity style={styles.newsCard}>
      <Image
        source={{ uri: item.image }}
        style={styles.newsImage}
      />

      <View style={styles.newsContent}>
        <View style={styles.topRow}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {item.category}
            </Text>
          </View>
        </View>

        <Text style={styles.newsTitle}>
          {item.title}
        </Text>

        <View style={styles.timeRow}>
          <Ionicons
            name="time-outline"
            size={14}
            color="#999"
          />

          <Text style={styles.newsTime}>
            {item.time}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#E82528" />

      {/* HEADER */}
      <LinearGradient
        colors={["#E82528", "#9A0006"]}
        style={styles.header}
      >
        <TouchableOpacity style={styles.backButton} onPress={() => router.replace('/dashboard')}>
            <Ionicons name="arrow-back" size={22} color="#fff"/>
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Fitness News</Text>

        <View style={{ width: 40 }} />
      </LinearGradient>


      <FlatList
        data={filteredNews}
        renderItem={renderNews}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 120,
        }}
        ListHeaderComponent={
          <>
            {/* Featured Banner */}
            <LinearGradient
              colors={['#E82528', '#9A0006']}
              style={styles.featuredCard}
            >
              <Text style={styles.featuredTag}>
                FEATURED
              </Text>

              <Text style={styles.featuredTitle}>
                Fitness Challenge 2027
              </Text>

              <Text style={styles.featuredDesc}>
                Join now and compete with members
                to win exclusive rewards.
              </Text>

              <TouchableOpacity
                style={styles.readButton}
              >
                <Text
                  style={styles.readButtonText}
                >
                  Read More
                </Text>
              </TouchableOpacity>
            </LinearGradient>

            {/* Search */}
            <View style={styles.searchContainer}>
              <Ionicons
                name="search-outline"
                size={20}
                color="#999"
              />

              <TextInput
                placeholder="Search article..."
                placeholderTextColor="#999"
                value={search}
                onChangeText={setSearch}
                style={styles.searchInput}
              />
            </View>

            {/* Category */}
            <FlatList
              horizontal
              data={categories}
              keyExtractor={(item) => item}
              showsHorizontalScrollIndicator={
                false
              }
              contentContainerStyle={{
                paddingHorizontal: 20,
                marginTop: 20,
              }}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.categoryChip,
                    selectedCategory === item &&
                      styles.activeCategory,
                  ]}
                  onPress={() =>
                    setSelectedCategory(item)
                  }
                >
                  <Text
                    style={[
                      styles.categoryText,
                      selectedCategory === item &&
                        styles.activeCategoryText,
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
            />

            <Text style={styles.sectionTitle}>
              Latest Articles
            </Text>
          </>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },

  header: {
    height: 100,
    paddingTop: 20,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor:
      'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
  },

  featuredCard: {
    margin: 20,
    borderRadius: 24,
    padding: 24,
  },

  featuredTag: {
    color: '#FFDCDC',
    fontWeight: '700',
    fontSize: 12,
  },

  featuredTitle: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: '800',
    marginTop: 10,
  },

  featuredDesc: {
    color: '#FFF',
    marginTop: 10,
    lineHeight: 22,
  },

  readButton: {
    marginTop: 20,
    backgroundColor: '#FFF',
    alignSelf: 'flex-start',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 12,
  },

  readButtonText: {
    color: '#E82528',
    fontWeight: '700',
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1B1F28',
    marginHorizontal: 20,
    borderRadius: 16,
    paddingHorizontal: 15,
    height: 55,
  },

  searchInput: {
    flex: 1,
    color: '#FFF',
    marginLeft: 10,
  },

  categoryChip: {
    backgroundColor: '#1B1F28',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
  },

  activeCategory: {
    backgroundColor: '#E82528',
  },

  categoryText: {
    color: '#FFF',
  },

  activeCategoryText: {
    fontWeight: '700',
  },

  sectionTitle: {
    color: '#000',
    fontSize: 18,
    fontWeight: '700',
    marginHorizontal: 20,
    marginTop: 25,
    marginBottom: 15,
  },

  newsCard: {
    backgroundColor: '#1B1F28',
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 24,
    overflow: 'hidden',
  },

  newsImage: {
    width: '100%',
    height: 220,
  },

  newsContent: {
    padding: 18,
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  badge: {
    backgroundColor: '#E82528',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 10,
  },

  badgeText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },

  newsTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
    marginTop: 12,
    lineHeight: 26,
  },

  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },

  newsTime: {
    color: '#999',
    marginLeft: 5,
  },
});