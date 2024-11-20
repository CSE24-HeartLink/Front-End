import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  RefreshControl,
  Alert,
} from "react-native";
import {
  useNavigation,
  useRoute,
  useFocusEffect,
} from "@react-navigation/native";

import useAuthStore from "../store/authStore";
import useFeedStore from "../store/feedStore";
import FeedItem from "../components/feed/FeedItem";
import Colors from "../constants/colors";
import MainHeader from "../components/navigation/MainHeader";
import AddFeedIcon from "../../assets/images/AddFeed.png";

const MainFeedScreen = () => {
  const flatListRef = useRef(null);
  const { feeds, filteredFeeds, setSelectedGroup, error, isLoading } =
    useFeedStore();
  const getAccessToken = useAuthStore((state) => state.getAccessToken);
  const navigation = useNavigation();
  const route = useRoute();
  const [currentGroupId, setCurrentGroupId] = useState("all");
  const [refreshing, setRefreshing] = useState(false);

  // 피드 로딩 함수
  const loadFeeds = useCallback(
    async (groupId = "all") => {
      try {
        console.log("[MainFeedScreen] Loading feeds for group:", groupId);
        const token = getAccessToken();
        if (!token) {
          console.log("[MainFeedScreen] No token found, navigating to login");
          navigation.navigate("Login");
          return;
        }
        await setSelectedGroup(groupId);
        console.log("[MainFeedScreen] Feeds loaded successfully");
      } catch (error) {
        console.error("[MainFeedScreen] Feed loading error:", error);
        Alert.alert("오류", "피드를 불러오는데 실패했습니다.");
      }
    },
    [getAccessToken, navigation, setSelectedGroup]
  );

  // 초기 로딩
  useEffect(() => {
    console.log("[MainFeedScreen] Initial feed loading");
    loadFeeds("all");
  }, []); // 컴포넌트 마운트 시 한 번만 실행

  // 화면에 포커스될 때마다 실행
  useFocusEffect(
    useCallback(() => {
      console.log("[MainFeedScreen] Screen focused");
      const newGroupId = route.params?.selectedGroupId || currentGroupId;

      if (newGroupId !== currentGroupId) {
        console.log("[MainFeedScreen] Group changed, loading new feeds");
        setCurrentGroupId(newGroupId);
        loadFeeds(newGroupId);
      }

      // 선택된 피드가 있으면 스크롤
      if (route.params?.selectedFeedId && filteredFeeds.length > 0) {
        const selectedIndex = filteredFeeds.findIndex(
          (feed) => feed.feedId === route.params.selectedFeedId
        );

        if (selectedIndex !== -1) {
          setTimeout(() => {
            flatListRef.current?.scrollToIndex({
              index: selectedIndex,
              animated: true,
              viewPosition: 0,
            });
          }, 500);
        }
      }
    }, [route.params, currentGroupId, loadFeeds])
  );

  const handleRefresh = useCallback(async () => {
    console.log("[MainFeedScreen] Manual refresh triggered");
    setRefreshing(true);
    await loadFeeds(currentGroupId);
    setRefreshing(false);
  }, [currentGroupId, loadFeeds]);

  const renderItem = useCallback(
    ({ item }) => {
      if (!item?.feedId) {
        console.log("[MainFeedScreen] Invalid feed item:", item);
        return null;
      }
      return (
        <FeedItem
          feed={item}
          onDeleteSuccess={() => {
            console.log("[MainFeedScreen] Feed deleted, refreshing list");
            loadFeeds(currentGroupId);
          }}
        />
      );
    },
    [currentGroupId, loadFeeds]
  );

  return (
    <SafeAreaView style={styles.container}>
      <MainHeader
        selectedGroup={currentGroupId}
        onPressCategory={() => {
          navigation.navigate("FeedGroupSelectScreen", {
            currentGroupId: currentGroupId,
          });
        }}
        onPressNotification={() => console.log("notification")}
      />
      {filteredFeeds && filteredFeeds.length > 0 ? (
        <FlatList
          ref={flatListRef}
          data={filteredFeeds}
          keyExtractor={(item) => String(item?.feedId || Math.random())}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              tintColor={Colors.red20}
              colors={[Colors.red20]}
            />
          }
        />
      ) : null}
      <TouchableOpacity
        style={styles.addFeedButton}
        onPress={() => {
          navigation.navigate("CreatePost", {
            currentGroupId: currentGroupId,
            selectedGroupId: currentGroupId,
          });
        }}
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
