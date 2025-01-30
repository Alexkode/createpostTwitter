interface PostTextAreaProps {
  value: string;
  onChange: (value: string) => void;
}

const PostTextArea = ({ value, onChange }: PostTextAreaProps) => {
  const characterCount = value.length;
  const maxCharacters = 280;

  return (
    <div className="mb-4">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Start writing or use the AI Assistant"
        className="w-full min-h-[120px] p-3 border-0 focus:ring-0 resize-none text-gray-800 placeholder-gray-400 bg-transparent whitespace-pre-wrap"
        maxLength={maxCharacters}
        style={{ 
          overflowWrap: 'break-word',
          wordBreak: 'break-word'
        }}
      />
      <div className="flex justify-end mt-2">
        <span className={`text-sm ${characterCount > maxCharacters - 20 ? 'text-orange-500' : 'text-gray-500'}`}>
          {characterCount}/{maxCharacters}
        </span>
      </div>
    </div>
  );
};

export default PostTextArea;