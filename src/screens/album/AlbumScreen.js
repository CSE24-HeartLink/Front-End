import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

import MainHeader from "../../components/navigation/MainHeader";
import { initialFeeds } from "../../constants/dummydata";
import Colors from "../../constants/colors";

const windowWidth = Dimensions.get("window").width;
const cardWidth = (windowWidth - 32) / 3;

const AlbumScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const selectedGroup = route.params?.selectedGroup;
  
  const [filteredFeeds, setFilteredFeeds] = useState(initialFeeds);

  useEffect(() => {
    if (selectedGroup && selectedGroup !== "all") {
      setFilteredFeeds(
        initialFeeds.filter((feed) => feed.group === selectedGroup)
      );
    } else {
      setFilteredFeeds(initialFeeds);
    }
  }, [selectedGroup]);

  const handleCategoryPress = () => {
    navigation.navigate("AlbumGroupSelectScreen", {
      currentGroupId: selectedGroup || "all",
    });
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}`;
  };

  const renderPin = () => (
    <View style={styles.pinContainer}>
      <View style={styles.pinHead} />
      <View style={styles.pinBody} />
    </View>
  );

  const renderCard = (feed) => (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        {renderPin()}
        {feed.profileImage && (
          <Image
            source={feed.profileImage}
            style={styles.image}
            resizeMode="cover"
          />
        )}
      </View>
      <Text style={styles.title}>{feed.nickname}</Text>
      <Text style={styles.date}>{formatDate(feed.createdAt)}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
      <MainHeader
        selectedGroup={selectedGroup}
        onPressCategory={handleCategoryPress}
        onPressNotification={() => console.log("notification")}
      />
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.grid}>
            {filteredFeeds.map((feed) => (
              <View key={feed.id} style={styles.cardContainer}>
                {renderCard(feed)}
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.primaryBeige,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.primaryBeige,
  },
  scrollContent: {
    padding: 8,
    paddingBottom: 72, // BottomTab height
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  cardContainer: {
    width: cardWidth,
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: 8,
    height: 164,
  },
  imageContainer: {
    flex: 1,
    borderRadius: 8,
    marginBottom: 8,
    position: "relative",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  pinContainer: {
    position: "absolute",
    top: -10,
    left: "50%",
    marginLeft: -6,
    zIndex: 1,
    transform: [{ rotate: "25deg" }],
  },
  pinHead: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#FF7262",
    borderWidth: 1,
    borderColor: "#F24E1E",
  },
  pinBody: {
    width: 3,
    height: 10,
    backgroundColor: "#DDDADA",
    alignSelf: "center",
    marginTop: -1,
  },
  title: {
    fontSize: 12,
    fontWeight: "600",
    color: Colors.gray,
    marginBottom: 2,
  },
  date: {
    fontSize: 12,
    color: Colors.gray,
  },
});

export default AlbumScreen;