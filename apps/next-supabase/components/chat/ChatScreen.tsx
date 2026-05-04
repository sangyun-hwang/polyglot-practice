"use client";

import { useRecoilValue } from "recoil";
import Message from "./Message";
import Person from "./Person";
import { selectedUserIdState, selectedUserIndexState } from "@/utils/recoil/atoms";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getAllMessages, getUserById, sendMessage } from "@/actions/chatActions";
import { useEffect, useState } from "react";
import { createBrowserSupabaseClient } from "@/utils/supabase/client";


const dummyMessages = [
  { id: 1, text: "안녕하세요.", isFromMe: true },
  { id: 1, text: "안녕하세요.", isFromMe: true },
  { id: 2, text: "반갑습니다.", isFromMe: false },
  { id: 2, text: "반갑습니다.", isFromMe: false },
  { id: 1, text: "안녕하세요.", isFromMe: true },
  { id: 2, text: "반갑습니다.", isFromMe: false },
];

export default function ChatScreen() {
  const selectedUserId = useRecoilValue(selectedUserIdState);
  const selectedUserIndex = useRecoilValue(selectedUserIndexState);
  const [message, setMessage] = useState("");
  const supabase = createBrowserSupabaseClient();


  const selectedUserQuery = useQuery({
    queryKey: ["user", selectedUserId],
    queryFn: () => getUserById(selectedUserId), // getUserById는 실제 API 호출 함수로 대체해야 합니다.
  })

  const sendMessageMutation = useMutation({
    mutationFn: async () => {
      return sendMessage({
        message,
        chatUserId: selectedUserId
      })
    },
    onSuccess: () => {
      setMessage("");
      getAllMessagesQuery.refetch();
    }
  })

  const getAllMessagesQuery = useQuery({
    queryKey: ["messages", selectedUserId],
    queryFn: () => getAllMessages({ chatUserId: selectedUserId }),
  })

  useEffect(() => {
    const channel = supabase.channel("message_postgres_changes").on("postgres_changes", {
      event: "INSERT",
      schema: "public",
      table: "message"
    },
      payload => {
        if (payload.eventType === "INSERT" && !payload.errors && !!payload.new) {
          getAllMessagesQuery.refetch();
        }
      }
    ).subscribe();

    return () => {
      channel.unsubscribe();
    }
  }, [])


  return selectedUserQuery.data !== null ? <div className="w-full h-screen flex flex-col">
    {/* Active 유저 영역 */}
    <Person
      index={selectedUserIndex}
      isActive={false}
      name={selectedUserQuery.data?.email?.split("@")[0]}
      onChatScreen={true}
      onlineAt={new Date().toISOString()}
      userId={selectedUserQuery.data?.id}
    />

    {/* 채팅 영역 */}
    <div className="w-full overflow-y-scroll flex-1 flex flex-col p-4 gap-3">
      {getAllMessagesQuery.data?.map((message) => (
        <Message
          message={message.message}
          isFromMe={message.receiver === selectedUserId}
          key={message.id}
        />
      ))}
    </div>

    {/* 채팅창 영역 */}
    <div className="flex">
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="p-3 w-full border-2 border-light-blue-600"
        type="text"
        placeholder="메시지를 입력하세요"
      />

      <button
        onClick={() => sendMessageMutation.mutate()}
        className="min-w-20 p-3 bg-light-blue-600 text-white"
      >
        {sendMessageMutation.isPending ? <></> : <span>전송</span>}
      </button>

    </div>
  </div> : <div className="w-full"></div>
}