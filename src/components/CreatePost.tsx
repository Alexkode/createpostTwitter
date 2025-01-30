import { useState } from "react";
import PostTextArea from "./PostTextArea";
import PostActions from "./PostActions";
import MediaUpload from "./MediaUpload";
import PostPreview from "./PostPreview";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import { format } from "date-fns";
import { useIsMobile } from "@/hooks/use-mobile";

interface ThreadPost {
  id: string;
  text: string;
  media: string[];
  isCollapsed?: boolean;
}

interface TwitterAccount {
  id: string;
  handle: string;
}

// Mock data for Twitter accounts
const twitterAccounts: TwitterAccount[] = [
  { id: "1", handle: "@primary_account" },
  { id: "2", handle: "@secondary_account" },
];

const CreatePost = () => {
  const isMobile = useIsMobile();
  const [text, setText] = useState("");
  const [media, setMedia] = useState<string[]>([]);
  const [isThreadMode, setIsThreadMode] = useState(false);
  const [threadPosts, setThreadPosts] = useState<ThreadPost[]>([]);
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("12:00");
  const [selectedTwitterAccounts, setSelectedTwitterAccounts] = useState<string[]>([]);
  const [expandedPostId, setExpandedPostId] = useState<string | null>("main");

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

  const handleCancel = () => {
    setText("");
    setMedia([]);
    setDate(undefined);
    setTime("12:00");
    setSelectedTwitterAccounts([]);
  };

  const handleSchedule = () => {
    console.log("Scheduling post for:", date, time);
    console.log("Selected Twitter accounts:", selectedTwitterAccounts);
  };

  return (
    <div className={`flex ${isMobile ? 'flex-col' : 'gap-8'}`}>
      <div className={`flex-1 bg-white rounded-lg shadow-sm border border-gray-200 ${isMobile ? 'mb-4' : ''}`}>
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-semibold text-gray-800">Create Post</h1>
          </div>
          
          {!isThreadMode ? (
            <>
              <PostTextArea value={text} onChange={setText} />
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <MediaUpload onUpload={(url) => setMedia([...media, url])} />
                  {media.length > 0 && (
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      {media.map((url, index) => (
                        <img key={index} src={url} alt="" className="rounded-lg w-full h-48 object-cover" />
                      ))}
                    </div>
                  )}
                </div>
                <Button
                  variant="outline"
                  onClick={handleStartThread}
                  className="mt-2"
                >
                  Start Thread
                </Button>
              </div>
            </>
          ) : (
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
          )}
          <PostActions />
        </div>
        
        <div className="border-t border-gray-200 p-4">
          <div className="flex flex-col gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Twitter Accounts</label>
              {twitterAccounts.map((account) => (
                <div key={account.id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={account.id}
                    checked={selectedTwitterAccounts.includes(account.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedTwitterAccounts([...selectedTwitterAccounts, account.id]);
                      } else {
                        setSelectedTwitterAccounts(selectedTwitterAccounts.filter(id => id !== account.id));
                      }
                    }}
                    className="rounded border-gray-300"
                  />
                  <label htmlFor={account.id} className="text-sm text-gray-600">
                    {account.handle}
                  </label>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
                    {date ? format(date, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="px-3 py-2 border rounded-md"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <Button variant="ghost" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleSchedule}>
              Schedule Post
            </Button>
          </div>
        </div>
      </div>

      <div className={`${isMobile ? 'w-full' : 'w-[350px]'} bg-white rounded-lg shadow-sm border border-gray-200 p-4 ${isMobile ? '' : 'h-fit sticky top-4'}`}>
        <Dialog>
          <DialogTrigger asChild>
            <div className="cursor-pointer">
              <PostPreview 
                text={isThreadMode ? threadPosts[0]?.text : text} 
                media={isThreadMode ? threadPosts[0]?.media : media}
                threadPosts={isThreadMode ? threadPosts.slice(1) : []}
              />
            </div>
          </DialogTrigger>
          <DialogContent className={`${isMobile ? 'w-[95vw] max-w-[95vw]' : 'sm:max-w-[425px]'}`}>
            <PostPreview 
              text={isThreadMode ? threadPosts[0]?.text : text} 
              media={isThreadMode ? threadPosts[0]?.media : media}
              threadPosts={isThreadMode ? threadPosts.slice(1) : []}
              isDialog
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default CreatePost;
