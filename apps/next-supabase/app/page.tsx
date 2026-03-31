import LogoutButton from "@/components/logout-button";

export const metadata = {
  title: "Clonegram",
  description: "Instagram clone project",
};

export default function Home() {
  return <main className="w-full h-screen flex items-center justify-center flex-col gap-2">
    <h1 className="text-3xl font-bold">
      Welcome {"lopun.jh"}
    </h1>
    <LogoutButton />
  </main>;
}