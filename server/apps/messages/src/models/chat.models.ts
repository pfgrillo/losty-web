export interface User {
    userId: string;
    userName: string;
    socketId: string;
  }
  
  export interface Message {
    user: User;
    timeSent: string;
    message: string;
    roomName: string;
  }
  
  export interface Message2 {
    message: string;
    from: string;
    to: string;
    chatRoom: string;
  }
  
  export interface Room {
    name: string;
    host: User;
    guest: User;
  }

  export interface ServerToClientEvents {
    chat: (e: Message) => void;
  }
  
  // Interface for when clients emit events to the server.
  export interface ClientToServerEvents {
    chat: (e: Message) => void;
    join_room: (e: { user: User; roomName: string }) => void;
  }
  