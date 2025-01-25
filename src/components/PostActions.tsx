import { Button } from "@/components/ui/button";
import { Image, Smile, Hash, Bot } from "lucide-react";

const PostActions = () => {
  return (
    <div className="flex items-center gap-2 mt-2">
      <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700">
        <Image className="h-5 w-5" />
      </Button>
      <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700">
        <Smile className="h-5 w-5" />
      </Button>
      <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700">
        <Hash className="h-5 w-5" />
      </Button>
      <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700">
        <Bot className="h-5 w-5" />
      </Button>
      <span className="text-sm text-gray-400 ml-2">280</span>
    </div>
  );
};

export default PostActions;