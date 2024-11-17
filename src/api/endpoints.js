export const ENDPOINTS = {
  FEEDS: {
    GET_ALL: "/feed",
    GET_GROUP: (groupId) => `/feed/group/${groupId}`,
    GET_ONE: (feedId) => `/feed/${feedId}`,
    GET_USER_FEEDS: (userId) => `/feed/user/${userId}`,
    CREATE: "/feed",
    UPDATE: (feedId) => `/feed/${feedId}`,
    DELETE: (feedId) => `/feed/${feedId}`,
    COMMENTS: {
      GET: (feedId) => `/feed/${feedId}/comments`,
      CREATE: (feedId) => `/feed/${feedId}/comment`,
      DELETE: (feedId, commentId) => `/feed/${feedId}/comment/${commentId}`,
    },
  },
};
