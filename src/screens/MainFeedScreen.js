import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, SafeAreaView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import useFeedStore from "../store/feedStore";
import FeedItem from "../components/feed/FeedItem";

import Colors from "../constants/colors";
import MainHeader from "../components/navigation/MainHeader";

const MainFeedScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const selectedGroup = route.params?.selectedGroup;
  const feeds = useFeedStore((state) => state.feeds);
  const [filteredFeeds, setFilteredFeeds] = useState(feeds);

  useEffect(() => {
    if (selectedGroup && selectedGroup !== "all") {
      setFilteredFeeds(feeds.filter((feed) => feed.group === selectedGroup));
    } else {
      setFilteredFeeds(feeds);
    }
  }, [selectedGroup, feeds]);

  const loadInitialData = useFeedStore((state) => state.loadInitialData);

  useEffect(() => {
    loadInitialData();
  }, []);

  const handleCategoryPress = () => {
    navigation.navigate("GroupSelectScreen", { fromScreen: "MainFeedScreen" });
  };

  const renderItem = ({ item }) => <FeedItem feedId={item.feedId} />; //수정

  return (
    <SafeAreaView style={styles.container}>
      <MainHeader
        onPressCategory={handleCategoryPress}
        selectedGroup={selectedGroup}
      />
      <FlatList
        data={filteredFeeds}
        renderItem={renderItem}
        keyExtractor={(item) => item.feedId} // id -> feedId를 사용하여 고유한 key를 지정
        contentContainerStyle={styles.listContainer}
      />
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
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 72,
  },
});

export default MainFeedScreen;
