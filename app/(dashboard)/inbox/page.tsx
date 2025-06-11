'use client';

import ChatSidebar from '@/components/chat/ChatSidebar';
import ChatHeader from '@/components/chat/ChatHeader';
import ChatInputBox from '@/components/chat/ChatInputBox';
import ChatMessageBubble from '@/components/chat/ChatMessageBubble';

export default function ChatPage() {
  return (
    <div className="flex h-[calc(100vh-57px)] overflow-hidden border-orange-700">

      <div className="w-1/3 bg-black border-r border-gray-700 text-white">
        <ChatSidebar />
      </div>

      <div className="flex-1 flex flex-col bg-[#0f0f0f] text-white">
        <ChatHeader />

        <div className="flex-1 overflow-y-auto px-6 py-4">
          <div className="space-y-4">
          <ChatMessageBubble type="incoming" text="Yes sure send me the calendly link..." time="6:00am Today" />
          <ChatMessageBubble type="outgoing" text="yes sure..please schedule..." time="6:02am Today" />
          <ChatMessageBubble type="outgoing" text="Ok." time="6:03am Today" />
          </div>
        </div>

        <ChatInputBox />
      </div>
    </div>
  );
}
