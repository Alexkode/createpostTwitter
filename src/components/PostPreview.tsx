interface PostPreviewProps {
  text: string;
  media: string[];
}

const PostPreview = ({ text, media }: PostPreviewProps) => {
  return (
    <div>
      <h2 className="text-sm font-medium text-gray-700 mb-3">Twitter / X Preview</h2>
      <div className="border border-gray-200 rounded-lg p-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-full bg-gray-200" />
          <div>
            <div className="font-medium">User Name</div>
            <div className="text-sm text-gray-500">@username</div>
          </div>
        </div>
        <p className="text-gray-800 mb-3">{text || "Your post preview will appear here"}</p>
        {media.length > 0 && (
          <div className="grid grid-cols-2 gap-2">
            {media.map((url, index) => (
              <img key={index} src={url} alt="" className="rounded-lg w-full h-48 object-cover" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostPreview;