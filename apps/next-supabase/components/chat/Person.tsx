"use client";

import { getRandomImage } from "@/utils/random";

interface PersonProps {
  index: number;
  userId: string;
  name: string;
  onlineAt: string;
  isActive: boolean;
  onChatScreen: boolean;
}

export default function Person({
  index,
  userId,
  name,
  onlineAt,
  isActive,
  onChatScreen
}: PersonProps) {
  return <div className={`flex gap-4 items-center p-4 
    ${!onChatScreen && isActive && "bg-light-blue-50"} 
    ${!onChatScreen && !isActive && "bg-gray-50"} 
    ${onChatScreen && "bg-gray-50"} 
    `}>
    <img
      src={getRandomImage(index)}
      alt={name}
      className="w-10 h-10 rounded-full"
    />
    <div>
      <p className="text-black font-bold text-lg">{name}</p>
      <p className="text-gray-500 text-sm">{onlineAt}</p>
    </div>
  </div >
}