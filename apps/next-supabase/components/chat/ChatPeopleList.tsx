"use client";


import { selectedIndexState } from "@/utils/recoil/atoms";
import Person from "./Person";
import { useRecoilState } from "recoil";

export default function ChatPeopleList() {
  const [selectedIndex, setSelectedIndex] = useRecoilState(selectedIndexState);


  return (
    <div className="h-screen min-w-60 flex flex-col bg-gray-50">
      <Person
        onClick={() => { setSelectedIndex(0) }}
        index={0}
        userId="1"
        name="John Doe"
        onlineAt={new Date().toISOString()}
        isActive={selectedIndex === 0}
        onChatScreen={false}
      />
      <Person
        onClick={() => setSelectedIndex(1)}
        index={1}
        userId="2"
        name="Jane Smith"
        onlineAt={new Date().toISOString()}
        isActive={selectedIndex === 1}
        onChatScreen={false}
      />
    </div>
  )
}