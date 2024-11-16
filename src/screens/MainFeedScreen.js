import React, { useState, useEffect, useCallback, useRef } from "react";
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
  // 피드 리스트의 스크롤 위치 제어를 위한 ref
  const flatListRef = useRef(null);

  // Zustand 스토어에서 필요한 상태와 액션들을 가져옴
  const feeds = useFeedStore((state) => state.feeds); // 전체 피드 목록
  const filteredFeeds = useFeedStore((state) => state.filteredFeeds); // 필터링된 피드 목록
  const setSelectedGroup = useFeedStore((state) => state.setSelectedGroup); // 선택된 그룹 설정 함수
  const loadInitialData = useFeedStore((state) => state.loadInitialData); // 초기 데이터 로드 함수

  // 네비게이션 관련 훅
  const navigation = useNavigation();
  const route = useRoute();

  // 로컬 상태
  const [currentGroupId, setCurrentGroupId] = useState("all"); // 현재 선택된 그룹 ID
  const [refreshing, setRefreshing] = useState(false); // 새로고침 상태

  // 컴포넌트 마운트 시 초기 데이터 로드
  useEffect(() => {
    loadInitialData();
  }, []);

  // 화면이 포커스될 때마다 실행되는 효과
  useFocusEffect(
    useCallback(() => {
      // 라우트 파라미터에서 선택된 그룹 ID를 가져오거나, 현재 그룹 ID 사용
      const groupId = route.params?.selectedGroupId || currentGroupId;
      setSelectedGroup(groupId);
      setCurrentGroupId(groupId);

      // 특정 피드로 스크롤 처리
      if (
        route.params?.selectedFeedId &&
        flatListRef.current &&
        filteredFeeds.length > 0
      ) {
        // 선택된 피드의 인덱스 찾기
        const selectedIndex = filteredFeeds.findIndex(
          (feed) => feed.id === route.params.selectedFeedId
        );

        if (selectedIndex !== -1) {
          // 1초 후에 해당 피드로 스크롤
          // 지연을 주는 이유: 리스트가 완전히 렌더링될 때까지 기다리기 위함
          const timer = setTimeout(() => {
            flatListRef.current?.scrollToIndex({
              index: selectedIndex,
              animated: true,
              viewPosition: 0, // 0은 top, 1은 bottom
            });
          }, 1000);

          // 컴포넌트 언마운트 시 타이머 정리
          return () => clearTimeout(timer);
        }
      }
    }, [
      route.params?.selectedGroupId,
      route.params?.selectedFeedId,
      currentGroupId,
    ])
  );

  // 라우트 파라미터로 그룹 ID가 변경될 때 처리
  useEffect(() => {
    if (route.params?.selectedGroupId) {
      const groupId = route.params.selectedGroupId;
      setSelectedGroup(groupId);
      setCurrentGroupId(groupId);
    }
  }, [route.params?.selectedGroupId]);

  // 카테고리(그룹) 선택 화면으로 이동
  const handleCategoryPress = () => {
    navigation.navigate("FeedGroupSelectScreen", {
      currentGroupId: currentGroupId,
    });
  };

  // 새 게시글 작성 화면으로 이동
  // MainFeedScreen.js
  const handleAddFeedPress = () => {
    navigation.navigate("CreatePost", {
      currentGroupId: currentGroupId, // 현재 선택된 그룹 ID를 전달
      selectedGroupId: currentGroupId,
    });
  };

  // 당겨서 새로고침 처리
  const onRefresh = useCallback(() => {
    setRefreshing(true); // 새로고침 상태 시작
    loadInitialData(); // 데이터 다시 로드
    setTimeout(() => {
      setRefreshing(false); // 1초 후 새로고침 상태 종료
    }, 1000);
  }, []);

  // FlatList에서 사용할 아이템 렌더링 함수
  const renderItem = ({ item }) => <FeedItem feedId={item.id} />;

  return (
    <SafeAreaView style={styles.container}>
      {/* 상단 헤더 */}
      <MainHeader
        selectedGroup={currentGroupId}
        onPressCategory={handleCategoryPress}
        onPressNotification={() => console.log("notification")}
      />

      {/* 피드 리스트 */}
      <FlatList
        ref={flatListRef}
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
        // 스크롤 위치 이동 실패 시 재시도 처리
        onScrollToIndexFailed={(info) => {
          const wait = new Promise((resolve) => setTimeout(resolve, 500));
          wait.then(() => {
            flatListRef.current?.scrollToIndex({
              index: info.index,
              animated: true,
            });
          });
        }}
      />

      {/* 새 게시글 작성 버튼 */}
      <TouchableOpacity
        style={styles.addFeedButton}
        onPress={handleAddFeedPress}
      >
        <Image source={AddFeedIcon} style={styles.addFeedIcon} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

// 스타일 정의
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryBeige,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 72, // 하단 버튼이 가리지 않도록 여백 추가
  },
  addFeedButton: {
    position: "absolute", // 화면 우측 하단에 고정
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
