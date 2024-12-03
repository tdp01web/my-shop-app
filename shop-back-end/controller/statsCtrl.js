const express = require("express");
const Order = require("../models/orderModel");
const Product = require("../models/product/productModel");
const asyncHandler = require("express-async-handler");
const dayjs = require("dayjs");
const moment = require("moment");
const ProductVariant = require("../models/product/productVariantModel");
const User = require("../models/userModel");

//doanh số theo tháng
const getMonthlySales = async (req, res) => {
  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const salesData = await Order.aggregate([
      {
        // Lọc các đơn hàng hoàn thành trong tháng hiện tại
        $match: {
          orderStatus: "Hoàn Thành",
          createdAt: { $gte: startOfMonth, $lte: endOfMonth },
        },
      },
      {
        // Nhóm lại để tính tổng số đơn hàng và doanh thu
        $group: {
          _id: null,
          totalOrders: { $sum: 1 },
          totalRevenue: { $sum: "$totalPrice" },
        },
      },
    ]);

    // Nếu không có dữ liệu, trả về 0
    if (!salesData.length) {
      return res.status(200).json({
        totalOrders: 0,
        totalRevenue: 0,
      });
    }

    const { totalOrders, totalRevenue } = salesData[0];

    res.status(200).json({
      totalOrders,
      totalRevenue,
    });
  } catch (error) {
    console.error("Error fetching monthly sales:", error);
    res.status(500).json({ error: "Failed to fetch monthly sales data" });
  }
};

//doanh số theo ngày
const getTodaySales = async (req, res) => {
  try {
    const now = new Date();
    const startOfDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );
    const endOfDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1
    );

    const salesData = await Order.aggregate([
      {
        // Lọc các đơn hàng hoàn thành trong ngày hôm nay
        $match: {
          orderStatus: "Hoàn Thành",
          createdAt: { $gte: startOfDay, $lt: endOfDay },
        },
      },
      {
        // Nhóm lại để tính tổng số đơn hàng và doanh thu
        $group: {
          _id: null,
          totalOrders: { $sum: 1 },
          totalRevenue: { $sum: "$totalPrice" },
        },
      },
    ]);

    // Nếu không có dữ liệu, trả về 0
    if (!salesData.length) {
      return res.status(200).json({
        totalOrders: 0,
        totalRevenue: 0,
      });
    }

    const { totalOrders, totalRevenue } = salesData[0];

    res.status(200).json({
      totalOrders,
      totalRevenue,
    });
  } catch (error) {
    console.error("Error fetching today's sales:", error);
    res.status(500).json({ error: "Failed to fetch today's sales data" });
  }
};

//tổng số sản phẩm đã bán được
const getTotalProductSalesThisMonth = async (req, res) => {
  try {
    // Lấy ngày đầu tiên và cuối cùng của tháng hiện tại
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0,
      23,
      59,
      59,
      999
    );

    // Tính tổng số lượng sản phẩm
    const orders = await Order.aggregate([
      {
        $match: {
          orderStatus: "Hoàn Thành", // Chỉ tính các đơn hàng hoàn thành
          createdAt: {
            $gte: startOfMonth, // Từ ngày đầu tiên
            $lte: endOfMonth, // Đến ngày cuối cùng
          },
        },
      },
      {
        $unwind: "$products", // Tách mảng `products` thành từng document riêng
      },
      {
        $group: {
          _id: null, // Không cần nhóm theo trường nào
          totalQuantity: { $sum: "$products.count" }, // Tính tổng quantity
        },
      },
    ]);

    // Lấy kết quả
    const totalQuantity = orders[0]?.totalQuantity || 0;

    // Trả về kết quả
    res.status(200).json({ totalQuantity });

    return totalQuantity;
  } catch (error) {
    console.error("Lỗi khi tính tổng số lượng sản phẩm đã bán:", error);
    throw error;
  }
};

