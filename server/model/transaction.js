
const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
     cardnumber: {
          type: String, // Используем String для хранения номера карты
          required: true,
     },
     carddate: {
          type: String, // Используем String для срока действия карты
          required: true,
     },
     cardcode: {
          type: String, // Используем String для кода безопасности карты
          required: true,
     },
     totalPrice: {
          type: Number, // Используем Number для хранения суммы
          required: true,
     },
     date: { type: Date, default: Date.now },


});

module.exports = mongoose.model("Transaction", TransactionSchema);