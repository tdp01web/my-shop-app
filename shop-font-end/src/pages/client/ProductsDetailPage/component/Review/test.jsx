import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useState } from "react";
import CommentInput from "../CommentInput ";

/* eslint-disable react/prop-types */
const Review = ({ product }) => {
  const [reviews, setReviews] = useState([
    {
      user: "test",
      date: "11-1-111",
      stars: 5,
      comment: "Hôm qua em tuyệt lắm, hàng ngon, ae nên thử!",
    },
  ]);

  const [newReview, setNewReview] = useState({
    user: "",
    stars: 0,
    comment: "",
  });

  const handleReviewSubmit = () => {
    if (newReview.user && newReview.stars > 0 && newReview.comment) {
      setReviews([
        ...reviews,
        { ...newReview, date: new Date().toLocaleDateString() },
      ]);
      setNewReview({ user: "", stars: 0, comment: "" });
    }
  };

  const ratingData = Array.from({ length: 5 }, (_, index) => {
    const stars = 5 - index;
    const count = reviews.filter((review) => review.stars === stars).length;
    return { stars, count };
  });

  return (
    <div className="bg-white p-6 rounded-lg lg:w-[80%] shadow-md max-w-3xl mx-auto mt-4">
      <h2 className="text-lg font-bold mb-4 pl-3">
        Đánh giá & Nhận xét
        <span className="text-blue-600">{product.name}</span>
      </h2>

      <div className="md:flex justify-between mb-4">
        <div className="flex flex-col items-center mb-4">
          <div className="text-red-500 text-[32px] font-bold">
            {reviews.length
              ? (
                  reviews.reduce((acc, review) => acc + review.stars, 0) /
                  reviews.length
                ).toFixed(1)
              : 0}
            /5
          </div>
          <div className="flex mt-1">
            {[...Array(5)].map((_, i) => (
              <AiFillStar key={i} className="w-5 h-5 text-gray-300 mx-0.5" />
            ))}
          </div>
          <div className="text-[14px] text-gray-500 mt-1">
            {reviews.length} đánh giá
          </div>
        </div>
        <div className="flex md:w-1/2 flex-col space-y-2 pl-3">
          {ratingData.map((item) => (
            <div key={item.stars} className="flex items-center">
              <span className="w-4">{item.stars}</span>
              <AiFillStar className="text-yellow-600" />
              <div className="w-full bg-gray-200 rounded-full h-2 mx-4">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `${(item.count / reviews.length) * 100}%` }}
                ></div>
              </div>
              <div className="text-[14px] text-gray-500 md:mx-3">
                {item.count} đánh giá
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="hidden md:block border-b border-gray-300 mb-4"></div>

      {/* Render các bình luận */}
      <div className="pl-3 mb-4">
        {reviews.map((review, index) => (
          <div key={index} className="border-b border-gray-300 py-2 mb-2">
            <div className="flex items-center">
              {[...Array(review.stars)].map((_, i) => (
                <AiFillStar key={i} className="text-yellow-600 mr-1" />
              ))}
              <span className="font-semibold ml-2">{review.user}</span>
              <span className="text-gray-500 text-sm ml-4">{review.date}</span>
            </div>
            <p className="mt-1 text-gray-700">{review.comment}</p>
          </div>
        ))}
      </div>

      <CommentInput newReview={newReview} setNewReview={setNewReview} />

      <div className="flex pl-3 mb-4">
        {[...Array(5)].map((_, i) => {
          const starValue = i + 1;
          return (
            <span
              key={i}
              onClick={() => setNewReview({ ...newReview, stars: starValue })}
              className="cursor-pointer"
            >
              {starValue <= newReview.stars ? (
                <AiFillStar className="text-yellow-600 w-9 h-9" />
              ) : (
                <AiOutlineStar className="text-gray-300 w-9 h-9" />
              )}
            </span>
          );
        })}
      </div>

      <div className="flex pl-3 mb-4">
        <button
          className="bg-blue-500 w-full md:w-[34.5%] text-white px-4 py-2 rounded shadow-md hover:bg-blue-600 focus:outline-none"
          onClick={handleReviewSubmit}
        >
          Gửi đánh giá của bạn
        </button>
      </div>
    </div>
  );
};

export default Review;
