const users = [];

export const addUser = (id, username, room) => {
  users.push({
    id,
    username,
    room,
  });
};

export const getUsers = (room) => {
  return users.filter((user) => user.room === room);
};

export const getUser = (id) => {
  return users.find((user) => user.id === id);
};

export const removeUser = (id) => {
  const removeIndex = users.findIndex((user) => user.id === id);
  const user = users[removeIndex];
  if (removeIndex >= 0) {
    users.splice(removeIndex, 1);
  }
  return user;
};
