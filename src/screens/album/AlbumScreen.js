import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import {
  useNavigation,
  useRoute,
  useFocusEffect,
} from "@react-navigation/native";

import MainHeader from "../../components/navigation/MainHeader";
import { albumDummyData } from "../../constants/albumDummy";
import Colors from "../../constants/colors";

import useGroupStore from "../../store/groupStore";

const windowWidth = Dimensions.get("window").width;
const cardWidth = (windowWidth - 16) / 3;

const AlbumScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [filteredFeeds, setFilteredFeeds] = useState(albumDummyData);
  const [currentGroupId, setCurrentGroupId] = useState("all");
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const { groups, fetchGroups } = useGroupStore(); // 그룹스토어에서 그룹 데이터 가져오기

  // 화면 포커스될 때마다 데이터 새로고침
  useFocusEffect(
    React.useCallback(() => {
      fetchGroups(); // 그룹 데이터 가져오기
      const groupId = route.params?.selectedGroup || currentGroupId;
      handleFilterFeeds(groupId);
      setCurrentGroupId(groupId);
    }, [route.params?.selectedGroup, currentGroupId])
  );

  // 선택된 그룹에 따라 피드 필터링
  const handleFilterFeeds = (groupId) => {
    if (groupId && groupId !== "all") {
      setFilteredFeeds(
        albumDummyData.filter((feed) => feed.groupId === groupId)
      );
    } else {
      setFilteredFeeds(albumDummyData);
    }
  };

  // 그룹 선택 화면으로 이동
  const handleCategoryPress = () => {
    navigation.navigate("AlbumGroupSelectScreen", {
      currentGroupId: currentGroupId,
    });
  };

  // 날짜 포맷팅
  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
  };

  // 핀 모양 렌더링
  const renderPin = () => (
    <View style={styles.pinContainer}>
      <View style={styles.pinHead} />
      <View style={styles.pinBody} />
    </View>
  );

  // 길게 누르면 해당 피드로 이동
  const handleLongPress = (feed) => {
    navigation.navigate("MainTab", {
      screen: "피드",
      params: {
        selectedGroupId: feed.group,
        selectedFeedId: feed.id,
      },
    });
  };

  // 이미지 모달 표시
  const handlePress = (feed) => {
    setSelectedImage({ uri: feed.images[0].url });
    setModalVisible(true);
  };

  // 카드 컴포넌트 렌더링
  const renderCard = (feed) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handlePress(feed)}
      onLongPress={() => handleLongPress(feed)}
      delayLongPress={500}
    >
      <View style={styles.imageContainer}>
        {renderPin()}
        <Image
          source={{ uri: feed.images[0].url }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <Text style={styles.title}>{feed.userId}</Text>
      <Text style={styles.date}>{formatDate(feed.createdAt)}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <MainHeader
          selectedGroup={currentGroupId}
          onPressCategory={handleCategoryPress}
          onPressNotification={() => console.log("notification")}
        />
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.grid}>
            {filteredFeeds.map((feed) => (
              <View key={feed.feedId} style={styles.cardContainer}>
                {renderCard(feed)}
              </View>
            ))}
          </View>
        </ScrollView>

        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <Pressable
            style={styles.modalOverlay}
            onPress={() => setModalVisible(false)}
          >
            <View style={styles.modalContent}>
              {selectedImage && (
                <Image
                  source={selectedImage}
                  style={styles.modalImage}
                  resizeMode="contain"
                />
              )}
            </View>
          </Pressable>
        </Modal>
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
    paddingBottom: 72,
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
    //paddingTop: 15, // 핀을 위한 상단 패딩 추가
  },
  imageContainer: {
    flex: 1,
    borderRadius: 8,
    marginBottom: 8,
    position: "relative",
  },
  pinContainer: {
    position: "absolute",
    top: -10,
    left: "50%",
    marginLeft: -6,
    zIndex: 2,
    transform: [{ rotate: "25deg" }],
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
    zIndex: 1,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    height: "70%",
    backgroundColor: "white",
    borderRadius: 10,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  modalImage: {
    width: "100%",
    height: "100%",
  },
});

export default AlbumScreen;
