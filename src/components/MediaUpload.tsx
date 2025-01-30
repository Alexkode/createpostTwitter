import { ImageIcon } from "lucide-react";
import { useRef } from "react";

interface MediaUploadProps {
  onUpload: (url: string) => void;
}

const MediaUpload = ({ onUpload }: MediaUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Simulate file upload by creating a URL
      // In a real app, you would upload to a server
      const url = URL.createObjectURL(file);
      onUpload(url);
    }
  };

  return (
    <div 
      onClick={handleClick}
      className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50 transition-colors"
    >
      <div className="flex flex-col items-center gap-2">
        <ImageIcon className="h-8 w-8 text-gray-400" />
        <div className="text-sm text-gray-600">
          Click to add media
        </div>
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
};

export default MediaUpload;