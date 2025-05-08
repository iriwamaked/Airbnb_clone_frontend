//список всех маршрутов
const BASE_URL = import.meta.env.VITE_API_URL || "http://159.255.38.135";

export const endpoints = {
  //login: `${BASE_URL}/api/v1/Auth/Login`
  login: '/api/v1/Auth/Login',
 // register: `${BASE_URL}/api/v1/Auth/Register`,
 register: `/api/v1/Auth/Register`,
 // getProfile: `${BASE_URL}/user/profile`,
 getUserById: "/api/v1/User/GetUserById",
  products: `${BASE_URL}/product`,
  orders: `${BASE_URL}/order`,
  tags: `${BASE_URL}/tag`,
  reviews: `${BASE_URL}/review`,
  pictures: `${BASE_URL}/picture`,
};
