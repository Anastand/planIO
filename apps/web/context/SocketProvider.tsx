"use client";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { io, Socket } from "socket.io-client";
interface socketProviderTypes {
  children?: React.ReactNode;
}
interface socketContexInterface {
  sendMessage: (msg: string) => any; // this allows me to define a fucntion and its types
}
const socketContex = createContext<socketContexInterface | null>(null);

export const useSocketState = () => {
  /*  ? explain why this is here later with full understanding
  1. this allows us to acces all the functions inside the socket provider below like send message and we can just destructure it later and use it 
   */
  const socketState = useContext(socketContex);
  if (!socketState)
    throw new Error(`sokcet state suffered from an internal error`);
  return socketState;
};

export const SocketProvider: React.FC<socketProviderTypes> = ({ children }) => {
  const [msgsocket, setmsgsocket] = useState<Socket>();
  /* msgsocket
 - holds the active Socket.IO client object.
 - This object lets you send (emit) and receive real-time messages to and from the backend server.
  */
  const sendMessage: socketContexInterface["sendMessage"] = useCallback(
    // this cide is to send messgae
    (msg) => {
      console.log(`send msg : ${msg}`);
      if (msgsocket) msgsocket.emit("event:message", { message: msg });
    },
    [msgsocket]
  );
  useEffect(() => {
    const _socket = io("http://localhost:8080"); // connect to backedn
    setmsgsocket(_socket); // hold the connection string so that it can be used
    return () => {
      _socket.disconnect();
      setmsgsocket(undefined);
    };
  }, []);
  return (
    <socketContex.Provider value={{ sendMessage }}>
      {children}
    </socketContex.Provider>
  );
};