const getSalesStatistics = async (req, res) => {
  try {
    const { startDate, endDate, filterType } = req.query;

    let start, end;
    const now = moment();

    // Xác định khoảng thời gian theo filterType
    switch (filterType) {
      case "day":
        start = now.startOf("day");
        end = now.endOf("day");
        break;
      case "week":
        start = now.startOf("week");
        end = now.endOf("week");
        break;
      case "month":
        start = now.startOf("month");
        end = now.endOf("month");
        break;
      case "year":
        start = now.startOf("year");
        end = now.endOf("year");
        break;
      case "custom":
        if (!startDate || !endDate) {
          return res.status(400).json({ message: "Missing custom date range" });
        }
        start = moment(startDate);
        end = moment(endDate);
        break;
      default:
        return res.status(400).json({ message: "Invalid filter type" });
    }

    if (!start || !end) {
      return res.status(400).json({ message: "Invalid date range" });
    }

    // Lấy thống kê
    const stats = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: start.toDate(), $lte: end.toDate() },
        },
      },
      {
        $group: {
          _id: "$salesTypes",
          totalSales: { $sum: "$totalPrice" },
        },
      },
      {
        $addFields: {
          salesType: {
            $cond: [
              { $eq: ["$_id", 1] }, // Nếu _id là 1 (Online)
              "Online", // Tên loại bán hàng
              "Offline", // Nếu không, Offline
            ],
          },
        },
      },
      {
        $project: {
          _id: 0,
          salesType: 1,
          totalSales: 1,
        },
      },
    ]);

    // Nếu không có dữ liệu trả về, trả về giá trị mặc định
    const defaultStats = [
      { salesType: "Online", totalSales: 0 },
      { salesType: "Offline", totalSales: 0 },
    ];

    // Nếu có dữ liệu trả về, sử dụng, nếu không, trả về giá trị mặc định
    const result = stats.length
      ? stats.map((item) => ({
          salesType: item.salesType,
          totalSales: item.totalSales,
        }))
      : defaultStats;

    res.json(result);
  } catch (error) {
    console.error("Error fetching sales statistics:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};

const getLowStockProducts = async (req, res) => {
  try {
    // Tìm các biến thể sản phẩm có số lượng dưới 5
    const lowStockVariants = await ProductVariant.find({ quantity: { $lt: 5 } })
      .populate("product") // Nếu bạn muốn lấy thông tin về sản phẩm
      .exec();

    // Nếu không có sản phẩm nào thỏa mãn
    if (lowStockVariants.length === 0) {
      return res
        .status(404)
        .json({ message: "Không có sản phẩm nào có số lượng dưới 5." });
    }

    // Trả về danh sách sản phẩm có số lượng dưới 5
    return res.status(200).json(lowStockVariants);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Lỗi khi truy vấn cơ sở dữ liệu.", error: err.message });
  }
};

//Lượt bán sản phẩm theo thứ tự giảm dần
const getTopSellingProducts = async (req, res) => {
  try {
    const { filterType, startDate, endDate } = req.query;

    let filter = {};

    if (filterType === "day") {
      const startOfDay = moment().startOf("day");
      const endOfDay = moment().endOf("day");
      filter.createdAt = { $gte: startOfDay.toDate(), $lte: endOfDay.toDate() };
    } else if (filterType === "week") {
      const startOfWeek = moment().startOf("week");
      const endOfWeek = moment().endOf("week");
      filter.createdAt = {
        $gte: startOfWeek.toDate(),
        $lte: endOfWeek.toDate(),
      };
    } else if (filterType === "month") {
      const startOfMonth = moment().startOf("month");
      const endOfMonth = moment().endOf("month");
      filter.createdAt = {
        $gte: startOfMonth.toDate(),
        $lte: endOfMonth.toDate(),
      };
    } else if (filterType === "year") {
      const startOfYear = moment().startOf("year");
      const endOfYear = moment().endOf("year");
      filter.createdAt = {
        $gte: startOfYear.toDate(),
        $lte: endOfYear.toDate(),
      };
    } else if (filterType === "custom" && startDate && endDate) {
      filter.createdAt = {
        $gte: moment(startDate).startOf("day").toDate(),
        $lte: moment(endDate).endOf("day").toDate(),
      };
    } else {
      // Trường hợp mặc định nếu không có filterType
      const startOfYear = moment().startOf("year");
      const endOfYear = moment().endOf("year");
      filter.createdAt = {
        $gte: startOfYear.toDate(),
        $lte: endOfYear.toDate(),
      };
    }

    const products = await Product.find(filter).sort({ sold: -1 });

    res.status(200).json({
      message: "Danh sách sản phẩm theo lượt bán giảm dần",
      products: products || [],
    });
  } catch (error) {
    console.error("Error fetching products by sales:", error);
    res.status(500).json({ message: error.message });
  }
};

const getLoyalCustomers = async (req, res) => {
  try {
    const loyalCustomers = await Order.aggregate([
      {
        $match: { orderStatus: { $in: ["Hoàn Thành", "Đã Giao Hàng"] } },
      },
      {
        $group: {
          _id: "$orderedBy",
          totalSpent: { $sum: "$totalPrice" },
          totalOrders: { $count: {} },
        },
      },
      {
        $sort: { totalSpent: -1 },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      {
        $unwind: "$userDetails",
      },
      {
        $project: {
          _id: 0,
          fullName: {
            $concat: ["$userDetails.firstName", " ", "$userDetails.lastName"],
          },
          totalSpent: 1,
          totalOrders: 1,
        },
      },
    ]);

    res.status(200).json({
      message: "Danh sách khách hàng thân thiết",
      customers: loyalCustomers,
    });
  } catch (error) {
    console.error("Error fetching loyal customers:", error);
    res.status(500).json({ message: "Đã xảy ra lỗi!" });
  }
};

const getSalesByTime = async (req, res) => {
  try {
    const { filterType } = req.query;

    // Xác định khoảng thời gian dựa trên filterType
    const now = new Date();
    let start, end;

    switch (filterType) {
      case "day":
        start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        end = new Date(start);
        end.setDate(start.getDate() + 1);
        break;
      case "week":
        const dayOfWeek = now.getDay(); // 0: Chủ nhật, 1: Thứ hai, ..., 6: Thứ bảy
        start = new Date(now); // Bắt đầu từ ngày hiện tại
        start.setDate(now.getDate() - dayOfWeek); // Lùi về Chủ nhật đầu tuần
        start.setHours(0, 0, 0, 0); // Đặt thời gian đầu tuần về 0h
        end = new Date(start);
        end.setDate(start.getDate() + 7); // Tiến tới cuối tuần (không bao gồm)
        break;
      case "month":
        start = new Date(now.getFullYear(), now.getMonth(), 1);
        end = new Date(now.getFullYear(), now.getMonth() + 1, 1);
        break;
      case "year":
        start = new Date(now.getFullYear(), 0, 1);
        end = new Date(now.getFullYear() + 1, 0, 1);
        break;
      default:
        return res.status(400).json({
          error: "Invalid filterType. Use 'day', 'week', 'month', or 'year'.",
        });
    }

    const salesData = await Order.aggregate([
      {
        // Lọc các đơn hàng hoàn thành trong khoảng thời gian
        $match: {
          orderStatus: "Hoàn Thành",
          createdAt: { $gte: start, $lt: end },
        },
      },
      {
        // Nhóm để tính tổng doanh thu và số lượng đơn hàng
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalPrice" },
          totalOrders: { $sum: 1 },
        },
      },
    ]);

    // Nếu không có dữ liệu, trả về 0
    if (!salesData.length) {
      return res.status(200).json({
        totalOrders: 0,
        totalRevenue: 0,
      });
    }

    const { totalOrders, totalRevenue } = salesData[0];

    res.status(200).json({
      filterType,
      totalOrders,
      totalRevenue,
    });
  } catch (error) {
    console.error("Error fetching sales data:", error);
    res.status(500).json({ error: "Failed to fetch sales data" });
  }
};

const getProductSalesByTime = async (req, res) => {
  try {
    const { filterType, startDate, endDate } = req.query;

    let matchCondition = {
      orderStatus: "Hoàn Thành", // Chỉ lấy các đơn hàng hoàn thành
    };

    const now = new Date();
    switch (filterType) {
      case "day":
        matchCondition.createdAt = {
          $gte: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
          $lt: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1),
        };
        break;

      case "week": {
        const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
        const endOfWeek = new Date(
          startOfWeek.getFullYear(),
          startOfWeek.getMonth(),
          startOfWeek.getDate() + 7
        );
        matchCondition.createdAt = { $gte: startOfWeek, $lt: endOfWeek };
        break;
      }

      case "month":
        matchCondition.createdAt = {
          $gte: new Date(now.getFullYear(), now.getMonth(), 1),
          $lt: new Date(now.getFullYear(), now.getMonth() + 1, 1),
        };
        break;

      case "year":
        matchCondition.createdAt = {
          $gte: new Date(now.getFullYear(), 0, 1),
          $lt: new Date(now.getFullYear() + 1, 0, 1),
        };
        break;

      case "custom":
        if (!startDate || !endDate) {
          return res
            .status(400)
            .json({ error: "Start and end dates required for custom filter" });
        }
        matchCondition.createdAt = {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        };
        break;

      default:
        return res.status(400).json({ error: "Invalid filterType" });
    }

    // Aggregation để tính tổng số lượng sản phẩm
    const salesData = await Order.aggregate([
      { $match: matchCondition },
      { $unwind: "$products" }, // Tách từng sản phẩm trong đơn hàng
      {
        $group: {
          _id: null, // Không cần nhóm theo sản phẩm nữa
          totalProductsSold: { $sum: "$products.quantity" }, // Tổng số lượng sản phẩm bán được
        },
      },
    ]);

    // Nếu không có dữ liệu, trả về tổng số lượng sản phẩm là 0
    const totalProductsSold =
      salesData.length > 0 ? salesData[0].totalProductsSold : 0;

    res.status(200).json({ filterType, totalProductsSold });
  } catch (error) {
    console.error("Error fetching product sales data:", error);
    res.status(500).json({ error: "Failed to fetch product sales data" });
  }
};

const getOrderStatusStats = async (req, res) => {
  try {
    const { filterType, startDate, endDate } = req.query;

    // Điều kiện mặc định để lọc các đơn hàng theo thời gian
    let matchCondition = {};

    const now = new Date();

    // Xác định phạm vi thời gian tùy theo filterType
    switch (filterType) {
      case "day":
        matchCondition.createdAt = {
          $gte: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
          $lt: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1),
        };
        break;

      case "week": {
        const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
        const endOfWeek = new Date(
          startOfWeek.getFullYear(),
          startOfWeek.getMonth(),
          startOfWeek.getDate() + 7
        );
        matchCondition.createdAt = { $gte: startOfWeek, $lt: endOfWeek };
        break;
      }

      case "month":
        matchCondition.createdAt = {
          $gte: new Date(now.getFullYear(), now.getMonth(), 1),
          $lt: new Date(now.getFullYear(), now.getMonth() + 1, 1),
        };
        break;

      case "year":
        matchCondition.createdAt = {
          $gte: new Date(now.getFullYear(), 0, 1),
          $lt: new Date(now.getFullYear() + 1, 0, 1),
        };
        break;

      case "custom":
        if (!startDate || !endDate) {
          return res
            .status(400)
            .json({ error: "Start and end dates required for custom filter" });
        }
        matchCondition.createdAt = {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        };
        break;

      default:
        return res.status(400).json({ error: "Invalid filterType" });
    }

    // Aggregation để tính tổng số đơn hàng và tổng số đơn hàng theo từng orderStatus
    const orderStatusData = await Order.aggregate([
      { $match: matchCondition }, // Lọc theo điều kiện thời gian
      {
        $group: {
          _id: "$orderStatus", // Nhóm theo orderStatus
          count: { $sum: 1 }, // Tính số lượng đơn hàng theo trạng thái
        },
      },
    ]);

    // Tính tổng số đơn hàng
    const totalOrders = orderStatusData.reduce(
      (acc, curr) => acc + curr.count,
      0
    );

    if (totalOrders === 0) {
      return res.status(200).json({
        message: "No orders found for the selected time period",
        stats: [],
      });
    }

    // Tính tỷ lệ phần trăm của từng orderStatus
    const stats = orderStatusData.map((status) => ({
      orderStatus: status._id,
      count: status.count,
      percentage: ((status.count / totalOrders) * 100).toFixed(2), // Tính phần trăm
    }));

    // Các trạng thái mặc định nếu không có dữ liệu
    const allStatuses = [
      "Đang Xử Lý",
      "Đã Xác Nhận",
      "Đang Giao Hàng",
      "Đã Giao Hàng",
      "Hoàn Thành",
      "Đã Hủy",
    ];

    // Thêm các trạng thái chưa có dữ liệu vào kết quả
    const finalStats = allStatuses.map((status) => {
      const existingStatus = stats.find((item) => item.orderStatus === status);
      if (existingStatus) {
        return existingStatus; // Trả về nếu có dữ liệu
      }
      return { orderStatus: status, count: 0, percentage: "0.00" }; // Nếu không có dữ liệu, tỷ lệ là 0
    });

    // Trả về kết quả
    res.status(200).json({
      message: "Order status statistics",
      stats: finalStats,
    });
  } catch (error) {
    console.error("Error fetching order status data:", error);
    res.status(500).json({
      message: "Failed to fetch order status data",
      error: error.message,
    });
  }
};

