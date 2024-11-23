// import React from "react";
// import { View, StyleSheet } from "react-native";
// import Colors from "../../constants/colors";

// // components/ui/ProgressBar.js
// const ProgressBar = ({ level, progress }) => {
//   console.log("ProgressBar props:", { level, progress }); // 로그 추가

//   return (
//     <View style={styles.container}>
//       <View style={styles.progressBar}>
//         <View
//           style={[
//             styles.progressFill,
//             {
//               width: `${progress}%`,
//             },
//           ]}
//         />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: "row",
//     alignItems: "center",
//     width: 260,
//     height: 32,
//   },
//   // levelText: {
//   //   fontFamily: "Pretendard",
//   //   fontWeight: "600",
//   //   fontSize: 16,
//   //   color: Colors.pink20,
//   //   marginRight: 8,
//   // },
//   progressBar: {
//     flex: 1,
//     height: 32,
//     borderRadius: 16,
//     borderWidth: 1,
//     borderColor: Colors.pink20,
//     backgroundColor: "#FFF",
//     overflow: "hidden",
//   },
//   progressFill: {
//     height: "100%",
//     backgroundColor: Colors.pink20,
//   },
// });

// export default ProgressBar;

// components/ui/ProgressBar.js
import React from "react";
import { View, StyleSheet } from "react-native";
import Colors from "../../constants/colors";

const ProgressBar = ({ level, progress }) => {
  console.log("ProgressBar render:", { level, progress }); // 로그 추가

  // progress 값을 0-100 사이로 확실히 제한
  const progressWidth = `${Math.min(Math.max(progress || 0, 0), 100)}%`;

  return (
    <View style={styles.container}>
      <View style={styles.progressBar}>
        <View
          style={[
            styles.progressFill,
            { width: progressWidth }, // 수정된 부분
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: 260,
    height: 32,
  },
  progressBar: {
    flex: 1,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.pink20,
    backgroundColor: "#FFF",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: Colors.pink20,
  },
});

export default ProgressBar;
