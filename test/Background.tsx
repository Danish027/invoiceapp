"use client";

import { useSelectedLayoutSegment } from "next/navigation";
// import "./background.module.css";

export default function Background() {
  const segment = useSelectedLayoutSegment();

  return (
    <div className={"main"}>
      <div className={"content"} />
    </div>
  );
}
