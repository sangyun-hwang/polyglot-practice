"use client"

import { useState } from "react"
import SignUp from "./signup"

export default function Auth() {
  const [view, setView] = useState<"SIGNUP" | "LOGIN">("SIGNUP")

  return <main>{view === "SIGNUP" ? <SignUp setView={setView} /> : <></>}</main>
}