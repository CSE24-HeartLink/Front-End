import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, SafeAreaView } from "react-native";
import { useNavigation } from '@react-navigation/native';

import useFeedStore from "../store/feedStore";
import FeedItem from "../components/feed/FeedItem";

import Colors from "../constants/colors";
import MainHeader from "../components/navigation/MainHeader";

const MainFeedScreen = () => {
  const feeds = useFeedStore((state) => state.feeds);
  const loadInitialData = useFeedStore((state) => state.loadInitialData);

  const navigation = useNavigation();
  const [selectedGroup, setSelectedGroup] = useState("all"); // 기본값을 'all'로 설정

  useEffect(() => {
    loadInitialData();
  }, []);

  const renderItem = ({ item }) => <FeedItem feedId={item.id} />;

  return (
    <SafeAreaView style={styles.container}>
      <MainHeader
        selectedGroup={selectedGroup} // selectedGroup prop 전달
        onPressCategory={() => navigation.navigate("FeedGroupSelect")}
        onPressNotification={() => console.log("notification")}
      />
      <FlatList
        data={feeds}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
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
  feedList: {
    paddingHorizontal: 16,
    paddingBottom: 90,
  },
  createButton: {
    position: "absolute",
    right: 20,
    bottom: 90,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.lightBeige,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonIconContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonIcon: {
    width: 24,
    height: 24,
    tintColor: Colors.pink40,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 72,
  },
});

export default MainFeedScreen;
