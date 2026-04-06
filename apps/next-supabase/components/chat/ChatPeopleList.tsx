import Person from "./Person";

export default function ChatPeopleList() {
  return <div className="h-screen min-w-60 flex flex-col bg-gray-50">
    <Person
      index={0}
      userId="1"
      name="John Doe"
      onlineAt={new Date().toISOString()}
      isActive={true}
      onChatScreen={false}
    />
    <Person
      index={1}
      userId="2"
      name="Jane Smith"
      onlineAt={new Date().toISOString()}
      isActive={false}
      onChatScreen={false}
    />
  </div>
}