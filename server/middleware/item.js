const errorHandler = (err, req, res, next) => {
     console.error(err.stack); // исправлено на console.error
     res.status(500).send("Something broke!");
};

module.exports = errorHandler;
