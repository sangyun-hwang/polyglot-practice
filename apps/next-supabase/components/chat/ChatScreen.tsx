"use client";

import { useRecoilValue } from "recoil";
import Message from "./Message";
import Person from "./Person";
import { selectedIndexState } from "@/utils/recoil/atoms";

const dummyMessages = [
  { id: 1, text: "안녕하세요.", isFromMe: true },
  { id: 2, text: "반갑습니다.", isFromMe: false },
];


export default function ChatScreen() {
  const selectedIndex = useRecoilValue(selectedIndexState);


  return selectedIndex !== null ? <div className="w-full h-screen flex flex-col">
    {/* Active 유저 영역 */}
    <Person
      index={selectedIndex}
      userId="1"
      name="John Doe"
      onlineAt={new Date().toISOString()}
      isActive={false}
      onChatScreen={true}
    />

    {/* 채팅 영역 */}
    <div className="w-full flex-1 flex flex-col p-4 gap-3">
      {dummyMessages.map((message) => (
        <Message
          key={message.id}
          isFromMe={message.isFromMe}
          message={message.text}
        />
      ))}
    </div>

    {/* 채팅창 영역 */}
    <div className="flex">
      <input
        className="p-3 w-full border-2 border-light-blue-600"
        type="text"
        placeholder="메시지를 입력하세요"
      />

      <button
        className="min-w-20 p-3 bg-light-blue-600 text-white"
      >
        <span>전송</span>
      </button>

    </div>
  </div> : <div className="w-full"></div>
}