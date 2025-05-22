// Заглушка для имитации загрузки с бэка
export async function getUserById(id) {
  const response = await fetch("/usersData.json");
  const users = await response.json();
  return users.find(u => u.id === id);
}
export const updateUserProfile = async (id, profileUpdates) => {
  return await api.put(`/api/users/${id}/profile`, profileUpdates);
};
