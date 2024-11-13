import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Image,
  StyleSheet,
  Dimensions,  // 추가
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import { useNavigation, useRoute, useFocusEffect } from "@react-navigation/native";

import MainHeader from "../../components/navigation/MainHeader";
import { initialFeeds } from "../../constants/dummydata";
import Colors from "../../constants/colors";

const windowWidth = Dimensions.get("window").width;
const cardWidth = (windowWidth - 16) / 3;

const AlbumScreen = () => {
 const navigation = useNavigation();
 const route = useRoute();
 const [filteredFeeds, setFilteredFeeds] = useState(initialFeeds);
 const [currentGroupId, setCurrentGroupId] = useState("all");
 const [selectedImage, setSelectedImage] = useState(null);
 const [modalVisible, setModalVisible] = useState(false);

 // 화면 포커스될 때마다 데이터 새로고침
 useFocusEffect(
   React.useCallback(() => {
     const groupId = route.params?.selectedGroup || currentGroupId;
     handleFilterFeeds(groupId);
     setCurrentGroupId(groupId);
   }, [route.params?.selectedGroup, currentGroupId])
 );

 // 그룹 변경 시 데이터 업데이트
 useEffect(() => {
   if (route.params?.selectedGroup) {
     const groupId = route.params.selectedGroup;
     handleFilterFeeds(groupId);
     setCurrentGroupId(groupId);
   }
 }, [route.params?.selectedGroup]);

 //선택 그룹 필터링
 const handleFilterFeeds = (groupId) => {
   if (groupId && groupId !== "all") {
     setFilteredFeeds(initialFeeds.filter((feed) => feed.group === groupId));
   } else {
     setFilteredFeeds(initialFeeds);
   }
 };

 //선택그룹으로
 const handleCategoryPress = () => {
   navigation.navigate("AlbumGroupSelectScreen", {
     currentGroupId: currentGroupId,
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

 //길게 누르면 해당 피드 위치로
 const handleLongPress = (feed) => {
   navigation.navigate("MainTab", {
     screen: "피드",
     params: {
       selectedGroupId: feed.group,
       selectedFeedId: feed.id
     }
   });
 };

 //누르면 앨범 이미지 띄움
 const handlePress = (feed) => {
   setSelectedImage(feed.profileImage);
   setModalVisible(true);
 };

 const renderCard = (feed) => (
   <TouchableOpacity
     style={styles.card}
     onPress={() => handlePress(feed)}
     onLongPress={() => handleLongPress(feed)}
     delayLongPress={500}
   >
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
             <View key={feed.id} style={styles.cardContainer}>
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
   backgroundColor: 'rgba(0, 0, 0, 0.7)',
   justifyContent: 'center',
   alignItems: 'center',
 },
 modalContent: {
   width: '90%',
   height: '70%',
   backgroundColor: 'white',
   borderRadius: 10,
   overflow: 'hidden',
   justifyContent: 'center',
   alignItems: 'center',
 },
 modalImage: {
   width: '100%',
   height: '100%',
 },
});

export default AlbumScreen;