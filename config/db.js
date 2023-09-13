const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://cimol:c1i2m3o4l5@cleanmap.eiqipwt.mongodb.net/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (err) => {
  console.error("Erro na conexão com o MongoDB:", err);
});

db.once("open", () => {
  console.log("Conectado ao MongoDB");
});

module.exports = db;
