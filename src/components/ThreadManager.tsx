import { useState } from "react";
import PostTextArea from "./PostTextArea";
import MediaUpload from "./MediaUpload";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, X } from "lucide-react";

interface ThreadPost {
  id: string;
  text: string;
  media: string[];
  isCollapsed?: boolean;
}

interface ThreadManagerProps {
  threadPosts: ThreadPost[];
  setThreadPosts: (posts: ThreadPost[]) => void;
  expandedPostId: string | null;
  setExpandedPostId: (id: string | null) => void;
  isThreadMode: boolean;
  setIsThreadMode: (value: boolean) => void;
  text: string;
  media: string[];
}

const ThreadManager = ({
  threadPosts,
  setThreadPosts,
  expandedPostId,
  setExpandedPostId,
  isThreadMode,
  setIsThreadMode,
  text,
  media
}: ThreadManagerProps) => {
  const handleStartThread = () => {
    if (!isThreadMode) {
      setIsThreadMode(true);
      const newPostId = Date.now().toString();
      setThreadPosts([
        {
          id: "main",
          text: text,
          media: media,
          isCollapsed: false
        },
        {
          id: newPostId,
          text: "",
          media: [],
          isCollapsed: false
        },
      ]);
      setExpandedPostId(newPostId);
    } else {
      const newPostId = Date.now().toString();
      setThreadPosts([
        ...threadPosts,
        {
          id: newPostId,
          text: "",
          media: [],
          isCollapsed: false
        },
      ]);
      setExpandedPostId(newPostId);
    }
  };

  const togglePostCollapse = (id: string) => {
    setExpandedPostId(expandedPostId === id ? null : id);
  };

  const removeThreadPost = (id: string) => {
    setThreadPosts(threadPosts.filter(post => post.id !== id));
    if (threadPosts.length <= 2) {
      setIsThreadMode(false);
      setThreadPosts([]);
    }
  };

  const updateThreadPost = (id: string, newText: string) => {
    setThreadPosts(
      threadPosts.map(post =>
        post.id === id ? { ...post, text: newText } : post
      )
    );
  };

  return (
    <div className="space-y-4">
      {threadPosts.map((post, index) => (
        <div key={post.id} className="relative">
          {index > 0 && (
            <div 
              className="absolute -left-4 top-0 bottom-0 w-1 bg-blue-200 hover:bg-blue-300 cursor-pointer transition-colors"
              onClick={() => togglePostCollapse(post.id)}
            />
          )}
          <div className="pl-8 relative">
            <div 
              className="flex justify-between items-center mb-2 p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
              onClick={() => togglePostCollapse(post.id)}
            >
              <div className="flex items-center gap-2 text-gray-600">
                {expandedPostId === post.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                <span className="text-sm font-medium">Tweet {index + 1}</span>
              </div>
              {index > 0 && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-400 hover:text-gray-600"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeThreadPost(post.id);
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            {expandedPostId === post.id && (
              <>
                <PostTextArea
                  value={post.text}
                  onChange={(newText) => updateThreadPost(post.id, newText)}
                />
                <div className="space-y-4">
                  <MediaUpload
                    onUpload={(url) =>
                      setThreadPosts(
                        threadPosts.map(p =>
                          p.id === post.id
                            ? { ...p, media: [...p.media, url] }
                            : p
                        )
                      )
                    }
                  />
                  {post.media.length > 0 && (
                    <div className="grid grid-cols-2 gap-2">
                      {post.media.map((url, mediaIndex) => (
                        <img 
                          key={mediaIndex} 
                          src={url} 
                          alt="" 
                          className="rounded-lg w-full h-48 object-cover"
                        />
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      ))}
      <Button
        variant="outline"
        onClick={handleStartThread}
        className="ml-8"
      >
        Add Tweet
      </Button>
    </div>
  );
};

export default ThreadManager;