// import { create } from "zustand";
// import { initialFeeds } from "../constants/dummydata";

// const useFeedStore = create((set) => ({
//   feeds: [],
//   filteredFeeds: [],
//   selectedGroup: "all",
//   selectedReactions: {},

//   loadInitialData: () => {
//     set({
//       feeds: initialFeeds,
//       filteredFeeds: initialFeeds,
//     });
//   },

//   setSelectedGroup: (groupId) => {
//     set((state) => ({
//       selectedGroup: groupId,
//       filteredFeeds:
//         groupId === "all"
//           ? state.feeds
//           : state.feeds.filter((feed) => feed.group === groupId),
//     }));
//   },

//   addFeed: (newFeed) => {
//     set((state) => {
//       const updatedFeeds = [newFeed, ...state.feeds];
//       return {
//         feeds: updatedFeeds,
//         filteredFeeds:
//           state.selectedGroup === "all"
//             ? updatedFeeds
//             : updatedFeeds.filter((feed) => feed.group === state.selectedGroup),
//       };
//     });
//   },

//   updateFeed: (feedId, updatedContent) => {
//     set((state) => {
//       // 1. 기존 피드 찾기
//       const oldFeed = state.feeds.find((feed) => feed.id === feedId);
//       if (!oldFeed) return state;

//       // 2. 그룹 변경 여부 확인
//       const isGroupChanged = oldFeed.group !== updatedContent.group;

//       // console.log("UpdateFeed:", {
//       //   feedId,
//       //   oldGroup: oldFeed?.group,
//       //   newGroup: updatedContent.group,
//       //   isGroupChanged,
//       //   updatedContent,
//       // });

//       if (isGroupChanged) {
//         // 그룹이 변경된 경우
//         const remainingFeeds = state.feeds.filter((feed) => feed.id !== feedId);
//         const newFeed = {
//           ...oldFeed, // 기존 정보 유지 (userId, nickname 등)
//           content: updatedContent.content,
//           image: updatedContent.image,
//           group: updatedContent.group,
//           updatedAt: new Date(),
//         };

//         const updatedFeeds = [newFeed, ...remainingFeeds];
//         return {
//           feeds: updatedFeeds,
//           filteredFeeds:
//             state.selectedGroup === "all"
//               ? updatedFeeds
//               : updatedFeeds.filter(
//                   (feed) => feed.group === state.selectedGroup
//                 ),
//         };
//       } else {
//         // 같은 그룹 내에서의 수정
//         const updatedFeeds = state.feeds.map((feed) =>
//           feed.id === feedId
//             ? {
//                 ...feed,
//                 content: updatedContent.content,
//                 image: updatedContent.image,
//                 updatedAt: new Date(),
//               }
//             : feed
//         );

//         return {
//           feeds: updatedFeeds,
//           filteredFeeds:
//             state.selectedGroup === "all"
//               ? updatedFeeds
//               : updatedFeeds.filter(
//                   (feed) => feed.group === state.selectedGroup
//                 ),
//         };
//       }
//     });
//   },

//   // 피드 삭제 기능
//   deleteFeed: (feedId) => {
//     set((state) => {
//       const updatedFeeds = state.feeds.filter((feed) => feed.id !== feedId);
//       return {
//         feeds: updatedFeeds,
//         filteredFeeds:
//           state.selectedGroup === "all"
//             ? updatedFeeds
//             : updatedFeeds.filter((feed) => feed.group === state.selectedGroup),
//       };
//     });
//   },

//   // 사용자의 모든 피드 그룹 업데이트
//   updateFeedsByUserGroup: (nickname, newGroup) => {
//     set((state) => {
//       const updatedFeeds = state.feeds.map((feed) =>
//         feed.nickname === nickname ? { ...feed, group: newGroup } : feed
//       );

//       return {
//         feeds: updatedFeeds,
//         filteredFeeds:
//           state.selectedGroup === "all"
//             ? updatedFeeds
//             : updatedFeeds.filter((feed) => feed.group === state.selectedGroup),
//       };
//     });
//   },

//   toggleReaction: (feedId, reactionType) => {
//     set((state) => {
//       const currentUserId = "user1"; // 현재 로그인한 사용자 ID

