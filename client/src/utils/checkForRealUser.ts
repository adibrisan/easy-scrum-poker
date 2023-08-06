export type User = {
  userName: string;
  roomId: string;
  socketId: string;
  storyPoints: number;
  userId: string;
};

export function checkUser(users: User[], roomId: string) {
  const userExists = users.filter((user) => user.roomId !== "");
  return userExists.filter((user) => user.roomId === roomId);
}
