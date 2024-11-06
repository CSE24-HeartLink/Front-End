import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Colors from "../../.expo/constants/colors";
import TabMenu1 from "../../assets/images/icons/tabMenu1.svg";
import TabMenu2 from "../../assets/images/icons/tabMenu2.svg";
import TabMenu3 from "../../assets/images/icons/tabMenu3.svg";
import TabMenu4 from "../../assets/images/icons/tabMenu4.svg";
import TabMenu5 from "../../assets/images/icons/tabMenu5.svg";
import TabMenu1active from "../../assets/images/icons/tabMenu1active.svg";
import TabMenu2active from "../../assets/images/icons/tabMenu2active.svg";
import TabMenu3active from "../../assets/images/icons/tabMenu3active.svg";
import TabMenu4active from "../../assets/images/icons/tabMenu4active.svg";
import TabMenu5active from "../../assets/images/icons/tabMenu5active.svg";
import * as Animatable from "react-native-animatable"; // 추가

const icons = [
  {
    name: "CLOi",
    defaultIcon: <TabMenu1 width={26} height={26} />,
    activeIcon: <TabMenu1active width={26} height={26} />,
  },
  {
    name: "앨범",
    defaultIcon: <TabMenu2 width={26} height={26} />,
    activeIcon: <TabMenu2active width={26} height={26} />,
  },
  {
    name: "피드",
    defaultIcon: <TabMenu3 width={26} height={26} />,
    activeIcon: <TabMenu3active width={26} height={26} />,
  },
  {
    name: "친구",
    defaultIcon: <TabMenu4 width={26} height={26} />,
    activeIcon: <TabMenu4active width={26} height={26} />,
  },
  {
    name: "마이",
    defaultIcon: <TabMenu5 width={26} height={26} />,
    activeIcon: <TabMenu5active width={26} height={26} />,
  },
];

const CustomBottomTabBar = ({ state, navigation }) => {
  return (
    <View style={styles.bottomTabBar}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const icon = icons.find((icon) => icon.name === route.name);

        if (!icon) return null; // 해당 route에 icon이 없으면 무시

        const handlePress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.name}
            onPress={handlePress}
            style={styles.tabContainer}
          >
            {/* SVG 아이콘을 JSX로 렌더링 */}
            <View style={styles.iconContainer}>
              {isFocused ? (
                route.name === "피드" ? (
                  <Animatable.View
                    animation="bounceIn"
                    duration={800}
                    iterationCount={1}
                    style={styles.bounceEffect}
                  >
                    {icon.activeIcon}
                  </Animatable.View>
                ) : (
                  icon.activeIcon // 피드가 아닌 경우도 active 아이콘을 렌더링
                )
              ) : (
                icon.defaultIcon
              )}
            </View>
            <Text style={[styles.tabLabel, isFocused && styles.activeTabLabel]}>
              {route.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  bottomTabBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: Colors.lightBeige,
    height: 72,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  tabContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
  },
  iconContainer: {
    marginBottom: 8, // 아이콘과 텍스트 사이의 간격 조정
  },
  tabLabel: {
    fontSize: 12,
    color: Colors.gray45,
    fontFamily: "Pretendard-SemiBold",
  },
  activeTabLabel: {
    color: Colors.pink40,
    fontFamily: "Pretendard-Bold", // 폰트 지정
  },
  bounceEffect: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CustomBottomTabBar;
