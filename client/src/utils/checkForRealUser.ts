export type User = {
  userName: string;
  roomId: string;
  socketId: string;
  storyPoints: number;
  userId: string;
};

export function checkUser(users: User[]) {
  return users.filter((user) => user.roomId !== "");
}
