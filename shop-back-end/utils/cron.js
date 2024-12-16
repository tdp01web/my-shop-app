const cron = require('node-cron');
const Order = require("../models/orderModel");

const scheduleOrderStatusUpdate = () => {
  cron.schedule('0 0 * * *', async () => {
    const currentDate = new Date();
    const threeDaysAgo = new Date(currentDate);
    threeDaysAgo.setDate(currentDate.getDate() - 3);
    try {
      await Order.updateMany(
        {
          orderStatus: 'Đã Giao Hàng',
          updatedAt: { $lte: threeDaysAgo },
        },
        { $set: { orderStatus: 'Hoàn Thành' } }
      );

      console.log('Đã cập nhật trạng thái đơn hàng thành công.');
    } catch (error) {
      console.error('Lỗi khi cập nhật trạng thái đơn hàng:', error);
    }
  });
};

// const scheduleOrderStatusUpdate = () => {
//   cron.schedule('* * * * *', async () => {
//     console.log('Cron job đang chạy...');

//     const currentDate = new Date();
//     const tenMinutesAgo = new Date(currentDate);
//     tenMinutesAgo.setMinutes(currentDate.getMinutes() - 1);

//     console.log('Thời gian tenMinutesAgo:', tenMinutesAgo);

//     try {
//       const orders = await Order.find({
//         orderStatus: 'Đã Giao Hàng',
//         updatedAt: { $lte: tenMinutesAgo },
//       });
//       console.log('Các đơn hàng cần cập nhật:', orders);

//       const result = await Order.updateMany(
//         {
//           orderStatus: 'Đã Giao Hàng',
//           updatedAt: { $lte: tenMinutesAgo },
//         },
//         { $set: { orderStatus: 'Hoàn Thành' } }
//       );

//       console.log('Đã cập nhật trạng thái đơn hàng thành công:', result.nModified);
//     } catch (error) {
//       console.error('Lỗi khi cập nhật trạng thái đơn hàng:', error);
//     }
//   });
// };

module.exports = scheduleOrderStatusUpdate;