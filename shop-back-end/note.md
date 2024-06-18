<!--TODO                        Chú Thích Api User                         -->

-Phải đăng nhập admin mới khóa được user
-handle refresh token cung cấp cho người dùng một token mới khi token cũ hết hạn mà không cần phải đăng nhập

 <!--TODO                  Api Product                                    -->

<!--! Phải là admin mới có thể xóa sản phẩm và update sản phẩm -->

-title: Tên của sản phẩm (chuỗi, bắt buộc, không có khoảng trắng ở đầu và cuối).
-slug: Chuỗi URL thân thiện cho sản phẩm (chuỗi, bắt buộc, duy nhất, viết thường).
-description: Mô tả chi tiết về sản phẩm (chuỗi, bắt buộc).
-price: Giá của sản phẩm (số, bắt buộc).
-category: Danh mục của sản phẩm, liên kết đến mô hình Category khác (ObjectId, tham chiếu đến mô hình Category).
-brand: Thương hiệu của sản phẩm, chỉ có thể là một trong ba giá trị: "Apple", "Samsung", "Lenovo" (chuỗi).
-quantity: Số lượng sản phẩm có sẵn (số, bắt buộc).
-sold: Số lượng sản phẩm đã bán (số, mặc định là 0).
-images: Danh sách các URL hình ảnh của sản phẩm (mảng).
-color: Màu sắc của sản phẩm, chỉ có thể là một trong ba giá trị: "black", "white", "red" (chuỗi).
-ratings: Danh sách các đánh giá của sản phẩm, mỗi đánh giá bao gồm số sao và người đăng (mảng các đối tượng, với số sao là số và người đăng là ObjectId tham chiếu đến mô hình User).

<!--! -Field limiting chỉ trả về kết quả mà người dùng đang tìm kiếm chứ không render ra tất cả dữ liệu data của sản phẩm -->
<!--TODO                          slugify                                         -->

Slugify được sử dụng để định nghĩa URL sao cho dễ đọc và thân thiện với SEO. Việc này giúp tạo ra các URL ngắn gọn, có cấu trúc rõ ràng và chứa từ khóa, điều này không chỉ cải thiện thứ hạng trên các công cụ tìm kiếm mà còn giúp người dùng dễ nhớ và tránh các lỗi liên quan đến ký tự không hợp lệ trong URL

<!--TODO một số từ viết tắt trong url -->

một số từ viết tắt thường dùng trong truy vấn API và cơ sở dữ liệu:
gte - greater than or equal to (lớn hơn hoặc bằng)
gt - greater than (lớn hơn)
lte - less than or equal to (nhỏ hơn hoặc bằng)
lt - less than (nhỏ hơn)
eq - equal (bằng)
ne - not equal (không bằng)
in - in (trong danh sách)
nin - not in (không trong danh sách)
like - giống như (thường dùng trong tìm kiếm chuỗi)
exists - tồn tại (kiểm tra sự tồn tại của một trường)

nodemailer - để gửi các loại email khác nhau, bao gồm thông báo kích hoạt tài khoản, thông báo quên mật khẩu, thông báo giao hàng, hoặc bất kỳ loại email nào khác mà ứng dụng của bạn cần gửi

<!--! multer là một middleware cho Node.js, được sử dụng để xử lý các file tải lên trong các form gửi dưới dạng multipart/form-data. -->

<!--! sharp là một thư viện xử lý hình ảnh hiệu suất cao cho Node.js. Nó hỗ trợ nhiều thao tác trên hình ảnh như thay đổi kích thước, cắt, chuyển định dạng, và nén hình ảnh. -->

<!--! cloudinary là một dịch vụ đám mây dùng để quản lý và lưu trữ hình ảnh và video. Gói cloudinary của npm giúp tích hợp dễ dàng với API của Cloudinary để tải lên, quản lý và biến đổi hình ảnh trên đám mây. -->
