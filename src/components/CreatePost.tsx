import { useState } from "react";
import PostTextArea from "./PostTextArea";
import PostActions from "./PostActions";
import MediaUpload from "./MediaUpload";
import PostPreview from "./PostPreview";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Plus, X } from "lucide-react";
import { format } from "date-fns";

interface ThreadPost {
  id: string;
  text: string;
  media: string[];
}

const CreatePost = () => {
  const [text, setText] = useState("");
  const [media, setMedia] = useState<string[]>([]);
  const [isThreadMode, setIsThreadMode] = useState(false);
  const [threadPosts, setThreadPosts] = useState<ThreadPost[]>([]);
  const [date, setDate] = useState<Date>();

  const handleStartThread = () => {
    if (!isThreadMode) {
      setIsThreadMode(true);
      setThreadPosts([
        {
          id: "main",
          text: text,
          media: media,
        },
        {
          id: Date.now().toString(),
          text: "",
          media: [],
        },
      ]);
    } else {
      setThreadPosts([
        ...threadPosts,
        {
          id: Date.now().toString(),
          text: "",
          media: [],
        },
      ]);
    }
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
    <div className="flex gap-8">
      <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-semibold text-gray-800">Create Post</h1>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleStartThread}
              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
            >
              {!isThreadMode ? (
                <>
                  <Plus className="h-4 w-4 mr-1" />
                  Start Thread
                </>
              ) : (
                <Plus className="h-4 w-4" />
              )}
            </Button>
          </div>
          
          {!isThreadMode ? (
            <>
              <PostTextArea value={text} onChange={setText} />
              <MediaUpload onUpload={(url) => setMedia([...media, url])} />
              {media.length > 0 && (
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {media.map((url, index) => (
                    <img key={index} src={url} alt="" className="rounded-lg w-full h-48 object-cover" />
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="space-y-4">
              {threadPosts.map((post, index) => (
                <div key={post.id} className="relative">
                  {index > 0 && (
                    <div className="absolute -left-4 top-0 bottom-0 w-0.5 bg-gray-200" />
                  )}
                  <div className="pl-8 relative">
                    {index > 0 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute -right-2 -top-2 text-gray-400 hover:text-gray-600"
                        onClick={() => removeThreadPost(post.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                    <PostTextArea
                      value={post.text}
                      onChange={(newText) => updateThreadPost(post.id, newText)}
                    />
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
                  </div>
                </div>
              ))}
            </div>
          )}
          <PostActions />
        </div>
        
        <div className="border-t border-gray-200 p-4 flex items-center justify-end">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">
              {isThreadMode 
                ? threadPosts[threadPosts.length - 1]?.text.length 
                : text.length}/280
            </span>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">
                  {date ? format(date, "PPP") : "Schedule Post"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>

      <div className="w-[350px] bg-white rounded-lg shadow-sm border border-gray-200 p-4 h-fit sticky top-4">
        <PostPreview 
          text={isThreadMode ? threadPosts[0]?.text : text} 
          media={isThreadMode ? threadPosts[0]?.media : media}
          threadPosts={isThreadMode ? threadPosts.slice(1) : []}
        />
      </div>
    </div>
  );
};

export default CreatePost;