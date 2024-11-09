import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, SafeAreaView, Text } from "react-native";
import { useNavigation, useRoute } from '@react-navigation/native';

import useFeedStore from "../store/feedStore";
import FeedItem from "../components/feed/FeedItem";
import Colors from "../constants/colors";
import MainHeader from "../components/navigation/MainHeader";

const MainFeedScreen = () => {
  const feeds = useFeedStore((state) => state.feeds);
  const filteredFeeds = useFeedStore((state) => state.filteredFeeds);
  const setSelectedGroup = useFeedStore((state) => state.setSelectedGroup);
  const loadInitialData = useFeedStore((state) => state.loadInitialData);
  const navigation = useNavigation();
  const [selectedGroup, setSelectedGroup] = useState("all"); // 기본값 'all'
  const route = useRoute();

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    const groupId = route.params?.selectedGroupId || "all";
    setSelectedGroup(groupId);
  }, [route.params?.selectedGroupId]);

  const renderItem = ({ item }) => <FeedItem feedId={item.id} />;

  return (
    <SafeAreaView style={styles.container}>
      <MainHeader
        selectedGroup={selectedGroup}
        selectedGroup={route.params?.selectedGroupId || "all"}
        onPressCategory={() => navigation.navigate("FeedGroupSelect")}
        onPressNotification={() => console.log("notification")}
      />
      <FlatList
        data={filteredFeeds}
        renderItem={renderItem}
        keyExtractor={item => String(item.id)}
        contentContainerStyle={styles.listContainer}
      />
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
});

export default MainFeedScreen;