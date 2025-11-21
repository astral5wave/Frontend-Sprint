import React from "react";
import comments from "./comments.js";
import generateId from "./utils.js";
import CommentCard from "./CommentCard.jsx";

const Index = () => {
  const [comment, setComment] = React.useState(comments);
  const [textComment, setTextComment] = React.useState("");

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Top-level Comment Input */}
        <div className="flex flex-col gap-3">
          <textarea
            className="w-full border border-gray-300 rounded-xl px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
            rows={3}
            value={textComment}
            onChange={(e) => setTextComment(e.target.value)}
            placeholder="Write a comment..."
          />
          <button
            className="self-end bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-xl font-medium transition-all duration-150"
            onClick={() => {
              if (!textComment.trim()) return;
              setComment((prev) => [
                ...prev,
                { id: generateId(), comment: textComment, replies: [] },
              ]);
              setTextComment("");
            }}
          >
            Post Comment
          </button>
        </div>

        {/* Comments List */}
        <div className="flex flex-col gap-4">
          {comment.map((item, index) => (
            <CommentCard key={index} item={item} level={0} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
