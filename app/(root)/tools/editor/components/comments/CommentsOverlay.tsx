"use client";

import { useThreads } from "@/app/(root)/tools/editor/liveblocks.config";
import { Composer, Thread } from "@liveblocks/react-comments";

import "@liveblocks/react-comments/styles.css";

export function CommentsOverlay() {
  const { threads } = useThreads();

  return (
    <div>
      {threads.map((thread) => (
        <Thread key={thread.id} thread={thread} />
      ))}
      {/* <Composer /> */}
    </div>
  );
}
