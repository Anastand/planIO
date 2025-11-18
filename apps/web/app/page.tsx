"use client";
import { useSocketState } from "@/context/SocketProvider";
import { useState, useRef, useEffect } from "react";

export default function Home() {
  const { sendMessage, messages } = useSocketState();
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!message.trim()) return;
    sendMessage(message);
    setMessage("");
    inputRef.current?.focus();
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-linear-to-b from-slate-900 via-slate-800 to-slate-700 py-8">
      <div className="w-full max-w-lg flex flex-col flex-1 bg-white/10 rounded-xl shadow-xl p-0">
        <h1 className="text-3xl font-bold text-blue-400 text-center my-6">
          Live Chat
        </h1>
        <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2">
          {messages.length === 0 && (
            <div className="text-gray-400 text-center mt-10">
              Start the conversation...
            </div>
          )}
          {messages.map((msg, i) => (
            <div key={i} className="mb-3">
              <span className="block text-xs font-bold text-yellow-200 mb-1">
                {msg.username ?? "unknown"}
              </span>
              <div className="py-2 px-4 rounded-xl shadow bg-slate-400 text-black">
                {msg.text}
              </div>
            </div>
          ))}

          <div ref={endRef} />
        </div>
        <div className="mt-auto p-4 flex gap-2 border-t border-slate-600 bg-slate-900 rounded-b-xl">
          <input
            ref={inputRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 p-2 rounded-lg bg-slate-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Type your message…"
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSend();
            }}
          />
          <button
            onClick={handleSend}
            className="rounded-lg bg-blue-500 px-4 py-2 text-white font-bold hover:bg-blue-700 shadow transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