//       const updatedFeeds = state.feeds.map((feed) => {
//         if (feed.id === feedId) {
//           const updatedReactions = feed.reactions.map((reaction) => {
//             if (reaction.type === reactionType) {
//               const hasReacted = reaction.users.includes(currentUserId);
//               return {
//                 ...reaction,
//                 count: hasReacted ? reaction.count - 1 : reaction.count + 1,
//                 users: hasReacted
//                   ? reaction.users.filter((id) => id !== currentUserId)
//                   : [...reaction.users, currentUserId],
//               };
//             }
//             return reaction;
//           });

//           return { ...feed, reactions: updatedReactions };
//         }
//         return feed;
//       });

//       return {
//         feeds: updatedFeeds,
//         filteredFeeds:
//           state.selectedGroup === "all"
//             ? updatedFeeds
//             : updatedFeeds.filter((feed) => feed.group === state.selectedGroup),
//       };
//     });
//   },
// }));

// export default useFeedStore;
import { create } from "zustand";
import { initialFeeds } from "../constants/dummydata";

const useFeedStore = create((set) => ({
  feeds: [],
  filteredFeeds: [],
  selectedGroup: "all",
  selectedReactions: {},

  loadInitialData: () => {
    set({
      feeds: initialFeeds,
      filteredFeeds: initialFeeds,
    });
  },

  setSelectedGroup: (groupId) => {
    set((state) => ({
      selectedGroup: groupId,
      filteredFeeds:
        groupId === "all"
          ? state.feeds
          : state.feeds.filter((feed) => feed.group === groupId),
    }));
  },

  addFeed: (newFeed) => {
    set((state) => {
      const updatedFeeds = [newFeed, ...state.feeds];
      return {
        feeds: updatedFeeds,
        filteredFeeds:
          state.selectedGroup === "all"
            ? updatedFeeds
            : updatedFeeds.filter((feed) => feed.group === state.selectedGroup),
      };
    });
  },

  updateFeed: (feedId, updatedContent) => {
    console.log("feedStore - updateFeed - before update:", {
      feedId,
      updatedContent,
    });
    //디버깅용

    set((state) => {
      const updatedFeeds = state.feeds.map((feed) => {
        if (feed.id === feedId) {
          return {
            ...feed,
            content: updatedContent.content,
            image: updatedContent.image,
            group: updatedContent.group,
          };
        }
        return feed;
      });

      return {
        feeds: updatedFeeds,
        filteredFeeds:
          state.selectedGroup === "all"
            ? updatedFeeds
            : updatedFeeds.filter((feed) => feed.group === state.selectedGroup),
      };
    });
  },

  deleteFeed: (feedId) => {
    set((state) => {
      const updatedFeeds = state.feeds.filter((feed) => feed.id !== feedId);
      return {
        feeds: updatedFeeds,
        filteredFeeds:
          state.selectedGroup === "all"
            ? updatedFeeds
            : updatedFeeds.filter((feed) => feed.group === state.selectedGroup),
      };
    });
  },

  updateFeedsByUserGroup: (nickname, newGroup) => {
    set((state) => {
      const updatedFeeds = state.feeds.map((feed) =>
        feed.nickname === nickname ? { ...feed, group: newGroup } : feed
      );

      return {
        feeds: updatedFeeds,
        filteredFeeds:
          state.selectedGroup === "all"
            ? updatedFeeds
            : updatedFeeds.filter((feed) => feed.group === state.selectedGroup),
      };
    });
  },

  toggleReaction: (feedId, reactionType) => {
    set((state) => {
      const currentUserId = "user1"; // 현재 로그인한 사용자 ID

      const updatedFeeds = state.feeds.map((feed) => {
        if (feed.id === feedId) {
          const updatedReactions = feed.reactions.map((reaction) => {
            if (reaction.type === reactionType) {
              const hasReacted = reaction.users.includes(currentUserId);
              return {
                ...reaction,
                count: hasReacted ? reaction.count - 1 : reaction.count + 1,
                users: hasReacted
                  ? reaction.users.filter((id) => id !== currentUserId)
                  : [...reaction.users, currentUserId],
              };
            }
            return reaction;
          });

          return { ...feed, reactions: updatedReactions };
        }
        return feed;
      });

      return {
        feeds: updatedFeeds,
        filteredFeeds:
          state.selectedGroup === "all"
            ? updatedFeeds
            : updatedFeeds.filter((feed) => feed.group === state.selectedGroup),
      };
    });
  },
}));

export default useFeedStore;
