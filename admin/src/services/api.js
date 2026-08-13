const BACKEND_URL = "http://localhost:4000";

const API = {

  BASE_URL: BACKEND_URL,

  ADMIN_LOGIN: `${BACKEND_URL}/api/user/admin`,
  LOGIN: `${BACKEND_URL}/api/user/login`,
  REGISTER: `${BACKEND_URL}/api/user/register`,

  ADD_SHOE: `${BACKEND_URL}/api/shoes/add`,
  GET_SHOES: `${BACKEND_URL}/api/shoes/list`,
  DELETE_SHOE: (id) => `${BACKEND_URL}/api/shoes/${id}`,
  GET_SHOE: (id) => `${BACKEND_URL}/api/shoes/${id}`,
  UPDATE_SHOE: (id) => `${BACKEND_URL}/api/shoes/${id}`,

  GET_ORDERS: `${BACKEND_URL}/api/order/list`,
  UPDATE_ORDER_STATUS: `${BACKEND_URL}/api/order/status`,
  GET_ORDER: (id) => `${BACKEND_URL}/api/order/${id}`,

  GET_USERS: `${BACKEND_URL}/api/user/list`,
  DELETE_USER: (id) => `${BACKEND_URL}/api/user/${id}`,
  GET_USER: (id) => `${BACKEND_URL}/api/user/${id}`,

  DASHBOARD_STATS: `${BACKEND_URL}/api/admin/dashboard`,
  ANALYTICS: `${BACKEND_URL}/api/admin/analytics`,
  
};

export default API;