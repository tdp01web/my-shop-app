import React from 'react'

const index = () => {
  return (
    <div className="mx-auto w-[80%]">
    {wishlist.length === 0 ? (
      <div className="text-center">
        <Link to={"/"}>
          <Notification
            text1={"Bạn chưa thêm sản phẩm nào vào yêu thích"}
            text2={"Quay trở về trang chủ"}
          />
        </Link>
      </div>
    ) : (
      <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {wishlist.map((product) => (
          <Product
            key={product._id}
            _id={product._id}
            title={product.title}
            price={product.variants?.[0]?.price || "N/A"}
            images={product.images}
            variants={product.variants}
            totalrating={product.totalrating}
            ratings={product.ratings}
          />
        ))}
      </div>
    )}
  </div>
  )
}

export default index
