import CursorSVG from "@/public/assets/CursorSVG";
import { CursorChatProps, CursorMode } from "@/types/type";
import React from "react";

const CursorChat = ({
  cursor,
  cursorState,
  setCursorState,
  updateMyPresence,
}: CursorChatProps) => {
  return (
    <div
      className="absolute top-0 left-0"
      style={{
        transform: `translateX(${cursor.x}px) translateY(${cursor.y}px)`,
      }}
    >
      {cursorState.mode === CursorMode.Chat && (
        <>
          <CursorSVG color="#000" />
          <div className="absolute left-2 top-5 leading-relaxed text-sm px-4 py-2 bg-blue-500 text-white rounded-sm">
            {cursorState.previousMessage && (
              <div>{cursorState.previousMessage}</div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CursorChat;
