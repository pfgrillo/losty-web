export class CreateUserDto {
  name: string;
  username: string;
  items: [];
  chats: { chatRoom: string; users: string[] }[];
}
