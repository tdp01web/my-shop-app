import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Rate, Button, Input, message, Spin } from "antd";
import { instance } from "../../../../configs/instance";

const ProductComments = ({ data }) => {
  const queryClient = useQueryClient();
  const productId = data?._id;
  console.log(data?.statusCmt);

  // State cho đánh giá mới
  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState("");
  const [showComment, setShowComment] = useState(false);

  // Lấy danh sách đánh giá
  const { data: reviews, isLoading } = useQuery({
    queryKey: ["REVIEWS", productId],
    queryFn: async () => {
      const { data } = await instance.get(
        `/product/getReviewsUser/${productId}`
      );
      return data;
    },
    enabled: !!productId,
  });

  // Mutation để thêm đánh giá
  const { mutate: addReview, isLoading: isSubmitting } = useMutation({
    mutationFn: async (reviewData) => {
      const { data } = await instance.post("/product/rate", reviewData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["REVIEWS", productId]);
      setNewRating(0);
      setNewComment("");
      message.success("Đánh giá của bạn đã được gửi!");
    },
    onError: (error) => {
      message.error(
        error.response?.data?.message ||
          "Lỗi khi gửi đánh giá, vui lòng thử lại!"
      );
    },
  });

  // Hàm xử lý gửi đánh giá
  const handleAddReview = () => {
    if (!newRating || !newComment) {
      message.warning("Vui lòng nhập đủ thông tin đánh giá.");
      return;
    }

    const reviewData = {
      prodId: productId,
      star: newRating,
      comment: newComment,
    };
    addReview(reviewData);
  };

  // Tính toán số lượng đánh giá và trung bình
  const totalReviews = reviews?.ratings?.length || 0;
  const averageRating =
    totalReviews > 0
      ? reviews.ratings.reduce((sum, r) => sum + r.star, 0) / totalReviews
      : 0;

  const ratingsCount = [5, 4, 3, 2, 1].map(
    (star) => reviews?.ratings?.filter((r) => r.star === star).length || 0
  );

  return (
    <div className="bg-white shadow-md p-6 rounded-lg">
      <h3 className="mb-6 font-bold text-[24px]">
        Đánh giá và nhận xét về sản phẩm {data?.title}
      </h3>

      <div className="flex md:flex-row flex-col gap-24 mx-auto w-[70%]">
        {/* Tổng điểm và số lượng đánh giá */}
        <div className="flex flex-col justify-center items-center">
          <p className="justify-center items-center font-bold text-2xl text-red-500">
            {averageRating.toFixed(1)}/5
          </p>
          <Rate disabled value={Math.round(averageRating)} />
          <p className="mt-2 text-gray-600">{totalReviews} đánh giá</p>
        </div>

        {/* Phân bổ đánh giá theo mức sao */}
        <div className="flex-1">
          {[5, 4, 3, 2, 1].map((star, index) => (
            <div key={star} className="flex items-center mb-2">
              <span className="w-12">{star} </span>
              <div className="flex-1 bg-gray-200 mx-2 rounded-full h-2 overflow-hidden">
                <div
                  style={{
                    width: `${
                      (ratingsCount[5 - star] / totalReviews) * 100 || 0
                    }%`,
                  }}
                  className="bg-yellow-500 h-full"
                ></div>
              </div>
              <span className="">{ratingsCount[5 - star]} đánh giá</span>
            </div>
          ))}
        </div>
      </div>

      <hr className="my-6" />

      {/* Form đánh giá */}
      {data?.statusCmt === 0 ? (
        <p className="w-full text-[20px] text-center text-red-500">
          Sản phẩm này đã bị khóa bình luận
        </p>
      ) : (
        <div className="mb-6">
          <h4 className="mb-4 font-bold text-lg">Gửi đánh giá của bạn</h4>
          <Rate value={newRating} onChange={setNewRating} />
          <Input.TextArea
            rows={4}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Nhập nhận xét của bạn"
            className="mt-4"
          />
          <Button
            type="primary"
            loading={isSubmitting}
            onClick={handleAddReview}
            className="mt-4"
          >
            Gửi đánh giá
          </Button>
          <hr className="my-6" />

          {/* Danh sách đánh giá */}
          {isLoading ? (
            <Spin />
          ) : (
            <div className="flex flex-col gap-6">
              {reviews?.closedComments?.length > 0 ? (
                <>
                  {reviews.closedComments.slice(0, 3).map((review) => (
                    <div key={review._id} className="p-4 border-b">
                      <Rate disabled value={review.star} />
                      <p className="mt-2">{review.comment}</p>
                      <small className="text-gray-500">
                        Bởi {review.postedby?.email}
                      </small>
                    </div>
                  ))}
                  {reviews.closedComments.length > 3 && !showComment && (
                    <Button
                      type="link"
                      onClick={() => setShowComment(true)}
                      className="mt-4"
                    >
                      Xem thêm {reviews.closedComments.length - 3} đánh giá...
                    </Button>
                  )}
                  {showComment &&
                    reviews.closedComments.slice(3).map((review) => (
                      <div key={review._id} className="p-4 border-b">
                        <Rate disabled value={review.star} />
                        <p className="mt-2">{review.comment}</p>
                        <small className="text-gray-500">
                          Bởi {review.postedby?.email}
                        </small>
                      </div>
                    ))}
                </>
              ) : (
                <p className="text-gray-500">
                  Chưa có đánh giá nào cho sản phẩm này.
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductComments;
