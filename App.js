import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CLOiScreen from "./screens/CLOiScreen";
import AlbumScreen from "./screens/AlbumScreen";
import MainFeedScreen from "./screens/MainFeedScreen";
import FriendsScreen from "./screens/FriendsScreen";
import MyPageScreen from "./screens/MyPageScreen";
import CustomBottomTabBar from "./components/navigation/CustomBottomTabBar";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="피드"
        tabBar={(props) => <CustomBottomTabBar {...props} />}
        screenOptions={{ headerShown: false }}
      >
        <Tab.Screen name="CLOi" component={CLOiScreen} />
        <Tab.Screen name="앨범" component={AlbumScreen} />
        <Tab.Screen name="피드" component={MainFeedScreen} />
        <Tab.Screen name="친구" component={FriendsScreen} />
        <Tab.Screen name="마이" component={MyPageScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
