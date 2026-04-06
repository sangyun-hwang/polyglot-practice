"use client";

import { Button } from "@material-tailwind/react";
import Person from "./Person";

export default function ChatScreen() {
  return <div className="w-full h-screen flex flex-col">
    {/* Active 유저 영역 */}
    <Person
      index={0}
      userId="1"
      name="John Doe"
      onlineAt={new Date().toISOString()}
      isActive={false}
      onChatScreen={true}
    />

    {/* 채팅 영역 */}
    <div className="w-full flex-1">

    </div>

    {/* 채팅창 영역 */}
    <div className="flex">
      <input
        className="p-4 w-full border-2 border-light-blue-600"
        type="text"
        placeholder="메시지를 입력하세요"
      />

      <button
        className="min-w-20 p-1 bg-light-blue-600 text-white"
      >
        <span>전송</span>
      </button>

    </div>
  </div>
}