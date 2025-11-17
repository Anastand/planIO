"use client";
import { useSocketState } from "@/context/SocketProvider";
import { useState } from "react";

export default function Home() {
  const { sendMessage } = useSocketState(); // {} was used as we wanted to only import the sendMessage
  const [message, setMessage] = useState("");
  return (
    <>
      <div className="">
        <h1 className="text-2xl text-amber-300 flex justify-center mx-auto max-h-screen max-w-7xl mb-4 ">
          All Messages
        </h1>
        <div className=" flex justify-center mx-auto max-h-screen max-w-7xl gap-2">
          <input
            onChange={(e) => setMessage(e.target.value)}
            className=" outline-1 outline-gray-800 p-1 px-2 rounded-xl focus:outline-gray-400"
            placeholder="messages"
          />
          <button
            onClick={() => sendMessage(message)}
            className="outline-1 outline-gray-800 px-2 rounded-xl active:bg-slate-600"
          >
            sendIcon
          </button>
        </div>
      </div>
    </>
  );
}
