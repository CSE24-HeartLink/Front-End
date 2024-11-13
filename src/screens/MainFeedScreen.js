import React, { useState, useEffect, useCallback } from "react";
import {
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  RefreshControl,
} from "react-native";
import {
  useNavigation,
  useRoute,
  useFocusEffect,
} from "@react-navigation/native";

import useFeedStore from "../store/feedStore";
import FeedItem from "../components/feed/FeedItem";
import Colors from "../constants/colors";
import MainHeader from "../components/navigation/MainHeader";
import AddFeedIcon from "../../assets/images/AddFeed.png";

const MainFeedScreen = () => {
  const feeds = useFeedStore((state) => state.feeds);
  const filteredFeeds = useFeedStore((state) => state.filteredFeeds);
  const setSelectedGroup = useFeedStore((state) => state.setSelectedGroup);
  const loadInitialData = useFeedStore((state) => state.loadInitialData);
  const navigation = useNavigation();
  const route = useRoute();
  const [currentGroupId, setCurrentGroupId] = useState("all");
  const [refreshing, setRefreshing] = useState(false);

  // 초기 데이터 로드
  useEffect(() => {
    loadInitialData();
  }, []);

  // 화면 포커스될 때마다 데이터 새로고침
  useFocusEffect(
    useCallback(() => {
      const groupId = route.params?.selectedGroupId || currentGroupId;
      setSelectedGroup(groupId);
      setCurrentGroupId(groupId);
    }, [route.params?.selectedGroupId, currentGroupId])
  );

  // 그룹 변경 시 데이터 업데이트
  useEffect(() => {
    if (route.params?.selectedGroupId) {
      const groupId = route.params.selectedGroupId;
      setSelectedGroup(groupId);
      setCurrentGroupId(groupId);
    }
  }, [route.params?.selectedGroupId]);

  const handleCategoryPress = () => {
    navigation.navigate("FeedGroupSelectScreen", {
      currentGroupId: currentGroupId,
    });
  };

  // 추가 버튼 클릭 핸들러 추가
  const handleAddFeedPress = () => {
    navigation.navigate("CreatePost", {
      currentGroupId: currentGroupId,
    });
  };

  // 당겨서 새로고침
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadInitialData();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const renderItem = ({ item }) => <FeedItem feedId={item.id} />;

  return (
    <SafeAreaView style={styles.container}>
      <MainHeader
        selectedGroup={currentGroupId}
        onPressCategory={handleCategoryPress}
        onPressNotification={() => console.log("notification")}
      />
      <FlatList
        data={filteredFeeds}
        renderItem={renderItem}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={Colors.red20}
            colors={[Colors.red20]}
          />
        }
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
``;
