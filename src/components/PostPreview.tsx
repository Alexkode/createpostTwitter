interface PostPreviewProps {
  text: string;
  media: string[];
  threadPosts?: Array<{ text: string; media: string[] }>;
}

const PostPreview = ({ text, media, threadPosts = [] }: PostPreviewProps) => {
  const renderPost = (postText: string, postMedia: string[], isReply?: boolean) => (
    <div className={`${isReply ? 'mt-4 pl-4 border-l-2 border-gray-200' : ''}`}>
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-full bg-gray-200" />
        <div>
          <div className="font-medium">User Name</div>
          <div className="text-sm text-gray-500">@username</div>
        </div>
      </div>
      <p className="text-gray-800 mb-3">{postText || "Your post preview will appear here"}</p>
      {postMedia.length > 0 && (
        <div className="grid grid-cols-2 gap-2">
          {postMedia.map((url, index) => (
            <img key={index} src={url} alt="" className="rounded-lg w-full h-48 object-cover" />
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div>
      <h2 className="text-sm font-medium text-gray-700 mb-3">Twitter / X Preview</h2>
      <div className="border border-gray-200 rounded-lg p-4">
        {renderPost(text, media)}
        {threadPosts.map((post, index) => (
          renderPost(post.text, post.media, true)
        ))}
      </div>
    </div>
  );
};

export default PostPreview;