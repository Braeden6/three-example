"use client"
import { ModelViewer } from "@/components/threeLoader";
import { useState } from "react";
export default function Home() {
  const [showMoon, setShowMoon] = useState(true)
  return (
    <main className="fixed top-0 left-0 right-0">
      <ModelViewer showMoon={showMoon} />

      <button className="absolute top-0 right-0" onClick={() => setShowMoon(!showMoon)}>
        {showMoon ? "Hide Moon" : "Show Moon"}
      </button>
    </main>
  );
}
