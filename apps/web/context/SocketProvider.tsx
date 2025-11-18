"use client";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { io, Socket } from "socket.io-client";
const randomNames = [
  "alpha",
  "bravo",
  "charlie",
  "delta",
  "echo",
  "fox",
  "ghost",
  "hydra",
];

interface socketProviderTypes {
  children?: React.ReactNode;
}
interface ChatMessage {
  text: string;
  username: string | undefined;
}
interface socketContexInterface {
  sendMessage: (msg: string) => any; // this allows me to define a fucntion and its types
  messages: ChatMessage[];
}
const socketContex = createContext<socketContexInterface | null>(null);

export const useSocketState = () => {
  const username = useRef(
    randomNames[Math.floor(Math.random() * randomNames.length)] +
      "-" +
      Math.floor(Math.random() * 1000)
  ).current;
  /*  ? explain why this is here later with full understanding
  1. this allows us to acces all the functions inside the socket provider below like send message and we can just destructure it later and use it 
   */
  const socketState = useContext(socketContex);
  if (!socketState)
    throw new Error(`sokcet state suffered from an internal error`);
  return socketState;
};

export const SocketProvider: React.FC<socketProviderTypes> = ({ children }) => {
  const username = useRef(
    randomNames[Math.floor(Math.random() * randomNames.length)] +
      "-" +
      Math.floor(Math.random() * 1000)
  ).current;
  const [msgsocket, setmsgsocket] = useState<Socket>();
  const [messages, setmessage] = useState<ChatMessage[]>([]);
  /* msgsocket
 - holds the active Socket.IO client object.
 - This object lets you send (emit) and receive real-time messages to and from the backend server.
  */
  const sendMessage: socketContexInterface["sendMessage"] = useCallback(
    // this cide is to send messgae
    (msg) => {
      console.log(`send msg : ${msg}`);
      if (msgsocket)
        msgsocket.emit("event:message", { message: msg, username });
      // setmessage((prev) => [...prev, { text: msg, sender: "me" }]);
    },
    [msgsocket]
  );

  const onMessageReceive = useCallback((msg: string) => {
    const { message, username } = JSON.parse(msg) as {
      message: string;
      username?: string;
    };
    setmessage((prev) => [...prev, { text: message, username }]);
  }, []);
  useEffect(() => {
    const _socket = io("http://localhost:8080"); // connect to backedn
    _socket.on("message", onMessageReceive);
    setmsgsocket(_socket); // hold the connection string so that it can be used
    return () => {
      _socket.disconnect();
      _socket.off("message", onMessageReceive);
      setmsgsocket(undefined);
    };
  }, []);
  return (
    <socketContex.Provider value={{ sendMessage, messages }}>
      {children}
    </socketContex.Provider>
  );
};
