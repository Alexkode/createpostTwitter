import { useState } from "react";
import PostTextArea from "./PostTextArea";
import PostActions from "./PostActions";
import MediaUpload from "./MediaUpload";
import PostPreview from "./PostPreview";
import TagInput from "./TagInput";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Plus } from "lucide-react";

const CreatePost = () => {
  const [text, setText] = useState("");
  const [media, setMedia] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [isThreadMode, setIsThreadMode] = useState(false);

  const handleStartThread = () => {
    setIsThreadMode(true);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-semibold text-gray-800">Create Post</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setTags([])}>
              Add Tags
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleStartThread}
              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
            >
              <Plus className="h-4 w-4 mr-1" />
              Start Thread
            </Button>
          </div>
        </div>
        
        <TagInput onTagsChange={setTags} />
        <PostTextArea value={text} onChange={setText} />
        <MediaUpload onUpload={(url) => setMedia([...media, url])} />
        {media.length > 0 && (
          <div className="mt-4 grid grid-cols-2 gap-2">
            {media.map((url, index) => (
              <img key={index} src={url} alt="" className="rounded-lg w-full h-48 object-cover" />
            ))}
          </div>
        )}
        <PostActions />
      </div>
      
      <div className="border-t border-gray-200 p-4 flex items-center justify-between">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Save as Draft
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Schedule Draft</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">{280 - text.length}</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>
                Add to Queue
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Share Now</DropdownMenuItem>
              <DropdownMenuItem>Share Next</DropdownMenuItem>
              <DropdownMenuItem>Schedule Post</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="border-t border-gray-200 p-4">
        <PostPreview text={text} media={media} />
      </div>
    </div>
  );
};

export default CreatePost;