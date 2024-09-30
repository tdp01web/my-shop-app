const express = require("express");
const dbConnect = require("./config/dbConnect");
const app = express();
const dotenv = require("dotenv").config();
const authRouter = require("./routes/authRoutes");
const bodyParser = require("body-parser");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const cookieParser = require("cookie-parser");
const productRouter = require("./routes/product/productRoutes");
const blogRouter = require("./routes/blogRoutes");
const categoryRouter = require("./routes/product/prodcategoryRoutes");
const blogcategoryRouter = require("./routes/blogCatRoutes");
const couponRouter = require("./routes/couponRoutes");
const brandRouter = require("./routes/product/brandRoutes");
const gpuRouter = require("./routes/product/gpuRoutes");
const ssdRouter = require("./routes/product/ssdRoutes");
const ramRouter = require("./routes/product/ramRoutes");
const lcdRouter = require("./routes/product/lcdRoutes");
const cpuRouter = require("./routes/product/cpuRoutes");
const colorRouter = require("./routes/product/colorRoutes");
const orderRouter = require("./routes/order/orderRouter");
const enqRouter = require("./routes/enqRouter");
const cartRouter = require("./routes/cart/cartRoutes");
const uploadRouter = require("./routes/uploadRouter");
const morgan = require("morgan");
const cors = require("cors");

const PORT = process.env.PORT || 4000;

dbConnect();

app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/user", authRouter);
app.use("/api/product", productRouter);
app.use("/api/blog", blogRouter);
app.use("/api/category", categoryRouter);
// app.use("/api/category", categoryRouter);
app.use("/api/blogcategory", blogcategoryRouter);
app.use("/api/brand", brandRouter);
app.use("/api/color", colorRouter);
app.use("/api/gpu", gpuRouter);
app.use("/api/ssd", ssdRouter);
app.use("/api/lcd", lcdRouter);
app.use("/api/ram", ramRouter);
app.use("/api/cpu", cpuRouter);
app.use("/api/cart", cartRouter);
app.use("/api/coupon", couponRouter);
app.use("/api/enquiry", enqRouter);
app.use("/api/upload", uploadRouter);
app.use("/api/order", orderRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
