export const ENDPOINTS = {
  FEEDS: {
    GET_ALL: "/feeds",
    GET_GROUP: (groupId) => `/feeds/group/${groupId}`,
    GET_ONE: (feedId) => `/feeds/${feedId}`,
    GET_USER_FEEDS: (userId) => `/feeds/user/${userId}`,
    CREATE: "/feeds",
    UPDATE: (feedId) => `/feeds/${feedId}`,
    DELETE: (feedId) => `/feeds/${feedId}`,
    COMMENTS: {
      GET: (feedId) => `/feeds/${feedId}/comments`,
      CREATE: (feedId) => `/feeds/${feedId}/comment`,
      DELETE: (feedId, commentId) => `/feeds/${feedId}/comment/${commentId}`,
    },
  },
};
