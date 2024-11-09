import React, { useState, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import useFeedStore from "../store/feedStore";
import FeedItem from "../components/feed/FeedItem";
import Colors from "../constants/colors";
import MainHeader from "../components/navigation/MainHeader";
import AddFeedIcon from "../../assets/images/AddFeed.png";
import FeedGroupSelectScreen from "./FeedGroupSelectScreen";

const MainFeedScreen = () => {
  const feeds = useFeedStore((state) => state.feeds);
  const filteredFeeds = useFeedStore((state) => state.filteredFeeds);
  const setSelectedGroup = useFeedStore((state) => state.setSelectedGroup);
  const loadInitialData = useFeedStore((state) => state.loadInitialData);
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    loadInitialData();
  }, []);

  const handleCategoryPress = () => {
    navigation.navigate("GroupSelectScreen", { fromScreen: "MainFeedScreen" });
  };

  const handleAddFeedPress = () => {
    navigation.navigate("CreatePost"); // "CreatePost"로 이동
  };

  useEffect(() => {
    const groupId = route.params?.selectedGroupId || "all";
    setSelectedGroup(groupId);
  }, [route.params?.selectedGroupId]);

  const renderItem = ({ item }) => <FeedItem feedId={item.id} />;

  return (
    <SafeAreaView style={styles.container}>
      <MainHeader
        selectedGroup={route.params?.selectedGroupId || "all"}
        onPressCategory={() => navigation.navigate("FeedGroupSelectScreen")}
        onPressNotification={() => console.log("notification")}
      />
      <FlatList
        data={filteredFeeds}
        renderItem={renderItem}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.listContainer}
      />
      <TouchableOpacity
        style={styles.addFeedButton}
        onPress={handleAddFeedPress}
      >
        <Image source={AddFeedIcon} style={styles.addFeedIcon} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryBeige,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 72,
  },
  addFeedButton: {
    position: "absolute",
    bottom: 80,
    right: 20,
  },
  addFeedIcon: {
    width: 68,
    height: 68,
    resizeMode: "contain",
  },
});

export default MainFeedScreen;
