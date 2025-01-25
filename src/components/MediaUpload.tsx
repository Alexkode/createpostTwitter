import { Button } from "@/components/ui/button";
import { ImageIcon } from "lucide-react";

interface MediaUploadProps {
  onUpload: (url: string) => void;
}

const MediaUpload = ({ onUpload }: MediaUploadProps) => {
  return (
    <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
      <div className="flex flex-col items-center gap-2">
        <ImageIcon className="h-8 w-8 text-gray-400" />
        <div className="text-sm text-gray-600">
          Drag & drop or{" "}
          <button className="text-blue-500 hover:text-blue-600">select a file</button>
        </div>
      </div>
    </div>
  );
};

export default MediaUpload;