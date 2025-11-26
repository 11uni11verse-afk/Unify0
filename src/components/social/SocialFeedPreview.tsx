import { cn } from "@/lib/utils";
import { Heart, MessageCircle, Share2 } from "lucide-react";

interface Post {
  id: string;
  author: string;
  country: string;
  flag: string;
  avatar: string;
  timestamp: string;
  content: string;
  likes: number;
  comments: number;
}

interface SocialFeedPreviewProps {
  posts?: Post[];
  className?: string;
}

const defaultPosts: Post[] = [
  {
    id: "1",
    author: "Maria Garcia",
    country: "Spain",
    flag: "🇪🇸",
    avatar: "https://i.pravatar.cc/100?u=maria",
    timestamp: "2 hours ago",
    content: "Looking for a roommate near University of Toronto! Moving in September. DM me if interested! 🏠",
    likes: 24,
    comments: 8,
  },
  {
    id: "2",
    author: "Raj Patel",
    country: "India",
    flag: "🇮🇳",
    avatar: "https://i.pravatar.cc/100?u=raj",
    timestamp: "5 hours ago",
    content: "Just got my Canada study permit approved! 🎉 Happy to answer any questions about the process.",
    likes: 156,
    comments: 23,
  },
  {
    id: "3",
    author: "Li Wei",
    country: "China",
    flag: "🇨🇳",
    avatar: "https://i.pravatar.cc/100?u=liwei",
    timestamp: "1 day ago",
    content: "Anyone else starting at UBC in Fall 2024? Let's connect before orientation! 👋",
    likes: 89,
    comments: 34,
  },
];

const SocialFeedPreview = ({ posts = defaultPosts, className }: SocialFeedPreviewProps) => {
  return (
    <div className={cn("space-y-4 bg-neutral-50 p-4", className)}>
      {posts.map((post) => (
        <div
          key={post.id}
          className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden hover:shadow-md transition-shadow"
        >
          {/* Post Header */}
          <div className="p-4 flex items-center gap-3">
            <div className="relative">
              <img
                src={post.avatar}
                alt={`${post.author} avatar`}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-primary-100"
              />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center text-xs shadow-sm">
                {post.flag}
              </div>
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-sm text-neutral-900">{post.author}</h4>
              <p className="text-xs text-neutral-500">{post.timestamp}</p>
            </div>
          </div>

          {/* Post Content */}
          <div className="px-4 pb-3">
            <p className="text-sm text-neutral-700 leading-relaxed">{post.content}</p>
          </div>

          {/* Post Actions */}
          <div className="px-4 py-3 border-t border-neutral-100 flex items-center gap-6">
            <button className="flex items-center gap-2 text-neutral-600 hover:text-primary-600 transition-colors group">
              <Heart size={18} className="group-hover:fill-primary-600 transition-all" />
              <span className="text-sm font-medium">{post.likes}</span>
            </button>
            <button className="flex items-center gap-2 text-neutral-600 hover:text-primary-600 transition-colors">
              <MessageCircle size={18} />
              <span className="text-sm font-medium">{post.comments}</span>
            </button>
            <button className="flex items-center gap-2 text-neutral-600 hover:text-primary-600 transition-colors ml-auto">
              <Share2 size={18} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SocialFeedPreview;