import React from "react";
import generateId from "./utils";

const CommentCard = ({ item, level }) => {
  const [isReplying, setIsReplying] = React.useState(false);
  const [replyText, setReplyText] = React.useState("");
  const [replies, setReplies] = React.useState(item.replies);

  return (
    <div className="flex flex-col gap-2">
      <div
        className="bg-white p-3 rounded-xl shadow-md border-l-4 border-blue-500 flex justify-between items-start"
        style={{
          marginLeft: `${level * 20}px`,
          maxWidth: `calc(100% - ${level * 20}px)`,
        }}
      >
        <p className="text-gray-800 text-sm sm:text-base">{item.comment}</p>
        <button
          className="ml-2 text-blue-600 hover:text-blue-800 font-medium text-xs sm:text-sm"
          onClick={() => setIsReplying(!isReplying)}
        >
          Reply
        </button>
      </div>

      {isReplying && (
        <div
          className="flex flex-col sm:flex-row gap-2 items-start sm:items-center mt-1"
          style={{ marginLeft: `${(level + 1) * 20}px` }}
        >
          <input
            type="text"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Write a reply..."
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div className="flex gap-2 mt-2 sm:mt-0">
            <button
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded-lg font-medium"
              onClick={() => {
                setIsReplying(false);
                setReplyText("");
              }}
            >
              Cancel
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg font-medium"
              onClick={() => {
                if (!replyText.trim()) return;
                setIsReplying(false);
                setReplyText("");
                setReplies((prev) => [
                  ...prev,
                  { id: generateId(), comment: replyText, replies: [] },
                ]);
              }}
            >
              Submit
            </button>
          </div>
        </div>
      )}

      {replies.length > 0 && (
        <div className="flex flex-col gap-2 mt-1">
          {replies.map((reply, index) => (
            <CommentCard key={index} item={reply} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentCard;