const getOrderAndProductStats = async (req, res) => {
  try {
    const { filterType, startDate, endDate } = req.query;

    let start,
      end,
      timeLabels = [];
    const now = new Date();

    // Xác định khoảng thời gian và các mốc thời gian dự kiến
    switch (filterType) {
      case "week": {
        const startOfWeek = moment().startOf("week");
        const endOfWeek = moment().endOf("week");
        start = startOfWeek.toDate();
        end = endOfWeek.toDate();

        timeLabels = Array.from({ length: 7 }, (_, i) =>
          startOfWeek.clone().add(i, "days").format("dddd")
        );
        break;
      }
      case "month": {
        const startOfMonth = moment().startOf("month");
        const endOfMonth = moment().endOf("month");
        start = startOfMonth.toDate();
        end = endOfMonth.toDate();

        const weeksInMonth = Math.ceil(
          endOfMonth.diff(startOfMonth, "days") / 7
        );
        timeLabels = Array.from(
          { length: weeksInMonth },
          (_, i) => `Week ${i + 1}`
        );
        break;
      }
      case "year": {
        const startOfYear = moment().startOf("year");
        const endOfYear = moment().endOf("year");
        start = startOfYear.toDate();
        end = endOfYear.toDate();

        timeLabels = Array.from({ length: 12 }, (_, i) =>
          moment().month(i).format("MMMM")
        );
        break;
      }
      case "custom": {
        if (!startDate || !endDate) {
          return res.status(400).json({
            error: "Start and end dates are required for custom filter.",
          });
        }
        start = moment(startDate).toDate();
        end = moment(endDate).toDate();

        const daysDiff = moment(endDate).diff(moment(startDate), "days") + 1;
        timeLabels = Array.from({ length: daysDiff }, (_, i) =>
          moment(startDate).add(i, "days").format("DD-MM-YYYY")
        );
        break;
      }
      default:
        return res.status(400).json({ error: "Invalid filter type." });
    }

    // Tạo điều kiện lọc
    const matchCondition = { createdAt: { $gte: start, $lt: end } };

    // Xác định cách nhóm dữ liệu
    let groupByField;
    switch (filterType) {
      case "week":
        groupByField = { $dayOfWeek: "$createdAt" }; // Nhóm theo ngày trong tuần
        break;
      case "month":
        groupByField = { $week: "$createdAt" }; // Nhóm theo tuần trong tháng
        break;
      case "year":
        groupByField = { $month: "$createdAt" }; // Nhóm theo tháng trong năm
        break;
      case "custom":
        groupByField = { $dayOfYear: "$createdAt" }; // Nhóm theo từng ngày
        break;
      default:
        groupByField = null;
    }

    // Lấy dữ liệu thống kê từ MongoDB
    const stats = await Order.aggregate([
      { $match: matchCondition },
      {
        $group: {
          _id: groupByField,
          totalOrders: { $sum: 1 },
          totalProducts: { $sum: { $sum: "$products.quantity" } },
        },
      },
      { $sort: { _id: 1 } }, // Sắp xếp kết quả
    ]);

    // Map kết quả để lấp đầy dữ liệu trống
    const formattedStats = timeLabels.map((label, index) => {
      const stat = stats.find((s) => s._id === index + 1) || {
        totalOrders: 0,
        totalProducts: 0,
      };
      return {
        timeLabel: label,
        totalOrders: stat.totalOrders,
        totalProducts: stat.totalProducts,
      };
    });

    res.status(200).json({ filterType, stats: formattedStats });
  } catch (error) {
    console.error("Error fetching order and product stats:", error);
    res.status(500).json({ error: "Failed to fetch stats." });
  }
};

module.exports = { getOrderAndProductStats };

module.exports = {
  getMonthlySales,
  getTodaySales,
  getTotalProductSalesThisMonth,
  getSalesStatistics,
  getLowStockProducts,
  getTopSellingProducts,
  getLoyalCustomers,
  getSalesByTime,
  getProductSalesByTime,
  getOrderStatusStats,
  getOrderAndProductStats,
};
