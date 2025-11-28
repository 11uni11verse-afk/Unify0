import { cn } from "@/lib/utils";

interface Message {
  id: string;
  sender: string;
  country: string;
  flag: string;
  message: string;
  time: string;
  isSent: boolean;
}

interface ChatPreviewProps {
  messages?: Message[];
  className?: string;
  showTyping?: boolean;
}

const defaultMessages: Message[] = [
  {
    id: "1",
    sender: "Priya",
    country: "India",
    flag: "🇮🇳",
    message: "Hey! Just landed in Toronto. The campus is amazing!",
    time: "10:23 AM",
    isSent: false,
  },
  {
    id: "2",
    sender: "You",
    country: "India",
    flag: "🇮🇳",
    message: "That's awesome! How was the flight?",
    time: "10:25 AM",
    isSent: true,
  },
  {
    id: "3",
    sender: "Priya",
    country: "India",
    flag: "🇮🇳",
    message: "Long but good! Met another Indian student on the plane 😊",
    time: "10:26 AM",
    isSent: false,
  },
  {
    id: "4",
    sender: "You",
    country: "India",
    flag: "🇮🇳",
    message: "Nice! Did you find your accommodation easily?",
    time: "10:27 AM",
    isSent: true,
  },
];

const ChatPreview = ({ messages = defaultMessages, className, showTyping = true }: ChatPreviewProps) => {
  return (
    <div className={cn("flex flex-col h-full bg-background", className)}>
      {/* Chat Header */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-4 py-3 flex items-center gap-3 shadow-md">
        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-xl">
          {messages[0]?.flag || "🌍"}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-sm">{messages[0]?.sender || "Student"}</h3>
          <p className="text-xs text-white/80">Online</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-neutral-50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn(
              "flex gap-2 items-end",
              msg.isSent ? "flex-row-reverse" : "flex-row"
            )}
          >
            {!msg.isSent && (
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-xs flex-shrink-0">
                {msg.flag}
              </div>
            )}
            <div
              className={cn(
                "max-w-[75%] rounded-2xl px-4 py-2 shadow-sm",
                msg.isSent
                  ? "bg-gradient-to-br from-primary-500 to-primary-600 text-white rounded-br-sm"
                  : "bg-white text-neutral-800 rounded-bl-sm"
              )}
            >
              <p className="text-sm leading-relaxed">{msg.message}</p>
              <p
                className={cn(
                  "text-xs mt-1",
                  msg.isSent ? "text-white/70" : "text-neutral-500"
                )}
              >
                {msg.time}
              </p>
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {showTyping && (
          <div className="flex gap-2 items-end">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-secondary-400 to-secondary-600 flex items-center justify-center text-xs flex-shrink-0">
              🇨🇦
            </div>
            <div className="bg-white rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-neutral-400 rounded-full animate-typing-dot" style={{ animationDelay: "0s" }}></div>
                <div className="w-2 h-2 bg-neutral-400 rounded-full animate-typing-dot" style={{ animationDelay: "0.15s" }}></div>
                <div className="w-2 h-2 bg-neutral-400 rounded-full animate-typing-dot" style={{ animationDelay: "0.3s" }}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input area */}
      <div className="bg-white border-t border-neutral-200 px-4 py-3 flex items-center gap-2">
        <div className="flex-1 bg-neutral-100 rounded-full px-4 py-2">
          <p className="text-sm text-neutral-400">Type a message...</p>
        </div>
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white shadow-md">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ChatPreview;