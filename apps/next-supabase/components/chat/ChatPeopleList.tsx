"use client";


import { selectedUserIdState, selectedUserIndexState } from "@/utils/recoil/atoms";
import Person from "./Person";
import { useRecoilState } from "recoil";
import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "@/actions/chatActions";

export default function ChatPeopleList({ loggedInUser }: { loggedInUser: any }) {
  const [selectedUserId, setSelectedUserId] = useRecoilState(selectedUserIdState);
  const [selectedUserIndex, setSelectedUserIndex] = useRecoilState(selectedUserIndexState);

  // getAllUsers
  const getAllUsersQuery = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const allUsers = await getAllUsers();
      return allUsers.filter((user) => user.id !== loggedInUser?.id);
    }
  })


  return (
    <div className="h-screen min-w-60 flex flex-col bg-gray-50">
      {getAllUsersQuery.data?.map((user, index) => (
        <Person
          onClick={() => {
            setSelectedUserId(user.id);
            setSelectedUserIndex(index);
          }}
          index={index}
          userId={user.id}
          name={user?.email ? user.email.split("@")[0] : ""}
          onlineAt={new Date().toISOString()}
          isActive={selectedUserId === user.id}
          onChatScreen={false}
          key={index}
        />
      ))}
      {/* <Person
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
      /> */}
    </div>
  )
}