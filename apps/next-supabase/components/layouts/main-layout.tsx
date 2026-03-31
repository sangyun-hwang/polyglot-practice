import SiderBar from "../sidebar";

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="">
      <SiderBar />
      {children}
    </main>
  )
}