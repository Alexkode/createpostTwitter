interface PostTextAreaProps {
  value: string;
  onChange: (value: string) => void;
}

const PostTextArea = ({ value, onChange }: PostTextAreaProps) => {
  return (
    <div className="mb-4">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Start writing or use the AI Assistant"
        className="w-full min-h-[120px] p-3 border-0 focus:ring-0 resize-none text-gray-800 placeholder-gray-400 bg-transparent"
        maxLength={280}
      />
    </div>
  );
};

export default PostTextArea;