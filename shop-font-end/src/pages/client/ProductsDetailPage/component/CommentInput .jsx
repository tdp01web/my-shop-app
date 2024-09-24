/* eslint-disable react/prop-types */
const CommentInput = ({ newReview, setNewReview }) => {
  return (
    <div className="pl-3 mb-4">
      <input
        type="text"
        placeholder="Tên của bạn"
        className="w-full mb-2 p-2 border rounded"
        value={newReview.user}
        onChange={(e) => setNewReview({ ...newReview, user: e.target.value })}
      />
      <textarea
        placeholder="Viết bình luận của bạn..."
        className="w-full mb-2 p-2 border rounded"
        value={newReview.comment}
        onChange={(e) =>
          setNewReview({ ...newReview, comment: e.target.value })
        }
      />
    </div>
  );
};

export default CommentInput;
