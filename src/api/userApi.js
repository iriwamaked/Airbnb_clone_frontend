import axios from "axios";
import api from "./index"; // <-- путь к твоему api instance


// Заглушка для имитации загрузки с бэка
export async function getUserById(id) {
  const response = await fetch("/usersData.json");
  const users = await response.json();
  return users.find(u => u.id === id);
}
export const updateUserProfile = async (id, profileUpdates) => {
  return await api.put(`/api/users/${id}/profile`, profileUpdates);
};

export const loginWithGoogle = async (token) => {
  return await axios.post("http://localhost:5000/api/auth/google", {
    token,
  });
};