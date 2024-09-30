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

Mô-đun fs trong Node.js được sử dụng để tương tác với hệ thống tệp. Nó cung cấp các chức năng để đọc, ghi và thao tác với hệ thống tệp. Trong ngữ cảnh của mã của bạn, mô-đun fs được sử dụng để xóa các tệp khỏi hệ thống tệp cục bộ sau khi chúng đã được tải lên Cloudinary

<!-- SSD (Storage): Bạn đã có mô hình Storage, bao gồm:

capacity: Dung lượng lưu trữ (VD: 256GB, 512GB).
type: Loại lưu trữ (VD: SSD hoặc HDD).
CPU (Processor): Bạn đã có mô hình Processor, bao gồm:

name: Tên của bộ xử lý (VD: Intel Core i9-11900K).
speed: Tốc độ của CPU (VD: 3.6GHz).
RAM: Bạn đã có mô hình RAM, bao gồm:

size: Kích thước của RAM (VD: 8GB, 16GB).
VGA (GPU): Bạn đã có mô hình GPU, bao gồm:

name: Tên của card đồ họa (VD: NVIDIA GeForce RTX 3080).
LCD (Màn hình): Hiện tại, bạn chưa có một mô hình cụ thể nào cho màn hình (LCD). Nếu khách hàng cần thông tin về màn hình, bạn có thể tạo một mô hình mới cho nó. -->

<!-- orderedBy: Là ID người dùng đặt hàng.
products: Là mảng các sản phẩm được đặt, trong đó mỗi sản phẩm có:
product: ID sản phẩm.
variant: ID của biến thể sản phẩm (nếu có).
count: Số lượng sản phẩm đã đặt.
price: Giá sản phẩm tại thời điểm mua.
totalProductPrice: Tổng giá của các sản phẩm trước khi áp dụng mã giảm giá và phí vận chuyển.
discountApplied: Số tiền được giảm giá (nếu có mã giảm giá).
shippingFee: Phí vận chuyển.
totalPrice: Tổng giá trị đơn hàng sau khi cộng phí vận chuyển và giảm giá.
shippingAddress: Thông tin địa chỉ giao hàng.
paymentMethod: Phương thức thanh toán (ví dụ: Thanh Toán Khi Nhận Hàng).
orderStatus: Trạng thái của đơn hàng (mặc định là "Đang Xử Lý"). -->
