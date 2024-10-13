import { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
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
    <div className="bg-white p-4 rounded-lg lg:w-[80%] shadow-md max-w-3xl mx-auto mt-4">
      <h2 className="text-sm font-bold mb-4 pl-3">
        Đánh giá & Nhận xét{" "}
        <span className="text-blue-600">{product.name}</span>
      </h2>

      <div className="md:flex justify-center">
        <div className="flex md:w-1/5 flex-col items-center mb-4">
          <div className="text-red-500 text-[36px] font-bold mt-16">0/5</div>
          <div className="flex mt-3">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="w-4 h-4 text-gray-300 mx-0.5"
                viewBox="0 0 24 24"
              >
                <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.771 1.577 8.194-7.513-3.944-7.513 3.944 1.577-8.194-6.064-5.771 8.332-1.151z" />
              </svg>
            ))}
          </div>
          <div className="text-[14px] text-gray-500 mt-1">
            (
            <span className="size-4 text-black font-semibold p-1">
              {reviews.length}
            </span>
            ) đánh giá & nhận xét
          </div>
        </div>
        <div className="flex md:w-1/2 flex-col space-y-2 mb-4 pl-3">
          {ratingData.map((item) => (
            <div key={item.stars} className="flex items-center">
              <div className="flex-1 flex items-center">
                <span className="w-4">{item.stars}</span>
                <AiFillStar className="text-yellow-600 md:text-sm" />
                <div className="w-full md:w-[83%] bg-gray-200 rounded-full h-2 mx-4">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${(item.count / reviews.length) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="text-[14px] text-gray-500 md:mx-9">
                {item.count} đánh giá
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="hidden md:block border-b border-gray-300 mb-14 mt-3"></div>
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
      <div className="flex pl-3">
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
