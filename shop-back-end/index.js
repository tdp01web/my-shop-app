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
const couponRouter = require("./routes/couponRoutes");
const brandRouter = require("./routes/product/brandRoutes");
const gpuRouter = require("./routes/product/gpuRoutes");
const ssdRouter = require("./routes/product/ssdRoutes");
const ramRouter = require("./routes/product/ramRoutes");
const cpuRouter = require("./routes/product/cpuRoutes");
const orderRouter = require("./routes/order/orderRouter");
const historyOrderRouter = require("./routes/orderHistory");
const enqRouter = require("./routes/enqRouter");
const cartRouter = require("./routes/cart/cartRoutes");
const statsRouter = require("./routes/statsRouter");
const uploadRouter = require("./routes/uploadRouter");
const morgan = require("morgan");
const cors = require("cors");
const scheduleOrderStatusUpdate = require('./utils/cron');
scheduleOrderStatusUpdate();
const PORT = process.env.PORT || 4000;

dbConnect();

app.use(morgan("dev"));
app.use(
  cors({ exposedHeaders: ["Authorization"], origin: "http://localhost:5173" })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/user", authRouter);
app.use("/api/product", productRouter);
app.use("/api/blog", blogRouter);
app.use("/api/category", categoryRouter);
app.use("/api/brand", brandRouter);
app.use("/api/gpu", gpuRouter);
app.use("/api/ssd", ssdRouter);
app.use("/api/ram", ramRouter);
app.use("/api/cpu", cpuRouter);
app.use("/api/cart", cartRouter);
app.use("/api/coupon", couponRouter);
app.use("/api/enquiry", enqRouter);
app.use("/api/upload", uploadRouter);
app.use("/api/order", orderRouter);
app.use("/api/historyOrder", historyOrderRouter);
app.use("/api/stats", statsRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
