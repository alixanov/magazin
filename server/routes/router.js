
const express = require("express");
const router = express.Router();
const Transaction = require("../model/transaction"); // Обновляем путь к модели

// Create a new transaction
router.post("/add", async (req, res) => {
    const { cardnumber, carddate, cardcode, totalPrice } = req.body;

    // Проверка наличия всех необходимых данных
    if (!cardnumber || !carddate || !cardcode || totalPrice === undefined) {
        return res.status(400).json({ message: 'Все поля обязательны для заполнения' });
    }

    try {
        // Создание новой транзакции
        const newTransaction = new Transaction({
            cardnumber,
            carddate,
            cardcode,
            totalPrice
        });

        // Сохранение транзакции в базе данных
        await newTransaction.save();
        res.status(201).json(newTransaction);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});




module.exports = router;