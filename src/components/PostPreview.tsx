import { useIsMobile } from "@/hooks/use-mobile";
import { ScrollArea } from "@/components/ui/scroll-area";

interface PostPreviewProps {
  text: string;
  media: string[];
  threadPosts?: Array<{ text: string; media: string[] }>;
  isDialog?: boolean;
}

const PostPreview = ({ text, media, threadPosts = [], isDialog = false }: PostPreviewProps) => {
  const isMobile = useIsMobile();

  const renderPost = (postText: string, postMedia: string[], isReply?: boolean) => (
    <div className={`${isReply ? 'mt-4 pl-4 border-l-2 border-gray-200' : ''}`}>
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-full bg-gray-200" />
        <div>
          <div className="font-medium">User Name</div>
          <div className="text-sm text-gray-500">@username</div>
        </div>
      </div>
      <p className="text-gray-800 mb-3 whitespace-pre-wrap" style={{ 
        overflowWrap: 'break-word',
        wordBreak: 'break-word'
      }}>
        {postText || "Your post preview will appear here"}
      </p>
      {postMedia.length > 0 && (
        <div className={`grid grid-cols-2 gap-2 ${isDialog ? 'max-h-[300px]' : ''}`}>
          {postMedia.map((url, index) => (
            <img 
              key={index} 
              src={url} 
              alt="" 
              className={`rounded-lg w-full object-cover ${isDialog ? 'h-[150px]' : isMobile ? 'h-32' : 'h-48'}`}
            />
          ))}
        </div>
      )}
    </div>
  );

  const content = (
    <>
      {!isDialog && <h2 className="text-sm font-medium text-gray-700 mb-3">Twitter / X Preview</h2>}
      <div className={`border border-gray-200 rounded-lg p-4 ${isDialog ? 'border-0 p-2' : ''}`}>
        {renderPost(text, media)}
        {threadPosts.map((post, index) => (
          renderPost(post.text, post.media, true)
        ))}
      </div>
    </>
  );

  return (
    <div className={`${isMobile ? 'w-full' : ''} h-[calc(100vh-8rem)]`}>
      {isDialog ? (
        <ScrollArea className="h-[80vh]">
          {content}
        </ScrollArea>
      ) : (
        <ScrollArea className="h-full">
          {content}
        </ScrollArea>
      )}
    </div>
  );
};

export default PostPreview;